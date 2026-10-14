import { useCallback, useEffect, useState } from 'react';

export type ThemeChoice = 'light' | 'dark' | 'system';

const KEY = 'sis-theme';
const DARK = '(prefers-color-scheme: dark)';
const PAPER = { light: '#f2f2ee', dark: '#131614' };

export function readStoredTheme(): ThemeChoice {
    try {
        const value = window.localStorage.getItem(KEY);
        return value === 'light' || value === 'dark' ? value : 'system';
    } catch {
        return 'system';
    }
}

/**
 * The visitor's theme choice. "system" follows the OS; "light" and "dark" are stored and written
 * to `data-theme` on <html> (index.html applies a stored choice before first paint).
 */
export function useTheme() {
    const [choice, setChoice] = useState<ThemeChoice>(readStoredTheme);
    const [systemDark, setSystemDark] = useState(() => window.matchMedia?.(DARK).matches ?? false);

    useEffect(() => {
        const query = window.matchMedia?.(DARK);
        if (!query) return;
        const onChange = () => setSystemDark(query.matches);
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, []);

    const resolved = choice === 'system' ? (systemDark ? 'dark' : 'light') : choice;

    useEffect(() => {
        const root = document.documentElement;
        if (choice === 'system') delete root.dataset.theme;
        else root.dataset.theme = choice;
        // Keep the browser chrome in step with the page.
        document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.setAttribute('content', PAPER[resolved]));
    }, [choice, resolved]);

    const choose = useCallback((next: ThemeChoice) => {
        const root = document.documentElement;
        // Cross-fade colours for this change only, so first paint and system switches stay instant.
        root.dataset.themeSwitching = '';
        window.setTimeout(() => delete root.dataset.themeSwitching, 300);
        setChoice(next);
        try {
            if (next === 'system') window.localStorage.removeItem(KEY);
            else window.localStorage.setItem(KEY, next);
        } catch {
            // Storage can be unavailable (private mode); the choice then lasts for this visit.
        }
    }, []);

    return { choice, resolved, choose };
}
