import { contact } from '../content';
import { ExternalLink } from './ExternalLink';

export function Footer() {
    return (
        <footer className="wrap">
            <div className="footer">
                <ul className="footer-social">
                    {contact.social.map(s => (
                        <li key={s.href}>
                            <ExternalLink href={s.href}>{s.label}</ExternalLink>
                        </li>
                    ))}
                </ul>
                <p>
                    © {new Date().getFullYear()} Smart IT Solutions, Kathmandu. Designed and built by{' '}
                    <ExternalLink href="https://github.com/Binamra7">Binamra Khadka</ExternalLink>.{' '}
                    <ExternalLink href="https://github.com/Binamra7/smart-it-solutions">Source</ExternalLink>
                </p>
            </div>
        </footer>
    );
}
