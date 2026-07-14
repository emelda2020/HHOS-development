import TrendChart from "@/components/TrendChart";
import { healthMetrics } from "@/lib/demo-data";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <section className="heroCard">
        <div>
          <p className="eyebrow light">YOUR HEALTH TODAY</p>
          <h2>Your health appears stable overall.</h2>
          <p>
            One simulated trend may benefit from review. No urgent changes are
            represented in this demonstration.
          </p>
          <div className="heroActions">
            <Link className="primaryAction small" href="/dashboard/timeline">
              Review timeline
            </Link>
            <button className="ghostAction">View summary</button>
          </div>
        </div>
        <div className="completionRing">
          <strong>92%</strong>
          <span>Data complete</span>
        </div>
      </section>

      <section className="metricGrid">
        {healthMetrics.map((metric) => (
          <article className="metricCard" key={metric.label}>
            <div className="metricTop">
              <span className="metricSymbol">{metric.symbol}</span>
              <span className={`statusPill ${metric.status.toLowerCase()}`}>
                {metric.status}
              </span>
            </div>
            <p>{metric.label}</p>
            <h3>{metric.value} <small>{metric.unit}</small></h3>
            <span className="metricNote">{metric.note}</span>
          </article>
        ))}
      </section>

      <section className="contentGrid">
        <article className="panel wide">
          <div className="panelHeader">
            <div>
              <p className="eyebrow">PERSONAL BASELINE</p>
              <h3>30-day health trend</h3>
            </div>
            <span className="controlPill">Resting heart rate</span>
          </div>
          <TrendChart />
          <div className="chartLegend">
            <span><i className="currentLegend" /> Current trend</span>
            <span><i className="baselineLegend" /> Personal baseline</span>
          </div>
        </article>

        <article className="panel">
          <div className="panelHeader">
            <div>
              <p className="eyebrow">ATTENTION</p>
              <h3>Items to review</h3>
            </div>
            <span className="numberBadge">2</span>
          </div>

          <div className="reviewItem">
            <span className="roundIcon">☾</span>
            <span><strong>Sleep below baseline</strong><small>6 consecutive days</small></span>
          </div>
          <div className="reviewItem">
            <span className="roundIcon">⌁</span>
            <span><strong>Preventive blood test due</strong><small>Due by 24 July</small></span>
          </div>

          <div className="safetyBox">
            <strong>Clinical safety notice</strong>
            <p>
              This development application supports product design only. It
              does not provide diagnosis or medical advice.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
