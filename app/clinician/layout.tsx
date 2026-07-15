import ClinicianShell from "@/components/ClinicianShell";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ClinicianLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (!userId) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profile?.role !== "clinician") redirect("/dashboard");

  const { data: clinicianProfile } = await supabase
    .from("clinician_profiles")
    .select("verification_status")
    .eq("user_id", userId)
    .maybeSingle();

  const status = clinicianProfile?.verification_status;

  if (status === "pending" || status === "under_review") {
    redirect("/clinician-verification/pending");
  }

  if (status === "suspended" || status === "expired") {
    redirect("/clinician-verification/restricted");
  }

  if (status !== "verified") {
    redirect("/clinician-verification/onboarding");
  }

  return <ClinicianShell>{children}</ClinicianShell>;
}
