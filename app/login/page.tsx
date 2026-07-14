import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="authPage">
      <section className="authPanel">
        <Link href="/" className="brandLockup">
          <span className="brandMark">H</span>
          <span>
            <strong>HHOS</strong>
            <small>Human Health Operating System</small>
          </span>
        </Link>

        <div className="authCopy">
          <p className="eyebrow">SECURE ACCESS</p>
          <h1>Welcome back</h1>
          <p>
            Use the demonstration account below. This is not connected to real
            patient identity or clinical data.
          </p>
        </div>

        <LoginForm />

        <div className="demoCredentials">
          <strong>Demonstration credentials</strong>
          <span>Email: demo@hhos.health</span>
          <span>Password: Health123!</span>
        </div>
      </section>

      <aside className="authStory">
        <div>
          <p className="eyebrow light">OUR PRINCIPLE</p>
          <h2>Technology should strengthen the relationship between patients and clinicians.</h2>
          <p>
            AI supports understanding and clinical workflows. It does not
            replace professional medical judgment.
          </p>
        </div>
      </aside>
    </main>
  );
}
