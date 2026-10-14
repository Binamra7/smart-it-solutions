import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';
import { projects } from './content';

describe('App', () => {
    it('leads with the headline and the four disciplines', () => {
        render(<App />);
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('We design and build software');
        for (const name of ['Web', 'Backend', 'Mobile', 'Design']) {
            expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
        }
    });

    it('filters the project list by discipline', async () => {
        const user = userEvent.setup();
        render(<App />);
        const list = () =>
            within(screen.getByRole('region', { name: 'Selected work' })).getAllByRole('heading', { level: 3 });
        expect(list()).toHaveLength(projects.length);

        const backend = screen.getByRole('button', { name: 'Backend' });
        await user.click(backend);
        expect(backend).toHaveAttribute('aria-pressed', 'true');
        expect(list().map(h => h.textContent)).toEqual(projects.filter(p => p.tags.includes('api')).map(p => p.title));
    });

    it('marks offline projects and links only to their source', () => {
        render(<App />);
        const row = screen.getByRole('heading', { name: 'PK Arts' }).closest('li')!;
        expect(within(row).queryByRole('link', { name: /visit site/i })).toBeNull();
        expect(within(row).getByRole('link', { name: /source/i })).toHaveAttribute(
            'href',
            'https://github.com/Binamra7/brochure'
        );
        expect(row).toHaveTextContent('Source only');
    });

    it('shows field errors instead of sending an incomplete enquiry', async () => {
        const user = userEvent.setup();
        render(<App />);
        await user.click(screen.getByRole('button', { name: 'Write the email' }));
        expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
        expect(screen.getByLabelText('Name')).toHaveFocus();
        expect(screen.getByText('Tell us your name.')).toBeInTheDocument();
    });

    it('remembers a picked theme and can go back to the system setting', async () => {
        const user = userEvent.setup();
        render(<App />);
        const system = screen.getByRole('radio', { name: 'System theme' });
        const dark = screen.getByRole('radio', { name: 'Dark theme' });
        expect(system).toHaveAttribute('aria-checked', 'true');

        await user.click(dark);
        expect(dark).toHaveAttribute('aria-checked', 'true');
        expect(document.documentElement.dataset.theme).toBe('dark');
        expect(localStorage.getItem('sis-theme')).toBe('dark');

        await user.keyboard('{ArrowLeft}');
        expect(screen.getByRole('radio', { name: 'Light theme' })).toHaveFocus();
        expect(document.documentElement.dataset.theme).toBe('light');

        await user.click(system);
        expect(document.documentElement.dataset.theme).toBeUndefined();
        expect(localStorage.getItem('sis-theme')).toBeNull();
    });
});
