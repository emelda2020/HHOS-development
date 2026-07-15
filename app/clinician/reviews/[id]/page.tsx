import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import ReportFileButton from "@/components/ReportFileButton";
import ClinicalReviewForm from "@/components/ClinicalReviewForm";
import FollowUpActionForm from "@/components/FollowUpActionForm";

export default async function ReviewCasePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: claimsData } = await supabase.auth.getClaims();
  const clinicianId = claimsData?.claims?.sub;

  if (!clinicianId) redirect("/login");

  const { data: request } = await supabase
    .from("review_requests")
    .select(`
      id,
      patient_user_id,
      requested_specialty,
      urgency_level,
      review_status,
      patient_summary,
      medical_reports (
        id,
        title,
        report_type,
        source_name,
        report_date,
        storage_path,
        data_quality_status
      )
    `)
    .eq("id", id)
    .single();

  if (!request) notFound();

  const report = Array.isArray(request.medical_reports)
    ? request.medical_reports[0]
    : request.medical_reports;

  const [{ data: existingReview }, { data: followUps }] = await Promise.all([
    supabase
      .from("clinical_reviews")
      .select("*")
      .eq("review_request_id", id)
      .maybeSingle(),
    supabase
      .from("follow_up_actions")
      .select("*")
      .eq("review_request_id", id)
      .order("created_at", { ascending: false })
  ]);

  return (
    <>
      <section className="caseLayout">
        <article className="dataPanel">
          <p className="eyebrow">ASSIGNED CASE</p>
          <h1>{report?.title ?? "Report review"}</h1>
          <p className="lead">
            Specialty:{" "}
            {request.requested_specialty?.replaceAll("_", " ") ??
              "General medicine"}
          </p>

          <div className="caseFacts">
            <span>
              <strong>Source</strong>
              <small>{report?.source_name ?? "Patient upload"}</small>
            </span>
            <span>
              <strong>Report date</strong>
              <small>{report?.report_date ?? "Not provided"}</small>
            </span>
            <span>
              <strong>Urgency</strong>
              <small>{request.urgency_level}</small>
            </span>
            <span>
              <strong>Patient question</strong>
              <small>{request.patient_summary ?? "No question supplied"}</small>
            </span>
          </div>

          <ReportFileButton storagePath={report?.storage_path ?? null} />
        </article>

        <ClinicalReviewForm
          requestId={request.id}
          patientUserId={request.patient_user_id}
          existingReview={existingReview}
        />
      </section>

      <section className="caseLayout" style={{ marginTop: 18 }}>
        <article className="dataPanel">
          <p className="eyebrow">FOLLOW-UP TRACKING</p>
          <h2>Existing recommendations</h2>

          {(followUps ?? []).map((item) => (
            <div className="recordRow" key={item.id}>
              <span>
                <strong>{item.title}</strong>
                <small>{item.instructions}</small>
              </span>
              <b>{item.action_status}</b>
            </div>
          ))}

          {!followUps?.length && (
            <p className="empty">No follow-up actions have been created.</p>
          )}
        </article>

        <FollowUpActionForm
          reviewRequestId={request.id}
          patientUserId={request.patient_user_id}
        />
      </section>
    </>
  );
}
