"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function PatientRegisterPage() {
  const supabase = createClient();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!fullName.trim()) return setMessage("Please enter your full name.");
    if (password.length < 8) return setMessage("Password must be at least 8 characters.");
    if (password !== confirmPassword) return setMessage("Passwords do not match.");
    if (!accepted) return setMessage("Please confirm that you agree to the account terms.");

    setBusy(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          requested_role: "patient"
        }
      }
    });

    if (error) {
      setMessage(error.message);
      setBusy(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          email: email.trim(),
          full_name: fullName.trim(),
          role: "patient"
        },
        { onConflict: "id" }
      );
    }

    setBusy(false);

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setMessage("Account created. Check your email if confirmation is required, then sign in.");
    }
  }

  return (
    <>
      <main className="patientReg">
        <section className="patientRegBrand">
          <div className="patientRegInner">
            <div className="patientRegLogo">
              <div className="patientRegLogoMark"><span /></div>
              <div>
                <strong>HHOS</strong>
                <small>Human Health Operating System</small>
              </div>
            </div>

            <div className="patientRegCopy">
              <p>PERSONAL HEALTH ACCOUNT</p>
              <h1>Build a continuous understanding of your health.</h1>
              <span>
                Bring reports, observations, care plans, referrals, and connected
                health information into one secure longitudinal record.
              </span>
            </div>

            <div className="patientRegTrust">
              <span>Privacy by design</span>
              <span>Secure health records</span>
              <span>Clinician connected</span>
            </div>
          </div>
        </section>

        <section className="patientRegFormSide">
          <div className="patientRegFormWrap">
            <div className="patientRegIntro">
              <p>CREATE PATIENT ACCOUNT</p>
              <h2>Start your health record</h2>
              <span>Create a secure personal HHOS account.</span>
            </div>

            <form className="patientRegForm" onSubmit={submit}>
              <label>
                Full name
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </label>

              <label>
                Email
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>

              <div className="patientRegTwo">
                <label>
                  Password
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>

                <label>
                  Confirm password
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </label>
              </div>

              <label className="patientRegAgreement">
                <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
                <span>
                  I understand that HHOS supports health information management
                  and does not replace professional medical care.
                </span>
              </label>

              <button type="submit" disabled={busy}>
                {busy ? "Creating account..." : "Create patient account"}
              </button>

              {message ? <p className="patientRegMessage">{message}</p> : null}
            </form>

            <div className="patientRegLinks">
              <Link href="/signup">← Back to account types</Link>
              <span>Already registered? <Link href="/login">Sign in</Link></span>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        *{box-sizing:border-box}body{margin:0;background:#f7f9fc}
        .patientReg{min-height:100vh;display:grid;grid-template-columns:.95fr 1.05fr;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a}
        .patientRegBrand{min-height:100vh;color:#fff;background:radial-gradient(circle at 20% 15%,rgba(0,184,217,.18),transparent 28%),radial-gradient(circle at 85% 85%,rgba(0,166,118,.15),transparent 30%),#0f4c81}
        .patientRegInner{min-height:100vh;display:flex;flex-direction:column;padding:54px}
        .patientRegLogo{display:flex;align-items:center;gap:14px}.patientRegLogo strong{display:block;font-size:25px}.patientRegLogo small{display:block;margin-top:5px;color:rgba(255,255,255,.72);font-size:11px}
        .patientRegLogoMark{width:46px;height:46px;position:relative;display:grid;place-items:center;border-radius:14px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22)}
        .patientRegLogoMark:before,.patientRegLogoMark:after{content:"";position:absolute;background:#fff;border-radius:4px}.patientRegLogoMark:before{width:25px;height:8px}.patientRegLogoMark:after{width:8px;height:25px}
        .patientRegLogoMark span{width:12px;height:12px;position:relative;z-index:1;border-radius:50%;background:#00a676;border:3px solid #fff}
        .patientRegCopy{max-width:590px;margin:auto 0}.patientRegCopy p,.patientRegIntro p{margin:0 0 18px;color:#69e2c6;font-size:11px;font-weight:800;letter-spacing:.16em}
        .patientRegCopy h1{margin:0;color:#fff;font-size:clamp(42px,5vw,66px);line-height:1.05;letter-spacing:-.055em}.patientRegCopy span{display:block;max-width:540px;margin-top:22px;color:rgba(255,255,255,.76);font-size:16px;line-height:1.7}
        .patientRegTrust{display:flex;flex-wrap:wrap;gap:22px;color:rgba(255,255,255,.7);font-size:11px}.patientRegTrust span:before{content:"";width:7px;height:7px;display:inline-block;margin-right:8px;border-radius:50%;background:#00d6a0}
        .patientRegFormSide{min-height:100vh;display:grid;place-items:center;padding:48px;background:radial-gradient(circle at 100% 0%,rgba(0,184,217,.05),transparent 30%),#f7f9fc}
        .patientRegFormWrap{width:100%;max-width:520px}.patientRegIntro{margin-bottom:26px}.patientRegIntro p{margin-bottom:10px;color:#00a676}.patientRegIntro h2{margin:0;font-size:38px;letter-spacing:-.04em}.patientRegIntro span{display:block;margin-top:10px;color:#5f6368;font-size:14px}
        .patientRegForm{display:grid;gap:17px;padding:28px;border:1px solid #e3e9ef;border-radius:20px;background:#fff;box-shadow:0 18px 50px rgba(15,76,129,.09)}
        .patientRegForm label{color:#263746;font-size:12px;font-weight:700}.patientRegForm input[type=text],.patientRegForm input[type=email],.patientRegForm input[type=password]{width:100%;min-height:48px;margin-top:8px;padding:0 14px;border:1px solid #d7e0e8;border-radius:12px;outline:none;background:#fbfcfd;font-size:14px}
        .patientRegForm input:focus{border-color:#00b8d9;box-shadow:0 0 0 4px rgba(0,184,217,.1)}.patientRegTwo{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
        .patientRegAgreement{display:flex;align-items:flex-start;gap:10px;color:#5f6368!important;font-size:11px!important;font-weight:500!important;line-height:1.55}.patientRegAgreement input{margin-top:2px}
        .patientRegForm button{min-height:49px;border:0;border-radius:12px;color:#fff;background:#0f4c81;font-size:14px;font-weight:750;cursor:pointer}.patientRegForm button:hover{background:#0b3d68}.patientRegForm button:disabled{opacity:.65;cursor:wait}
        .patientRegMessage{margin:0;padding:11px 13px;border-radius:10px;color:#325247;background:#eef8f4;font-size:12px;line-height:1.5}
        .patientRegLinks{display:flex;justify-content:space-between;gap:14px;margin-top:20px;color:#5f6368;font-size:12px}.patientRegLinks a{color:#0f4c81;font-weight:800;text-decoration:none}
        @media(max-width:820px){.patientReg{display:block}.patientRegBrand{display:none}.patientRegFormSide{padding:30px 18px}}
        @media(max-width:520px){.patientRegTwo{grid-template-columns:1fr}.patientRegLinks{flex-direction:column}}
      `}</style>
    </>
  );
}
