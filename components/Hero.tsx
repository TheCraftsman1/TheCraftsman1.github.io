import React, { useCallback, useState } from 'react';
import { ChevronRight, Mail, Download, Terminal, Code2, Cpu } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionId } from '../types';
import TechyBackground from './TechyBackground';
import Hero3D from './Hero3D';
import MagneticButton from './MagneticButton';
import StageSpotlight from './StageSpotlight';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
  startAnimation: boolean;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection, startAnimation }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isGlowOn, setIsGlowOn] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const skills = [
    { name: 'B.Tech CSE', icon: <Cpu className="w-3 h-3" /> },
    { name: 'Java', icon: <Code2 className="w-3 h-3" /> },
    { name: 'Flutter', icon: <Terminal className="w-3 h-3" /> },
    { name: 'Web Dev', icon: <Code2 className="w-3 h-3" /> },
    { name: 'DSA', icon: <Cpu className="w-3 h-3" /> }
  ];

  // Smooth scroll handler
  const handleScroll = useCallback(() => {
    scrollToSection(SectionId.PROJECTS);
  }, [scrollToSection]);

  return (
    <section
      id={SectionId.HERO}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-sky-50"
    >
      {/* 3D Background */}
      <Hero3D scrollYProgress={scrollYProgress} />

      {/* Animated Background Layers */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.18)_0%,_rgba(255,255,255,0)_72%)]"
        style={{ y: y1 }}
      />

      {/* Static gradient orbs - removed animation for performance */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-violet-300/25 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-sky-300/30 rounded-full blur-[120px]" />

      {/* Techy circuit background */}
      <TechyBackground variant="circuit" opacity={0.08} />

      {/* Grid pattern - static for performance */}
      <div className="absolute inset-0 opacity-[0.09] bg-[linear-gradient(rgba(14,165,233,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.13)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

        {/* Left: Text Content */}
        <motion.div
          className="flex-1 text-center lg:text-left order-2 lg:order-1"
          style={{ y: y2, opacity }}
        >
          <motion.p
            className="text-slate-500 font-exo text-lg md:text-xl mb-4 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Hi, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            className="relative text-6xl md:text-8xl lg:text-9xl font-orbitron font-black uppercase tracking-tighter mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400">
                Vishnu
              </span>
            </span>
          </motion.h1>

          {/* Statement with kinetic text */}
          <motion.div
            className="text-2xl md:text-3xl lg:text-4xl font-exo text-slate-900 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="text-slate-500">I build </span>
            <span className="relative inline-block font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400">
                software
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M0 6 Q 50 12, 100 6 T 200 6"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ccff00" />
                    <stop offset="100%" stopColor="#00f0ff" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="text-slate-500">, not just projects.</span>
          </motion.div>

          {/* Skills with hover effects */}
          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {skills.map((skill, index) => (
              <span
                key={skill.name}
                className="group flex items-center gap-2 px-4 py-2 bg-white/80 border border-slate-200 rounded-lg backdrop-blur-sm text-sm font-mono text-slate-600 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 transition-all duration-300 cursor-default shadow-sm"
              >
                <span className="text-sky-500 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </span>
                {skill.name}
              </span>
            ))}
          </motion.div>

          {/* CTAs with enhanced magnetic buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <MagneticButton
              onClick={handleScroll}
               className="group relative px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl overflow-hidden shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative font-orbitron font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2">
                View Projects
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </MagneticButton>

            <MagneticButton
              href="/vishnu-resume.pdf"
               className="group px-8 py-4 bg-white/80 border border-slate-200 rounded-xl hover:border-sky-300 hover:bg-sky-50 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="font-orbitron font-bold text-slate-900 uppercase tracking-wider flex items-center justify-center gap-2">
                Resume
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </MagneticButton>
          </motion.div>

          {/* Email with magnetic hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={startAnimation ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <a
              href="mailto:vishnukanchipati@gmail.com"
               className="group inline-flex items-center gap-3 text-slate-500 hover:text-sky-600 transition-colors font-mono text-sm"
            >
                <span className="p-2 rounded-lg bg-white/80 border border-slate-200 group-hover:bg-sky-50 transition-colors">
                <Mail className="w-4 h-4" />
              </span>
              <span className="relative">
                vishnukanchipati@gmail.com
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-sky-500 group-hover:w-full transition-all duration-300" />
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Photo with enhanced effects */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={startAnimation ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
        >
          <div
            className="relative cursor-pointer group"
            onClick={() => setIsGlowOn(!isGlowOn)}
          >
            {/* Simple elegant spotlight - behind the photo */}
            <StageSpotlight
              isOn={isGlowOn}
              intensity={1}
              className="z-0"
            />

            {/* Animated gradient border - sharp */}
            <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
              <div className="absolute inset-[-100%] animate-gradient-rotate bg-[conic-gradient(from_0deg,#00f0ff_0%,#a855f7_25%,#00f0ff_50%,#a855f7_75%,#00f0ff_100%)]" />
            </div>

            {/* Decorative frame */}
            <div className="absolute -inset-4 rounded-3xl border border-sky-300/50 bg-gradient-to-b from-sky-200/40 to-transparent" />

            {/* Image container */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-100 to-white shadow-xl shadow-sky-100">
              {/* Scanline overlay - static thin lines */}
              <div className="absolute inset-0 z-30 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_2px]" />

              {/* Gradient overlays */}
              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-slate-200/70 via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-slate-200/50 via-transparent to-slate-200/50" />

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-sky-500/60 z-30" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-sky-500/60 z-30" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-sky-500/60 z-30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-sky-500/60 z-30" />

              <img
                src="/vishnu-hero.png"
                alt="Vishnu Kanchipati"
                className={`relative z-10 w-72 h-auto md:w-96 lg:w-[420px] object-cover transition-all duration-500 ${isGlowOn ? 'mix-blend-normal brightness-110 contrast-105' : 'mix-blend-lighten'}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={startAnimation ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-slate-500">
          Scroll to explore
        </span>
        <div className="relative w-6 h-10 rounded-full border-2 border-sky-500/40 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
        </div>
      </motion.div>

      {/* Static tech decorations */}
      <div className="absolute top-20 right-20 text-sky-500/20 text-6xl font-mono font-bold hidden xl:block">
        {'{ }'}
      </div>
      <div className="absolute bottom-32 left-20 text-indigo-500/20 text-4xl font-mono hidden xl:block">
        {'</>'}
      </div>
    </section>
  );
};

export default Hero;
