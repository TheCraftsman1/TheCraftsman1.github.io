import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring" as const, damping: 12, stiffness: 200 }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    }
  }
};

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="flex flex-col items-start border-l-4 border-gradient-to-b from-sky-400 to-indigo-500 pl-6 py-2 relative overflow-visible" style={{ borderImage: 'linear-gradient(to bottom, #38bdf8, #6366f1) 1' }}>
      <motion.span
        className="text-sky-600 font-exo font-bold uppercase tracking-[0.2em] text-sm mb-1 block"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle}
      </motion.span>

      <motion.h2
        className="text-4xl md:text-6xl font-orbitron font-black text-slate-900 uppercase tracking-tighter flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {title.split(' ').map((word, wordIdx) => (
          <span key={wordIdx} className="mr-4 flex" style={{ perspective: 1000 }}>
            {word.split('').map((char, charIdx) => (
              <motion.span
                key={charIdx}
                variants={letterVariants}
                style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h2>
    </div>
  );
};

export default SectionTitle;
