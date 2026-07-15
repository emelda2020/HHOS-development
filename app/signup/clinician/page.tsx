import ClinicianSignUpForm from "@/components/ClinicianSignUpForm";

export default function ClinicianSignupPage() {
  return (
    <main className="authPage">
      <section className="authCard">
        <p className="eyebrow">CLINICIAN REGISTRATION</p>
        <h1>Create a clinician account</h1>
        <p className="lead">
          Your account will remain restricted until HHOS verifies your identity
          and professional license.
        </p>

        <ClinicianSignUpForm />
      </section>
    </main>
  );
}
