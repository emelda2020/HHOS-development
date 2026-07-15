"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user) {
      setMessage(error?.message ?? "Unable to sign in.");
      setBusy(false);
      return;
    }

    const requestedRole = data.user.user_metadata?.requested_role;

    if (requestedRole === "clinician") {
      const { error: onboardingError } = await supabase.rpc(
        "begin_clinician_onboarding"
      );

      if (onboardingError) {
        setMessage(onboardingError.message);
        setBusy(false);
        return;
      }
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profile?.role === "clinician") {
      const { data: clinicianProfile } = await supabase
        .from("clinician_profiles")
        .select("verification_status")
        .eq("user_id", data.user.id)
        .maybeSingle();

      const status = clinicianProfile?.verification_status;

      if (status === "verified") {
        router.push("/clinician");
      } else if (status === "pending" || status === "under_review") {
        router.push("/clinician-verification/pending");
      } else if (status === "suspended" || status === "expired") {
        router.push("/clinician-verification/restricted");
      } else {
        router.push("/clinician-verification/onboarding");
      }
    } else if (profile?.role === "administrator") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }

    router.refresh();
  }

  return (
    <form className="authForm" onSubmit={submit}>
      <label>
        Email
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
          autoComplete="current-password"
        />
      </label>

      <button className="primary" disabled={busy}>
        {busy ? "Signing in..." : "Sign in"}
      </button>

      {message ? <p className="seedMessage">{message}</p> : null}

      <div className="authLinks">
        <Link href="/forgot-password">Forgot password?</Link>
        <Link href="/signup">Create an account</Link>
      </div>
    </form>
  );
}
