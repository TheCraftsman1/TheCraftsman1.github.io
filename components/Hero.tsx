import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, Variants, MotionValue, AnimatePresence } from 'framer-motion';
import { SectionId } from '../types';
import MagneticButton from './MagneticButton';
import { ArrowDownRight } from 'lucide-react';
import FrostedGlassBackground from './FrostedGlassBackground';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
  startAnimation: boolean;
  onVideoComplete?: () => void;
}

const roles = ['Full-Stack Engineer', 'Creative Developer', 'Problem Solver', 'UI/UX Enthusiast'];

// ── NEW COMPONENT: Kinetic Letter ──
const KineticLetter = ({ char, i, indexOffset, scrollY, color, wordName, charVars }: { char: string, i: number, indexOffset: number, scrollY: MotionValue<number>, color: string, wordName: string, charVars: Variants }) => {
  // Explode letters at different rates/directions
  const speed = (i % 2 === 0 ? -120 : 120) * (1 + (i * 0.1));
  const letterY = useTransform(scrollY, [0, 600], [0, speed]);
  const stretch = useTransform(scrollY, [0, 400], [100, 100 + (i * 5)]); // Variable font stretch trick

  return (
    <motion.span
      layoutId={`hero-${wordName}-${i}`}
      variants={charVars}
      whileHover={{ 
        y: indexOffset, 
        color: color, 
        scale: 1.05, 
        rotate: Math.random() * 4 - 2,
        textShadow: `0px 0px 20px ${color}`
      }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      style={{
        y: letterY,
        fontStretch: stretch,
        color: '#111111',
        fontFamily: "'Syne', sans-serif",
        fontSize: 'clamp(2.5rem, 6vw, 7rem)',
        fontWeight: 900,
        lineHeight: 0.95,
        letterSpacing: '-0.02em',
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 10px 40px 0 rgba(0, 0, 0, 0.08)"
      }}
      className="inline-block rounded-2xl mx-[1px] px-2 sm:px-3"
    >
      {char}
    </motion.span>
  );
};

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

  // Entrance timing
  useEffect(() => {
    if (!startAnimation) return;

    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Video play error:', e));
    }

    const fadeTimer = setTimeout(() => {
      setFadeVideoOut(true);
    }, 500);

    const textTimer = setTimeout(() => {
      setShowText(true);
      
      // Trigger the reveal of the rest of the site
      setTimeout(() => {
        if (onVideoComplete) onVideoComplete();
      }, 1500); // Let the text animate in first
    }, 800); // Drastically reduced from 4300 to 800! Text now appears *with* the rings

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

  // Main text container variants - replacing with horizontal blur/stretch effect
  const fadeRight: Variants = {
    hidden: { opacity: 0, x: -150, scaleX: 3, filter: 'blur(10px)' },
    show: { 
      opacity: 1, 
      x: 0, 
      scaleX: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const charVars: Variants = {
    hidden: { opacity: 0, x: -150, scaleX: 4, filter: 'blur(12px)' },
    show: { 
      opacity: 1, 
      x: 0, 
      scaleX: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section
      id={SectionId.HERO}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#fafafa]"
    >
      {/* ═══ AMBIENT BACKGROUND ═══ */}
      <FrostedGlassBackground startAnimation={startAnimation} />

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
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22%3E%3Canimate attributeName=%22baseFrequency%22 dur=%220.3s%22 values=%220.65; 0.67; 0.65%22 repeatCount=%22indefinite%22/%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      {/* ═══ MAIN CONTENT ═══ */}
      <motion.div style={{ opacity, y: yScroll }} className="z-10 w-full px-6 flex flex-col items-center relative">
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate={showText ? "show" : "hidden"}
          className="flex flex-col items-center w-full z-10"
        >
          {/* Overline */}
          <motion.div variants={fadeRight} className="mb-2 sm:mb-4 relative z-30 flex items-center gap-4 text-neutral-500">
            <div className="w-8 sm:w-16 h-px bg-neutral-900/30" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.5em] text-neutral-800">Portfolio 2026</span>
            <div className="w-8 sm:w-16 h-px bg-neutral-900/30" />
          </motion.div>

          {/* ── VISHNU ── */}
          <div className="overflow-visible mb-2 relative z-20" style={{ perspective: '1000px' }}>
            <div className="flex items-center justify-center text-neutral-900">
              {'VISHNU'.split('').map((char, i) => (
                <KineticLetter 
                  key={`v-${i}`}
                  char={char}
                  i={i}
                  indexOffset={-12}
                  scrollY={scrollY}
                  color="#0ea5e9" // sky blue
                  wordName="v"
                  charVars={charVars}
                />
              ))}
            </div>
          </div>

          {/* ── KANCHIPATI ── */}
          <div className="overflow-visible relative z-20 mb-4" style={{ perspective: '1000px' }}>
            <div className="flex items-center justify-center text-neutral-900 mt-4 sm:mt-2">
              {'KANCHIPATI'.split('').map((char, i) => (
                <KineticLetter 
                  key={`k-${i}`}
                  char={char}
                  i={i}
                  indexOffset={12}
                  scrollY={scrollY}
                  color="#10b981" // emerald
                  wordName="k"
                  charVars={charVars}
                />
              ))}
            </div>
          </div>

          {/* Roles & Micro-interactions */}
          <motion.div variants={fadeRight} className="mt-6 sm:mt-8 h-14 w-full flex justify-center overflow-hidden relative z-20">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 30, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-neutral-600 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-neutral-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
              >
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Intro Text */}
          <motion.div variants={fadeRight} className="mt-8 md:mt-12 flex flex-col items-center gap-8 max-w-lg text-center z-30 relative">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/20 backdrop-blur-[12px] border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
              <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-1 relative z-10">
                {"Engineering high-fidelity digital experiences. Bridging complex logic with minimalist, premium design.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-sm md:text-base text-neutral-800 font-medium tracking-wide"
                    initial={{ x: -20, opacity: 0 }}
                    animate={showText ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.2 + i * 0.04
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <motion.div variants={fadeRight} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full mt-2 relative z-30">
              <MagneticButton>
                <button
                  onClick={() => scrollToSection(SectionId.PROJECTS)}
                  className="relative overflow-hidden px-6 py-3.5 sm:px-8 bg-neutral-900 border border-neutral-900 text-white text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2 group transition-all duration-500"
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:scale-95 transition-transform duration-300">
                    Explore Work <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-neutral-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                </button>
              </MagneticButton>
              
              <MagneticButton>
                <a
                  href="/vishnu-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden px-6 py-3.5 sm:px-8 text-neutral-800 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05)] text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase rounded-full flex items-center justify-center group transition-all duration-500 hover:bg-white/60 hover:border-white/80"
                >
                  <span className="relative z-10 group-hover:scale-95 transition-transform duration-300">
                    Resume
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out z-0" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={() => scrollToSection(SectionId.CONTACT)}
                  className="relative overflow-hidden px-6 py-3.5 sm:px-8 text-neutral-800 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05)] text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase rounded-full flex items-center justify-center group transition-all duration-500 hover:bg-white/60 hover:border-white/80"
                >
                  <span className="relative z-10 group-hover:scale-95 transition-transform duration-300">
                    Contact
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out z-0" />
                </button>
              </MagneticButton>
            </motion.div>
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

