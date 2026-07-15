"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function FollowUpActionForm({
  reviewRequestId,
  patientUserId
}: {
  reviewRequestId: string;
  patientUserId: string;
}) {
  const supabase = createClient();
  const router = useRouter();

  const [actionType, setActionType] = useState("in_person_visit");
  const [priority, setPriority] = useState("routine");
  const [title, setTitle] = useState("In-person evaluation recommended");
  const [instructions, setInstructions] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [specialty, setSpecialty] = useState("general_medicine");
  const [destinationName, setDestinationName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    const { data } = await supabase.auth.getClaims();
    const clinicianId = data?.claims?.sub;

    if (!clinicianId) {
      setMessage("Your session expired.");
      setBusy(false);
      return;
    }

    const { data: action, error: actionError } = await supabase
      .from("follow_up_actions")
      .insert({
        review_request_id: reviewRequestId,
        patient_user_id: patientUserId,
        created_by_clinician_id: clinicianId,
        action_type: actionType,
        priority,
        title,
        instructions,
        due_at: dueDate ? new Date(dueDate).toISOString() : null,
        action_status: "recommended"
      })
      .select("id")
      .single();

    if (actionError || !action) {
      setMessage(actionError?.message ?? "Unable to create the recommendation.");
      setBusy(false);
      return;
    }

    if (actionType === "specialist_referral") {
      const { error } = await supabase.from("referrals").insert({
        review_request_id: reviewRequestId,
        patient_user_id: patientUserId,
        created_by_clinician_id: clinicianId,
        referral_specialty: specialty,
        referral_reason: instructions,
        recommended_timeframe: dueDate || null,
        destination_name: destinationName || null,
        referral_status: "recommended",
        follow_up_action_id: action.id
      });

      if (error) {
        setMessage(error.message);
        setBusy(false);
        return;
      }
    }

    if (priority === "urgent" || priority === "emergency") {
      await supabase.from("escalation_events").insert({
        review_request_id: reviewRequestId,
        follow_up_action_id: action.id,
        patient_user_id: patientUserId,
        escalation_level: priority,
        reason: instructions,
        initiated_by_type: "clinician",
        initiated_by_user_id: clinicianId,
        escalation_status: "open"
      });
    }

    await supabase.from("patient_notifications").insert({
      patient_user_id: patientUserId,
      review_request_id: reviewRequestId,
      notification_type: "follow_up_recommended",
      title,
      message: instructions,
      priority:
        priority === "routine"
          ? "normal"
          : priority === "priority"
            ? "high"
            : "urgent"
    });

    setMessage("Recommendation sent to the patient.");
    setBusy(false);
    router.refresh();
  }

  return (
    <form className="clinicalReviewForm" onSubmit={submit}>
      <h2>Referral and follow-up</h2>

      <label>
        Choose an action
        <select value={actionType} onChange={(e) => setActionType(e.target.value)}>
          <option value="in_person_visit">Request in-person visit</option>
          <option value="specialist_referral">Refer to specialist</option>
          <option value="repeat_test">Request repeat test</option>
          <option value="medication_review">Medication review</option>
          <option value="monitoring">Continue monitoring</option>
          <option value="emergency_redirect">Emergency redirection</option>
          <option value="other">Other follow-up</option>
        </select>
      </label>

      <label>
        Priority
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="routine">Routine</option>
          <option value="priority">Priority</option>
          <option value="urgent">Urgent</option>
          <option value="emergency">Emergency</option>
        </select>
      </label>

      <label>
        Recommendation title
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <label>
        Instructions for the patient
        <textarea
          rows={5}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
      </label>

      <label>
        Recommended date
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </label>

      {actionType === "specialist_referral" && (
        <>
          <label>
            Specialty
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
              <option value="general_medicine">General medicine</option>
              <option value="cardiology">Cardiology</option>
              <option value="endocrinology">Endocrinology</option>
              <option value="nephrology">Nephrology</option>
              <option value="hematology">Hematology</option>
              <option value="oncology">Oncology</option>
              <option value="neurology">Neurology</option>
            </select>
          </label>

          <label>
            Suggested doctor or facility
            <input
              value={destinationName}
              onChange={(e) => setDestinationName(e.target.value)}
            />
          </label>
        </>
      )}

      <button className="primary" disabled={busy}>
        {busy ? "Sending..." : "Send recommendation"}
      </button>

      {message && <p className="seedMessage">{message}</p>}
    </form>
  );
}
