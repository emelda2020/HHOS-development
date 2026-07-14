import Link from "next/link";

export default function HomePage() {
  return (
    <main className="landing">
      <section className="landingCard">
        <div className="brandLockup">
          <span className="brandMark">H</span>
          <span>
            <strong>HHOS</strong>
            <small>Human Health Operating System</small>
          </span>
        </div>

        <p className="eyebrow">DEVELOPMENT ENVIRONMENT</p>
        <h1>Understanding health before disease begins.</h1>
        <p className="lead">
          This application is an early software foundation for a secure,
          preventive, and clinically responsible health ecosystem.
        </p>

        <div className="notice">
          <strong>Demonstration only</strong>
          <p>
            All information in this version is simulated. It must not be used
            for diagnosis, treatment, emergencies, or real patient care.
          </p>
        </div>

        <Link className="primaryAction" href="/login">
          Open development application
        </Link>
      </section>
    </main>
  );
}
