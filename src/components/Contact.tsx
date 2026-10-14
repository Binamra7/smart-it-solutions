import { useState, type FormEvent } from 'react';
import { contact } from '../content';
import { buildMailto, validateEnquiry, type Enquiry, type EnquiryErrors } from '../lib/mailto';

const empty: Enquiry = { name: '', email: '', message: '' };

export function Contact() {
    const [form, setForm] = useState<Enquiry>(empty);
    const [errors, setErrors] = useState<EnquiryErrors>({});
    const [status, setStatus] = useState('');

    const set = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => setForm(f => ({ ...f, [key]: value }));

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const found = validateEnquiry(form);
        setErrors(found);
        const first = Object.keys(found)[0];
        if (first) {
            setStatus('');
            e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
            return;
        }
        window.location.href = buildMailto(contact.email, form);
        setStatus('Your email app should open with the message filled in. Press send there to reach us.');
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contact.email);
            setStatus(`Copied ${contact.email} to your clipboard.`);
        } catch {
            setStatus(`Couldn’t copy automatically. Our address is ${contact.email}.`);
        }
    };

    const field = (name: 'name' | 'email' | 'message') => ({
        name,
        id: `f-${name}`,
        'aria-invalid': errors[name] ? true : undefined,
        'aria-describedby': errors[name] ? `f-${name}-error` : undefined,
    });

    const error = (name: 'name' | 'email' | 'message') =>
        errors[name] && (
            <p id={`f-${name}-error`} className="field-error">
                {errors[name]}
            </p>
        );

    return (
        <section id="contact" className="section wrap" aria-labelledby="contact-title">
            <div className="contact grid">
                <div className="contact-intro">
                    <h2 id="contact-title" className="contact-title">
                        Tell us what you’re building.
                    </h2>
                    <p className="contact-lede">
                        Fill in the form and it opens as an email in your own mail app, or write to us directly.
                    </p>
                    <p className="contact-email">
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </p>
                    <p className="contact-copy">
                        <button type="button" className="text-button" onClick={copyEmail}>
                            Copy address
                        </button>
                    </p>
                    <address className="contact-address">{contact.address}</address>
                </div>

                <form className="enquiry" noValidate onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="f-name">Name</label>
                        <input
                            {...field('name')}
                            autoComplete="name"
                            value={form.name}
                            onChange={e => set('name', e.target.value)}
                        />
                        {error('name')}
                    </div>
                    <div className="field">
                        <label htmlFor="f-email">Email</label>
                        <input
                            {...field('email')}
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={e => set('email', e.target.value)}
                        />
                        {error('email')}
                    </div>
                    <div className="field">
                        <label htmlFor="f-message">Message</label>
                        <textarea
                            {...field('message')}
                            rows={5}
                            value={form.message}
                            onChange={e => set('message', e.target.value)}
                        />
                        {error('message')}
                    </div>
                    <p className="enquiry-actions">
                        <button type="submit" className="button">
                            Write the email
                        </button>
                    </p>
                    <p className="enquiry-status" role="status">
                        {status}
                    </p>
                </form>
            </div>
        </section>
    );
}
