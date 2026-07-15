import Link from "next/link";

export default function SignupChoicePage() {
  return (
    <>
      <main className="hhosSignupPage">
        <section className="hhosSignupBrand">
          <div className="hhosSignupBrandInner">
            <div className="hhosSignupLogoRow">
              <div className="hhosSignupLogoMark" aria-hidden="true">
                <span />
              </div>
              <div>
                <strong>HHOS</strong>
                <small>Human Health Operating System</small>
              </div>
            </div>

            <div className="hhosSignupBrandCopy">
              <p>JOIN THE HEALTH ECOSYSTEM</p>
              <h1>Your health journey starts with the right account.</h1>
              <span>
                Choose how you will use HHOS. Every account is protected by
                privacy, security, and role-based access controls.
              </span>
            </div>

            <div className="hhosSignupTrust">
              <span>Secure access</span>
              <span>Privacy by design</span>
              <span>Clinically governed</span>
            </div>
          </div>
        </section>

        <section className="hhosSignupOptions">
          <div className="hhosSignupOptionsInner">
            <div className="hhosSignupMobileBrand">
              <div className="hhosSignupLogoMark" aria-hidden="true">
                <span />
              </div>
              <strong>HHOS</strong>
            </div>

            <div className="hhosSignupIntro">
              <p>CREATE AN ACCOUNT</p>
              <h2>How will you use HHOS?</h2>
              <span>Select the account type that matches your role.</span>
            </div>

            <div className="hhosSignupCardGrid">
              <Link href="/register" className="hhosSignupCard hhosPatientCard">
                <div className="hhosSignupCardTop">
                  <span className="hhosSignupCardIcon">P</span>
                  <span className="hhosSignupBadge">For individuals</span>
                </div>

                <div>
                  <h3>Patient account</h3>
                  <p>
                    Upload reports, review physician feedback, manage referrals,
                    and follow your health timeline.
                  </p>
                </div>

                <ul>
                  <li>Personal health dashboard</li>
                  <li>Medical report upload</li>
                  <li>Follow-up and referral tracking</li>
                </ul>

                <span className="hhosSignupAction">
                  Create patient account <b>→</b>
                </span>
              </Link>

              <Link href="/signup/clinician" className="hhosSignupCard hhosClinicianCard">
                <div className="hhosSignupCardTop">
                  <span className="hhosSignupCardIcon">C</span>
                  <span className="hhosSignupBadge">Verification required</span>
                </div>

                <div>
                  <h3>Clinician account</h3>
                  <p>
                    Apply for professional access to clinical review tools and
                    patient care workflows.
                  </p>
                </div>

                <ul>
                  <li>Professional identity verification</li>
                  <li>License and specialty review</li>
                  <li>Clinical dashboard after approval</li>
                </ul>

                <span className="hhosSignupAction">
                  Apply as clinician <b>→</b>
                </span>
              </Link>
            </div>

            <div className="hhosSignupExisting">
              <span>Already have an account?</span>
              <Link href="/login">Sign in</Link>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        * { box-sizing: border-box; }

        body {
          margin: 0;
          background: #f7f9fc;
        }

        .hhosSignupPage {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          font-family: Arial, Helvetica, sans-serif;
          color: #1a1a1a;
        }

        .hhosSignupBrand {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          color: #fff;
          background:
            radial-gradient(circle at 20% 15%, rgba(0,184,217,.18), transparent 28%),
            radial-gradient(circle at 85% 85%, rgba(0,166,118,.15), transparent 30%),
            #0f4c81;
        }

        .hhosSignupBrand::after {
          content: "";
          position: absolute;
          width: 520px;
          height: 520px;
          right: -280px;
          bottom: -280px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 50%;
          box-shadow:
            0 0 0 60px rgba(255,255,255,.025),
            0 0 0 120px rgba(255,255,255,.018);
        }

        .hhosSignupBrandInner {
          min-height: 100vh;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          padding: 54px;
        }

        .hhosSignupLogoRow,
        .hhosSignupMobileBrand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .hhosSignupLogoMark {
          width: 46px;
          height: 46px;
          position: relative;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: rgba(255,255,255,.14);
          border: 1px solid rgba(255,255,255,.22);
        }

        .hhosSignupLogoMark::before,
        .hhosSignupLogoMark::after {
          content: "";
          position: absolute;
          background: white;
          border-radius: 4px;
        }

        .hhosSignupLogoMark::before {
          width: 25px;
          height: 8px;
        }

        .hhosSignupLogoMark::after {
          width: 8px;
          height: 25px;
        }

        .hhosSignupLogoMark span {
          width: 12px;
          height: 12px;
          position: relative;
          z-index: 1;
          border-radius: 50%;
          background: #00a676;
          border: 3px solid white;
        }

        .hhosSignupLogoRow strong {
          display: block;
          font-size: 25px;
          letter-spacing: -.04em;
        }

        .hhosSignupLogoRow small {
          display: block;
          margin-top: 5px;
          color: rgba(255,255,255,.72);
          font-size: 11px;
        }

        .hhosSignupBrandCopy {
          max-width: 560px;
          margin: auto 0;
        }

        .hhosSignupBrandCopy p,
        .hhosSignupIntro p {
          margin: 0 0 18px;
          color: #69e2c6;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .16em;
        }

        .hhosSignupBrandCopy h1 {
          margin: 0;
          color: white;
          font-size: clamp(42px, 5vw, 66px);
          line-height: 1.05;
          letter-spacing: -.055em;
        }

        .hhosSignupBrandCopy span {
          display: block;
          max-width: 520px;
          margin-top: 22px;
          color: rgba(255,255,255,.76);
          font-size: 16px;
          line-height: 1.7;
        }

        .hhosSignupTrust {
          display: flex;
          flex-wrap: wrap;
          gap: 22px;
          color: rgba(255,255,255,.7);
          font-size: 11px;
        }

        .hhosSignupTrust span::before {
          content: "";
          width: 7px;
          height: 7px;
          display: inline-block;
          margin-right: 8px;
          border-radius: 50%;
          background: #00d6a0;
        }

        .hhosSignupOptions {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 48px;
          background:
            radial-gradient(circle at 100% 0%, rgba(0,184,217,.05), transparent 30%),
            #f7f9fc;
        }

        .hhosSignupOptionsInner {
          width: 100%;
          max-width: 820px;
        }

        .hhosSignupMobileBrand {
          display: none;
          margin-bottom: 34px;
          color: #0f4c81;
        }

        .hhosSignupMobileBrand .hhosSignupLogoMark {
          background: #0f4c81;
        }

        .hhosSignupMobileBrand strong {
          font-size: 22px;
        }

        .hhosSignupIntro {
          margin-bottom: 26px;
        }

        .hhosSignupIntro p {
          margin-bottom: 10px;
          color: #00a676;
        }

        .hhosSignupIntro h2 {
          margin: 0;
          font-size: 38px;
          letter-spacing: -.04em;
        }

        .hhosSignupIntro span {
          display: block;
          margin-top: 10px;
          color: #5f6368;
          font-size: 14px;
        }

        .hhosSignupCardGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .hhosSignupCard {
          min-height: 390px;
          display: flex;
          flex-direction: column;
          gap: 22px;
          padding: 26px;
          border: 1px solid #e1e8ef;
          border-radius: 20px;
          background: white;
          box-shadow: 0 16px 42px rgba(15,76,129,.08);
          color: inherit;
          text-decoration: none;
          transition:
            transform 160ms ease,
            border-color 160ms ease,
            box-shadow 160ms ease;
        }

        .hhosSignupCard:hover {
          transform: translateY(-3px);
          border-color: #b8d3e8;
          box-shadow: 0 22px 52px rgba(15,76,129,.12);
        }

        .hhosSignupCardTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .hhosSignupCardIcon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          color: white;
          background: #0f4c81;
          font-size: 18px;
          font-weight: 800;
        }

        .hhosClinicianCard .hhosSignupCardIcon {
          background: #00a676;
        }

        .hhosSignupBadge {
          padding: 7px 10px;
          border-radius: 999px;
          color: #0f4c81;
          background: #edf4fa;
          font-size: 10px;
          font-weight: 700;
        }

        .hhosClinicianCard .hhosSignupBadge {
          color: #006f52;
          background: #e9f8f3;
        }

        .hhosSignupCard h3 {
          margin: 0;
          font-size: 24px;
          letter-spacing: -.03em;
        }

        .hhosSignupCard p {
          margin: 10px 0 0;
          color: #5f6368;
          font-size: 13px;
          line-height: 1.65;
        }

        .hhosSignupCard ul {
          display: grid;
          gap: 10px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .hhosSignupCard li {
          color: #34424d;
          font-size: 12px;
        }

        .hhosSignupCard li::before {
          content: "✓";
          margin-right: 9px;
          color: #00a676;
          font-weight: 800;
        }

        .hhosSignupAction {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 18px;
          border-top: 1px solid #eef2f5;
          color: #0f4c81;
          font-size: 13px;
          font-weight: 800;
        }

        .hhosClinicianCard .hhosSignupAction {
          color: #00855f;
        }

        .hhosSignupAction b {
          font-size: 18px;
        }

        .hhosSignupExisting {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
          color: #5f6368;
          font-size: 12px;
        }

        .hhosSignupExisting a {
          color: #0f4c81;
          font-weight: 800;
          text-decoration: none;
        }

        @media (max-width: 980px) {
          .hhosSignupPage {
            grid-template-columns: .82fr 1.18fr;
          }

          .hhosSignupCardGrid {
            grid-template-columns: 1fr;
          }

          .hhosSignupCard {
            min-height: auto;
          }
        }

        @media (max-width: 820px) {
          .hhosSignupPage {
            display: block;
          }

          .hhosSignupBrand {
            display: none;
          }

          .hhosSignupOptions {
            padding: 30px 18px;
          }

          .hhosSignupMobileBrand {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
