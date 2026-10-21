import React, { useRef } from 'react';
import CountUp from 'react-countup';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { playHoverTick } from '../lib/sound';
import { LiquidButton } from './ui/liquid-glass-button';

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

  // Spring physics for profile HUD ring
  const { scrollYProgress: speedometerProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });
  
  const strokeOffset = useTransform(speedometerProgress, [0, 1], [251.2, 0]);
  const animatedStrokeOffset = useSpring(strokeOffset, { stiffness: 60, damping: 20 });

  return (
    <section ref={sectionRef} id="about" className="relative flex flex-col justify-center py-12 sm:py-20 bg-slate-50 dark:bg-[#070707] text-zinc-900 dark:text-white overflow-hidden border-t border-black/10 dark:border-white/10 transition-colors duration-300 section-contained">
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-100" />
      
      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f8fafc_80%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#070707_80%)] pointer-events-none opacity-100" />

      {/* Floating Tech Orbitals — Desktop & Tablet only */}
      <motion.div style={{ y: y1, rotate: rotate1 }} className="hidden sm:block absolute right-[10%] top-[20%] opacity-15 pointer-events-none z-0">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-[#fba01d]"/>
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" className="text-black/20 dark:text-white/40"/>
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" className="text-black/10 dark:text-white/20"/>
          <circle cx="20" cy="50" r="2" fill="currentColor" className="text-[#fba01d]"/>
        </svg>
      </motion.div>

      <motion.div style={{ y: y2, rotate: rotate2 }} className="hidden sm:block absolute left-[5%] bottom-[10%] opacity-15 pointer-events-none z-0">
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
          <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1" className="text-[#fba01d]" transform="rotate(45 50 50)"/>
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-black/15 dark:text-white/30"/>
        </svg>
      </motion.div>

      <motion.div style={{ y: y3 }} className="hidden sm:block absolute right-[30%] bottom-[30%] opacity-[0.04] pointer-events-none z-0">
         <div className="w-[300px] h-[300px] bg-[#fba01d] rounded-full blur-[100px]"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* Editorial Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-14 border-b border-black/10 dark:border-white/10 pb-4 sm:pb-6">
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-['Montserrat',sans-serif]">
              About Me<span className="text-[#fba01d]">.</span>
            </h2>
          </div>
        </div>

        <div className="mt-4 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* Profile Image — Precision HUD Mask & Details - Scaled & Compact on Mobile */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative group flex justify-center lg:justify-start w-full max-w-[210px] sm:max-w-[280px] lg:max-w-[360px] mx-auto lg:mx-0">
              
              {/* --- BIO-SYNC BACKGROUND GEOMETRY (HUD) — Desktop / Tablet only to keep mobile clean --- */}
              <div className="hidden sm:flex absolute inset-0 z-0 items-center justify-center pointer-events-none sm:scale-[1.05] lg:scale-[1.35]">
                <motion.svg style={{ rotate: hudRotate1 }} className="absolute w-full h-full text-black/5 dark:text-white/5" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="4 8" vectorEffect="non-scaling-stroke" />
                </motion.svg>
                <motion.svg style={{ rotate: hudRotate2 }} className="absolute w-[90%] h-[90%] text-[#fba01d]/20" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="20 10" vectorEffect="non-scaling-stroke" />
                </motion.svg>
                <motion.svg style={{ rotate: hudRotate3 }} className="absolute w-[80%] h-[80%] text-black/10 dark:text-white/10" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="1 4" vectorEffect="non-scaling-stroke" />
                </motion.svg>
                
                {/* Embedded Arsenal Stat */}
                <div className="absolute w-[110%] h-[110%] -rotate-90">
                  <svg className="w-full h-full drop-shadow-[0_0_5px_rgba(251,160,29,0.4)]" viewBox="0 0 100 100">
                    <motion.circle 
                      cx="50" cy="50" r="49" 
                      stroke="#fba01d"
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
                    className="absolute top-[8%] right-[15%] rotate-90 origin-bottom-left bg-white dark:bg-white/[0.04] backdrop-blur-2xl border border-zinc-200/80 dark:border-white/20 rounded-md px-3 py-1 flex flex-col items-center justify-center z-20 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                     <span className="text-[#fba01d] font-black text-xs sm:text-sm leading-none"><CountUp end={200} duration={2.5} suffix="+" enableScrollSpy scrollSpyOnce /></span>
                     <span className="text-zinc-600 dark:text-neutral-300 text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.2em] font-['Plus_Jakarta_Sans',sans-serif]">DSA</span>
                  </motion.div>
                </div>
              </div>

              {/* Floating name badge — Desktop / Tablet only */}
              <motion.div
                className="hidden sm:flex absolute z-20 bottom-4 -right-8 lg:-right-12 bg-white dark:bg-white/[0.03] backdrop-blur-2xl border border-zinc-200/80 dark:border-white/15 rounded-xl px-4 lg:px-5 py-2.5 lg:py-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.22)] items-center justify-center group/badge"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="hidden sm:block absolute -left-8 lg:-left-12 top-1/2 w-8 lg:w-12 h-[1px] bg-gradient-to-r from-transparent to-zinc-300 dark:to-white/30 group-hover/badge:to-[#fba01d]/50 transition-colors" />
                <div className="hidden sm:block absolute -left-8 lg:-left-12 top-1/2 w-[3px] h-[3px] rounded-full bg-zinc-400 dark:bg-white/50 group-hover/badge:bg-[#fba01d] transition-colors -translate-y-[1px]" />
                
                <div className="absolute inset-0 bg-gradient-to-r from-black/[0.02] dark:from-white/[0.05] to-transparent rounded-xl opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500"/>
                <div>
                   <p className="text-sm sm:text-lg font-black uppercase tracking-tight text-zinc-950 dark:text-white relative z-10 font-['Montserrat',sans-serif]">Vishnu K.</p>
                   <p className="text-[8px] sm:text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#fba01d] mt-0.5 relative z-10 font-['Plus_Jakarta_Sans',sans-serif]">Full-Stack & Systems</p>
                </div>
              </motion.div>

              {/* Masked Image Container */}
              <div className="relative w-full aspect-[4/5] z-10">
                <div className="relative w-full h-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] brightness-95 group-hover:brightness-110 group-hover:drop-shadow-[0_0_30px_rgba(251,160,29,0.3)]"
                     style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  <img
                    src="/vishnu_about.jpg"
                    alt="Vishnu Kanchipati"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/journey-photo.jpg';
                    }}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 scale-[1.05] group-hover:scale-[1.12]"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="lg:col-span-7 lg:pl-10 relative z-10 mt-6 sm:mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 sm:space-y-8"
            >
              <ScrollReveal animation="fade-up">
                <div className="relative mb-4 sm:mb-6">
                  {/* Small decorative line */}
                  <div className="w-10 sm:w-12 h-1 bg-[#fba01d] mb-4 sm:mb-6 rounded-full" />
                  <h3
                    className="text-2xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white uppercase leading-[1.05] tracking-tight"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Building with<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fba01d] to-amber-500 drop-shadow-[0_0_15px_rgba(251,160,29,0.4)]">precision</span> &<br />
                    <span className="text-zinc-950 dark:text-white">purpose.</span>
                  </h3>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} animation="fade-up">
                <div className="relative bg-white dark:bg-white/[0.025] border border-zinc-200/80 dark:border-white/[0.12] backdrop-blur-2xl p-4 sm:p-7 rounded-xl sm:rounded-2xl border-l-4 border-l-[#fba01d] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.2)]">
                  <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/30 to-transparent pointer-events-none" />
                  <p className="text-zinc-700 dark:text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed font-light font-['Plus_Jakarta_Sans',sans-serif]">
                    I approach software engineering with a high-performance mindset — <strong className="text-zinc-950 dark:text-white font-medium bg-zinc-100 dark:bg-white/[0.06] px-1 py-0.5 rounded border border-zinc-200/80 dark:border-white/15">precision, architectural efficiency, and relentless optimization</strong>. As a Computer Science undergraduate at IARE (CGPA: 8.59), I engineer applications designed for real-world impact: from native Android audio architectures with decoupled background service persistence to automated DevSecOps container security pipelines and applied ML models.
                  </p>
                </div>
              </ScrollReveal>

              {/* Social links */}
              <div className="flex flex-wrap gap-2.5 sm:gap-4 pt-2 sm:pt-4">
                {[
                  { href: 'https://github.com/TheCraftsman1', label: 'GitHub', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                  )},
                  { href: 'https://www.linkedin.com/in/sree-vishnu-kanchipati-479422331/', label: 'LinkedIn', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                  )},
                  { href: 'https://leetcode.com/u/Vishnu_Kanchipati/', label: 'LeetCode', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg>
                  )},
                ].map((link) => (
                  <LiquidButton
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="default"
                    data-cursor={link.label}
                    onMouseEnter={playHoverTick}
                    className="gap-2.5 font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold tracking-wide"
                  >
                    <span>{link.icon}</span>
                    <span className="tracking-wider">{link.label}</span>
                  </LiquidButton>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
