import ClinicianShell from "@/components/ClinicianShell";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ClinicianLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", userId).single();

  if (profile?.role !== "clinician") redirect("/dashboard");
  return <ClinicianShell>{children}</ClinicianShell>;
}
