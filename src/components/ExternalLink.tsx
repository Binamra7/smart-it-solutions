import type { ReactNode } from 'react';

/** A link that opens in a new tab, marked with a drawn arrow. */
export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <a className="ext" href={href} target="_blank" rel="noreferrer noopener">
            {children}
            <svg className="ext-arrow" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
                <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
    );
}
