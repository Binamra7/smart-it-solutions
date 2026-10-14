import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Masthead } from './components/Masthead';
import { Studio } from './components/Studio';
import { Work } from './components/Work';
import './App.css';

export default function App() {
    return (
        <>
            <a className="skip-link" href="#main">
                Skip to content
            </a>
            <Masthead />
            <main id="main">
                <Hero />
                <Work />
                <Studio />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
