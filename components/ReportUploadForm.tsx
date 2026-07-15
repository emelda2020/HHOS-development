"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const allowedTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp"
];

export default function ReportUploadForm() {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [reportType, setReportType] = useState("laboratory_report");
  const [reportDate, setReportDate] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [specialty, setSpecialty] = useState("general_medicine");
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!file) {
      setMessage("Choose a PDF or image before continuing.");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setMessage("Only PDF, JPEG, PNG, and WebP files are accepted.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("The file must be 10 MB or smaller.");
      return;
    }

    setBusy(true);

    const { data: claimsData } = await supabase.auth.getClaims();
    const userId = claimsData?.claims?.sub;

    if (!userId) {
      setMessage("Your session expired. Please sign in again.");
      setBusy(false);
      return;
    }

    const { data: report, error: reportError } = await supabase
      .from("medical_reports")
      .insert({
        patient_user_id: userId,
        report_type: reportType,
        title,
        report_date: reportDate || null,
        source_type: "patient_upload",
        source_name: sourceName || null,
        file_name: file.name,
        mime_type: file.type,
        file_size_bytes: file.size,
        upload_status: "pending",
        data_quality_status: "not_reviewed",
        patient_question: question || null,
        metadata: { simulated_or_test: true }
      })
      .select("id")
      .single();

    if (reportError || !report) {
      setMessage(reportError?.message ?? "Unable to create the report record.");
      setBusy(false);
      return;
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `${userId}/${report.id}/${safeName}`;

    const uploadResult = await supabase.storage
      .from("medical-reports")
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type
      });

    if (uploadResult.error) {
      await supabase
        .from("medical_reports")
        .update({ upload_status: "rejected" })
        .eq("id", report.id);

      setMessage(uploadResult.error.message);
      setBusy(false);
      return;
    }

    const updateResult = await supabase
      .from("medical_reports")
      .update({
        storage_path: storagePath,
        upload_status: "ready",
        updated_at: new Date().toISOString()
      })
      .eq("id", report.id);

    if (updateResult.error) {
      setMessage(updateResult.error.message);
      setBusy(false);
      return;
    }

    const reviewResult = await supabase
      .from("review_requests")
      .insert({
        patient_user_id: userId,
        report_id: report.id,
        request_source: "uploaded_report",
        requested_specialty: specialty,
        urgency_level: "routine",
        review_status: "submitted",
        patient_summary: question || null,
        submitted_at: new Date().toISOString()
      })
      .select("id")
      .single();

    if (reviewResult.error) {
      setMessage(reviewResult.error.message);
      setBusy(false);
      return;
    }

    await Promise.all([
      supabase.from("timeline_events").insert({
        user_id: userId,
        event_type: "report_uploaded",
        title: "Test medical report uploaded",
        description: title,
        event_at: new Date().toISOString(),
        source_type: "patient_upload",
        source_name: sourceName || "Patient upload",
        source_record_id: report.id
      }),
      supabase.from("audit_events").insert({
        user_id: userId,
        action: "medical_report_uploaded",
        resource_type: "medical_report",
        resource_id: report.id,
        metadata: {
          simulated_or_test: true,
          review_request_id: reviewResult.data?.id
        }
      })
    ]);

    setTitle("");
    setReportDate("");
    setSourceName("");
    setQuestion("");
    setFile(null);
    setMessage("Test report uploaded and submitted for physician review.");
    setBusy(false);
    router.refresh();
  }

  return (
    <form className="reportUploadForm" onSubmit={submit}>
      <p className="eyebrow">UPLOAD TEST REPORT</p>
      <h2>Submit a report for review</h2>
      <p className="formHelp">
        Use a fabricated or fully de-identified test document only.
      </p>

      <div className="formGrid">
        <label>
          Report title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: Demo blood test"
            required
          />
        </label>

        <label>
          Report type
          <select
            value={reportType}
            onChange={(event) => setReportType(event.target.value)}
          >
            <option value="laboratory_report">Laboratory report</option>
            <option value="imaging_report">Imaging report</option>
            <option value="pathology_report">Pathology report</option>
            <option value="discharge_summary">Discharge summary</option>
            <option value="specialist_report">Specialist report</option>
            <option value="other">Other report</option>
          </select>
        </label>

        <label>
          Report date
          <input
            type="date"
            value={reportDate}
            onChange={(event) => setReportDate(event.target.value)}
          />
        </label>

        <label>
          Laboratory or hospital
          <input
            value={sourceName}
            onChange={(event) => setSourceName(event.target.value)}
            placeholder="Example laboratory"
          />
        </label>

        <label>
          Requested specialty
          <select
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
          >
            <option value="general_medicine">General medicine</option>
            <option value="cardiology">Cardiology</option>
            <option value="endocrinology">Endocrinology</option>
            <option value="nephrology">Nephrology</option>
            <option value="hematology">Hematology</option>
            <option value="oncology">Oncology</option>
          </select>
        </label>

        <label>
          PDF or image
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            required
          />
        </label>
      </div>

      <label>
        Question for the reviewing physician
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="What would you like the physician to explain?"
          rows={4}
        />
      </label>

      <button className="primary" disabled={busy}>
        {busy ? "Uploading securely..." : "Upload and request review"}
      </button>

      {message ? <p className="seedMessage">{message}</p> : null}
    </form>
  );
}
