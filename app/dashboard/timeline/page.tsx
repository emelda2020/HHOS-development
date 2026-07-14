import { timelineEvents } from "@/lib/demo-data";

export default function TimelinePage() {
  return (
    <section className="pagePanel">
      <div className="pageHeading">
        <p className="eyebrow">LONGITUDINAL RECORD</p>
        <h2>Health timeline</h2>
        <p>
          A unified demonstration of wearable, home-device, laboratory, and
          care-plan information.
        </p>
      </div>

      <div className="filterRow">
        <button className="filter active">All events</button>
        <button className="filter">Measurements</button>
        <button className="filter">Laboratory</button>
        <button className="filter">Care plan</button>
      </div>

      <div className="timelineList">
        {timelineEvents.map((event) => (
          <article className="timelineEvent" key={`${event.date}-${event.time}-${event.title}`}>
            <div className="timelineDate"><strong>{event.date}</strong><small>{event.time}</small></div>
            <i />
            <div>
              <span className="eventType">{event.type}</span>
              <h3>{event.title}</h3>
              <p>{event.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
