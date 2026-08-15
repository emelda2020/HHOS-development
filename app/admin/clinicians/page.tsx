import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

function date(value: string | null) {
  return value ? new Date(value).toLocaleDateString() : "Not submitted";
}

export default async function ClinicianApplicationsPage() {
  const supabase = await createClient();

  const { data: applications, error } = await supabase
    .from("clinician_applications")
    .select("*")
    .order("submitted_at", { ascending: false, nullsFirst: false });

  return (
    <div className="adminDashboard">
      <header className="adminPageHeader">
        <div>
          <p>CLINICIAN VERIFICATION</p>
          <h1>Applications</h1>
          <span>Review identity, license, specialty, jurisdiction, and expiry.</span>
        </div>
      </header>

      <section className="adminPanel">
        {error ? <p className="adminError">{error.message}</p> : (
          <div className="adminApplicationList">
            {(applications ?? []).map((a) => (
              <Link href={`/admin/clinicians/${a.id}`} className="adminApplicationRow" key={a.id}>
                <div className="adminApplicantIdentity">
                  <span className="adminApplicantAvatar">{a.full_legal_name.slice(0, 1).toUpperCase()}</span>
                  <span><strong>{a.full_legal_name}</strong><small>{a.professional_email}</small></span>
                </div>
                <div><strong>{a.primary_specialty.replaceAll("_", " ")}</strong><small>{a.organization_name ?? "No organization"}</small></div>
                <div><strong>{a.country_code}{a.region_code ? ` · ${a.region_code}` : ""}</strong><small>{a.licensing_authority}</small></div>
                <div><span className={`adminStatus status-${a.application_status}`}>{a.application_status.replaceAll("_", " ")}</span><small>{date(a.submitted_at)}</small></div>
                <b>→</b>
              </Link>
            ))}
            {!applications?.length && <div className="adminEmptyState"><strong>No clinician applications</strong><span>New submissions will appear here.</span></div>}
          </div>
        )}
      </section>
    </div>
  );
}
