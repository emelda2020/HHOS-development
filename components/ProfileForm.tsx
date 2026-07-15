"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfileForm({
  profile,
  consent
}: {
  profile: any;
  consent: any;
}) {
  const supabase = createClient();
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [country, setCountry] = useState(profile?.country ?? "");
  const [wearable, setWearable] = useState(consent?.wearable_data_enabled ?? false);
  const [laboratory, setLaboratory] = useState(consent?.laboratory_data_enabled ?? false);
  const [ehr, setEhr] = useState(consent?.ehr_data_enabled ?? false);
  const [careTeam, setCareTeam] = useState(consent?.care_team_sharing_enabled ?? false);
  const [research, setResearch] = useState(consent?.research_data_enabled ?? false);
  const [message, setMessage] = useState("");

  async function save(event: FormEvent) {
    event.preventDefault();
    const { data } = await supabase.auth.getClaims();
    const userId = data?.claims?.sub;
    if (!userId) return;

    const profileResult = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        country,
        updated_at: new Date().toISOString()
      })
      .eq("id", userId);

    const consentResult = await supabase
      .from("consent_preferences")
      .update({
        wearable_data_enabled: wearable,
        laboratory_data_enabled: laboratory,
        ehr_data_enabled: ehr,
        care_team_sharing_enabled: careTeam,
        research_data_enabled: research,
        updated_at: new Date().toISOString()
      })
      .eq("user_id", userId);

    if (profileResult.error || consentResult.error) {
      setMessage("Unable to save. Please try again.");
    } else {
      setMessage("Saved successfully.");
    }
  }

  return (
    <form className="card profileForm" onSubmit={save}>
      <p className="eyebrow">PROFILE & CONSENT</p>
      <h1>Your information</h1>

      <label>
        Email
        <input value={profile?.email ?? ""} disabled />
      </label>

      <label>
        Full name
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </label>

      <label>
        Country
        <input value={country} onChange={(e) => setCountry(e.target.value)} />
      </label>

      <h2>Privacy choices</h2>

      {[
        ["Wearable data", wearable, setWearable],
        ["Laboratory data", laboratory, setLaboratory],
        ["Electronic health records", ehr, setEhr],
        ["Care-team sharing", careTeam, setCareTeam],
        ["Research use", research, setResearch]
      ].map(([label, value, setter]: any) => (
        <label className="switchRow" key={label}>
          <span>{label}</span>
          <input type="checkbox" checked={value} onChange={(e) => setter(e.target.checked)} />
        </label>
      ))}

      {message && <p className="success">{message}</p>}
      <button className="primary">Save changes</button>
    </form>
  );
}
