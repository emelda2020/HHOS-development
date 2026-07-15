"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ClinicianShell({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="appShell">
      <aside className="sidebar clinicianSidebar">
        <Link href="/clinician" className="brand light">
          HHOS Clinical
        </Link>
        <nav>
          <Link href="/clinician">Assigned cases</Link>
          <Link href="/dashboard">Patient dashboard</Link>
        </nav>
        <button onClick={logout}>Sign out</button>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
