import { useState } from 'react';
import { disciplineOrder, disciplines, projects, type Discipline } from '../content';
import { ExternalLink } from './ExternalLink';

type Filter = Discipline | 'all';

// Only offer filters that match at least one project.
const filters: Filter[] = ['all', ...disciplineOrder.filter(d => projects.some(p => p.tags.includes(d)))];

const years = projects.map(p => p.year);
const span = `${Math.min(...years)}–${Math.max(...years)}`;

export function Work() {
    const [filter, setFilter] = useState<Filter>('all');
    const shown = filter === 'all' ? projects : projects.filter(p => p.tags.includes(filter));
    const [activeTitle, setActiveTitle] = useState(projects[0]!.title);
    const active = shown.find(p => p.title === activeTitle) ?? shown[0];

    return (
        <section id="work" className="section wrap" aria-labelledby="work-title">
            <div className="section-head grid">
                <h2 id="work-title" className="section-title">
                    Selected work
                </h2>
                <p className="section-note">
                    {projects.length} projects from {span}, with screenshots taken from the live sites.
                </p>
            </div>

            <div className="filters" role="group" aria-label="Filter projects by discipline">
                <span className="filters-label">Show</span>
                {filters.map(f => (
                    <button
                        key={f}
                        type="button"
                        className="filter"
                        data-discipline={f === 'all' ? undefined : f}
                        aria-pressed={filter === f}
                        onClick={() => setFilter(f)}
                    >
                        {f !== 'all' && <span className="swatch" aria-hidden="true" />}
                        {f === 'all' ? 'All' : disciplines[f].name}
                    </button>
                ))}
            </div>

            <div className="work grid">
                <ul className="projects" aria-live="polite">
                    {shown.map(p => (
                        <li
                            key={p.title}
                            className="project"
                            data-active={p === active || undefined}
                            onMouseEnter={() => setActiveTitle(p.title)}
                            onFocus={() => setActiveTitle(p.title)}
                        >
                            <img
                                className="project-thumb"
                                src={p.image}
                                alt=""
                                width="1200"
                                height="800"
                                loading="lazy"
                                decoding="async"
                            />
                            <h3 className="project-title">{p.title}</h3>
                            <span className="project-year">{p.year}</span>
                            <p className="project-desc">{p.description}</p>
                            <ul className="project-tags" aria-label="Disciplines">
                                {p.tags.map(t => (
                                    <li key={t} data-discipline={t}>
                                        <span className="swatch" aria-hidden="true" />
                                        {disciplines[t].name}
                                    </li>
                                ))}
                            </ul>
                            <p className="project-links">
                                {p.live && <ExternalLink href={p.live}>Visit site</ExternalLink>}
                                {p.source && <ExternalLink href={p.source}>Source</ExternalLink>}
                            </p>
                            {p.note && <p className="project-note">{p.note}</p>}
                        </li>
                    ))}
                </ul>

                {active && (
                    <figure className="preview" aria-hidden="true">
                        <img key={active.image} src={active.image} alt="" width="1200" height="800" />
                        <figcaption>{active.title}</figcaption>
                    </figure>
                )}
            </div>
        </section>
    );
}
