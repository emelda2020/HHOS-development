import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CarePlanPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/login");

  const { data: items } = await supabase
    .from("care_plan_items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (
    <section className="dataPanel full">
      <p className="eyebrow">CARE PLAN</p>
      <h1>Current development priorities</h1>
      {(items ?? []).map((item) => (
        <article className="connectionCard" key={item.id}>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <small>Created by: {item.created_by_type}</small>
          </div>
          <span className="tag">{item.item_status}</span>
        </article>
      ))}
      {!items?.length ? <p className="empty">No care-plan items yet.</p> : null}
    </section>
  );
}
