import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import MagneticButton from './MagneticButton';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
  startAnimation: boolean;
  onVideoComplete?: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection, startAnimation, onVideoComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      // Simulate brief loading/entrance preparation
      const timer = setTimeout(() => {
        setIsLoaded(true);
        if (onVideoComplete) onVideoComplete();
      }, 300);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation]);

  // Framer motion variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section
      id={SectionId.HERO}
      className="relative min-h-screen w-full flex flex-col justify-center bg-neutral-50 dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 overflow-hidden pt-20 transition-colors duration-500"
    >
      {/* ── SUBTLE CSS GRID BACKGROUND (Responsive to Light/Dark) ── */}
      {/* Light Mode Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-0 z-0 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)'
        }}
      />
      {/* Dark Mode Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-20 z-0 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          
          {/* ── LEFT COLUMN: MAIN HEADINGS ── */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div variants={itemVars} className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-neutral-300 dark:bg-neutral-600 transition-colors duration-500" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400 font-semibold transition-colors duration-500">
                Portfolio 2026
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVars}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4 text-neutral-900 dark:text-white transition-colors duration-500"
            >
              Vishnu <br />
              <span className="text-neutral-400 dark:text-neutral-500 transition-colors duration-500">Kanchipati.</span>
            </motion.h1>
            
            <motion.div variants={itemVars} className="mt-6 flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 border border-neutral-200 dark:border-neutral-800 rounded-full bg-white/80 dark:bg-neutral-900/50 backdrop-blur-sm transition-colors duration-500">
                <span className="text-xs font-medium tracking-widest text-neutral-600 dark:text-neutral-300 uppercase transition-colors duration-500">
                  Software Engineer
                </span>
              </div>
              <div className="px-4 py-2 border border-neutral-200 dark:border-neutral-800 rounded-full bg-white/80 dark:bg-neutral-900/50 backdrop-blur-sm transition-colors duration-500">
                <span className="text-xs font-medium tracking-widest text-neutral-600 dark:text-neutral-300 uppercase transition-colors duration-500">
                  Creative Developer
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: DETAILS & CTAS ── */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pl-10">
            <motion.p 
              variants={itemVars}
              className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed mb-10 max-w-lg transition-colors duration-500"
            >
              Engineering high-fidelity digital experiences. Bridging complex logic with minimalist, premium design to build robust and scalable solutions.
            </motion.p>

            <motion.div variants={itemVars} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <MagneticButton>
                <button
                  onClick={() => scrollToSection(SectionId.PROJECTS)}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-300 group w-full sm:w-auto"
                >
                  Explore Work
                  <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                </button>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={() => scrollToSection(SectionId.CONTACT)}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-xs font-bold uppercase tracking-widest rounded-full hover:border-neutral-900 dark:hover:border-white transition-colors duration-300 group w-full sm:w-auto"
                >
                  Contact Me
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticButton>
            </motion.div>
            
            {/* Resume Link Mini */}
            <motion.div variants={itemVars} className="mt-8">
              <a 
                href="/vishnu-resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white uppercase tracking-widest transition-colors duration-300 relative group"
              >
                View Full Resume
                <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neutral-900 dark:bg-white group-hover:w-full transition-all duration-300" />
              </a>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 [writing-mode:vertical-rl] rotate-180 transition-colors duration-500">Scroll</span>
        <div className="w-[1px] h-12 bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden transition-colors duration-500">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 top-0 w-full h-full bg-neutral-900 dark:bg-white transition-colors duration-500"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
