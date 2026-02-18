
import React, { useState, useEffect } from 'react';
import { SectionId } from './types';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Telemetry from './components/Skills';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import SmoothScroll from './components/SmoothScroll';
import EasterEgg from './components/EasterEgg';
import SoundToggle from './components/SoundToggle';
import ScrollProgress from './components/ScrollProgress';
import { motion, AnimatePresence } from 'framer-motion';

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
    <SmoothScroll>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Scroll Progress */}
      <ScrollProgress />

      <div className={`min-h-screen bg-black text-white selection:bg-neon-lime selection:text-black overflow-x-hidden ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <CustomCursor />
        <Navbar scrollToSection={scrollToSection} activeSection={activeSection} />

        {/* Sound Toggle - Fixed position */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <SoundToggle />
        </motion.div>

        <main>
          <Hero scrollToSection={scrollToSection} startAnimation={!isLoading} />

          <AnimatePresence>
            {!isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <About />
                <Projects />
                <Telemetry />
                <Contact />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="py-8 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-600 text-xs font-exo">
                © 2026 Vishnu Kanchipati. Crafted with passion.
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[10px] text-gray-700 font-mono">
                  Built with React + Three.js + Framer Motion
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Easter Egg - Hidden game */}
      <EasterEgg />
    </SmoothScroll>
  );
};

export default App;
