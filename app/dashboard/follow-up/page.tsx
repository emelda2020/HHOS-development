import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import FollowUpResponseForm from "@/components/FollowUpResponseForm";

export default async function FollowUpPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (!userId) redirect("/login");

  const { data: actions } = await supabase
    .from("follow_up_actions")
    .select(`
      *,
      referrals (
        referral_specialty,
        referral_reason,
        destination_name,
        referral_status
      ),
      follow_up_responses (
        response_type,
        response_message,
        appointment_date,
        destination_name,
        created_at
      )
    `)
    .eq("patient_user_id", userId)
    .order("created_at", { ascending: false });

  return (
    <section className="dataPanel full">
      <p className="eyebrow">FOLLOW-UP & REFERRALS</p>
      <h1>Your recommended next steps</h1>

      {(actions ?? []).map((action) => {
        const referral = Array.isArray(action.referrals)
          ? action.referrals[0]
          : action.referrals;

        return (
          <article className="reviewResultCard" key={action.id}>
            <span className="tag">{action.priority}</span>
            <h3>{action.title}</h3>
            <p>{action.instructions}</p>
            <small>Status: {action.action_status}</small>

            {referral && (
              <div className="releasedReview">
                <h4>Specialist referral</h4>
                <p>
                  {referral.referral_specialty.replaceAll("_", " ")}
                  {referral.destination_name
                    ? ` · ${referral.destination_name}`
                    : ""}
                </p>
              </div>
            )}

            <FollowUpResponseForm
              actionId={action.id}
              currentStatus={action.action_status}
            />
          </article>
        );
      })}

      {!actions?.length && (
        <p className="empty">No follow-up recommendations yet.</p>
      )}
    </section>
  );
}
