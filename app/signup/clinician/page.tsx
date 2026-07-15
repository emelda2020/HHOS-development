import ClinicianSignUpForm from "@/components/ClinicianSignUpForm";
import Link from "next/link";

export default function ClinicianSignupPage() {
  return (
    <>
      <main className="hhosClinicianSignup">
        <section className="hhosClinicianIntro">
          <div className="hhosClinicianIntroInner">
            <div className="hhosClinicianLogoRow">
              <div className="hhosClinicianLogoMark" aria-hidden="true">
                <span />
              </div>
              <div>
                <strong>HHOS Clinical</strong>
                <small>Verified Professional Access</small>
              </div>
            </div>

            <div className="hhosClinicianCopy">
              <p>CLINICIAN REGISTRATION</p>
              <h1>Professional access begins with trust.</h1>
              <span>
                Create your clinician account. Patient access remains locked
                until identity and medical license verification are complete.
              </span>
            </div>

            <div className="hhosClinicianSteps">
              <div>
                <b>1</b>
                <span>
                  <strong>Create account</strong>
                  <small>Use a professional email address.</small>
                </span>
              </div>
              <div>
                <b>2</b>
                <span>
                  <strong>Submit credentials</strong>
                  <small>Provide license and jurisdiction details.</small>
                </span>
              </div>
              <div>
                <b>3</b>
                <span>
                  <strong>Receive approval</strong>
                  <small>Access begins only after verification.</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="hhosClinicianFormSide">
          <div className="hhosClinicianFormWrap">
            <div className="hhosClinicianMobileBrand">
              <div className="hhosClinicianLogoMark" aria-hidden="true">
                <span />
              </div>
              <strong>HHOS Clinical</strong>
            </div>

            <div className="hhosClinicianFormIntro">
              <p>CREATE CLINICIAN ACCOUNT</p>
              <h2>Begin your application</h2>
              <span>
                Your account will remain restricted until HHOS completes
                professional verification.
              </span>
            </div>

            <ClinicianSignUpForm />

            <div className="hhosClinicianHelp">
              <span>Already registered?</span>
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

        .hhosClinicianSignup {
          min-height: 100vh;
          display: grid;
          grid-template-columns: .95fr 1.05fr;
          font-family: Arial, Helvetica, sans-serif;
          color: #1a1a1a;
        }

        .hhosClinicianIntro {
          min-height: 100vh;
          color: white;
          background:
            radial-gradient(circle at 20% 15%, rgba(0,184,217,.16), transparent 28%),
            radial-gradient(circle at 85% 85%, rgba(0,166,118,.16), transparent 30%),
            #0f4c81;
        }

        .hhosClinicianIntroInner {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 54px;
        }

        .hhosClinicianLogoRow,
        .hhosClinicianMobileBrand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .hhosClinicianLogoMark {
          width: 46px;
          height: 46px;
          position: relative;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: rgba(255,255,255,.14);
          border: 1px solid rgba(255,255,255,.22);
        }

        .hhosClinicianLogoMark::before,
        .hhosClinicianLogoMark::after {
          content: "";
          position: absolute;
          background: white;
          border-radius: 4px;
        }

        .hhosClinicianLogoMark::before {
          width: 25px;
          height: 8px;
        }

        .hhosClinicianLogoMark::after {
          width: 8px;
          height: 25px;
        }

        .hhosClinicianLogoMark span {
          width: 12px;
          height: 12px;
          position: relative;
          z-index: 1;
          border-radius: 50%;
          background: #00a676;
          border: 3px solid white;
        }

        .hhosClinicianLogoRow strong {
          display: block;
          font-size: 24px;
        }

        .hhosClinicianLogoRow small {
          display: block;
          margin-top: 5px;
          color: rgba(255,255,255,.72);
          font-size: 11px;
        }

        .hhosClinicianCopy {
          max-width: 560px;
          margin: auto 0;
        }

        .hhosClinicianCopy p,
        .hhosClinicianFormIntro p {
          margin: 0 0 18px;
          color: #69e2c6;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .16em;
        }

        .hhosClinicianCopy h1 {
          margin: 0;
          color: white;
          font-size: clamp(42px, 5vw, 66px);
          line-height: 1.05;
          letter-spacing: -.055em;
        }

        .hhosClinicianCopy span {
          display: block;
          max-width: 520px;
          margin-top: 22px;
          color: rgba(255,255,255,.76);
          font-size: 16px;
          line-height: 1.7;
        }

        .hhosClinicianSteps {
          display: grid;
          gap: 14px;
        }

        .hhosClinicianSteps > div {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: 12px;
        }

        .hhosClinicianSteps b {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          color: #0f4c81;
          background: white;
          font-size: 12px;
        }

        .hhosClinicianSteps strong {
          display: block;
          font-size: 12px;
        }

        .hhosClinicianSteps small {
          display: block;
          margin-top: 4px;
          color: rgba(255,255,255,.68);
          font-size: 10px;
        }

        .hhosClinicianFormSide {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 48px;
          background:
            radial-gradient(circle at 100% 0%, rgba(0,184,217,.05), transparent 30%),
            #f7f9fc;
        }

        .hhosClinicianFormWrap {
          width: 100%;
          max-width: 470px;
        }

        .hhosClinicianMobileBrand {
          display: none;
          margin-bottom: 34px;
          color: #0f4c81;
        }

        .hhosClinicianMobileBrand .hhosClinicianLogoMark {
          background: #0f4c81;
        }

        .hhosClinicianFormIntro {
          margin-bottom: 26px;
        }

        .hhosClinicianFormIntro p {
          margin-bottom: 10px;
          color: #00a676;
        }

        .hhosClinicianFormIntro h2 {
          margin: 0;
          font-size: 38px;
          letter-spacing: -.04em;
        }

        .hhosClinicianFormIntro span {
          display: block;
          margin-top: 10px;
          color: #5f6368;
          font-size: 14px;
          line-height: 1.6;
        }

        .hhosClinicianFormWrap .authForm {
          display: grid;
          gap: 17px;
          padding: 28px;
          border: 1px solid #e3e9ef;
          border-radius: 20px;
          background: white;
          box-shadow: 0 18px 50px rgba(15,76,129,.09);
        }

        .hhosClinicianFormWrap .authForm label {
          color: #263746;
          font-size: 12px;
          font-weight: 700;
        }

        .hhosClinicianFormWrap .authForm input {
          width: 100%;
          min-height: 48px;
          margin-top: 8px;
          padding: 0 14px;
          border: 1px solid #d7e0e8;
          border-radius: 12px;
          outline: none;
          background: #fbfcfd;
          font-size: 14px;
        }

        .hhosClinicianFormWrap .authForm input:focus {
          border-color: #00b8d9;
          box-shadow: 0 0 0 4px rgba(0,184,217,.1);
          background: white;
        }

        .hhosClinicianFormWrap .authForm .primary {
          min-height: 49px;
          border: 0;
          border-radius: 12px;
          color: white;
          background: #0f4c81;
          font-size: 14px;
          font-weight: 750;
          cursor: pointer;
        }

        .hhosClinicianFormWrap .authForm .primary:hover {
          background: #0b3d68;
        }

        .hhosClinicianFormWrap .authForm a {
          color: #0f4c81;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
        }

        .hhosClinicianFormWrap .authFootnote {
          color: #5f6368;
          font-size: 11px;
          line-height: 1.6;
        }

        .hhosClinicianFormWrap .seedMessage {
          margin: 0;
          padding: 11px 13px;
          border: 1px solid #d9e8e3;
          border-radius: 10px;
          color: #325247;
          background: #f1faf7;
          font-size: 12px;
          line-height: 1.5;
        }

        .hhosClinicianHelp {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
          color: #5f6368;
          font-size: 12px;
        }

        .hhosClinicianHelp a {
          color: #0f4c81;
          font-weight: 800;
          text-decoration: none;
        }

        @media (max-width: 820px) {
          .hhosClinicianSignup {
            display: block;
          }

          .hhosClinicianIntro {
            display: none;
          }

          .hhosClinicianFormSide {
            padding: 30px 18px;
          }

          .hhosClinicianMobileBrand {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
