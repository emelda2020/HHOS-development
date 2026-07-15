import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/ProfileForm";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/login");

  const [
    { data: profile },
    { data: consent },
    { data: history },
    { data: audit }
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).single(),
    supabase.from("consent_preferences").select("*").eq("user_id", userId).single(),
    supabase.from("consent_history").select("*").eq("user_id", userId).order("changed_at", { ascending: false }).limit(5),
    supabase.from("audit_events").select("*").eq("user_id", userId).order("event_time", { ascending: false }).limit(5)
  ]);

  return (
    <>
      <ProfileForm profile={profile} consent={consent} />
      <section className="dataGrid">
        <article className="dataPanel">
          <h2>Recent consent history</h2>
          {(history ?? []).map((item) => (
            <div className="recordRow" key={item.id}>
              <span><strong>{item.consent_version}</strong><small>{new Date(item.changed_at).toLocaleString()}</small></span>
            </div>
          ))}
          {!history?.length ? <p className="empty">No consent changes recorded yet.</p> : null}
        </article>
        <article className="dataPanel">
          <h2>Recent audit activity</h2>
          {(audit ?? []).map((item) => (
            <div className="recordRow" key={item.id}>
              <span><strong>{item.action.replaceAll("_", " ")}</strong><small>{new Date(item.event_time).toLocaleString()}</small></span>
            </div>
          ))}
          {!audit?.length ? <p className="empty">No audit events recorded yet.</p> : null}
        </article>
      </section>
    </>
  );
}
