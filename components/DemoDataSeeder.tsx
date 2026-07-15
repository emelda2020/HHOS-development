"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DemoDataSeeder() {
  const supabase = createClient();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function createDemoData() {
    setBusy(true);
    setMessage("");

    const { data: claimsData } = await supabase.auth.getClaims();
    const userId = claimsData?.claims?.sub;

    if (!userId) {
      setMessage("Your session has expired. Please sign in again.");
      setBusy(false);
      return;
    }

    const now = new Date();
    const hourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const weekAhead = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const observationRows = [
      {
        user_id: userId,
        observation_type: "resting_heart_rate",
        value_numeric: 62,
        unit: "bpm",
        observed_at: hourAgo,
        source_type: "simulated_wearable",
        source_name: "HHOS Demo Watch",
        status: "final",
        metadata: { simulated: true }
      },
      {
        user_id: userId,
        observation_type: "blood_pressure",
        value_text: "118/76",
        unit: "mmHg",
        observed_at: hourAgo,
        source_type: "simulated_device",
        source_name: "HHOS Demo BP Monitor",
        status: "final",
        metadata: { simulated: true }
      },
      {
        user_id: userId,
        observation_type: "sleep_duration",
        value_numeric: 6.2,
        unit: "hours",
        observed_at: dayAgo,
        source_type: "simulated_wearable",
        source_name: "HHOS Demo Watch",
        status: "final",
        metadata: { simulated: true }
      }
    ];

    const deviceRows = [
      {
        user_id: userId,
        connection_name: "HHOS Demo Watch",
        connection_type: "wearable",
        provider_name: "HHOS Simulation",
        connection_status: "connected",
        last_synced_at: now.toISOString(),
        consent_granted_at: now.toISOString()
      },
      {
        user_id: userId,
        connection_name: "HHOS Demo BP Monitor",
        connection_type: "home_device",
        provider_name: "HHOS Simulation",
        connection_status: "connected",
        last_synced_at: now.toISOString(),
        consent_granted_at: now.toISOString()
      }
    ];

    const timelineRows = [
      {
        user_id: userId,
        event_type: "measurement",
        title: "Simulated blood pressure recorded",
        description: "118/76 mmHg from HHOS Demo BP Monitor",
        event_at: hourAgo,
        source_type: "simulated_device",
        source_name: "HHOS Demo BP Monitor"
      },
      {
        user_id: userId,
        event_type: "wearable_sync",
        title: "Simulated wearable synchronized",
        description: "Resting heart rate and sleep data received",
        event_at: now.toISOString(),
        source_type: "simulated_wearable",
        source_name: "HHOS Demo Watch"
      }
    ];

    const carePlanRows = [
      {
        user_id: userId,
        title: "Schedule preventive blood test",
        description: "Demonstration care-plan item only",
        item_status: "active",
        due_at: weekAhead,
        created_by_type: "system"
      },
      {
        user_id: userId,
        title: "Review sleep trend",
        description: "Discuss persistent changes with a clinician",
        item_status: "active",
        due_at: weekAhead,
        created_by_type: "system"
      }
    ];

    const results = await Promise.all([
      supabase.from("health_observations").insert(observationRows),
      supabase.from("device_connections").insert(deviceRows),
      supabase.from("timeline_events").insert(timelineRows),
      supabase.from("care_plan_items").insert(carePlanRows),
      supabase.from("audit_events").insert({
        user_id: userId,
        action: "demo_data_created",
        resource_type: "development_dataset",
        metadata: { simulated: true, created_by: "user" }
      })
    ]);

    const error = results.find((result) => result.error)?.error;

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Simulated data created successfully.");
      router.refresh();
    }

    setBusy(false);
  }

  return (
    <div className="seedBox">
      <div>
        <strong>No test records yet?</strong>
        <p>Create clearly labeled simulated data for your own development account.</p>
      </div>
      <button className="primary" onClick={createDemoData} disabled={busy}>
        {busy ? "Creating..." : "Create simulated data"}
      </button>
      {message ? <p className="seedMessage">{message}</p> : null}
    </div>
  );
}
