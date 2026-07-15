import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function TimelinePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/login");

  const { data: events } = await supabase
    .from("timeline_events")
    .select("*")
    .eq("user_id", userId)
    .order("event_at", { ascending: false });

  return (
    <section className="dataPanel full">
      <p className="eyebrow">LONGITUDINAL RECORD</p>
      <h1>Health timeline</h1>
      {(events ?? []).map((event) => (
        <article className="timelineCard" key={event.id}>
          <time>{new Date(event.event_at).toLocaleString()}</time>
          <div>
            <span className="tag">{event.event_type}</span>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <small>Source: {event.source_name ?? event.source_type}</small>
          </div>
        </article>
      ))}
      {!events?.length ? <p className="empty">No timeline events yet.</p> : null}
    </section>
  );
}
