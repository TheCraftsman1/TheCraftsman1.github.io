import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, Variants, AnimatePresence } from 'framer-motion';
import { SectionId } from '../types';
import MagneticButton from './MagneticButton';
import { ArrowDownRight } from 'lucide-react';
import AmbientBackground from './AmbientBackground';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
  startAnimation: boolean;
  onVideoComplete?: () => void;
}

const roles = ['Full-Stack Engineer', 'Creative Developer', 'Problem Solver', 'UI/UX Enthusiast'];

const Hero: React.FC<HeroProps> = ({ scrollToSection, startAnimation, onVideoComplete }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const [fadeVideoOut, setFadeVideoOut] = useState(false);
  
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 300 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const floatX1 = useTransform(smoothX, [-1, 1], [-40, 40]);
  const floatY1 = useTransform(smoothY, [-1, 1], [-30, 30]);
  const floatX2 = useTransform(smoothX, [-1, 1], [30, -30]);
  const floatY2 = useTransform(smoothY, [-1, 1], [20, -20]);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const yScroll = useTransform(scrollY, [0, 400], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
  };

  // Video playback animation
  useEffect(() => {
    if (!startAnimation) return;

    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Video play error:', e));
    }

    const fadeTimer = setTimeout(() => {
      setFadeVideoOut(true);
    }, 4000);

    const textTimer = setTimeout(() => {
      setShowText(true);
      
      // Trigger the reveal of the rest of the site
      setTimeout(() => {
        if (onVideoComplete) onVideoComplete();
      }, 1500); // Let the text animate in first
    }, 4300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(textTimer);
    };
  }, [startAnimation, onVideoComplete]);

  useEffect(() => {
    if (!showText) return;

    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [showText]);
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
  };

  const charVars: Variants = {
    hidden: { y: 150, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
  };

  const fadeUp: Variants = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      id={SectionId.HERO}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#fafafa]"
    >
      {/* ═══ AMBIENT BACKGROUND ═══ */}
      <AmbientBackground />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none select-none z-[1] opacity-[0.4] mix-blend-overlay">
        <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-neutral-900/20 shadow-[0_0_10px_rgba(0,0,0,0.1)]" />
        <div className="absolute right-[20%] top-0 bottom-0 w-[1px] bg-neutral-900/20 shadow-[0_0_10px_rgba(0,0,0,0.1)]" />
        <div className="absolute top-[30%] left-0 right-0 h-[1px] bg-neutral-900/20 shadow-[0_0_10px_rgba(0,0,0,0.1)]" />
        <div className="absolute bottom-[30%] left-0 right-0 h-[1px] bg-neutral-900/20 shadow-[0_0_10px_rgba(0,0,0,0.1)]" />
      </div>

      {/* ═══ NOISE TEXTURE OVERLAY ═══ */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.25] z-[1] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      {/* ═══ VIDEO BACKGROUND (Hero Construction) ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: fadeVideoOut ? 0 : 1 }}
        transition={{ duration: fadeVideoOut ? 1.5 : 1, ease: 'easeOut' }}
        className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <video
          ref={videoRef}
          src="/Untitled design.mp4"
          className="w-full h-full object-cover object-center"
          style={{ transform: 'translateZ(0)' }}
          muted
          playsInline
        />
      </motion.div>

      {/* ═══ MAIN CONTENT ═══ */}
      <motion.div style={{ opacity, y: yScroll }} className="z-10 w-full px-6 flex flex-col items-center relative">
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate={showText ? "show" : "hidden"}
          className="flex flex-col items-center w-full z-10"
        >
          {/* Overline */}
          <motion.div variants={fadeUp} className="mb-2 sm:mb-4 relative z-30 flex items-center gap-4 text-neutral-500">
            <div className="w-8 sm:w-16 h-px bg-neutral-900/30" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.5em] text-neutral-800">Portfolio 2026</span>
            <div className="w-8 sm:w-16 h-px bg-neutral-900/30" />
          </motion.div>

          {/* ── VISHNU ── */}
          <div className="overflow-hidden mb-2 relative z-20" style={{ perspective: '1000px' }}>
            <div className="flex items-center justify-center text-neutral-900">
              {'VISHNU'.split('').map((char, i) => (
                <motion.span
                  layoutId={`hero-v-${i}`}
                  key={`v-${i}`}
                  className="inline-block"
                  variants={charVars}
                  whileHover={{ 
                    y: -12, 
                    color: '#0ea5e9', // sleek sky blue 
                    scale: 1.05, 
                    rotate: Math.random() * 4 - 2,
                    textShadow: "0px 0px 20px rgba(14, 165, 233, 0.4)"
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  style={{
                    color: '#171717',
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(5rem, 15vw, 12rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ── KANCHIPATI ── */}
          <div className="overflow-hidden relative z-20 mb-4" style={{ perspective: '1000px' }}>
            <div className="flex items-center justify-center text-neutral-800">
              {'KANCHIPATI'.split('').map((char, i) => (
                <motion.span
                  layoutId={`hero-k-${i}`}
                  key={`k-${i}`}
                  className="inline-block"
                  variants={charVars}
                  whileHover={{ 
                    y: 12, 
                    color: '#10b981', // emerald-500 matching cursor trail
                    scale: 1.05, 
                    rotate: Math.random() * 4 - 2,
                    textShadow: "0px 0px 20px rgba(16, 185, 129, 0.4)"
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  style={{
                    color: '#262626',
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(5rem, 15vw, 12rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Roles & Micro-interactions */}
          <motion.div variants={fadeUp} className="mt-8 sm:mt-12 h-14 w-full flex justify-center overflow-hidden relative z-20">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.4em] text-white bg-neutral-900/90 backdrop-blur-md px-8 py-3.5 rounded-full shadow-2xl border border-neutral-800"
              >
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Intro Text */}
          <motion.div variants={fadeUp} className="mt-8 md:mt-12 flex flex-col items-center gap-8 max-w-lg text-center text-neutral-900">
            <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed">
              Engineering high-fidelity digital experiences. Bridging complex logic with minimalist, premium design.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4">
              <MagneticButton>
                <button
                  onClick={() => scrollToSection(SectionId.PROJECTS)}
                  className="px-8 py-3.5 bg-neutral-900 text-white text-xs font-bold tracking-[0.15em] uppercase rounded-full hover:bg-neutral-800 transition-colors shadow-xl flex items-center gap-3"
                >
                  Explore Work <ArrowDownRight className="w-4 h-4" />
                </button>
              </MagneticButton>
              <MagneticButton>
                <button
                  onClick={() => scrollToSection(SectionId.CONTACT)}
                  className="px-8 py-3.5 text-neutral-900 bg-white text-xs font-bold tracking-[0.15em] uppercase rounded-full border border-neutral-200 hover:border-neutral-900 transition-all duration-300"
                >
                  Contact
                </button>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modern Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">Scroll</span>
        <div className="w-[1px] h-12 bg-neutral-200 relative overflow-hidden">
          <motion.div
            animate={{ top: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 w-full h-1/2 bg-neutral-900"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
