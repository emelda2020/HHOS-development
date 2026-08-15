import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import VerificationDecisionForm from "@/components/VerificationDecisionForm";

function display(value: string | null | undefined) {
  return value || "Not provided";
}

function date(value: string | null) {
  return value ? new Date(value).toLocaleDateString() : "Not provided";
}

export default async function ApplicationDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: application } = await supabase
    .from("clinician_applications")
    .select("*")
    .eq("id", id)
    .single();

  if (!application) notFound();

  const [profileResult, documentsResult, decisionsResult] = await Promise.all([
    supabase.from("clinician_profiles").select("*").eq("user_id", application.clinician_user_id).maybeSingle(),
    supabase.from("clinician_verification_documents").select("*").eq("clinician_application_id", application.id).order("created_at", { ascending: false }),
    supabase.from("clinician_verification_decisions").select("*").eq("clinician_application_id", application.id).order("decided_at", { ascending: false })
  ]);

  const clinicianProfile = profileResult.data;
  const documents = documentsResult.data ?? [];
  const decisions = decisionsResult.data ?? [];

  return (
    <div className="adminDashboard">
      <header className="adminPageHeader">
        <div>
          <p>CLINICIAN APPLICATION</p>
          <h1>{application.full_legal_name}</h1>
          <span>{application.professional_email}</span>
        </div>
        <span className={`adminStatus status-${application.application_status}`}>
          {application.application_status.replaceAll("_", " ")}
        </span>
      </header>

      <section className="adminReviewGrid">
        <div className="adminReviewMain">
          <section className="adminPanel">
            <div className="adminPanelHeader"><p>PROFESSIONAL IDENTITY</p><h2>Applicant information</h2></div>
            <div className="adminDetailGrid">
              <div><span>Full legal name</span><strong>{application.full_legal_name}</strong></div>
              <div><span>Professional email</span><strong>{application.professional_email}</strong></div>
              <div><span>Phone</span><strong>{display(application.phone_number)}</strong></div>
              <div><span>Organization</span><strong>{display(application.organization_name)}</strong></div>
              <div><span>Country</span><strong>{application.country_code}</strong></div>
              <div><span>Region</span><strong>{display(application.region_code)}</strong></div>
              <div><span>City</span><strong>{display(application.city)}</strong></div>
              <div><span>Primary specialty</span><strong>{application.primary_specialty.replaceAll("_", " ")}</strong></div>
            </div>
          </section>

          <section className="adminPanel">
            <div className="adminPanelHeader"><p>LICENSE REVIEW</p><h2>Professional registration</h2></div>
            <div className="adminDetailGrid">
              <div><span>Registration number</span><strong>{application.registration_number}</strong></div>
              <div><span>Licensing authority</span><strong>{application.licensing_authority}</strong></div>
              <div><span>Issue date</span><strong>{date(application.license_issue_date)}</strong></div>
              <div><span>Expiry date</span><strong>{date(application.license_expiry_date)}</strong></div>
              <div><span>Verification status</span><strong>{clinicianProfile?.verification_status?.replaceAll("_", " ") ?? "Not available"}</strong></div>
              <div><span>Submitted</span><strong>{date(application.submitted_at)}</strong></div>
            </div>
          </section>

          <section className="adminPanel">
            <div className="adminPanelHeader"><p>DOCUMENTS</p><h2>Verification files</h2></div>
            <div className="adminDocumentList">
              {documents.map((document) => (
                <div key={document.id}>
                  <span><strong>{document.document_type.replaceAll("_", " ")}</strong><small>{document.original_file_name}</small></span>
                  <span className={`adminStatus status-${document.document_status}`}>{document.document_status.replaceAll("_", " ")}</span>
                </div>
              ))}
              {!documents.length && <div className="adminEmptyState"><strong>No verification files uploaded</strong><span>Do not approve until required evidence is independently verified.</span></div>}
            </div>
          </section>

          <section className="adminPanel">
            <div className="adminPanelHeader"><p>AUDIT HISTORY</p><h2>Verification decisions</h2></div>
            <div className="adminDecisionHistory">
              {decisions.map((decision) => (
                <div key={decision.id}>
                  <span><strong>{decision.decision_type.replaceAll("_", " ")}</strong><small>{new Date(decision.decided_at).toLocaleString()}</small></span>
                  <p>{decision.decision_reason}</p>
                  <b>{display(decision.previous_verification_status)} → {decision.new_verification_status}</b>
                </div>
              ))}
              {!decisions.length && <p className="adminMuted">No decisions recorded yet.</p>}
            </div>
          </section>
        </div>

        <aside className="adminReviewSide">
          <VerificationDecisionForm
            clinicianUserId={application.clinician_user_id}
            applicationId={application.id}
            currentStatus={application.application_status}
          />
          <section className="adminWarningCard">
            <strong>Clinical safety requirement</strong>
            <p>Approval must not rely only on applicant-entered information. Confirm the license with the relevant authority.</p>
          </section>
        </aside>
      </section>
    </div>
  );
}
