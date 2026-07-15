import Link from "next/link";

export default function HomePage() {
  return (
    <main className="centerPage">
      <section className="card hero">
        <div className="brand">HHOS</div>
        <p className="eyebrow">HUMAN HEALTH OPERATING SYSTEM</p>
        <h1>Understanding health before disease begins.</h1>
        <p className="lead">
          A secure development environment for preventive, connected, and
          clinically responsible health technology.
        </p>
        <div className="actions">
          <Link className="primary" href="/login">Sign in</Link>
          <Link className="secondary" href="/signup">Create account</Link>
        </div>
        <p className="notice">
          Development only. Do not enter real patient or medical information.
        </p>
      </section>
    </main>
  );
}
