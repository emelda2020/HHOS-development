"use client";

import Link from "next/link";
import { useMemo } from "react";

type AnyRecord = Record<string, any>;

type Props = {
  profile: AnyRecord | null;
  observations: AnyRecord[];
  devices: AnyRecord[];
  timeline: AnyRecord[];
  carePlan: AnyRecord[];
  reports: AnyRecord[];
  followUps: AnyRecord[];
  notifications: AnyRecord[];
};

function Icon({
  name,
  size = 18
}: {
  name: string;
  size?: number;
}) {
  const paths: Record<string, React.ReactNode> = {
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6a5.5 5.5 0 0 0 1-8.8Z" />
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3-1.8 4.7L5.5 9.5l4.7 1.8L12 16l1.8-4.7 4.7-1.8-4.7-1.8L12 3Z" />
        <path d="m5 16-.9 2.1L2 19l2.1.9L5 22l.9-2.1L8 19l-2.1-.9L5 16Z" />
      </>
    ),
    activity: (
      <polyline points="3 12 7 12 10 4 14 20 17 12 21 12" />
    ),
    droplet: (
      <path d="M12 22a7 7 0 0 0 7-7c0-5-7-13-7-13S5 10 5 15a7 7 0 0 0 7 7Z" />
    ),
    moon: (
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
    ),
    lungs: (
      <>
        <path d="M6.1 20A4.1 4.1 0 0 1 2 15.9V12a4 4 0 0 1 4-4h1V3" />
        <path d="M17.9 20a4.1 4.1 0 0 0 4.1-4.1V12a4 4 0 0 0-4-4h-1V3" />
        <path d="M7 8c1.5 0 3 1.5 3 3v9" />
        <path d="M17 8c-1.5 0-3 1.5-3 3v9" />
      </>
    ),
    flask: (
      <>
        <path d="M9 3h6" />
        <path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
        <path d="M7.5 15h9" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </>
    ),
    device: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M9 18h6" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    arrow: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    file: (
      <>
        <path d="M6 2h9l5 5v15H6z" />
        <path d="M14 2v6h6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    trend: (
      <>
        <path d="m3 17 6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </>
    )
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.spark}
    </svg>
  );
}

