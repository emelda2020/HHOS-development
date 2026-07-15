import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PremiumPatientDashboard from "@/components/PremiumPatientDashboard";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (!userId) redirect("/login");

  const [
    profileResult,
    observationsResult,
    devicesResult,
    timelineResult,
    carePlanResult,
    reportsResult,
    followUpsResult,
    notificationsResult
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle(),

    supabase
      .from("health_observations")
      .select("*")
      .eq("patient_user_id", userId)
      .order("observed_at", { ascending: false })
      .limit(60),

    supabase
      .from("device_connections")
      .select("*")
      .eq("patient_user_id", userId)
      .order("created_at", { ascending: false }),

    supabase
      .from("timeline_events")
      .select("*")
      .eq("patient_user_id", userId)
      .order("event_time", { ascending: false })
      .limit(8),

    supabase
      .from("care_plan_items")
      .select("*")
      .eq("patient_user_id", userId)
      .order("created_at", { ascending: false })
      .limit(8),

    supabase
      .from("medical_reports")
      .select("*")
      .eq("patient_user_id", userId)
      .order("created_at", { ascending: false })
      .limit(6),

    supabase
      .from("follow_up_actions")
      .select("*")
      .eq("patient_user_id", userId)
      .order("created_at", { ascending: false })
      .limit(6),

    supabase
      .from("patient_notifications")
      .select("*")
      .eq("patient_user_id", userId)
      .order("created_at", { ascending: false })
      .limit(6)
  ]);

  return (
    <PremiumPatientDashboard
      profile={profileResult.data ?? null}
      observations={observationsResult.data ?? []}
      devices={devicesResult.data ?? []}
      timeline={timelineResult.data ?? []}
      carePlan={carePlanResult.data ?? []}
      reports={reportsResult.data ?? []}
      followUps={followUpsResult.data ?? []}
      notifications={notificationsResult.data ?? []}
    />
  );
}
