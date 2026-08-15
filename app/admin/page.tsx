import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [submitted, reviewing, approved, rejected] = await Promise.all([
    supabase.from("clinician_applications").select("id", { count: "exact", head: true }).eq("application_status", "submitted"),
    supabase.from("clinician_applications").select("id", { count: "exact", head: true }).eq("application_status", "under_review"),
    supabase.from("clinician_applications").select("id", { count: "exact", head: true }).eq("application_status", "approved"),
    supabase.from("clinician_applications").select("id", { count: "exact", head: true }).eq("application_status", "rejected")
  ]);

  return (
    <div className="adminDashboard">
      <header className="adminPageHeader">
        <div>
          <p>CLINICAL TRUST OPERATIONS</p>
          <h1>Administrator dashboard</h1>
          <span>Review professional credentials before granting access to patient information.</span>
        </div>
        <Link className="adminPrimaryButton" href="/admin/clinicians">
          Review applications
        </Link>
      </header>

      <section className="adminStatGrid">
        <article><span>Awaiting review</span><strong>{submitted.count ?? 0}</strong><small>New applications</small></article>
        <article><span>Under review</span><strong>{reviewing.count ?? 0}</strong><small>Being assessed</small></article>
        <article><span>Approved</span><strong>{approved.count ?? 0}</strong><small>Verified clinicians</small></article>
        <article><span>Rejected</span><strong>{rejected.count ?? 0}</strong><small>Not approved</small></article>
      </section>

      <section className="adminPanel">
        <div className="adminPanelHeader">
          <p>VERIFICATION STANDARD</p>
          <h2>Every approval must be evidence based</h2>
        </div>

        <div className="adminChecklist">
          <div><b>01</b><span><strong>Identity</strong><small>Confirm legal identity.</small></span></div>
          <div><b>02</b><span><strong>License</strong><small>Verify registration and authority.</small></span></div>
          <div><b>03</b><span><strong>Jurisdiction</strong><small>Confirm where practice is permitted.</small></span></div>
          <div><b>04</b><span><strong>Specialty & expiry</strong><small>Check specialty and validity dates.</small></span></div>
        </div>
      </section>
    </div>
  );
}
