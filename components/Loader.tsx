import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  // Time-based exit since we removed the progress bar noise
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 1200); // Wait for exit animation to finish
    }, 3500); // Total reading time before starting exit

    return () => clearTimeout(timer);
  }, [onComplete]);

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
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
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
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white"
    >
      {/* ═══ CLEAN STUDIO CANVAS (White Dots on Black) ═══ */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      
      {/* ═══ IMPACTFUL MODERN TEXT ═══ */}
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate={isExiting ? "exiting" : "show"}
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
          animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Vishnu Kanchipati
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Loader;