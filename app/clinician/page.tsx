import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ClinicianCasesPage() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const clinicianId = claimsData?.claims?.sub;

  if (!clinicianId) redirect("/login");

  const { data: clinician } = await supabase
    .from("clinician_profiles")
    .select("primary_specialty, verification_status, accepting_reviews")
    .eq("user_id", clinicianId)
    .maybeSingle();

  if (!clinician || clinician.verification_status !== "verified") {
    return (
      <section className="dataPanel full">
        <p className="eyebrow">CLINICIAN ACCESS</p>
        <h1>Verification required</h1>
        <p className="lead">
          This account is not currently a verified physician account.
        </p>
        <p className="notice">
          Clinician verification and case assignment are administrative
          functions. Patients cannot promote themselves to physicians.
        </p>
      </section>
    );
  }

  const { data: assignments } = await supabase
    .from("review_assignments")
    .select(`
      id,
      assignment_status,
      assigned_at,
      review_requests (
        id,
        requested_specialty,
        urgency_level,
        review_status,
        patient_summary,
        medical_reports (
          id,
          title,
          report_type,
          source_name,
          upload_status
        )
      )
    `)
    .eq("clinician_user_id", clinicianId)
    .order("assigned_at", { ascending: false });

  return (
    <section className="dataPanel full">
      <p className="eyebrow">PHYSICIAN DASHBOARD</p>
      <h1>Assigned review cases</h1>
      <p className="lead">
        Only verified and assigned cases are visible.
      </p>

      <div className="reportList">
        {(assignments ?? []).map((assignment) => {
          const request = Array.isArray(assignment.review_requests)
            ? assignment.review_requests[0]
            : assignment.review_requests;

          const report = request
            ? Array.isArray(request.medical_reports)
              ? request.medical_reports[0]
              : request.medical_reports
            : null;

          return (
            <article className="reportCard" key={assignment.id}>
              <div>
                <span className="tag">
                  {request?.urgency_level ?? "routine"}
                </span>
                <h3>{report?.title ?? "Review request"}</h3>
                <p>
                  {request?.requested_specialty?.replaceAll("_", " ") ??
                    "General review"}
                </p>
                <small>
                  Assignment: {assignment.assignment_status} · Case:{" "}
                  {request?.review_status}
                </small>
              </div>
              {request?.id ? (
                <Link
                  className="outlineButton"
                  href={`/clinician/reviews/${request.id}`}
                >
                  Open case
                </Link>
              ) : null}
            </article>
          );
        })}

        {!assignments?.length ? (
          <p className="empty">No cases are currently assigned.</p>
        ) : null}
      </div>
    </section>
  );
}
