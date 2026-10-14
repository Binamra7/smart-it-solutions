import type { ReactNode } from 'react';
import { useTheme, type ThemeChoice } from '../lib/theme';

const icon = (paths: ReactNode) => (
    <svg
        viewBox="0 0 20 20"
        width="18"
        height="18"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
    >
        {paths}
    </svg>
);

const options: { value: ThemeChoice; label: string; icon: ReactNode }[] = [
    {
        value: 'light',
        label: 'Light',
        icon: icon(
            <>
                <circle cx="10" cy="10" r="3.5" />
                <path d="M10 1.5v2.5M10 16v2.5M1.5 10H4M16 10h2.5M4 4l1.8 1.8M14.2 14.2 16 16M4 16l1.8-1.8M14.2 5.8 16 4" />
            </>
        ),
    },
    {
        value: 'dark',
        label: 'Dark',
        icon: icon(<path d="M16.5 12.2A7 7 0 1 1 7.8 3.5a5.5 5.5 0 0 0 8.7 8.7Z" />),
    },
    {
        value: 'system',
        label: 'System',
        icon: icon(
            <>
                <rect x="2" y="3.5" width="16" height="10.5" />
                <path d="M7 17.5h6M10 14v3.5" />
            </>
        ),
    },
];

/** Light / Dark / System, as a radio group of icon buttons. */
export function ThemeSwitch() {
    const { choice, choose } = useTheme();
    return (
        <div className="theme-switch" role="radiogroup" aria-label="Colour theme">
            {options.map(o => (
                <button
                    key={o.value}
                    type="button"
                    role="radio"
                    aria-checked={choice === o.value}
                    aria-label={`${o.label} theme`}
                    title={`${o.label} theme`}
                    onClick={() => choose(o.value)}
                    onKeyDown={e => {
                        const step =
                            e.key === 'ArrowRight' || e.key === 'ArrowDown'
                                ? 1
                                : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
                                  ? -1
                                  : 0;
                        if (!step) return;
                        e.preventDefault();
                        const i = (options.findIndex(x => x.value === choice) + step + options.length) % options.length;
                        choose(options[i]!.value);
                        (e.currentTarget.parentElement?.children[i] as HTMLElement | undefined)?.focus();
                    }}
                    tabIndex={choice === o.value ? 0 : -1}
                >
                    {o.icon}
                </button>
            ))}
        </div>
    );
}
