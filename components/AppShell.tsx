"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="appShell">
      <aside className="sidebar">
        <Link href="/dashboard" className="brand light">HHOS</Link>
        <nav>
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/observations">Observations</Link>
          <Link href="/dashboard/reports">Medical Reports</Link>
          <Link href="/dashboard/reviews">Physician Reviews</Link>
          <Link href="/dashboard/timeline">Timeline</Link>
          <Link href="/dashboard/connections">Connections</Link>
          <Link href="/dashboard/care-plan">Care Plan</Link>
          <Link href="/profile">Profile & Consent</Link>
        </nav>
        <button onClick={logout}>Sign out</button>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
