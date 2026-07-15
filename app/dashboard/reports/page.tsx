import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ReportUploadForm from "@/components/ReportUploadForm";
import ReportFileButton from "@/components/ReportFileButton";

export default async function ReportsPage() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (!userId) redirect("/login");

  const { data: reports } = await supabase
    .from("medical_reports")
    .select(`
      id,
      title,
      report_type,
      report_date,
      source_name,
      storage_path,
      upload_status,
      data_quality_status,
      created_at,
      review_requests (
        id,
        review_status,
        urgency_level,
        requested_specialty,
        created_at
      )
    `)
    .eq("patient_user_id", userId)
    .order("created_at", { ascending: false });

  return (
    <section className="reportsLayout">
      <div className="dataPanel">
        <p className="eyebrow">MEDICAL REPORTS</p>
        <h1>Your uploaded reports</h1>
        <p className="lead">
          Private test documents and their physician-review status.
        </p>

        <div className="reportList">
          {(reports ?? []).map((report) => {
            const review = Array.isArray(report.review_requests)
              ? report.review_requests[0]
              : report.review_requests;

            return (
              <article className="reportCard" key={report.id}>
                <div>
                  <span className="tag">
                    {report.report_type.replaceAll("_", " ")}
                  </span>
                  <h3>{report.title}</h3>
                  <p>
                    {report.source_name ?? "Patient upload"} ·{" "}
                    {report.report_date ?? "Date not supplied"}
                  </p>
                  <small>
                    Upload: {report.upload_status} · Review:{" "}
                    {review?.review_status ?? "not submitted"}
                  </small>
                </div>
                <ReportFileButton storagePath={report.storage_path} />
              </article>
            );
          })}

          {!reports?.length ? (
            <p className="empty">No test reports uploaded yet.</p>
          ) : null}
        </div>
      </div>

      <ReportUploadForm />
    </section>
  );
}
