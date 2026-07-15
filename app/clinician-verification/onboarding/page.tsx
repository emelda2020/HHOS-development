import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ClinicianApplicationForm from "@/components/ClinicianApplicationForm";

export default async function ClinicianOnboardingPage() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  const email = String(claimsData?.claims?.email ?? "");

  if (!userId) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profile?.role !== "clinician") {
    await supabase.rpc("begin_clinician_onboarding");
  }

  const { data: clinicianProfile } = await supabase
    .from("clinician_profiles")
    .select("verification_status")
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

  const { data: application } = await supabase
    .from("clinician_applications")
    .select("*")
    .eq("clinician_user_id", userId)
    .maybeSingle();

  if (
    application?.application_status === "submitted" ||
    application?.application_status === "under_review"
  ) {
    redirect("/clinician-verification/pending");
  }

  return (
    <main className="content">
      <section className="dataPanel full">
        <p className="eyebrow">CLINICIAN VERIFICATION</p>
        <h1>Complete your professional application</h1>
        <p className="lead">
          Enter professional information exactly as it appears in your licensing
          records.
        </p>

        <ClinicianApplicationForm
          userId={userId}
          email={email}
          existingApplication={application}
        />
      </section>
    </main>
  );
}
