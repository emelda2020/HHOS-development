"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function ClinicianShell({
  children
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="hhosClinicianShell">
      <aside className="hhosClinicianSidebar">
        <Link href="/clinician" className="hhosClinicianBrand">
          <span className="hhosClinicianBrandMark">H</span>

          <span>
            <strong>HHOS Clinical</strong>
            <small>Professional Workspace</small>
          </span>
        </Link>

        <div className="hhosClinicianRole">
          <span>CLINICIAN PORTAL</span>
          <strong>Verified Care Workspace</strong>
        </div>

        <nav className="hhosClinicianNav">
          <Link href="/clinician">
            <span>Assigned cases</span>
          </Link>

          <Link href="/dashboard">
            <span>Patient dashboard</span>
          </Link>
        </nav>

        <div className="hhosClinicianTrustCard">
          <span className="hhosClinicianTrustIcon">✓</span>
          <div>
            <strong>Clinically governed</strong>
            <small>
              Access is controlled by verification, assignment, and patient permissions.
            </small>
          </div>
        </div>

        <button className="hhosClinicianSignout" onClick={logout}>
          Sign out
        </button>
      </aside>

      <main className="hhosClinicianContent">
        <div className="hhosClinicianTopbar">
          <div>
            <p>HHOS CLINICAL WORKSPACE</p>
            <span>Human-reviewed care coordination</span>
          </div>

          <div className="hhosClinicianSecureStatus">
            <i />
            Secure session
          </div>
        </div>

        <div className="hhosClinicianPage">{children}</div>
      </main>
    </div>
  );
}
