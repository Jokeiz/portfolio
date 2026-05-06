import { useEffect, useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Fretboard from './components/Fretboard';
import LogicLab from './components/LogicLab';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Telemetry from './components/Telemetry';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import SectionDots from './components/SectionDots';
import KeyboardHint from './components/KeyboardHint';
import EasterEgg from './components/EasterEgg';

export default function App() {
  const [loading, setLoading] = useState(true);
  useSmoothScroll();
  const { easter, dismissEaster } = useKeyboardShortcuts();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  // Console signature for curious devs
  useEffect(() => {
    if (typeof window === 'undefined') return;
    /* eslint-disable no-console */
    console.log(
      '%cBuilt by Shlok ✦',
      'font-family: "Space Grotesk", sans-serif; font-size: 24px; color: #7df9d4;'
    );
    console.log(
      '%cIf you got here, you have taste. Hire me → shlokrikki@gmail.com',
      'color: #cdd5e1; font-style: italic;'
    );
    console.log(
      '%c(Try ↑↑↓↓←→←→BA on the page.)',
      'color: #7d889c; font-size: 11px;'
    );
    console.log(
      '%cBuilt mostly between 2am and a cup of chai. Vegetarian, Indian, opinionated about dal.',
      'color: #7d889c; font-size: 10px; font-style: italic;'
    );
  }, []);

  return (
    <>
      <CustomCursor />
      {loading && <Loader />}

      <ScrollProgress />
      <Navbar />
      <SectionDots />
      <KeyboardHint />
      {easter && <EasterEgg onClose={dismissEaster} />}

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <LogicLab />
        <Fretboard />
        <Experience />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <Telemetry />
    </>
  );
}
