import FollowUpActionForm from "@/components/FollowUpActionForm";

export default function FollowUpPanel({
  reviewRequestId,
  patientUserId,
  followUps
}: {
  reviewRequestId: string;
  patientUserId: string;
  followUps: Array<{
    id: string;
    title: string;
    instructions: string;
    action_status: string;
  }>;
}) {
  return (
    <section className="caseLayout stageFiveSection">
      <article className="dataPanel">
        <p className="eyebrow">FOLLOW-UP TRACKING</p>
        <h2>Existing recommendations</h2>

        {followUps.map((item) => (
          <div className="recordRow" key={item.id}>
            <span>
              <strong>{item.title}</strong>
              <small>{item.instructions}</small>
            </span>
            <b>{item.action_status}</b>
          </div>
        ))}

        {!followUps.length && <p className="empty">No follow-up actions yet.</p>}
      </article>

      <FollowUpActionForm
        reviewRequestId={reviewRequestId}
        patientUserId={patientUserId}
      />
    </section>
  );
}
