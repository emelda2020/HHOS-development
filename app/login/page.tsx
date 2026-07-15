import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <>
      <main className="hhosCleanLogin">
        <section className="hhosBrandSide">
          <div className="hhosBrandInner">
            <div className="hhosBrandMark">
              <div className="hhosLogoSymbol" aria-hidden="true">
                <span />
              </div>
              <div>
                <strong>HHOS</strong>
                <small>Human Health Operating System</small>
              </div>
            </div>

            <div className="hhosBrandMessage">
              <p>CALM INTELLIGENCE</p>
              <h1>Understanding Health Before Disease Begins.</h1>
              <span>
                A secure health ecosystem connecting people, clinicians,
                diagnostics, and intelligent preventive care.
              </span>
            </div>

            <div className="hhosTrustLine">
              <span>Secure</span>
              <span>Clinician governed</span>
              <span>Privacy by design</span>
            </div>
          </div>
        </section>

        <section className="hhosFormSide">
          <div className="hhosFormContainer">
            <div className="hhosMobileLogo">
              <div className="hhosLogoSymbol" aria-hidden="true">
                <span />
              </div>
              <strong>HHOS</strong>
            </div>

            <div className="hhosFormIntro">
              <p>WELCOME BACK</p>
              <h2>Sign in</h2>
              <span>Access your secure HHOS workspace.</span>
            </div>

            <AuthForm />

            <div className="hhosSecurityNote">
              <span>✓</span>
              <p>Encrypted access with role-based permissions.</p>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f7f9fc;
        }

        .hhosCleanLogin {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          font-family: Arial, Helvetica, sans-serif;
          color: #1a1a1a;
        }

        .hhosBrandSide {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          color: #ffffff;
          background:
            radial-gradient(circle at 20% 15%, rgba(0, 184, 217, 0.18), transparent 28%),
            radial-gradient(circle at 80% 80%, rgba(0, 166, 118, 0.14), transparent 28%),
            #0f4c81;
        }

        .hhosBrandSide::after {
          content: "";
          position: absolute;
          width: 520px;
          height: 520px;
          right: -260px;
          bottom: -260px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50%;
          box-shadow:
            0 0 0 60px rgba(255,255,255,0.025),
            0 0 0 120px rgba(255,255,255,0.018);
        }

        .hhosBrandInner {
          min-height: 100vh;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          padding: 56px;
        }

        .hhosBrandMark,
        .hhosMobileLogo {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .hhosLogoSymbol {
          width: 46px;
          height: 46px;
          position: relative;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.22);
        }

        .hhosLogoSymbol::before,
        .hhosLogoSymbol::after {
          content: "";
          position: absolute;
          background: white;
          border-radius: 4px;
        }

        .hhosLogoSymbol::before {
          width: 25px;
          height: 8px;
        }

        .hhosLogoSymbol::after {
          width: 8px;
          height: 25px;
        }

        .hhosLogoSymbol span {
          width: 12px;
          height: 12px;
          position: relative;
          z-index: 1;
          border-radius: 50%;
          background: #00a676;
          border: 3px solid #ffffff;
        }

        .hhosBrandMark strong {
          display: block;
          font-size: 25px;
          letter-spacing: -0.04em;
        }

        .hhosBrandMark small {
          display: block;
          margin-top: 5px;
          color: rgba(255,255,255,0.72);
          font-size: 11px;
        }

        .hhosBrandMessage {
          max-width: 620px;
          margin: auto 0;
        }

        .hhosBrandMessage p,
        .hhosFormIntro p {
          margin: 0 0 18px;
          color: #69e2c6;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .hhosBrandMessage h1 {
          margin: 0;
          color: white;
          font-size: clamp(42px, 5vw, 70px);
          line-height: 1.05;
          letter-spacing: -0.055em;
        }

        .hhosBrandMessage span {
          display: block;
          max-width: 550px;
          margin-top: 24px;
          color: rgba(255,255,255,0.76);
          font-size: 16px;
          line-height: 1.7;
        }

        .hhosTrustLine {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          color: rgba(255,255,255,0.7);
          font-size: 11px;
        }

        .hhosTrustLine span::before {
          content: "";
          width: 7px;
          height: 7px;
          display: inline-block;
          margin-right: 8px;
          border-radius: 50%;
          background: #00d6a0;
        }

        .hhosFormSide {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 48px;
          background:
            radial-gradient(circle at 100% 0%, rgba(0,184,217,0.05), transparent 30%),
            #f7f9fc;
        }

        .hhosFormContainer {
          width: 100%;
          max-width: 430px;
        }

        .hhosMobileLogo {
          display: none;
          margin-bottom: 34px;
          color: #0f4c81;
        }

        .hhosMobileLogo .hhosLogoSymbol {
          background: #0f4c81;
        }

        .hhosMobileLogo strong {
          font-size: 22px;
        }

        .hhosFormIntro {
          margin-bottom: 28px;
        }

        .hhosFormIntro p {
          margin-bottom: 10px;
          color: #00a676;
        }

        .hhosFormIntro h2 {
          margin: 0;
          font-size: 38px;
          line-height: 1.1;
          letter-spacing: -0.04em;
        }

        .hhosFormIntro span {
          display: block;
          margin-top: 10px;
          color: #5f6368;
          font-size: 14px;
        }

        .hhosFormContainer .authForm {
          display: grid;
          gap: 17px;
          padding: 28px;
          border: 1px solid #e3e9ef;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 18px 50px rgba(15,76,129,0.09);
        }

        .hhosFormContainer .authForm label {
          color: #263746;
          font-size: 12px;
          font-weight: 700;
        }

        .hhosFormContainer .authForm input {
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

        .hhosFormContainer .authForm input:focus {
          border-color: #00b8d9;
          box-shadow: 0 0 0 4px rgba(0,184,217,0.1);
          background: #ffffff;
        }

        .hhosFormContainer .authForm .primary {
          min-height: 49px;
          border: 0;
          border-radius: 12px;
          color: #ffffff;
          background: #0f4c81;
          font-size: 14px;
          font-weight: 750;
          cursor: pointer;
        }

        .hhosFormContainer .authForm .primary:hover {
          background: #0b3d68;
        }

        .hhosFormContainer .authLinks {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          margin-top: 2px;
        }

        .hhosFormContainer .authLinks a,
        .hhosFormContainer .authForm > a {
          color: #0f4c81;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
        }

        .hhosFormContainer .seedMessage {
          margin: 0;
          padding: 11px 13px;
          border: 1px solid #d9e8e3;
          border-radius: 10px;
          color: #325247;
          background: #f1faf7;
          font-size: 12px;
          line-height: 1.5;
        }

        .hhosSecurityNote {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 18px;
          padding: 14px 16px;
          border-radius: 12px;
          color: #3d5b51;
          background: #eef8f4;
          font-size: 12px;
        }

        .hhosSecurityNote span {
          width: 26px;
          height: 26px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          color: white;
          background: #00a676;
          font-weight: 800;
        }

        .hhosSecurityNote p {
          margin: 0;
        }

        @media (max-width: 820px) {
          .hhosCleanLogin {
            display: block;
          }

          .hhosBrandSide {
            display: none;
          }

          .hhosFormSide {
            padding: 28px 18px;
          }

          .hhosMobileLogo {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .hhosFormContainer .authForm {
            padding: 22px;
            border-radius: 16px;
          }

          .hhosFormIntro h2 {
            font-size: 32px;
          }
        }
      `}</style>
    </>
  );
}
