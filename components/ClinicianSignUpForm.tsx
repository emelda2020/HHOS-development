"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ClinicianSignUpForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("The passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setMessage("Use a password with at least 8 characters.");
      return;
    }

    setBusy(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          requested_role: "clinician"
        },
        emailRedirectTo: `${window.location.origin}/login`
      }
    });

    if (error) {
      setMessage(error.message);
      setBusy(false);
      return;
    }

    if (data.session) {
      const { error: onboardingError } = await supabase.rpc(
        "begin_clinician_onboarding"
      );

      if (onboardingError) {
        setMessage(onboardingError.message);
        setBusy(false);
        return;
      }

      router.push("/clinician-verification/onboarding");
      router.refresh();
      return;
    }

    setMessage(
      "Account created. Check your email, confirm the account, and then sign in."
    );
    setBusy(false);
  }

  return (
    <form className="authForm" onSubmit={submit}>
      <label>
        Professional email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="new-password"
        />
      </label>

      <label>
        Confirm password
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          autoComplete="new-password"
        />
      </label>

      <button className="primary" disabled={busy}>
        {busy ? "Creating account..." : "Create clinician account"}
      </button>

      {message ? <p className="seedMessage">{message}</p> : null}

      <p className="authFootnote">
        Creating an account does not verify clinical credentials or grant access
        to patient information.
      </p>

      <Link href="/login">Return to sign in</Link>
    </form>
  );
}
