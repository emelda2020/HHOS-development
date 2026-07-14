"use client";

const values = [62, 61, 63, 62, 61, 62, 64, 63, 62, 61, 62, 63, 62, 61, 62, 62, 61, 62];

function pointsFor(values: number[]) {
  const min = 58;
  const max = 66;
  const width = 700;
  const height = 220;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / (max - min)) * height;
      return `${x},${y}`;
    })
    .join(" ");
}

export default function TrendChart() {
  return (
    <div className="trendChart">
      <svg viewBox="0 0 700 250" role="img" aria-label="Simulated resting heart-rate trend">
        {[25, 80, 135, 190].map((y) => (
          <line key={y} x1="0" x2="700" y1={y} y2={y} className="gridLine" />
        ))}
        <line x1="0" x2="700" y1="110" y2="110" className="baselineLine" />
        <polyline points={pointsFor(values)} className="trendLine" />
        <circle cx="700" cy="110" r="6" className="trendPoint" />
      </svg>
      <div className="chartLabels">
        <span>15 Jun</span><span>22 Jun</span><span>29 Jun</span><span>6 Jul</span><span>14 Jul</span>
      </div>
    </div>
  );
}
