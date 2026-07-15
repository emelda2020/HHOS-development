"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ClinicalReviewForm({
  requestId,
  patientUserId,
  existingReview
}: {
  requestId: string;
  patientUserId: string;
  existingReview: {
    id: string;
    summary_for_patient: string;
    important_findings: string | null;
    limitations: string | null;
    recommended_next_steps: string | null;
    urgency_assessment: string;
    requires_in_person_evaluation: boolean;
    review_status: string;
  } | null;
}) {
  const supabase = createClient();
  const router = useRouter();

  const [summary, setSummary] = useState(
    existingReview?.summary_for_patient ?? ""
  );
  const [findings, setFindings] = useState(
    existingReview?.important_findings ?? ""
  );
  const [limitations, setLimitations] = useState(
    existingReview?.limitations ?? ""
  );
  const [nextSteps, setNextSteps] = useState(
    existingReview?.recommended_next_steps ?? ""
  );
  const [urgency, setUrgency] = useState(
    existingReview?.urgency_assessment ?? "routine"
  );
  const [inPerson, setInPerson] = useState(
    existingReview?.requires_in_person_evaluation ?? false
  );
  const [message, setMessage] = useState("");

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const { data: claimsData } = await supabase.auth.getClaims();
    const clinicianId = claimsData?.claims?.sub;

    if (!clinicianId) {
      setMessage("Your session expired.");
      return;
    }

    const payload = {
      review_request_id: requestId,
      clinician_user_id: clinicianId,
      summary_for_patient: summary,
      important_findings: findings || null,
      limitations: limitations || null,
      recommended_next_steps: nextSteps || null,
      urgency_assessment: urgency,
      requires_in_person_evaluation: inPerson,
      review_status: "released",
      submitted_at: new Date().toISOString(),
      released_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const reviewResult = existingReview
      ? await supabase
          .from("clinical_reviews")
          .update(payload)
          .eq("id", existingReview.id)
      : await supabase.from("clinical_reviews").insert(payload);

    if (reviewResult.error) {
      setMessage(reviewResult.error.message);
      return;
    }

    const title =
      urgency === "urgent" || urgency === "emergency"
        ? "Prompt follow-up recommended"
        : "Your physician review is ready";

    await Promise.all([
      supabase
        .from("review_requests")
        .update({
          review_status: "completed",
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq("id", requestId),
      supabase.from("patient_notifications").insert({
        patient_user_id: patientUserId,
        review_request_id: requestId,
        notification_type: "clinical_review_released",
        title,
        message:
          "A qualified physician has completed the review of your submitted report.",
        priority:
          urgency === "urgent" || urgency === "emergency"
            ? "urgent"
            : "normal"
      })
    ]);

    setMessage("Review released to the patient.");
    router.refresh();
  }

  return (
    <form className="clinicalReviewForm" onSubmit={save}>
      <h2>Physician interpretation</h2>

      <label>
        Patient-friendly summary
        <textarea
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          rows={5}
          required
        />
      </label>

      <label>
        Important findings
        <textarea
          value={findings}
          onChange={(event) => setFindings(event.target.value)}
          rows={4}
        />
      </label>

      <label>
        Limitations
        <textarea
          value={limitations}
          onChange={(event) => setLimitations(event.target.value)}
          rows={3}
        />
      </label>

      <label>
        Recommended next steps
        <textarea
          value={nextSteps}
          onChange={(event) => setNextSteps(event.target.value)}
          rows={4}
        />
      </label>

      <label>
        Urgency
        <select
          value={urgency}
          onChange={(event) => setUrgency(event.target.value)}
        >
          <option value="routine">Routine</option>
          <option value="priority">Priority</option>
          <option value="urgent">Urgent</option>
          <option value="emergency">Emergency</option>
        </select>
      </label>

      <label className="switchRow">
        <span>Recommend an in-person evaluation</span>
        <input
          type="checkbox"
          checked={inPerson}
          onChange={(event) => setInPerson(event.target.checked)}
        />
      </label>

      <button className="primary">Release review to patient</button>
      {message ? <p className="seedMessage">{message}</p> : null}
    </form>
  );
}
