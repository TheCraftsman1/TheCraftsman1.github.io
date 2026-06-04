
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { SectionId } from './types';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import ScrollReveal from './components/ScrollReveal';
import CustomCursor from './components/CustomCursor';
import { motion, AnimatePresence } from 'framer-motion';

const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const EasterEgg = lazy(() => import('./components/EasterEgg'));
const WorkPage = lazy(() => import('./components/WorkPage'));

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);
  const [currentView, setCurrentView] = useState<'home' | 'work'>('home');
  const [isVideoComplete, setIsVideoComplete] = useState(false);

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

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
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
    setTimeout(updateActiveSection, 500);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <SmoothScroll enabled={!isLoading}>
      <>
        {!isLoading && <CustomCursor />}
        <AnimatePresence mode="wait">
          {isLoading && <Loader key="loader" onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>



      {/* Scroll Progress */}
      <ScrollProgress />

      <div className={`relative min-h-screen bg-neutral-50 dark:bg-[#09090b] z-10 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 overflow-x-hidden transition-colors duration-500 ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        
        <AnimatePresence>
          {(!isLoading && isVideoComplete) && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Navbar 
                scrollToSection={scrollToSection} 
                activeSection={activeSection} 
                currentView={currentView}
                setCurrentView={setCurrentView}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          <AnimatePresence mode="wait">
            {currentView === 'home' ? (
              <motion.div
                key="home-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Hero 
                  scrollToSection={scrollToSection} 
                  startAnimation={!isLoading} 
                  onVideoComplete={() => setIsVideoComplete(true)} 
                />

                <AnimatePresence>
                  {(!isLoading && isVideoComplete) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-300 text-sm tracking-widest uppercase font-medium">Loading...</div>}>
                        <ScrollReveal animation="fade-up">
                  <About />
                        </ScrollReveal>
                        <ScrollReveal animation="fade-up" delay={200}>
                  <Experience />
                        </ScrollReveal>
                        <ScrollReveal animation="fade-up" delay={200}>
                          <Projects setCurrentView={setCurrentView} />
                        </ScrollReveal>
                        <ScrollReveal animation="fade-up" delay={200}>
                          <Skills />
                        </ScrollReveal>
                        <ScrollReveal animation="zoom-in" delay={200}>
                  <Contact />
                        </ScrollReveal>
                      </Suspense>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="work-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-300 text-sm tracking-widest uppercase font-medium">Loading...</div>}>
                  <WorkPage setCurrentView={setCurrentView} />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="py-8 bg-neutral-50 dark:bg-[#09090b] border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-neutral-400 text-xs font-medium">
                © 2026 Vishnu Kanchipati
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[10px] text-neutral-300 font-medium uppercase tracking-widest">
                  React + Framer Motion
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Easter Egg */}
      <Suspense fallback={null}>
        <EasterEgg />
      </Suspense>
      </>
    </SmoothScroll>
  );
};

export default App;
