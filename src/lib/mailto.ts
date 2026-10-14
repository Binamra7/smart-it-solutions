export interface Enquiry {
    name: string;
    email: string;
    message: string;
}

export type EnquiryErrors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiry(e: Enquiry): EnquiryErrors {
    const errors: EnquiryErrors = {};
    if (!e.name.trim()) errors.name = 'Tell us your name.';
    if (!EMAIL.test(e.email.trim())) errors.email = 'Enter an email address we can reply to, like you@company.com.';
    if (e.message.trim().length < 20)
        errors.message = 'A sentence or two about the project, please (20 characters or more).';
    return errors;
}

/** Builds a mailto: link with the enquiry laid out as a plain-text email. */
export function buildMailto(to: string, e: Enquiry): string {
    const subject = `Project enquiry from ${e.name.trim()}`;
    const body = [`Name: ${e.name.trim()}`, `Email: ${e.email.trim()}`, '', e.message.trim()].join('\n');
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
