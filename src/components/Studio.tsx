import { disciplines, principles, team } from '../content';
import { ExternalLink } from './ExternalLink';

export function Studio() {
    return (
        <section id="studio" className="section wrap" aria-labelledby="studio-title">
            <div className="section-head grid">
                <h2 id="studio-title" className="section-title">
                    The studio
                </h2>
            </div>

            <div className="grid">
                <p className="studio-lede">
                    Smart IT Solutions is three developers and a designer in Kathmandu. We take on a few projects at a
                    time, so each one gets the whole team.
                </p>
            </div>

            <dl className="principles">
                {principles.map(p => (
                    <div key={p.term} className="principle">
                        <dt>{p.term}</dt>
                        <dd>{p.detail}</dd>
                    </div>
                ))}
            </dl>

            <h3 className="sub-title">People</h3>
            <ul className="team">
                {team.map(m => (
                    <li key={m.name} className="person" data-discipline={m.discipline}>
                        <div className="person-photo">
                            <img src={m.photo} alt={`Portrait of ${m.name}`} width="720" height="720" loading="lazy" />
                        </div>
                        <p className="person-name">{m.name}</p>
                        <p className="person-role">
                            <span className="swatch" aria-hidden="true" />
                            {m.role}
                            <span className="visually-hidden">, leads {disciplines[m.discipline].name}</span>
                        </p>
                        {m.links && (
                            <p className="person-links">
                                {m.links.map(l => (
                                    <ExternalLink key={l.href} href={l.href}>
                                        {l.label}
                                    </ExternalLink>
                                ))}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
