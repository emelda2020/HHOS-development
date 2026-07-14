import { connections } from "@/lib/demo-data";

export default function ConnectionsPage() {
  return (
    <section className="pagePanel">
      <div className="pageHeading">
        <p className="eyebrow">DATA & CONSENT</p>
        <h2>Data connections</h2>
        <p>
          Every future connection should display provenance, synchronization,
          authorization, and revocation controls.
        </p>
      </div>

      <div className="connectionList">
        {connections.map((connection) => (
          <article className="connectionRow" key={connection.name}>
            <span className="roundIcon">↗</span>
            <div>
              <h3>{connection.name}</h3>
              <p>{connection.detail}</p>
            </div>
            <div className="connectionMeta">
              <span className="consentState"><i /> {connection.status}</span>
              <small>Last sync: {connection.sync}</small>
            </div>
            <button className="outlineButton">Manage</button>
          </article>
        ))}
      </div>

      <div className="safetyBox spacious">
        <strong>Production requirement</strong>
        <p>
          Real connections must use verified identity, explicit consent,
          encryption, audit logs, data provenance, least-privilege access, and
          jurisdiction-appropriate retention controls.
        </p>
      </div>
    </section>
  );
}
