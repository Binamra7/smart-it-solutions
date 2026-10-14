import type { CSSProperties } from 'react';
import { disciplineOrder, disciplines } from '../content';

export function Hero() {
    return (
        <>
            <section className="hero wrap grid" aria-labelledby="hero-title">
                <h1 id="hero-title" className="hero-title">
                    We design and build software for growing businesses.
                </h1>
                <div className="hero-info">
                    <p>
                        A four-person studio in Kathmandu making web apps, APIs, mobile apps and the interfaces on top
                        of them.
                    </p>
                    <p className="hero-actions">
                        <a className="button" href="#contact">
                            Start a project
                        </a>
                        <a href="#work">See the work</a>
                    </p>
                </div>
            </section>

            <section id="services" className="services" aria-labelledby="services-title">
                <h2 id="services-title" className="visually-hidden">
                    What we do
                </h2>
                <ol className="bands">
                    {disciplineOrder.map((key, step) => {
                        const d = disciplines[key];
                        return (
                            <li
                                key={key}
                                className="band"
                                data-discipline={key}
                                style={{ '--step': step } as CSSProperties}
                            >
                                <div className="band-inner wrap grid">
                                    <h3 className="band-name">{d.name}</h3>
                                    <div className="band-copy">
                                        <p className="band-summary">{d.summary}</p>
                                        <ul className="band-services">
                                            {d.services.map(s => (
                                                <li key={s}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </section>
        </>
    );
}
