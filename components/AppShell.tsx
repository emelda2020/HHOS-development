"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

const navigation = [
  { href: "/dashboard", label: "Overview", symbol: "⌂" },
  { href: "/dashboard/timeline", label: "Health Timeline", symbol: "⌁" },
  { href: "/dashboard/prevention", label: "Preventive Care", symbol: "✓" },
  { href: "/dashboard/care-team", label: "Care Team", symbol: "◎" },
  { href: "/dashboard/connections", label: "Data Connections", symbol: "↗" }
];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="appShell">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <Link href="/dashboard" className="brandLockup sidebarBrand">
          <span className="brandMark">H</span>
          <span>
            <strong>HHOS</strong>
            <small>Human Health OS</small>
          </span>
        </Link>

        <nav className="navList" aria-label="Main navigation">
          {navigation.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`navItem ${active ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                <span>{item.symbol}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="sidebarFooter">
          <div className="securityStatus">
            <i />
            <span>
              <strong>Demo environment</strong>
              <small>No real patient data</small>
            </span>
          </div>
          <button className="logoutButton" onClick={logout}>Sign out</button>
        </div>
      </aside>

      <section className="appMain">
        <header className="appHeader">
          <div>
            <button
              className="mobileMenu"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle navigation"
            >
              ☰
            </button>
            <p className="eyebrow">TUESDAY, 14 JULY</p>
            <h1>Good morning, Alex</h1>
          </div>

          <div className="headerProfile">
            <span className="syncIndicator"><i /> Simulated data</span>
            <span className="avatar">AP</span>
            <span>
              <strong>Alex Parker</strong>
              <small>Demo patient</small>
            </span>
          </div>
        </header>

        <main className="dashboardContent">{children}</main>
      </section>
    </div>
  );
}
