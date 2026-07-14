import { careTeam } from "@/lib/demo-data";

export default function CareTeamPage() {
  return (
    <section className="pagePanel">
      <div className="pageHeading">
        <p className="eyebrow">AUTHORIZED COLLABORATION</p>
        <h2>Care team</h2>
        <p>
          People and organizations authorized to participate in the simulated care relationship.
        </p>
      </div>

      <div className="peopleGrid">
        {careTeam.map((person) => (
          <article className="personCard" key={person.name}>
            <span className="largeAvatar">{person.initials}</span>
            <div>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
              <span className="consentState"><i /> {person.status}</span>
            </div>
            <button className="outlineButton">View access</button>
          </article>
        ))}
      </div>
    </section>
  );
}
