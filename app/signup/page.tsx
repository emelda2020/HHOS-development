import Link from "next/link";

export default function SignupChoicePage() {
  return (
    <main className="authPage">
      <section className="authCard">
        <p className="eyebrow">CREATE AN HHOS ACCOUNT</p>
        <h1>How will you use HHOS?</h1>
        <p className="lead">
          Choose the account type that matches your role.
        </p>

        <div className="accountChoiceGrid">
          <Link className="accountChoiceCard" href="/register">
            <strong>Patient account</strong>
            <span>
              Upload reports, view physician reviews, and manage follow-up.
            </span>
          </Link>

          <Link className="accountChoiceCard" href="/signup/clinician">
            <strong>Clinician account</strong>
            <span>
              Apply for verified access to clinical review tools.
            </span>
          </Link>
        </div>

        <p className="authFootnote">
          Clinician accounts require identity and professional-license verification
          before patient information becomes available.
        </p>

        <Link href="/login">Already have an account? Sign in</Link>
      </section>
    </main>
  );
}
