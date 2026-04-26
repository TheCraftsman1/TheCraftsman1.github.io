import React, { useEffect, useRef, useState } from 'react';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import CountUp from 'react-countup';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const stats = [
  { 
    value: 20, 
    suffix: '+', 
    label: 'Projects Shipped', 
    progress: 0.85,
    tooltip: 'React • Node • PostgreSQL',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  { 
    value: 3, 
    suffix: '+', 
    label: 'Years Coding', 
    progress: 0.65,
    tooltip: 'Frontend • Backend • Systems',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  },
  { 
    value: 100, 
    suffix: '%', 
    label: 'Passion', 
    progress: 1,
    tooltip: 'Obsessed with Perf & UX',
    icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    )
  },
];

const StatCard = ({ stat, index }: { stat: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  
  // Tilt physics
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const rotateX = useTransform(mouseY, [0, 1], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 1], [-10, 10]);
  const glareX = useTransform(mouseX, [0, 1], [-100, 200]);
  const glareY = useTransform(mouseY, [0, 1], [-100, 200]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group perspective-1000 ${index % 2 === 1 ? 'lg:translate-y-4' : ''}`}
    >
      <div className="relative p-6 overflow-hidden rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-amber-500/30 transition-colors duration-500 min-h-[160px] flex flex-col justify-end shadow-2xl">
        
        {/* Rim Lighting Specular Highlight */}
        <motion.div 
          className="absolute w-32 h-32 bg-white/20 blur-[50px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ left: glareX, top: glareY }}
        />

        {/* Iconic Background Watermark */}
        <div className="absolute -right-4 -top-4 w-32 h-32 text-white opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none group-hover:scale-110 ease-out transform-gpu">
          {stat.icon}
        </div>

        {/* Glowing Circular Progress Ring */}
        <div className="absolute right-4 top-4 w-12 h-12 opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
            <motion.circle 
              cx="50" cy="50" r="40" 
              stroke={stat.progress === 1 ? "#14b8a6" : "#f59e0b"} 
              strokeWidth="8" 
              fill="none" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: stat.progress } : { pathLength: 0 }}
              transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: "easeOut" }}
              className={stat.progress === 1 ? "drop-shadow-[0_0_10px_rgba(20,184,166,0.8)]" : ""}
            />
          </svg>
        </div>

        {/* Content - Monospace Typography */}
        <div className="relative z-10 translate-z-[20px] transition-transform duration-300 ease-out group-hover:-translate-y-7">
          <div className="text-4xl md:text-5xl font-bold tracking-tight text-white group-hover:text-amber-500 transition-colors drop-shadow-sm mb-2 font-mono">
            <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 group-hover:text-neutral-200 transition-colors">
            {stat.label}
          </p>
        </div>

        {/* Deep Dive Tooltip */}
        <div className="absolute bottom-5 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
          <div className="bg-black/90 backdrop-blur-md border border-amber-500/20 px-2.5 py-1 rounded text-[9.5px] font-mono text-amber-500 whitespace-nowrap shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
            {stat.tooltip}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Orbital floating animations based on scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  
  // Bio-Sync HUD Animations
  const hudRotate1 = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const hudRotate2 = useTransform(scrollYProgress, [0, 1], [360, 0]);
  const hudRotate3 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  // Spring physics for speedometer
  const speedometerSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: speedometerProgress } = useScroll({
    target: speedometerSectionRef,
    offset: ["start end", "center center"]
  });
  
  // Create a springy value for the stroke-dashoffset based on scroll
  // circumference = 2 * Math.PI * 40 = ~251.2
  const strokeOffset = useTransform(speedometerProgress, [0, 1], [251.2, 0]);
  const animatedStrokeOffset = useSpring(strokeOffset, { stiffness: 60, damping: 20 });

  return (
    <section ref={sectionRef} id={SectionId.ABOUT} className="relative min-h-[100dvh] flex flex-col justify-center py-16 bg-neutral-950 overflow-hidden border-t border-white/5">
      {/* Structural grid line overlay - Matched to Hero background theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_80%)] pointer-events-none" />

      {/* Floating Tech Orbitals (Depth/3D Parallax logic) */}
      <motion.div style={{ y: y1, rotate: rotate1 }} className="absolute right-[10%] top-[20%] opacity-10 pointer-events-none z-0">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-amber-500"/>
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" className="text-white"/>
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" className="text-white/50"/>
          <circle cx="20" cy="50" r="2" fill="currentColor" className="text-amber-500"/>
        </svg>
      </motion.div>

      <motion.div style={{ y: y2, rotate: rotate2 }} className="absolute left-[5%] bottom-[10%] opacity-10 pointer-events-none z-0">
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
          <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1" className="text-amber-500" transform="rotate(45 50 50)"/>
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-white"/>
        </svg>
      </motion.div>

      <motion.div style={{ y: y3 }} className="absolute right-[30%] bottom-[30%] opacity-[0.03] pointer-events-none z-0">
         <div className="w-[300px] h-[300px] bg-amber-500/30 rounded-full blur-[100px]"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Subtle Watermark pushed into background */}
        <div className="absolute top-[2%] -right-[5%] text-[25vw] font-black leading-none text-white/[0.015] select-none pointer-events-none z-0 tracking-tighter" style={{ fontFamily: "'Syne', sans-serif" }}>
          V K
        </div>
        
        <SectionTitle title="About" subtitle="Who I Am" number="01" />

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Profile Image — Precision HUD Mask & Details */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative group flex justify-center lg:justify-start w-full max-w-[380px] mx-auto lg:mx-0">
              
              {/* --- BIO-SYNC BACKGROUND GEOMETRY (HUD) --- */}
              <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none scale-[1.35]">
                <motion.svg style={{ rotate: hudRotate1 }} className="absolute w-full h-full text-white/5" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="4 8" vectorEffect="non-scaling-stroke" />
                </motion.svg>
                <motion.svg style={{ rotate: hudRotate2 }} className="absolute w-[90%] h-[90%] text-amber-500/20" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="20 10" vectorEffect="non-scaling-stroke" />
                </motion.svg>
                <motion.svg style={{ rotate: hudRotate3 }} className="absolute w-[80%] h-[80%] text-white/10" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="1 4" vectorEffect="non-scaling-stroke" />
                </motion.svg>
                
                {/* Embedded Arsenal Stat - 200+ DSA Progress integrated into HUD */}
                <div className="absolute w-[110%] h-[110%] -rotate-90">
                  <svg className="w-full h-full drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" viewBox="0 0 100 100">
                    <motion.circle 
                      cx="50" cy="50" r="49" 
                      stroke="#f59e0b" // amber-500
                      strokeWidth="1.2" 
                      fill="none" 
                      strokeDasharray="307.87" 
                      style={{ strokeDashoffset: animatedStrokeOffset }}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  {/* Floating Stat Pointer */}
                  <motion.div 
                    className="absolute top-[8%] right-[15%] rotate-90 origin-bottom-left bg-black/80 backdrop-blur-md border border-amber-500/30 rounded-md px-3 py-1 flex flex-col items-center justify-center z-20 shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                     <span className="text-amber-500 font-black text-sm leading-none"><CountUp end={200} duration={2.5} suffix="+" enableScrollSpy scrollSpyOnce /></span>
                     <span className="text-white/60 text-[8px] font-bold uppercase tracking-[0.2em]">DSA</span>
                  </motion.div>
                </div>
              </div>

              {/* Floating name badge - Anchored to geometry */}
              <motion.div
                className="absolute z-20 bottom-4 right-4 sm:-right-8 lg:-right-12 bg-black/70 backdrop-blur-xl border border-white/10 rounded-xl px-6 py-4 shadow-2xl flex items-center justify-center group/badge"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {/* Connecting Line linking to the mask/hud */}
                <div className="absolute -left-8 lg:-left-12 top-1/2 w-8 lg:w-12 h-[1px] bg-gradient-to-r from-transparent to-white/30 group-hover/badge:to-amber-500/50 transition-colors" />
                <div className="absolute -left-8 lg:-left-12 top-1/2 w-[3px] h-[3px] rounded-full bg-white/50 group-hover/badge:bg-amber-500 transition-colors -translate-y-[1px]" />
                
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500"/>
                <div>
                   <p className="text-xl font-black uppercase tracking-tight text-white relative z-10" style={{ fontFamily: "'Syne', sans-serif" }}>Vishnu K.</p>
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 mt-0.5 relative z-10">Full Stack Engineer</p>
                </div>
              </motion.div>

              {/* Advanced Masked Image Container */}
              <div className="relative w-full aspect-[4/5] z-10">
                {/* Decorative border that perfectly traces the hexagon path */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none scale-[1.03] opacity-30 group-hover:scale-[1.08] group-hover:opacity-100 group-hover:text-amber-500 text-white/40 transition-all duration-700 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] z-10">
                  <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="currentColor" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                  <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 20" className="opacity-0 group-hover:opacity-100 transition-opacity duration-700" vectorEffect="non-scaling-stroke" />
                </svg>

                {/* The masked clip-path image */}
                <div className="relative w-full h-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] brightness-90 group-hover:brightness-110 group-hover:drop-shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                     style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  <img
                    src="journey-photo.jpg"
                    alt="Vishnu Kanchipati"
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 scale-[1.05] group-hover:scale-[1.12]"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="lg:col-span-7 lg:pl-10 relative z-10 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Typography Hierarchy Fix: Subheading contrast and sizing against body */}
              <ScrollReveal animation="fade-up">
                <div className="relative mb-6">
                  {/* Small decorative line */}
                  <div className="w-12 h-1 bg-amber-500 mb-6 rounded-full" />
                  <h3
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-[0.95] tracking-tighter"
                    style={{ fontFamily: "'Syne', 'Inter', sans-serif" }}
                  >
                    Building with<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">precision</span> &<br />
                    <span className="text-white">purpose.</span>
                  </h3>
                </div>
              </ScrollReveal>

              {/* Bio paragraph - Improved contrast against dark mode */}
              <ScrollReveal delay={200} animation="fade-up">
                <div className="relative bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-l-amber-500">
                  <p className="text-neutral-300 text-lg leading-relaxed font-light">
                    I approach software development like a race — <strong className="text-white font-medium bg-amber-500/10 px-1 py-0.5 rounded">precision, efficiency, and constant optimization</strong>. As a Computer Science student, I build high-performance applications that <strong className="text-white font-medium">solve real-world problems</strong>. My goal is to bridge the gap between complex backend logic and stunning frontend experiences.
                  </p>
                </div>
              </ScrollReveal>

              {/* Social links — Glass blocks */}
              <div className="flex flex-wrap gap-4 pt-4">
                {[
                  { href: 'https://github.com/TheCraftsman1', label: 'GitHub', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                  )},
                  { href: 'https://www.linkedin.com/in/sree-vishnu-kanchipati-479422331/', label: 'LinkedIn', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                  )},
                  { href: 'https://leetcode.com/u/Vishnu_Kanchipati/', label: 'LeetCode', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg>
                  )},
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-neutral-300 hover:bg-amber-500 hover:text-black hover:border-amber-400 transition-all duration-300 group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Kinetic Race Stats — Glass Bento Tiles */}
            <div ref={speedometerSectionRef} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pr-4">
              {stats.map((stat: any, index: number) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
