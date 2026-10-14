import { ThemeSwitch } from './ThemeSwitch';

const links = [
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Work' },
    { href: '#studio', label: 'Studio' },
    { href: '#contact', label: 'Contact' },
];

export function Masthead() {
    return (
        <header className="masthead wrap">
            <a className="wordmark" href="#top">
                Smart IT Solutions
            </a>
            <nav className="nav" aria-label="Main">
                <ul>
                    {links.map(l => (
                        <li key={l.href}>
                            <a href={l.href}>{l.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
            <ThemeSwitch />
        </header>
    );
}
