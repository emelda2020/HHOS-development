const items = [
  { title: "Preventive blood test", due: "Due by 24 July", state: "Due soon" },
  { title: "Blood-pressure review", due: "Completed 10 July", state: "Complete" },
  { title: "Annual primary-care review", due: "Scheduled 24 July", state: "Scheduled" },
  { title: "Vaccination record review", due: "No action currently required", state: "Current" }
];

export default function PreventionPage() {
  return (
    <section className="pagePanel">
      <div className="pageHeading">
        <p className="eyebrow">PREVENTIVE CARE</p>
        <h2>Your preventive-care plan</h2>
        <p>
          Demonstration reminders based on a simulated clinician-approved care plan.
        </p>
      </div>

      <div className="preventionGrid">
        {items.map((item) => (
          <article className="preventionCard" key={item.title}>
            <span className="roundIcon">✓</span>
            <div>
              <span className="eventType">{item.state}</span>
              <h3>{item.title}</h3>
              <p>{item.due}</p>
            </div>
            <button className="outlineButton">View</button>
          </article>
        ))}
      </div>
    </section>
  );
}
