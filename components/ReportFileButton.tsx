"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ReportFileButton({
  storagePath
}: {
  storagePath: string | null;
}) {
  const supabase = createClient();
  const [busy, setBusy] = useState(false);

  async function openFile() {
    if (!storagePath) return;

    setBusy(true);
    const { data, error } = await supabase.storage
      .from("medical-reports")
      .createSignedUrl(storagePath, 60);

    setBusy(false);

    if (error || !data?.signedUrl) {
      window.alert(error?.message ?? "Unable to open the file.");
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      className="outlineButton"
      type="button"
      onClick={openFile}
      disabled={busy || !storagePath}
    >
      {busy ? "Opening..." : "Open report"}
    </button>
  );
}
