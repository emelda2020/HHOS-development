import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ObservationForm from "@/components/ObservationForm";

export default async function ObservationsPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/login");

  const { data: observations } = await supabase
    .from("health_observations")
    .select("*")
    .eq("user_id", userId)
    .order("observed_at", { ascending: false });

  return (
    <section className="pageLayout">
      <div className="dataPanel">
        <p className="eyebrow">OBSERVATIONS</p>
        <h1>Health observations</h1>
        <p className="lead">Test measurements with source and status information.</p>
        <div className="tableList">
          {(observations ?? []).map((item) => (
            <div className="tableRow" key={item.id}>
              <span><strong>{item.observation_type.replaceAll("_", " ")}</strong><small>{new Date(item.observed_at).toLocaleString()}</small></span>
              <span>{item.value_numeric ?? item.value_text} {item.unit}</span>
              <span>{item.source_name ?? item.source_type}</span>
              <span>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
      <ObservationForm />
    </section>
  );
}
