import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'text' | 'exiting'>('text');

  useEffect(() => {
    // Show the quote for 2.5 seconds, then exit
    const timer = setTimeout(() => {
      setPhase('exiting');
      setTimeout(onComplete, 600); // give it time to fade out
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  // Word-by-word staggered reveal
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    },
    exiting: {
      opacity: 0,
      y: -30,
      filter: 'blur(10px)',
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const wordVar: Variants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(6px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const lineVar: Variants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] } }
  };

  const quoteWords = '"Let the power in you rise"'.split(' ');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white"
    >
      {/* ═══ GRAPH DOT GRID ═══ */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: phase === 'text' ? 0.25 : 0 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Faint axis lines (graph paper feel) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: phase === 'text' ? 0.06 : 0 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: 
            'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      
      {/* ═══ QUOTE ═══ */}
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate={phase === 'text' ? "show" : "exiting"}
        className="flex flex-col items-center gap-8 z-10 px-8 text-center relative"
      >
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white m-0 leading-[1.1]"
          style={{ fontFamily: "'Syne', 'Inter', sans-serif" }}
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

        {/* Attribution with flanking lines */}
        <div className="flex items-center gap-4">
          <motion.div variants={lineVar} className="w-10 md:w-16 h-[1px] bg-white/20 origin-right" />
          <motion.p 
            className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500"
            initial={{ opacity: 0 }}
            animate={phase === 'text' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Vishnu Kanchipati
          </motion.p>
          <motion.div variants={lineVar} className="w-10 md:w-16 h-[1px] bg-white/20 origin-left" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;