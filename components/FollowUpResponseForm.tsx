"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function FollowUpResponseForm({
  actionId,
  currentStatus
}: {
  actionId: string;
  currentStatus: string;
}) {
  const supabase = createClient();
  const router = useRouter();

  const [responseType, setResponseType] = useState("acknowledged");
  const [message, setMessage] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatusMessage("");

    const { data } = await supabase.auth.getClaims();
    const patientUserId = data?.claims?.sub;

    if (!patientUserId) {
      setStatusMessage("Your session expired.");
      setBusy(false);
      return;
    }

    const { error } = await supabase.from("follow_up_responses").insert({
      follow_up_action_id: actionId,
      patient_user_id: patientUserId,
      response_type: responseType,
      response_message: message || null,
      appointment_date: appointmentDate
        ? new Date(appointmentDate).toISOString()
        : null,
      destination_name: destinationName || null
    });

    setStatusMessage(error ? error.message : "Your response was recorded.");
    setBusy(false);

    if (!error) router.refresh();
  }

  if (["completed", "declined", "cancelled"].includes(currentStatus)) return null;

  return (
    <form className="patientResponseForm" onSubmit={submit}>
      <label>
        Your response
        <select value={responseType} onChange={(e) => setResponseType(e.target.value)}>
          <option value="acknowledged">I understand</option>
          <option value="scheduled">I scheduled an appointment</option>
          <option value="completed">I completed the recommendation</option>
          <option value="needs_help">I need help arranging this</option>
          <option value="declined">I am declining this recommendation</option>
        </select>
      </label>

      {responseType === "scheduled" && (
        <>
          <label>
            Appointment date
            <input
              type="datetime-local"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </label>

          <label>
            Doctor or facility
            <input
              value={destinationName}
              onChange={(e) => setDestinationName(e.target.value)}
            />
          </label>
        </>
      )}

      <label>
        Optional message
        <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>

      <button className="outlineButton" disabled={busy}>
        {busy ? "Saving..." : "Send response"}
      </button>

      {statusMessage && <p className="seedMessage">{statusMessage}</p>}
    </form>
  );
}
