import React from 'react';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import BentoGrid from './BentoGrid';
import { motion, useScroll, useTransform } from 'framer-motion';

const Skills: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section id={SectionId.SKILLS} className="py-32 md:py-48 bg-white relative overflow-hidden text-neutral-900 border-t border-neutral-100">
      {/* CLEAN STUDIO CANVAS (Dark Dots on White) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Massive scrolling text background */}
      <motion.div 
        style={{ y }}
        className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] flex flex-col gap-4 select-none"
      >
        <span className="text-[12vw] font-black uppercase leading-none tracking-tighter whitespace-nowrap text-neutral-900" style={{ fontFamily: "'Inter', 'Syne', sans-serif" }}>
          SKILLS EXPERTISE KNOWLEDGE
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-32 md:py-48">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 relative">
          <div className="relative z-10">
            <SectionTitle title="Arsenal" subtitle="Tech Stack" number="04" />
          </div>

          <motion.div
            className="flex-1 max-w-md relative z-10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="h-0.5 w-12 bg-neutral-900 mb-6" />
            <p className="text-neutral-500 text-lg leading-relaxed font-light">
              An aggressive toolkit forged through relentless execution. Bridging robust mobile architectures, scalable web backends, and intelligent machine learning models.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-sm p-[1px] bg-neutral-100"
        >
          <div className="relative">
            <BentoGrid />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
