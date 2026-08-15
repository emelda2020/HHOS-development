"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import styles from "./PatientPortal.module.css";

export default function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className={styles.scope}>
      <div className="patientShell">
        <aside className="patientSidebar">
          <Link href="/dashboard" className="patientBrand">
            <span className="patientBrandMark">H</span>
            <span>
              <strong>HHOS</strong>
              <small>Personal Health Workspace</small>
            </span>
          </Link>

          <div className="patientPortalLabel">
            <span>PATIENT PORTAL</span>
            <strong>Your longitudinal health record</strong>
          </div>

          <nav className="patientNav">
            <Link href="/dashboard">Overview</Link>
            <Link href="/dashboard/observations">Observations</Link>
            <Link href="/dashboard/reports">Medical Reports</Link>
            <Link href="/dashboard/reviews">Physician Reviews</Link>
            <Link href="/dashboard/follow-up">Follow-up & Referrals</Link>
            <Link href="/dashboard/timeline">Timeline</Link>
            <Link href="/dashboard/connections">Connections</Link>
            <Link href="/dashboard/care-plan">Care Plan</Link>
            <Link href="/dashboard/profile">Profile & Consent</Link>
          </nav>

          <div className="patientTrustCard">
            <span className="patientTrustIcon">✓</span>
            <div>
              <strong>Private by design</strong>
              <small>
                Your health information is protected by role-based access and consent controls.
              </small>
            </div>
          </div>

          <button className="patientSignout" onClick={logout}>
            Sign out
          </button>
        </aside>

        <main className="patientContent">
          <div className="patientTopbar">
            <div>
              <p>HUMAN HEALTH OPERATING SYSTEM</p>
              <span>Understanding Health Before Disease Begins.</span>
            </div>

            <div className="patientSecureStatus">
              <i />
              Secure session
            </div>
          </div>

          <div className="patientPage">{children}</div>
        </main>
      </div>
    </div>
  );
}
