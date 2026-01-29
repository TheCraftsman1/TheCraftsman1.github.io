
import React, { useState, useEffect } from 'react';
import { SectionId } from './types';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Telemetry from './components/Skills'; // Renamed in UI but keeping file name

import Contact from './components/Contact';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  useEffect(() => {
    // Optimization: Use IntersectionObserver instead of scroll event listener
    // to prevent layout thrashing and improve scroll performance.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    const sections = Object.values(SectionId);
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className={`min-h-screen bg-black text-white selection:bg-neon-lime selection:text-black overflow-x-hidden ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <CustomCursor />
        <Navbar scrollToSection={scrollToSection} activeSection={activeSection} />

        <main>
          <Hero scrollToSection={scrollToSection} startAnimation={!isLoading} />
          <About />
          <Projects />
          <Telemetry />

          <Contact />
        </main>
      </div>
    </>
  );
};

export default App;
