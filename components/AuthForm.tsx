"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup" | "forgot" | "update";

export default function AuthForm({ mode }: { mode: Mode }) {
  const supabase = createClient();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(""); setStatus("");
    try {
      if (mode === "login") {
        const result = await supabase.auth.signInWithPassword({ email, password });
        if (result.error) throw result.error;
        const userId = result.data.user?.id;
        if (!userId) throw new Error("Unable to identify this account.");
        const { data: profile, error: profileError } = await supabase
          .from("profiles").select("role").eq("id", userId).single();
        if (profileError) throw profileError;
        router.push(profile?.role === "clinician" ? "/clinician" : "/dashboard");
        router.refresh();
      }

      if (mode === "signup") {
        if (password.length < 12) throw new Error("Use at least 12 characters.");
        if (password !== confirm) throw new Error("The passwords do not match.");
        const result = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/auth/confirm`
          }
        });
        if (result.error) throw result.error;
        setStatus("Account created. Check your email and open the confirmation link.");
      }

      if (mode === "forgot") {
        const result = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/confirm?next=/update-password`
        });
        if (result.error) throw result.error;
        setStatus("A password-reset email has been sent if the account exists.");
      }

      if (mode === "update") {
        if (password.length < 12) throw new Error("Use at least 12 characters.");
        if (password !== confirm) throw new Error("The passwords do not match.");
        const result = await supabase.auth.updateUser({ password });
        if (result.error) throw result.error;
        setStatus("Password updated.");
        setTimeout(() => router.push("/dashboard"), 700);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const title = {
    login: "Sign in",
    signup: "Create account",
    forgot: "Reset password",
    update: "Choose a new password"
  }[mode];

  return (
    <section className="authCard">
      <Link href="/" className="brand">HHOS</Link>
      <p className="eyebrow">SECURE ACCESS</p>
      <h1>{title}</h1>
      <form onSubmit={submit} className="form">
        {mode === "signup" && (
          <label>Full name<input value={fullName} onChange={(e)=>setFullName(e.target.value)} required /></label>
        )}
        {mode !== "update" && (
          <label>Email address<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /></label>
        )}
        {(mode === "login" || mode === "signup" || mode === "update") && (
          <label>Password<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required /></label>
        )}
        {(mode === "signup" || mode === "update") && (
          <label>Confirm password<input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required /></label>
        )}
        {error && <p className="error">{error}</p>}
        {status && <p className="success">{status}</p>}
        <button className="primary" disabled={busy}>{busy ? "Please wait..." : title}</button>
      </form>
      <div className="authLinks">
        {mode === "login" ? (
          <><Link href="/forgot-password">Forgot password?</Link><Link href="/signup">Create account</Link></>
        ) : (
          <Link href="/login">Back to sign in</Link>
        )}
      </div>
    </section>
  );
}
