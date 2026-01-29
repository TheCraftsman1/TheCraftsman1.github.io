import React from 'react';
import { ArrowDown, ChevronRight, Mail, Download } from 'lucide-react';
import { SectionId } from '../types';
import TechyBackground from './TechyBackground';
import { motion } from 'framer-motion';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
  startAnimation: boolean;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection, startAnimation }) => {
  const skills = ['B.Tech CSE', 'Java', 'Flutter', 'Web Dev', 'DSA'];

  return (
    <section id={SectionId.HERO} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-carbon-black">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1a2e_0%,_#0a0a0a_70%)]"></div>

      {/* Animated gradient blob */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-full blur-[100px] animate-float-slow"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full blur-[100px] animate-float"></div>

      {/* Techy circuit background */}
      <TechyBackground variant="circuit" opacity={0.15} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-grid-pattern bg-[length:60px_60px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left: Text Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={startAnimation ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Greeting */}
          <motion.p
            className="text-gray-400 font-exo text-lg md:text-xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hi, I'm
          </motion.p>

          {/* Name with gradient */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black uppercase tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-gradient-cyan-purple">Vishnu</span>
          </motion.h1>

          {/* Statement */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl font-exo text-white mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            I build <span className="text-gradient-lime-cyan font-bold">software</span>, not just projects.
          </motion.p>

          {/* Skills badges */}
          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                className="px-4 py-2 glass-panel text-sm font-exo text-gray-300 hover:text-white hover:border-cyan-400/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={startAnimation ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,240,255,0.3)" }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          {/* Dual CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* Primary: View Projects */}
            <button
              onClick={() => scrollToSection(SectionId.PROJECTS)}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 overflow-hidden rounded-lg hover:shadow-[0_0_30px_rgba(124,124,255,0.4)] transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 font-orbitron font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2">
                View Projects <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Secondary: Download Resume */}
            <a
              href="/vishnu-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 glass-panel-intense border border-white/20 hover:border-cyan-400/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] text-center"
            >
              <span className="font-orbitron font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2">
                Resume <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </a>
          </motion.div>

          {/* Email */}
          <motion.div
            className="mt-6 flex justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={startAnimation ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <a
              href="mailto:vishnukanchipati@gmail.com"
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors font-exo"
            >
              <Mail className="w-4 h-4" />
              vishnukanchipati@gmail.com
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Your Photo */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={startAnimation ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <div className="relative">
            {/* Soft glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-[100px] scale-150"></div>

            {/* Image with gradient mask for blending */}
            <div className="relative overflow-hidden rounded-xl">
              {/* Bottom fade to blend with background */}
              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
              {/* Side fades */}
              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/50"></div>

              <motion.img
                src="/vishnu-hero.jpg"
                alt="Vishnu Kanchipati"
                className="relative z-10 w-80 h-80 md:w-[400px] md:h-[400px] object-cover"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={startAnimation ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] uppercase font-exo tracking-[0.2em] text-white/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-cyan-400" />
        </motion.div>
      </motion.div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
};

export default Hero;
