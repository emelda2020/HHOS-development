"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "login" | "forgot" | "update";

export default function AuthForm({
  mode = "login"
}: {
  mode?: AuthMode;
}) {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user) {
      setMessage(error?.message ?? "Unable to sign in.");
      return;
    }

    const requestedRole = data.user.user_metadata?.requested_role;

    if (requestedRole === "clinician") {
      const { error: onboardingError } = await supabase.rpc(
        "begin_clinician_onboarding"
      );

      if (onboardingError) {
        setMessage(onboardingError.message);
        return;
      }
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      setMessage(profileError.message);
      return;
    }

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

  async function handleForgotPassword() {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Check your email for the password-reset link.");
  }

  async function handleUpdatePassword() {
    if (password.length < 8) {
      setMessage("Use a password with at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("The passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password updated successfully.");
    router.push("/login");
    router.refresh();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      if (mode === "forgot") {
        await handleForgotPassword();
      } else if (mode === "update") {
        await handleUpdatePassword();
      } else {
        await handleLogin();
      }
    } finally {
      setBusy(false);
    }
  }

  if (mode === "forgot") {
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

        <button className="primary" disabled={busy}>
          {busy ? "Sending..." : "Send password-reset link"}
        </button>

        {message ? <p className="seedMessage">{message}</p> : null}

        <Link href="/login">Return to sign in</Link>
      </form>
    );
  }

  if (mode === "update") {
    return (
      <form className="authForm" onSubmit={submit}>
        <label>
          New password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="new-password"
          />
        </label>

        <label>
          Confirm new password
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            autoComplete="new-password"
          />
        </label>

        <button className="primary" disabled={busy}>
          {busy ? "Updating..." : "Update password"}
        </button>

        {message ? <p className="seedMessage">{message}</p> : null}
      </form>
    );
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
