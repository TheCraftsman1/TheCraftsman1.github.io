
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { SectionId } from './types';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import SmoothScroll from './components/SmoothScroll';
import SoundToggle from './components/SoundToggle';
import ScrollProgress from './components/ScrollProgress';
import AmbientBackground from './components/AmbientBackground';
import { motion, AnimatePresence } from 'framer-motion';

// Performance: Lazy-load below-the-fold components to reduce initial JS payload and RAM allocation
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Telemetry = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const EasterEgg = lazy(() => import('./components/EasterEgg'));

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: 0, duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setActiveSection(id);
  };

  useEffect(() => {
    if (isLoading) return;

    let ticking = false;

    const updateActiveSection = () => {
      let newlyActive: SectionId | null = null;
      const sections = Object.values(SectionId);

      // Dynamic DOM querying handles React.lazy automatically
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Trigger point is 40% from top of screen
          const triggerPoint = window.innerHeight * 0.4;

          if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
            newlyActive = section as SectionId;
          }
        }
      });

      if (newlyActive) {
        setActiveSection(prev => prev !== newlyActive ? (newlyActive as SectionId) : prev);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check in case they loaded halfway down the page
    setTimeout(updateActiveSection, 500);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <SmoothScroll>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Interactive Global Ambient Background */}
      <AmbientBackground />

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
                {/* Performance: Suspense boundary ensures Heavy 3D UI doesn't block the main thread */}
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neon-lime/50 font-mono text-sm tracking-widest uppercase">Initializing modules...</div>}>
                  <About />
                  <Experience />
                  <Projects />
                  <Telemetry />
                  <Contact />
                </Suspense>
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

      {/* Easter Egg - Hidden game (Lazy loaded) */}
      <Suspense fallback={null}>
        <EasterEgg />
      </Suspense>
    </SmoothScroll>
  );
};

export default App;
