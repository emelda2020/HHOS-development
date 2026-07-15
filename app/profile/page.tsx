import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/ProfileForm";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/login");

  const [{ data: profile }, { data: consent }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).single(),
    supabase.from("consent_preferences").select("*").eq("user_id", userId).single()
  ]);

  return <ProfileForm profile={profile} consent={consent} />;
}
