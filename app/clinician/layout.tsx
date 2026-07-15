import ClinicianShell from "@/components/ClinicianShell";

export default function ClinicianLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <ClinicianShell>{children}</ClinicianShell>;
}
