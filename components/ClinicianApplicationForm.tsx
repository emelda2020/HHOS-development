"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type ExistingApplication = {
  id: string;
  full_legal_name: string;
  professional_email: string;
  phone_number: string | null;
  country_code: string;
  region_code: string | null;
  city: string | null;
  primary_specialty: string;
  organization_name: string | null;
  registration_number: string;
  licensing_authority: string;
  license_issue_date: string | null;
  license_expiry_date: string | null;
  application_status: string;
  applicant_declaration_accepted: boolean;
} | null;

export default function ClinicianApplicationForm({
  userId,
  email,
  existingApplication
}: {
  userId: string;
  email: string;
  existingApplication: ExistingApplication;
}) {
  const supabase = createClient();
  const router = useRouter();

  const [fullName, setFullName] = useState(
    existingApplication?.full_legal_name ?? ""
  );
  const [professionalEmail, setProfessionalEmail] = useState(
    existingApplication?.professional_email ?? email
  );
  const [phoneNumber, setPhoneNumber] = useState(
    existingApplication?.phone_number ?? ""
  );
  const [countryCode, setCountryCode] = useState(
    existingApplication?.country_code ?? ""
  );
  const [regionCode, setRegionCode] = useState(
    existingApplication?.region_code ?? ""
  );
  const [city, setCity] = useState(existingApplication?.city ?? "");
  const [specialty, setSpecialty] = useState(
    existingApplication?.primary_specialty ?? "general_medicine"
  );
  const [organization, setOrganization] = useState(
    existingApplication?.organization_name ?? ""
  );
  const [registrationNumber, setRegistrationNumber] = useState(
    existingApplication?.registration_number ?? ""
  );
  const [licensingAuthority, setLicensingAuthority] = useState(
    existingApplication?.licensing_authority ?? ""
  );
  const [issueDate, setIssueDate] = useState(
    existingApplication?.license_issue_date ?? ""
  );
  const [expiryDate, setExpiryDate] = useState(
    existingApplication?.license_expiry_date ?? ""
  );
  const [declarationAccepted, setDeclarationAccepted] = useState(
    existingApplication?.applicant_declaration_accepted ?? false
  );
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    if (!declarationAccepted) {
      setMessage("You must accept the applicant declaration.");
      setBusy(false);
      return;
    }

    const payload = {
      clinician_user_id: userId,
      full_legal_name: fullName,
      professional_email: professionalEmail,
      phone_number: phoneNumber || null,
      country_code: countryCode.toUpperCase(),
      region_code: regionCode || null,
      city: city || null,
      primary_specialty: specialty,
      organization_name: organization || null,
      registration_number: registrationNumber,
      licensing_authority: licensingAuthority,
      license_issue_date: issueDate || null,
      license_expiry_date: expiryDate || null,
      application_status: "submitted",
      applicant_declaration_accepted: true,
      applicant_declaration_accepted_at: new Date().toISOString(),
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    let applicationError;

    if (existingApplication?.id) {
      const result = await supabase
        .from("clinician_applications")
        .update(payload)
        .eq("id", existingApplication.id);

      applicationError = result.error;
    } else {
      const result = await supabase
        .from("clinician_applications")
        .insert(payload);

      applicationError = result.error;
    }

    if (applicationError) {
      setMessage(applicationError.message);
      setBusy(false);
      return;
    }

    const { error: profileError } = await supabase
      .from("clinician_profiles")
      .update({
        full_legal_name: fullName,
        professional_email: professionalEmail,
        country_code: countryCode.toUpperCase(),
        region_code: regionCode || null,
        organization_name: organization || null,
        primary_specialty: specialty,
        application_submitted_at: new Date().toISOString(),
        verification_status: "pending"
      })
      .eq("user_id", userId);

    if (profileError) {
      setMessage(profileError.message);
      setBusy(false);
      return;
    }

    router.push("/clinician-verification/pending");
    router.refresh();
  }

  return (
    <form className="clinicalReviewForm" onSubmit={submit}>
      <h2>Professional application</h2>

      <label>
        Full legal name
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </label>

      <label>
        Professional email
        <input
          type="email"
          value={professionalEmail}
          onChange={(e) => setProfessionalEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Phone number
        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>

      <div className="formGrid">
        <label>
          Country code
          <input
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            placeholder="NG, US, GB"
            maxLength={2}
            required
          />
        </label>

        <label>
          State, province, or region
          <input value={regionCode} onChange={(e) => setRegionCode(e.target.value)} />
        </label>
      </div>

      <label>
        City
        <input value={city} onChange={(e) => setCity(e.target.value)} />
      </label>

      <label>
        Primary specialty
        <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
          <option value="general_medicine">General medicine</option>
          <option value="family_medicine">Family medicine</option>
          <option value="internal_medicine">Internal medicine</option>
          <option value="cardiology">Cardiology</option>
          <option value="endocrinology">Endocrinology</option>
          <option value="nephrology">Nephrology</option>
          <option value="hematology">Hematology</option>
          <option value="oncology">Oncology</option>
          <option value="neurology">Neurology</option>
          <option value="pediatrics">Pediatrics</option>
          <option value="obstetrics_gynecology">Obstetrics and gynecology</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        Hospital, clinic, or organization
        <input value={organization} onChange={(e) => setOrganization(e.target.value)} />
      </label>

      <label>
        Medical registration or license number
        <input
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          required
        />
      </label>

      <label>
        Licensing authority
        <input
          value={licensingAuthority}
          onChange={(e) => setLicensingAuthority(e.target.value)}
          required
        />
      </label>

      <div className="formGrid">
        <label>
          License issue date
          <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
        </label>

        <label>
          License expiry date
          <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </label>
      </div>

      <label className="checkboxLabel">
        <input
          type="checkbox"
          checked={declarationAccepted}
          onChange={(e) => setDeclarationAccepted(e.target.checked)}
        />
        <span>
          I confirm that the information supplied is accurate and that I am
          authorized to practise in the jurisdiction stated above.
        </span>
      </label>

      <button className="primary" disabled={busy}>
        {busy ? "Submitting..." : "Submit application"}
      </button>

      {message ? <p className="seedMessage">{message}</p> : null}

      <p className="notice">
        Submission does not grant access to patient information. HHOS must verify
        identity, license status, specialty, jurisdiction, and expiry.
      </p>
    </form>
  );
}
