import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PendingVerificationPage() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (!userId) redirect("/login");

  const { data: clinicianProfile } = await supabase
    .from("clinician_profiles")
    .select("verification_status, verification_notes")
    .eq("user_id", userId)
    .maybeSingle();

  if (clinicianProfile?.verification_status === "verified") {
    redirect("/clinician");
  }

  if (
    clinicianProfile?.verification_status === "suspended" ||
    clinicianProfile?.verification_status === "expired"
  ) {
    redirect("/clinician-verification/restricted");
  }

  if (
    !clinicianProfile ||
    clinicianProfile.verification_status === "draft" ||
    clinicianProfile.verification_status === "rejected"
  ) {
    redirect("/clinician-verification/onboarding");
  }

  return (
    <main className="authPage">
      <section className="authCard">
        <p className="eyebrow">VERIFICATION PENDING</p>
        <h1>Your application is awaiting review</h1>
        <p className="lead">
          Your clinician account exists, but patient information and clinical
          review tools remain locked until verification is complete.
        </p>

        <div className="statusCard">
          <strong>Current status</strong>
          <span>{clinicianProfile.verification_status.replaceAll("_", " ")}</span>
        </div>

        {clinicianProfile.verification_notes ? (
          <div className="notice">
            <strong>Verification note</strong>
            <p>{clinicianProfile.verification_notes}</p>
          </div>
        ) : null}

        <p>
          HHOS should verify your identity, professional license, specialty,
          jurisdiction, and license expiry before approval.
        </p>

        <Link href="/login">Return to sign in</Link>
      </section>
    </main>
  );
}
