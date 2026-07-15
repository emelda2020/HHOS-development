import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function RestrictedClinicianPage() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (!userId) redirect("/login");

  const { data: clinicianProfile } = await supabase
    .from("clinician_profiles")
    .select("verification_status, verification_notes, suspension_reason")
    .eq("user_id", userId)
    .maybeSingle();

  if (clinicianProfile?.verification_status === "verified") {
    redirect("/clinician");
  }

  return (
    <main className="authPage">
      <section className="authCard">
        <p className="eyebrow">ACCESS RESTRICTED</p>
        <h1>Clinical access is unavailable</h1>
        <p className="lead">
          This account cannot access patient information or clinician tools.
        </p>

        <div className="statusCard">
          <strong>Status</strong>
          <span>
            {clinicianProfile?.verification_status?.replaceAll("_", " ") ??
              "not verified"}
          </span>
        </div>

        {clinicianProfile?.suspension_reason ? (
          <p className="urgentNotice">{clinicianProfile.suspension_reason}</p>
        ) : null}

        {clinicianProfile?.verification_notes ? (
          <p className="notice">{clinicianProfile.verification_notes}</p>
        ) : null}

        <Link href="/login">Return to sign in</Link>
      </section>
    </main>
  );
}
