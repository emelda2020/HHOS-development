import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/login");

  return (
    <section className="card dashboard">
      <p className="eyebrow">ACCOUNT VERIFIED</p>
      <h1>Welcome to HHOS</h1>
      <p className="lead">
        Your real Supabase account is now protecting this page.
      </p>

      <div className="grid">
        <article><strong>Profile</strong><span>Connected to your account</span></article>
        <article><strong>Consent</strong><span>Private to your account</span></article>
        <article><strong>Security</strong><span>Protected session active</span></article>
      </div>

      <p className="notice">
        This remains a development system. Do not add real medical information.
      </p>
    </section>
  );
}
