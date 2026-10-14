import { describe, expect, it } from 'vitest';
import { buildMailto, validateEnquiry, type Enquiry } from './mailto';

const enquiry: Enquiry = {
    name: ' Sita Rai ',
    email: 'sita@example.com',
    message: 'We need a booking site for our guesthouse.',
};

describe('validateEnquiry', () => {
    it('accepts a complete enquiry', () => {
        expect(validateEnquiry(enquiry)).toEqual({});
    });

    it('flags a missing name, a bad email and a short message', () => {
        const errors = validateEnquiry({ ...enquiry, name: '  ', email: 'sita@', message: 'Hi' });
        expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name']);
    });
});

describe('buildMailto', () => {
    it('lays the enquiry out as an encoded email', () => {
        const url = buildMailto('hello@example.com', enquiry);
        expect(url.startsWith('mailto:hello@example.com?subject=')).toBe(true);
        const params = new URLSearchParams(url.split('?')[1]);
        expect(params.get('subject')).toBe('Project enquiry from Sita Rai');
        expect(params.get('body')).toContain('Email: sita@example.com');
        expect(params.get('body')).toContain('booking site for our guesthouse');
    });
});
