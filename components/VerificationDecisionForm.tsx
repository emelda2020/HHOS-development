"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function VerificationDecisionForm({
  clinicianUserId,
  applicationId,
  currentStatus
}: {
  clinicianUserId: string;
  applicationId: string;
  currentStatus: string;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [decision, setDecision] = useState(currentStatus === "approved" ? "suspend" : "approve");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!confirmed) {
      setMessage("Confirm that the required verification checks were completed.");
      return;
    }

    setBusy(true);
    const { error } = await supabase.rpc("apply_clinician_verification_decision", {
      target_clinician_user_id: clinicianUserId,
      target_application_id: applicationId,
      requested_decision: decision,
      reason_text: reason,
      notes_text: notes || null
    });

    setMessage(error ? error.message : "Verification decision recorded.");
    setBusy(false);
    if (!error) router.refresh();
  }

  return (
    <form className="adminDecisionForm" onSubmit={submit}>
      <div className="adminPanelHeader">
        <p>ADMINISTRATOR DECISION</p>
        <h2>Record verification outcome</h2>
      </div>

      <label>
        Decision
        <select value={decision} onChange={(e) => setDecision(e.target.value)}>
          <option value="approve">Approve clinician</option>
          <option value="request_changes">Request changes</option>
          <option value="reject">Reject application</option>
          <option value="suspend">Suspend clinician</option>
          <option value="reinstate">Reinstate clinician</option>
          <option value="expire">Mark license expired</option>
        </select>
      </label>

      <label>
        Decision reason
        <textarea rows={4} value={reason} onChange={(e) => setReason(e.target.value)} required />
      </label>

      <label>
        Internal notes
        <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>

      <label className="adminConfirmation">
        <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
        <span>I confirm identity, license, jurisdiction, specialty, and expiry were reviewed.</span>
      </label>

      <button className="adminPrimaryButton" disabled={busy}>
        {busy ? "Saving..." : "Record decision"}
      </button>

      {message ? <p className="adminFormMessage">{message}</p> : null}
    </form>
  );
}
