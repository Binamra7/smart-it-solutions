export type Discipline = 'web' | 'api' | 'app' | 'ui';

export const disciplines: Record<Discipline, { name: string; summary: string; services: string[] }> = {
    web: {
        name: 'Web',
        summary: 'Sites and web apps that load fast and are easy to change later.',
        services: ['React and Next.js front ends', 'Online stores', 'Dashboards and data visualisation'],
    },
    api: {
        name: 'Backend',
        summary: 'The servers, databases and integrations behind them.',
        services: ['REST APIs in Node.js', 'MongoDB and PostgreSQL', 'Logins, payments and hosting'],
    },
    app: {
        name: 'Mobile',
        summary: 'Apps for iOS and Android from one codebase.',
        services: ['React Native apps', 'Offline support and push notifications', 'App Store and Play Store releases'],
    },
    ui: {
        name: 'Design',
        summary: 'Interfaces people understand without a manual.',
        services: ['UX research and wireframes', 'Interface design and prototypes', 'Design systems'],
    },
};

export const disciplineOrder: Discipline[] = ['web', 'api', 'app', 'ui'];

export interface Project {
    title: string;
    description: string;
    year: number;
    tags: Discipline[];
    image: string;
    /** Live URL, or null when the deployment no longer exists. */
    live: string | null;
    source: string | null;
    /** Shown instead of the live link when the site is down or partly broken. */
    note?: string;
}

export const projects: Project[] = [
    {
        title: 'Skycast',
        description:
            'A weather app that prints the sky over any city as a poster. Rebuilt in 2026 with React 19 and TypeScript.',
        year: 2022,
        tags: ['web', 'ui'],
        image: '/work/skycast.webp',
        live: 'https://weather-app-topaz-xi.vercel.app/',
        source: 'https://github.com/Binamra7/weather-app',
    },
    {
        title: 'SleekStore',
        description:
            'A full-stack online store with a catalogue, search and filters, a cart and customer accounts. MERN stack.',
        year: 2022,
        tags: ['web', 'api'],
        image: '/work/sleekstore.webp',
        live: 'https://sleekstore.vercel.app/',
        source: 'https://github.com/Binamra7/mern-ecommerce',
    },
    {
        title: 'Bug Reporter',
        description: 'Bug reporting and tracking with severity levels and an admin dashboard. MERN stack.',
        year: 2022,
        tags: ['web', 'api'],
        image: '/work/bug-reporter.webp',
        live: 'https://bug-reporter-virid.vercel.app/',
        source: 'https://github.com/Binamra7/bugReporter',
    },
    {
        title: 'FilmStop',
        description: 'Visitors rate films and the app ranks the top five by audience score.',
        year: 2022,
        tags: ['web', 'api'],
        image: '/work/filmstop.webp',
        live: 'https://filmstop.vercel.app/',
        source: 'https://github.com/Binamra7/Filmstop',
        note: 'The site is up but its ratings API is offline.',
    },
    {
        title: 'Personal portfolio',
        description: 'Binamra’s own site, with his work and a live clock for Kathmandu.',
        year: 2021,
        tags: ['web', 'ui'],
        image: '/work/portfolio.webp',
        live: 'https://binamrakhadka.vercel.app/',
        source: 'https://github.com/Binamra7/personal-portfolio',
    },
    {
        title: 'Apple website clone',
        description: 'A rebuild of apple.com’s home page, done as a layout exercise.',
        year: 2021,
        tags: ['web', 'ui'],
        image: '/work/apple-clone.webp',
        live: 'https://stupefied-goldwasser-a7bc06.netlify.app/',
        source: null,
    },
    {
        title: 'PK Arts',
        description: 'A portfolio site for a painter, with a gallery and contact page.',
        year: 2021,
        tags: ['web', 'ui'],
        image: '/work/pk-arts.webp',
        live: null,
        source: 'https://github.com/Binamra7/brochure',
        note: 'Hosted on Heroku’s free tier, which has closed. Source only.',
    },
    {
        title: 'Expense tracker',
        description: 'Log expenses, filter them by year and see spending month by month.',
        year: 2021,
        tags: ['web'],
        image: '/work/expense-tracker.webp',
        live: null,
        source: 'https://github.com/Binamra7/Udemy-React',
        note: 'The deployment has been removed. Source only.',
    },
    {
        title: 'Pizza shop',
        description: 'A home page and menu for Roma Pizzeria, a pizza restaurant.',
        year: 2021,
        tags: ['web', 'ui'],
        image: '/work/pizza.webp',
        live: null,
        source: 'https://github.com/Binamra7/Pizza',
        note: 'The deployment has been removed. Source only.',
    },
];

export interface Person {
    name: string;
    role: string;
    discipline: Discipline;
    photo: string;
    links?: { label: string; href: string }[];
}

export const team: Person[] = [
    {
        name: 'Binamra Khadka',
        role: 'Full-stack developer',
        discipline: 'web',
        photo: '/team/1.webp',
        links: [
            { label: 'GitHub', href: 'https://github.com/Binamra7' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/binamra7' },
        ],
    },
    { name: 'Arjun Dahal', role: 'Backend developer', discipline: 'api', photo: '/team/2.webp' },
    { name: 'Miroj Rai', role: 'Mobile developer', discipline: 'app', photo: '/team/3.webp' },
    { name: 'Anish Baraily', role: 'UI/UX designer', discipline: 'ui', photo: '/team/4.webp' },
];

export const principles: { term: string; detail: string }[] = [
    {
        term: 'One team, start to finish',
        detail: 'The same four people design, build and ship your project, so nothing gets lost in a hand-off.',
    },
    {
        term: 'Working software every week',
        detail: 'You get a link to a deployed preview each week, not a status report.',
    },
    {
        term: 'Clear quotes, kept deadlines',
        detail: 'We agree the scope in writing before we start and tell you early if anything changes it.',
    },
    {
        term: 'You own everything',
        detail: 'Code, designs, domains and hosting accounts are in your name from day one.',
    },
];

export const contact = {
    email: 'binamra7khadka6@gmail.com',
    address: 'Budhanilkantha 12, Kathmandu, Nepal',
    social: [
        { label: 'GitHub', href: 'https://github.com/Binamra7' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/binamra7' },
        { label: 'X', href: 'https://x.com/whoKhadka' },
        { label: 'Facebook', href: 'https://www.facebook.com/whoBinamraKhadka/' },
    ],
};
