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
        recommended_timeframe,
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
      <p className="lead">
        Review each physician recommendation and record what action you have taken.
      </p>

      <div className="followUpList">
        {(actions ?? []).map((action) => {
          const referral = Array.isArray(action.referrals)
            ? action.referrals[0]
            : action.referrals;
          const responses = Array.isArray(action.follow_up_responses)
            ? action.follow_up_responses
            : [];

          return (
            <article className={`followUpCard priority-${action.priority}`} key={action.id}>
              <div className="panelHeading">
                <div>
                  <span className="tag">{action.priority}</span>
                  <h3>{action.title}</h3>
                </div>
                <strong>{action.action_status}</strong>
              </div>

              <p>{action.instructions}</p>

              {action.due_at && (
                <small>Recommended by: {new Date(action.due_at).toLocaleString()}</small>
              )}

              {referral && (
                <div className="referralBox">
                  <strong>Specialty: {referral.referral_specialty.replaceAll("_", " ")}</strong>
                  <span>{referral.destination_name ?? "Destination not yet selected"}</span>
                  <small>{referral.referral_reason}</small>
                </div>
              )}

              {responses.length > 0 && (
                <div className="responseHistory">
                  <strong>Your latest response</strong>
                  <span>{responses[responses.length - 1].response_type.replaceAll("_", " ")}</span>
                </div>
              )}

              <FollowUpResponseForm actionId={action.id} currentStatus={action.action_status} />

              {action.priority === "emergency" && (
                <p className="urgentNotice">
                  Do not wait for an online response during an emergency. Contact
                  your local emergency service immediately.
                </p>
              )}
            </article>
          );
        })}

        {!actions?.length && <p className="empty">No follow-up recommendations yet.</p>}
      </div>
    </section>
  );
}
