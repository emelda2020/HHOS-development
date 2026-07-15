"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ObservationForm() {
  const supabase = createClient();
  const router = useRouter();
  const [type, setType] = useState("resting_heart_rate");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("bpm");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("");

    const { data } = await supabase.auth.getClaims();
    const userId = data?.claims?.sub;
    if (!userId) return;

    const numeric = Number(value);
    const result = await supabase.from("health_observations").insert({
      user_id: userId,
      observation_type: type,
      value_numeric: Number.isFinite(numeric) ? numeric : null,
      value_text: Number.isFinite(numeric) ? null : value,
      unit,
      observed_at: new Date().toISOString(),
      source_type: "manual_test_entry",
      source_name: "HHOS Development Form",
      status: "preliminary",
      metadata: { simulated: true }
    });

    await supabase.from("audit_events").insert({
      user_id: userId,
      action: "observation_created",
      resource_type: "health_observation",
      metadata: { simulated: true, observation_type: type }
    });

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setValue("");
      setMessage("Test observation saved.");
      router.refresh();
    }
  }

  return (
    <form className="compactForm" onSubmit={submit}>
      <h3>Add a test observation</h3>
      <p>Use simulated information only.</p>
      <label>
        Observation
        <select value={type} onChange={(e) => {
          setType(e.target.value);
          setUnit(e.target.value === "sleep_duration" ? "hours" : e.target.value === "steps" ? "steps" : "bpm");
        }}>
          <option value="resting_heart_rate">Resting heart rate</option>
          <option value="sleep_duration">Sleep duration</option>
          <option value="steps">Steps</option>
        </select>
      </label>
      <label>
        Test value
        <input value={value} onChange={(e) => setValue(e.target.value)} required />
      </label>
      <label>
        Unit
        <input value={unit} onChange={(e) => setUnit(e.target.value)} required />
      </label>
      <button className="primary">Save test observation</button>
      {message ? <p className="seedMessage">{message}</p> : null}
    </form>
  );
}
