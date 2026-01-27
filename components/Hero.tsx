import React from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { SectionId } from '../types';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import CoderHelmet from './CoderHelmet';
import { motion } from 'framer-motion';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
  startAnimation: boolean;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection, startAnimation }) => {
  return (
    <section id={SectionId.HERO} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-carbon-black perspective-1000">
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"></div>

      {/* Animated Grid Floor */}
      <div className="absolute inset-0 opacity-20 transform perspective-3d rotate-x-60 scale-150 origin-top">
        <div className="w-full h-full bg-grid-pattern bg-[length:50px_50px] animate-[gridScroll_20s_linear_infinite]"></div>
      </div>

      {/* Speed Lines / Particles */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-lime to-transparent blur-sm animate-[speedLine_3s_infinite]"></div>
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent blur-sm animate-[speedLine_4s_infinite_reverse]"></div>
      </div>

      {/* 
        LAYER 1: HUGE BACKGROUND TEXT (Behind Image)
      */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-[1] pointer-events-none select-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center leading-none"
        >
          <h1 className="text-[18vw] md:text-[22vw] font-orbitron font-black uppercase tracking-tighter text-white/20 whitespace-nowrap blur-[2px] animate-pulse">
            VISHNU
          </h1>
          <h1 className="text-[12vw] md:text-[15vw] font-orbitron font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/50 to-transparent -mt-[4vw]">
            KANCHIPATI
          </h1>
        </motion.div>
      </div>

      {/* 
        LAYER 2: HERO IMAGE / HELMET
      */}
      <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={startAnimation ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="relative w-full md:w-[80vw] h-[60vh] md:h-[80vh] max-w-none flex justify-center items-center"
        >
          {/* Backlight / Rim Light Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-neon-lime/20 blur-[100px] rounded-full mix-blend-screen"></div>

          {/* 3D Coder Helmet Layer */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Environment preset="city" />
              <group position={[0.5, 0, 0]}>
                <CoderHelmet />
              </group>
            </Canvas>
          </div>
        </motion.div>
      </div>

      {/* 
        LAYER 3: FOREGROUND CONTENT
      */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between py-10 pointer-events-none">

        {/* Top: Logo */}
        <div className="w-full flex justify-center pt-10">
          <div className="relative w-16 h-16 md:w-24 md:h-24 pointer-events-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(204,255,0,0.6)]">
              <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="1" className="opacity-30 animate-[spin_10s_linear_infinite]" strokeDasharray="40, 10, 40, 10" />
              <path d="M 20 25 L 35 75 L 50 25" fill="none" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 60 25 L 60 75" fill="none" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" />
              <path d="M 60 55 L 80 25" fill="none" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" />
              <path d="M 60 55 L 80 75" fill="none" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Bottom: CTA & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center pb-20 pointer-events-auto"
        >
          <button
            onClick={() => scrollToSection(SectionId.PROJECTS)}
            className="group relative px-12 py-5 bg-transparent overflow-hidden clip-path-slant border border-white/20 hover:border-neon-lime transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(204,255,0,0.3)]"
          >
            <div className="absolute inset-0 bg-neon-lime translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="relative z-10 font-orbitron font-bold text-white group-hover:text-black uppercase tracking-widest flex items-center gap-2 text-lg">
              Explore My World <ChevronRight className="w-5 h-5" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={startAnimation ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] uppercase font-exo tracking-[0.2em] text-white/50 animate-pulse">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={14} className="text-neon-lime" />
        </motion.div>
      </motion.div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .perspective-3d { transform-style: preserve-3d; }
        
        @keyframes gridScroll {
          0% { transform: rotateX(60deg) scale(2) translateY(0); }
          100% { transform: rotateX(60deg) scale(2) translateY(50px); }
        }
        
        @keyframes speedLine {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
