"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="adminShell">
      <aside className="adminSidebar">
        <Link href="/admin" className="adminBrand">
          <span className="adminBrandMark">H</span>
          <span>
            <strong>HHOS Admin</strong>
            <small>Trust & Verification</small>
          </span>
        </Link>

        <nav>
          <Link href="/admin">Overview</Link>
          <Link href="/admin/clinicians">Clinician Applications</Link>
        </nav>

        <div className="adminSecurityCard">
          <strong>Restricted workspace</strong>
          <span>All verification decisions are audited.</span>
        </div>

        <button onClick={logout}>Sign out</button>
      </aside>

      <main className="adminContent">{children}</main>
    </div>
  );
}
