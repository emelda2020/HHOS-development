import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DemoDataSeeder from "@/components/DemoDataSeeder";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/login");

  const [
    { data: observations },
    { data: devices },
    { data: timeline },
    { data: carePlan }
  ] = await Promise.all([
    supabase
      .from("health_observations")
      .select("*")
      .eq("user_id", userId)
      .order("observed_at", { ascending: false })
      .limit(4),
    supabase
      .from("device_connections")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(4),
    supabase
      .from("timeline_events")
      .select("*")
      .eq("user_id", userId)
      .order("event_at", { ascending: false })
      .limit(4),
    supabase
      .from("care_plan_items")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(4)
  ]);

  const hasData =
    (observations?.length ?? 0) +
      (devices?.length ?? 0) +
      (timeline?.length ?? 0) +
      (carePlan?.length ?? 0) >
    0;

  return (
    <>
      <section className="card dashboard">
        <p className="eyebrow">STAGE 3 PATIENT DATA</p>
        <h1>Your development health record</h1>
        <p className="lead">
          Every record below belongs only to your signed-in account and is protected by Row Level Security.
        </p>
        <p className="notice">
          Simulated development data only. This application is not providing diagnosis or medical advice.
        </p>
      </section>

      {!hasData ? <DemoDataSeeder /> : null}

      <section className="dataGrid">
        <article className="dataPanel">
          <div className="panelHeading">
            <h2>Recent observations</h2>
            <a href="/dashboard/observations">View all</a>
          </div>
          {(observations ?? []).map((item) => (
            <div className="recordRow" key={item.id}>
              <span>
                <strong>{item.observation_type.replaceAll("_", " ")}</strong>
                <small>{item.source_name ?? item.source_type}</small>
              </span>
              <b>{item.value_numeric ?? item.value_text} {item.unit}</b>
            </div>
          ))}
          {!observations?.length ? <p className="empty">No observations yet.</p> : null}
        </article>

        <article className="dataPanel">
          <div className="panelHeading">
            <h2>Connections</h2>
            <a href="/dashboard/connections">View all</a>
          </div>
          {(devices ?? []).map((item) => (
            <div className="recordRow" key={item.id}>
              <span>
                <strong>{item.connection_name}</strong>
                <small>{item.provider_name}</small>
              </span>
              <b>{item.connection_status}</b>
            </div>
          ))}
          {!devices?.length ? <p className="empty">No connections yet.</p> : null}
        </article>

        <article className="dataPanel">
          <div className="panelHeading">
            <h2>Timeline</h2>
            <a href="/dashboard/timeline">View all</a>
          </div>
          {(timeline ?? []).map((item) => (
            <div className="recordRow" key={item.id}>
              <span>
                <strong>{item.title}</strong>
                <small>{new Date(item.event_at).toLocaleString()}</small>
              </span>
            </div>
          ))}
          {!timeline?.length ? <p className="empty">No timeline events yet.</p> : null}
        </article>

        <article className="dataPanel">
          <div className="panelHeading">
            <h2>Care plan</h2>
            <a href="/dashboard/care-plan">View all</a>
          </div>
          {(carePlan ?? []).map((item) => (
            <div className="recordRow" key={item.id}>
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
              <b>{item.item_status}</b>
            </div>
          ))}
          {!carePlan?.length ? <p className="empty">No care-plan items yet.</p> : null}
        </article>
      </section>
    </>
  );
}
