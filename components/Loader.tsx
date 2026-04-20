import React, { useEffect, useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'text' | 'video' | 'exiting'>('text');
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackCalled = useRef(false);

  useEffect(() => {
    // Show text for 2.8 seconds before triggering video
    const timer = setTimeout(() => {
      setPhase('video');
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.error('Video autoplay failed:', err);
          // If video fails, quickly exit loading screen
          if (!fallbackCalled.current) {
            fallbackCalled.current = true;
            setPhase('exiting');
            setTimeout(onComplete, 600);
          }
        });
      }
    }, 2800);

    // Absolute fallback: load site after 8s no matter what 
    const failsafe = setTimeout(() => {
      if (!fallbackCalled.current) {
        fallbackCalled.current = true;
        setPhase('exiting');
        onComplete();
      }
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(failsafe);
    };
  }, [onComplete]);

  // Stop video right after the motion blur / horizontal stretch glitch effect (~4.2 seconds)
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 4.2) {
      if (!fallbackCalled.current) {
        fallbackCalled.current = true;
        videoRef.current.pause();
        setPhase('exiting');
        setTimeout(onComplete, 400); // Wait for a snappy fade before unmounting
      }
    }
  };

  // Clean, modern animation variants
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    },
    exiting: {
      opacity: 0,
      y: -20,
      filter: 'blur(8px)',
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const wordVar: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const quoteWords = '"Let the power in you rise"'.split(' ');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white"
    >
      {/* ═══ CLEAN STUDIO CANVAS (White Dots on Black) ═══ */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        animate={{ opacity: phase === 'text' ? 0.25 : 0 }}
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ═══ INTRO VIDEO BACKGROUND ═══ */}
      <motion.video
        ref={videoRef}
        src="/Untitled design.mp4"
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'video' ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* ═══ IMPACTFUL MODERN TEXT ═══ */}
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate={phase === 'text' ? "show" : "exiting"}
        className="flex flex-col items-center gap-6 z-10 px-8 text-center relative"
      >
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white m-0"
          style={{ fontFamily: "'Inter', 'Syne', sans-serif" }}
        >
          {quoteWords.map((word, i) => (
            <motion.span 
              key={i} 
              variants={wordVar} 
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p 
          className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400 mt-4"
          initial={{ opacity: 0 }}
          animate={phase === 'text' ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Vishnu Kanchipati
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Loader;