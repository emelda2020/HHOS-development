import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ConnectionsPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/login");

  const { data: connections } = await supabase
    .from("device_connections")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (
    <section className="dataPanel full">
      <p className="eyebrow">DATA CONNECTIONS</p>
      <h1>Devices and providers</h1>
      {(connections ?? []).map((connection) => (
        <article className="connectionCard" key={connection.id}>
          <div>
            <h3>{connection.connection_name}</h3>
            <p>{connection.connection_type} · {connection.provider_name}</p>
          </div>
          <span className="tag">{connection.connection_status}</span>
        </article>
      ))}
      {!connections?.length ? <p className="empty">No connections yet.</p> : null}
    </section>
  );
}
