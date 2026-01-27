
import React, { useState, useEffect } from 'react';
import { SectionId } from './types';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Telemetry from './components/Skills'; // Renamed in UI but keeping file name
import OffTrack from './components/OffTrack';
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
    const handleScroll = () => {
      const sections = Object.values(SectionId);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -300 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          <OffTrack />
          <Contact />
        </main>
      </div>
    </>
  );
};

export default App;