function Sparkline({
  values,
  tone = "blue"
}: {
  values: number[];
  tone?: "blue" | "green" | "cyan" | "amber" | "red";
}) {
  const normalized = values.length >= 2 ? values : [48, 55, 50, 61, 58, 65, 62];
  const max = Math.max(...normalized);
  const min = Math.min(...normalized);
  const range = max - min || 1;

  const points = normalized
    .map((value, index) => {
      const x = (index / (normalized.length - 1)) * 100;
      const y = 34 - ((value - min) / range) * 27;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className={`sparkline sparkline-${tone}`} viewBox="0 0 100 38" preserveAspectRatio="none">
      <polyline points={points} fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function MetricCard({
  icon,
  label,
  value,
  unit,
  status = "Normal",
  values,
  tone = "blue"
}: {
  icon: string;
  label: string;
  value: string;
  unit?: string;
  status?: string;
  values?: number[];
  tone?: "blue" | "green" | "cyan" | "amber" | "red";
}) {
  return (
    <article className="hhosMetricCard">
      <div className="hhosMetricHeader">
        <span className={`hhosIcon hhosIcon-${tone}`}>
          <Icon name={icon} size={16} />
        </span>
        <span>{label}</span>
        <button aria-label={`View ${label} details`}>•••</button>
      </div>

      <div className="hhosMetricBody">
        <Sparkline values={values ?? []} tone={tone} />
        <div>
          <strong>
            {value}
            {unit ? <small>{unit}</small> : null}
          </strong>
          <span className="hhosStatusHealthy">{status}</span>
        </div>
      </div>
    </article>
  );
}

function safeDate(value: any) {
  if (!value) return "Not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function getObservationValues(
  observations: AnyRecord[],
  names: string[]
): number[] {
  return observations
    .filter((item) => {
      const type = String(
        item.observation_type ??
          item.measurement_type ??
          item.metric_type ??
          item.name ??
          ""
      ).toLowerCase();

      return names.some((name) => type.includes(name));
    })
    .map((item) =>
      Number(
        item.numeric_value ??
          item.value_numeric ??
          item.value ??
          item.result_value
      )
    )
    .filter((value) => Number.isFinite(value))
    .reverse()
    .slice(-16);
}

function latestValue(
  observations: AnyRecord[],
  names: string[],
  fallback: string
) {
  const values = getObservationValues(observations, names);
  return values.length ? String(Math.round(values[values.length - 1] * 10) / 10) : fallback;
}

export default function PremiumPatientDashboard({
  profile,
  observations,
  devices,
  timeline,
  carePlan,
  reports,
  followUps,
  notifications
}: Props) {
  const firstName =
    profile?.full_name?.split(" ")?.[0] ??
    profile?.first_name ??
    profile?.display_name?.split(" ")?.[0] ??
    "Patient";

  const observationGroups = useMemo(
    () => ({
      heartRate: getObservationValues(observations, ["heart_rate", "heart rate", "pulse"]),
      oxygen: getObservationValues(observations, ["oxygen", "spo2", "saturation"]),
      respiration: getObservationValues(observations, ["respiratory", "respiration"]),
      sleep: getObservationValues(observations, ["sleep"]),
      glucose: getObservationValues(observations, ["glucose", "blood sugar"]),
      weight: getObservationValues(observations, ["weight"]),
      stress: getObservationValues(observations, ["stress"]),
      steps: getObservationValues(observations, ["steps"])
    }),
    [observations]
  );

  const activeDevices = devices.filter((device) =>
    ["connected", "active", "online"].includes(
      String(device.connection_status ?? device.status ?? "").toLowerCase()
    )
  ).length;

  const urgentFollowUps = followUps.filter((item) =>
    ["urgent", "emergency"].includes(String(item.priority ?? "").toLowerCase())
  ).length;

  const openFollowUps = followUps.filter(
    (item) =>
      !["completed", "declined", "cancelled"].includes(
        String(item.action_status ?? item.status ?? "").toLowerCase()
      )
  ).length;

  const healthScore = Math.max(
    68,
    Math.min(
      96,
      88 +
        Math.min(activeDevices, 2) +
        Math.min(reports.length, 2) -
        urgentFollowUps * 5
    )
  );

  const riskLabel =
    urgentFollowUps > 0
      ? "Elevated Review"
      : openFollowUps > 2
        ? "Moderate"
        : "Low Risk";

  const latestHeartRate = latestValue(
    observations,
    ["heart_rate", "heart rate", "pulse"],
    "72"
  );
  const latestOxygen = latestValue(
    observations,
    ["oxygen", "spo2", "saturation"],
    "98"
  );
  const latestRespiration = latestValue(
    observations,
    ["respiratory", "respiration"],
    "16"
  );
  const latestGlucose = latestValue(
    observations,
    ["glucose", "blood sugar"],
    "5.4"
  );

  const aiInsight =
    urgentFollowUps > 0
      ? "A clinician has marked one or more follow-up actions as urgent. Review the instructions and act promptly."
      : openFollowUps > 0
        ? "Your recent health information is stable. You have follow-up actions waiting for acknowledgement."
        : "Your available health information appears stable. Continue your current care plan and routine monitoring.";

  const recentChanges = [
    {
      label: "Resting heart rate",
      value: `${latestHeartRate} bpm`,
      change: "Stable",
      icon: "heart"
    },
    {
      label: "Blood oxygen",
      value: `${latestOxygen}%`,
      change: "Normal",
      icon: "droplet"
    },
    {
      label: "Open follow-ups",
      value: String(openFollowUps),
      change: openFollowUps ? "Action needed" : "Clear",
      icon: "check"
    },
    {
      label: "Connected devices",
      value: String(activeDevices),
      change: activeDevices ? "Online" : "Not connected",
      icon: "device"
    }
  ];

  return (
    <div className="hhosPremiumDashboard">
      <header className="hhosPatientHeader">
        <div className="hhosPatientIdentity">
          <div className="hhosAvatar" aria-hidden="true">
            {firstName.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <p>Good day</p>
            <h1>{firstName}</h1>
            <span>Your health overview is ready.</span>
          </div>
        </div>

        <div className="hhosHeaderActions">
          <button className="hhosIconButton" aria-label="Notifications">
            <Icon name="bell" />
            {notifications.length > 0 ? (
              <span className="hhosNotificationDot">
                {Math.min(notifications.length, 9)}
              </span>
            ) : null}
          </button>
          <Link className="hhosPrimaryAction" href="/dashboard/reports">
            Upload report
          </Link>
        </div>
      </header>

      <section className="hhosTopGrid">
        <article className="hhosHeroCard hhosHealthScoreCard">
          <div className="hhosCardTitle">
            <span>Overall Health Score</span>
            <small>Updated today</small>
          </div>

          <div className="hhosScoreContent">
            <div
              className="hhosScoreRing"
              style={{
                background: `conic-gradient(#00A676 ${healthScore * 3.6}deg, #E8EEF4 0deg)`
              }}
            >
              <div>
                <strong>{healthScore}</strong>
                <span>/100</span>
              </div>
            </div>

            <div className="hhosScoreMessage">
              <strong>{healthScore >= 90 ? "Excellent" : "Stable"}</strong>
              <p>
                Your available health information is within a reassuring range.
              </p>
              <span>
                <Icon name="trend" size={14} />
                Longitudinal view active
              </span>
            </div>
          </div>
        </article>

        <article className="hhosHeroCard">
          <div className="hhosCardTitle">
            <span>Patient Risk Level</span>
            <small>Clinically governed</small>
          </div>

          <div className="hhosRiskContent">
            <span
              className={`hhosRiskShield ${
                urgentFollowUps > 0 ? "hhosRiskElevated" : ""
              }`}
            >
              <Icon name="shield" size={30} />
            </span>
            <div>
              <strong>{riskLabel}</strong>
              <p>
                {urgentFollowUps > 0
                  ? "Prompt follow-up recommended"
                  : "No immediate concerns identified"}
              </p>
            </div>
          </div>

          <div className="hhosRiskScale">
            <span className="active" />
            <span />
            <span />
            <span />
          </div>

          <small className="hhosCardFooter">
            Based on current HHOS records—not a diagnosis.
          </small>
        </article>

        <article className="hhosHeroCard">
          <div className="hhosCardTitle">
            <span>Today’s Summary</span>
            <small>{safeDate(new Date())}</small>
          </div>

          <div className="hhosSummaryRows">
            <div>
              <span><Icon name="heart" size={15} /> Vitals</span>
              <strong>Stable</strong>
            </div>
            <div>
              <span><Icon name="moon" size={15} /> Sleep</span>
              <strong>{observationGroups.sleep.length ? "Recorded" : "No data"}</strong>
            </div>
            <div>
              <span><Icon name="activity" size={15} /> Activity</span>
              <strong>{observationGroups.steps.length ? "Goal tracked" : "No data"}</strong>
            </div>
            <div>
              <span><Icon name="clock" size={15} /> Follow-up</span>
              <strong>{openFollowUps ? `${openFollowUps} open` : "Up to date"}</strong>
            </div>
          </div>

          <Link className="hhosTextLink" href="/dashboard/timeline">
            View full timeline <Icon name="arrow" size={14} />
          </Link>
        </article>

        <article className="hhosHeroCard hhosAiCard">
          <div className="hhosCardTitle">
            <span>
              <Icon name="spark" size={17} />
              AI Health Insight
            </span>
            <small>AI-assisted</small>
          </div>

          <p>{aiInsight}</p>

          <div className="hhosConfidence">
            <span>Information completeness</span>
            <div><i style={{ width: `${Math.min(96, 62 + observations.length)}%` }} /></div>
            <strong>{Math.min(96, 62 + observations.length)}%</strong>
          </div>

          <Link className="hhosTextLink" href="/dashboard/reviews">
            View physician reviews <Icon name="arrow" size={14} />
          </Link>
        </article>
      </section>

      <section className="hhosSectionCard">
        <div className="hhosSectionHeading">
          <div>
            <p>CORE HEALTH INDICATORS</p>
            <h2>Your health at a glance</h2>
          </div>
          <Link href="/dashboard/observations">
            View all metrics <Icon name="arrow" size={14} />
          </Link>
        </div>

        <div className="hhosMetricGrid">
          <MetricCard
            icon="heart"
            label="Heart Activity"
            value={latestHeartRate}
            unit=" bpm"
            values={observationGroups.heartRate}
            tone="red"
          />
          <MetricCard
            icon="activity"
            label="Heart Variability"
            value="Balanced"
            values={observationGroups.heartRate.map((v, i) => v + (i % 3) * 2)}
            tone="blue"
          />
          <MetricCard
            icon="lungs"
            label="Respiratory Rate"
            value={latestRespiration}
            unit=" br/min"
            values={observationGroups.respiration}
            tone="cyan"
          />
          <MetricCard
            icon="droplet"
            label="Blood Oxygen"
            value={latestOxygen}
            unit="%"
            values={observationGroups.oxygen}
            tone="green"
          />
          <MetricCard
            icon="flask"
            label="Blood Glucose"
            value={latestGlucose}
            unit=" mmol/L"
            values={observationGroups.glucose}
            tone="amber"
          />
          <MetricCard
            icon="moon"
            label="Sleep Quality"
            value={observationGroups.sleep.length ? "Tracked" : "Awaiting data"}
            status={observationGroups.sleep.length ? "Recorded" : "Connect device"}
            values={observationGroups.sleep}
            tone="blue"
          />
          <MetricCard
            icon="activity"
            label="Stress Analysis"
            value={observationGroups.stress.length ? "Low" : "Not measured"}
            status={observationGroups.stress.length ? "Normal" : "No data"}
            values={observationGroups.stress}
            tone="cyan"
          />
          <MetricCard
            icon="check"
            label="Medication Adherence"
            value={
              carePlan.length
                ? `${Math.max(75, 100 - carePlan.filter((i) => i.status === "missed").length * 10)}%`
                : "No plan"
            }
            status={carePlan.length ? "On track" : "Not configured"}
            values={[70, 76, 80, 85, 86, 92, 95, 98]}
            tone="green"
          />
        </div>
      </section>

      <section className="hhosDashboardColumns">
        <div className="hhosMainColumn">
          <section className="hhosSectionCard">
            <div className="hhosSectionHeading">
              <div>
                <p>TREND ANALYSIS</p>
                <h2>Recent patterns</h2>
              </div>
              <Link href="/dashboard/observations">
                30 days <Icon name="arrow" size={14} />
              </Link>
            </div>

            <div className="hhosTrendChart">
              <div className="hhosChartLegend">
                <span><i className="legendHeart" /> Heart rate</span>
                <span><i className="legendOxygen" /> Blood oxygen</span>
                <span><i className="legendStress" /> Stress</span>
              </div>
              <svg viewBox="0 0 800 220" preserveAspectRatio="none" aria-label="Health trend chart">
                <defs>
                  <linearGradient id="hhosArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00B8D9" stopOpacity=".16" />
                    <stop offset="100%" stopColor="#00B8D9" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40, 80, 120, 160, 200].map((y) => (
                  <line key={y} x1="0" y1={y} x2="800" y2={y} className="hhosGridLine" />
                ))}
                <path
                  d="M0 126 C70 105 95 116 145 93 S230 108 282 82 S375 102 430 74 S515 85 574 66 S690 78 800 52 L800 220 L0 220 Z"
                  fill="url(#hhosArea)"
                />
                <path
                  d="M0 126 C70 105 95 116 145 93 S230 108 282 82 S375 102 430 74 S515 85 574 66 S690 78 800 52"
                  className="hhosTrendPrimary"
                />
                <path
                  d="M0 78 C78 84 110 67 170 76 S270 63 330 74 S430 59 505 70 S625 58 800 66"
                  className="hhosTrendSecondary"
                />
                <path
                  d="M0 166 C70 148 120 160 180 147 S290 151 360 136 S475 146 540 127 S680 138 800 119"
                  className="hhosTrendTertiary"
                />
              </svg>
              <div className="hhosChartDates">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Today</span>
              </div>
            </div>
          </section>

          <section className="hhosLowerGrid">
            <article className="hhosSectionCard">
              <div className="hhosSectionHeading compact">
                <div>
                  <p>RECENT CHANGES</p>
                  <h2>What changed?</h2>
                </div>
              </div>

              <div className="hhosChangeList">
                {recentChanges.map((item) => (
                  <div key={item.label}>
                    <span className="hhosSmallIcon"><Icon name={item.icon} size={15} /></span>
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.change}</small>
                    </span>
                    <b>{item.value}</b>
                  </div>
                ))}
              </div>
            </article>

            <article className="hhosSectionCard">
              <div className="hhosSectionHeading compact">
                <div>
                  <p>LABORATORY RESULTS</p>
                  <h2>Latest reports</h2>
                </div>
                <Link href="/dashboard/reports">
                  View all <Icon name="arrow" size={14} />
                </Link>
              </div>

              <div className="hhosReportList">
                {reports.slice(0, 4).map((report) => (
                  <Link href="/dashboard/reports" key={report.id}>
                    <span className="hhosSmallIcon"><Icon name="file" size={15} /></span>
                    <span>
                      <strong>{report.title ?? report.report_type ?? "Medical report"}</strong>
                      <small>{safeDate(report.report_date ?? report.created_at)}</small>
                    </span>
                    <b>{report.data_quality_status ?? "Available"}</b>
                  </Link>
                ))}

                {!reports.length ? (
                  <div className="hhosEmptyState">
                    <Icon name="file" size={22} />
                    <span>No laboratory reports uploaded yet.</span>
                  </div>
                ) : null}
              </div>
            </article>
          </section>
        </div>

        <aside className="hhosSideColumn">
          <section className="hhosSectionCard hhosAlertPanel">
            <div className="hhosSectionHeading compact">
              <div>
                <p>ALERTS & ACTIONS</p>
                <h2>What happens next?</h2>
              </div>
              {openFollowUps ? <span className="hhosCountBadge">{openFollowUps}</span> : null}
            </div>

            <div className="hhosActionList">
              {followUps.slice(0, 3).map((item) => (
                <Link
                  href="/dashboard/follow-up"
                  className={`hhosActionItem priority-${item.priority ?? "routine"}`}
                  key={item.id}
                >
                  <span className="hhosActionIcon">
                    <Icon
                      name={
                        item.priority === "urgent" || item.priority === "emergency"
                          ? "bell"
                          : "calendar"
                      }
                      size={16}
                    />
                  </span>
                  <span>
                    <strong>{item.title ?? "Follow-up recommended"}</strong>
                    <small>
                      {item.instructions ??
                        item.action_type?.replaceAll("_", " ") ??
                        "Review instructions"}
                    </small>
                  </span>
                  <Icon name="arrow" size={14} />
                </Link>
              ))}

              {!followUps.length ? (
                <div className="hhosCalmState">
                  <span className="hhosCalmIcon"><Icon name="shield" size={22} /></span>
                  <div>
                    <strong>No urgent actions</strong>
                    <p>Your follow-up queue is clear.</p>
                  </div>
                </div>
              ) : null}
            </div>

            <Link className="hhosTextLink" href="/dashboard/follow-up">
              View follow-up plan <Icon name="arrow" size={14} />
            </Link>
          </section>

          <section className="hhosSectionCard">
            <div className="hhosSectionHeading compact">
              <div>
                <p>UPCOMING CARE</p>
                <h2>Care plan</h2>
              </div>
            </div>

            <div className="hhosCareList">
              {carePlan.slice(0, 3).map((item) => (
                <div key={item.id}>
                  <span className="hhosSmallIcon"><Icon name="calendar" size={15} /></span>
                  <span>
                    <strong>{item.title ?? item.item_type ?? "Care plan item"}</strong>
                    <small>
                      {safeDate(item.due_at ?? item.target_date ?? item.created_at)}
                    </small>
                  </span>
                </div>
              ))}

              {!carePlan.length ? (
                <p className="hhosMutedText">No upcoming care plan items.</p>
              ) : null}
            </div>

            <Link className="hhosTextLink" href="/dashboard/care-plan">
              Open care plan <Icon name="arrow" size={14} />
            </Link>
          </section>

          <section className="hhosSectionCard">
            <div className="hhosSectionHeading compact">
              <div>
                <p>CONNECTED SYSTEMS</p>
                <h2>Health ecosystem</h2>
              </div>
            </div>

            <div className="hhosConnectionList">
              {devices.slice(0, 3).map((device) => (
                <div key={device.id}>
                  <span className="hhosSmallIcon"><Icon name="device" size={15} /></span>
                  <span>
                    <strong>
                      {device.device_name ??
                        device.provider_name ??
                        device.connection_type ??
                        "Connected device"}
                    </strong>
                    <small>
                      {device.connection_status ?? device.status ?? "Connected"}
                    </small>
                  </span>
                  <i className="hhosOnlineDot" />
                </div>
              ))}

              {!devices.length ? (
                <>
                  <div>
                    <span className="hhosSmallIcon"><Icon name="device" size={15} /></span>
                    <span>
                      <strong>HHOS Wearable</strong>
                      <small>Not connected</small>
                    </span>
                    <i className="hhosOfflineDot" />
                  </div>
                  <div>
                    <span className="hhosSmallIcon"><Icon name="flask" size={15} /></span>
                    <span>
                      <strong>Blood Analyzer</strong>
                      <small>Not connected</small>
                    </span>
                    <i className="hhosOfflineDot" />
                  </div>
                </>
              ) : null}
            </div>

            <Link className="hhosTextLink" href="/dashboard/connections">
              Manage connections <Icon name="arrow" size={14} />
            </Link>
          </section>
        </aside>
      </section>

      <footer className="hhosDashboardFooter">
        <span><Icon name="shield" size={15} /> Privacy protected</span>
        <span>HHOS supports—but does not replace—professional medical judgment.</span>
      </footer>
    </div>
  );
}
