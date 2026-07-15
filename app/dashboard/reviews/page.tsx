import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PatientReviewsPage() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (!userId) redirect("/login");

  const { data: requests } = await supabase
    .from("review_requests")
    .select(`
      id,
      review_status,
      urgency_level,
      requested_specialty,
      created_at,
      medical_reports (
        title,
        report_type
      ),
      clinical_reviews (
        summary_for_patient,
        important_findings,
        limitations,
        recommended_next_steps,
        urgency_assessment,
        requires_in_person_evaluation,
        review_status,
        released_at
      )
    `)
    .eq("patient_user_id", userId)
    .order("created_at", { ascending: false });

  return (
    <section className="dataPanel full">
      <p className="eyebrow">PHYSICIAN REVIEWS</p>
      <h1>Your review requests</h1>

      <div className="reviewResults">
        {(requests ?? []).map((request) => {
          const report = Array.isArray(request.medical_reports)
            ? request.medical_reports[0]
            : request.medical_reports;

          const review = Array.isArray(request.clinical_reviews)
            ? request.clinical_reviews[0]
            : request.clinical_reviews;

          return (
            <article className="reviewResultCard" key={request.id}>
              <div className="panelHeading">
                <div>
                  <span className="tag">{request.review_status}</span>
                  <h3>{report?.title ?? "Report review"}</h3>
                  <small>
                    {request.requested_specialty?.replaceAll("_", " ")}
                  </small>
                </div>
                <strong>{request.urgency_level}</strong>
              </div>

              {review?.review_status === "released" ||
              review?.review_status === "amended" ? (
                <div className="releasedReview">
                  <h4>Physician summary</h4>
                  <p>{review.summary_for_patient}</p>

                  {review.important_findings ? (
                    <>
                      <h4>Important findings</h4>
                      <p>{review.important_findings}</p>
                    </>
                  ) : null}

                  {review.recommended_next_steps ? (
                    <>
                      <h4>Recommended next steps</h4>
                      <p>{review.recommended_next_steps}</p>
                    </>
                  ) : null}

                  {review.limitations ? (
                    <>
                      <h4>Limitations</h4>
                      <p>{review.limitations}</p>
                    </>
                  ) : null}

                  {review.requires_in_person_evaluation ? (
                    <p className="urgentNotice">
                      The reviewing physician recommends an in-person
                      evaluation.
                    </p>
                  ) : null}
                </div>
              ) : (
                <p className="empty">
                  A physician review has not been released yet.
                </p>
              )}
            </article>
          );
        })}

        {!requests?.length ? (
          <p className="empty">No review requests yet.</p>
        ) : null}
      </div>
    </section>
  );
}
