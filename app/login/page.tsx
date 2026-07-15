import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="hhosLoginPage">
      <section className="hhosLoginBrandPanel" aria-label="HHOS introduction">
        <div className="hhosLoginBrandGlow hhosGlowOne" />
        <div className="hhosLoginBrandGlow hhosGlowTwo" />
        <div className="hhosLoginBrandGlow hhosGlowThree" />

        <div className="hhosLoginBrandContent">
          <div className="hhosLoginLogoRow">
            <div className="hhosLoginLogoMark" aria-hidden="true">
              <span />
            </div>
            <div>
              <strong>HHOS</strong>
              <small>Human Health Operating System</small>
            </div>
          </div>

          <div className="hhosLoginHeroCopy">
            <p className="hhosLoginEyebrow">CALM INTELLIGENCE</p>
            <h1>Understanding Health Before Disease Begins.</h1>
            <p>
              One secure health ecosystem connecting patients, clinicians,
              diagnostics, wearable technology, and intelligent preventive care.
            </p>
          </div>

          <div className="hhosLoginSignalGrid">
            <article>
              <span className="hhosSignalIcon hhosSignalGreen">01</span>
              <div>
                <strong>Understand health</strong>
                <small>See the complete picture, not isolated data.</small>
              </div>
            </article>

            <article>
              <span className="hhosSignalIcon hhosSignalCyan">02</span>
              <div>
                <strong>Recognize change</strong>
                <small>Identify important trends before they become crises.</small>
              </div>
            </article>

            <article>
              <span className="hhosSignalIcon hhosSignalAmber">03</span>
              <div>
                <strong>Guide the next step</strong>
                <small>Connect information to clinically governed action.</small>
              </div>
            </article>
          </div>

          <div className="hhosLoginTrustBar">
            <span>
              <i className="hhosTrustDot" />
              Privacy by design
            </span>
            <span>
              <i className="hhosTrustDot" />
              Clinician governed
            </span>
            <span>
              <i className="hhosTrustDot" />
              Secure by default
            </span>
          </div>
        </div>
      </section>

      <section className="hhosLoginFormPanel">
        <div className="hhosLoginFormWrap">
          <div className="hhosLoginMobileBrand">
            <div className="hhosLoginLogoMark" aria-hidden="true">
              <span />
            </div>
            <strong>HHOS</strong>
          </div>

          <div className="hhosLoginWelcome">
            <p className="hhosLoginEyebrow">WELCOME BACK</p>
            <h2>Sign in to your health workspace</h2>
            <p>
              Access your secure patient, clinician, or administrator dashboard.
            </p>
          </div>

          <AuthForm />

          <div className="hhosLoginSecurityNote">
            <span className="hhosLoginSecurityIcon" aria-hidden="true">✓</span>
            <div>
              <strong>Your information is protected</strong>
              <p>
                Encrypted access, role-based permissions, and complete activity
                auditing help protect every session.
              </p>
            </div>
          </div>

          <footer className="hhosLoginFooter">
            <span>HHOS Development Environment</span>
            <span>Clinical decisions require professional oversight.</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
