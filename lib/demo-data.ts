export type HealthStatus = "Stable" | "Review" | "Improving";

export const healthMetrics = [
  {
    label: "Resting heart rate",
    value: "62",
    unit: "bpm",
    status: "Stable" as HealthStatus,
    note: "Within your 30-day baseline",
    symbol: "♥"
  },
  {
    label: "Blood pressure",
    value: "118/76",
    unit: "",
    status: "Stable" as HealthStatus,
    note: "Last measured today at 08:20",
    symbol: "◫"
  },
  {
    label: "Sleep duration",
    value: "6h 12m",
    unit: "",
    status: "Review" as HealthStatus,
    note: "Below baseline for 6 days",
    symbol: "☾"
  },
  {
    label: "Daily activity",
    value: "7,842",
    unit: "steps",
    status: "Improving" as HealthStatus,
    note: "12% above last week",
    symbol: "↗"
  }
];

export const timelineEvents = [
  { date: "14 Jul", time: "08:20", title: "Blood pressure recorded", detail: "118/76 mmHg · Home monitor", type: "Measurement" },
  { date: "14 Jul", time: "07:45", title: "Sleep record synchronized", detail: "6h 12m · Smartwatch", type: "Wearable" },
  { date: "13 Jul", time: "16:30", title: "Care-plan reminder", detail: "Preventive blood test due by 24 July", type: "Care plan" },
  { date: "10 Jul", time: "11:10", title: "Laboratory result received", detail: "Routine metabolic panel · Demonstration result", type: "Laboratory" }
];

export const careTeam = [
  { name: "Dr. Maya Chen", role: "Primary care physician", status: "Active care relationship", initials: "MC" },
  { name: "Jordan Silva, RN", role: "Care coordinator", status: "Can review shared trends", initials: "JS" },
  { name: "City Laboratory", role: "Diagnostic laboratory", status: "Results connection active", initials: "CL" }
];

export const connections = [
  { name: "Smartwatch", detail: "Activity, sleep, heart rate", sync: "5 minutes ago", status: "Connected" },
  { name: "Blood pressure monitor", detail: "Home blood pressure", sync: "Today at 08:20", status: "Connected" },
  { name: "City Laboratory", detail: "Laboratory results", sync: "10 July", status: "Connected" },
  { name: "Hospital EHR", detail: "Encounters, medications, care plans", sync: "9 July", status: "Consent active" }
];
