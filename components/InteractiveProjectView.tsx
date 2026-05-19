import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PipelineStage {
  step: string;
  title: string;
  desc: string;
  image?: string;
  video?: string;
  timecode?: [number, number]; // [start, end] in seconds for audio sync
}

interface ProjectData {
  id: string;
  tag: string;
  title: string;
  intro: string;
  problem: string;
  architecture: string;
  pipeline: PipelineStage[];
}

interface InteractiveProjectViewProps {
  project: ProjectData;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

/* ─── Fake animated waveform bars ─────────────────────────────── */
const WaveformBars: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => (
  <div className="flex items-end gap-[3px] h-5">
    {[0.6, 1, 0.4, 0.8, 0.5, 0.9, 0.3, 0.7, 1, 0.5, 0.8, 0.4].map((h, i) => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full bg-violet-400"
        animate={isPlaying ? {
          height: [`${h * 20}px`, `${(1 - h) * 20 + 4}px`, `${h * 20}px`],
        } : { height: `${h * 12}px` }}
        transition={isPlaying ? {
          duration: 0.5 + Math.random() * 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.05,
        } : { duration: 0.3 }}
      />
    ))}
  </div>
);

/* ─── Feature tab button for the screen navigator ─────────────── */
const ScreenTab: React.FC<{
  stage: PipelineStage;
  index: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ stage, index, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative group flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-400 focus:outline-none whitespace-nowrap ${
      isActive
        ? 'bg-violet-500/20 border border-violet-500/40 shadow-[0_0_24px_-6px_rgba(139,92,246,0.35)]'
        : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10'
    }`}
  >
    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
      isActive
        ? 'bg-violet-500 text-white'
        : 'bg-white/10 text-white/40 group-hover:text-white/60'
    }`}>
      {stage.step}
    </span>
    <span className={`text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 ${
      isActive ? 'text-violet-200' : 'text-white/35 group-hover:text-white/55'
    }`}>
      {stage.title}
    </span>
  </button>
);

/* ─── Lenis smooth scroll helper ──────────────────────────────── */
const smoothScrollTo = (el: HTMLElement) => {
  const lenis = (window as any).lenis;
  if (lenis) {
    lenis.scrollTo(el, { duration: 2, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

const InteractiveProjectView: React.FC<InteractiveProjectViewProps> = ({ project }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeStepRef = useRef(0);
  const isPlayingRef = useRef(false);
  const ticking = useRef(false);

  // Keep refs in sync with state
  useEffect(() => { activeStepRef.current = activeStep; }, [activeStep]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  const autoPlayInterval = 5000;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          const nextStep = (prev + 1) % project.pipeline.length;
          if (stepRefs.current[nextStep]) {
            smoothScrollTo(stepRefs.current[nextStep]!);
          }
          if (nextStep === 0) {
            setIsPlaying(false);
            return prev;
          }
          return nextStep;
        });
      }, autoPlayInterval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, project.pipeline.length]);

  // Scroll tracking — registers ONCE, uses refs, throttled with rAF
  useEffect(() => {
    const handleScroll = () => {
      if (isPlayingRef.current || ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        let detected = activeStepRef.current;
        for (let i = 0; i < stepRefs.current.length; i++) {
          const ref = stepRefs.current[i];
          if (ref) {
            const rect = ref.getBoundingClientRect();
            if (rect.top > 0 && rect.top < window.innerHeight * 0.6) {
              detected = i;
            }
          }
        }
        if (detected !== activeStepRef.current) {
          setActiveStep(detected);
        }
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // empty deps — registers once

  const goToStep = useCallback((index: number) => {
    setActiveStep(index);
    if (stepRefs.current[index]) smoothScrollTo(stepRefs.current[index]!);
  }, []);

  return (
    <div className="w-full relative overflow-hidden rounded-[3rem] px-6 lg:px-16 pt-24 pb-12 transition-all duration-700 bg-neutral-950 text-white shadow-2xl">
      {/* ── Immersive Background ── */}
      <div className="absolute inset-0 z-0">
        <img src="/projects/vikify/bg.jpg" alt="Background" className="w-full h-full object-cover opacity-70 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/30 to-neutral-950/70" />
        {/* Warm violet/purple ambient glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_600px_at_20%_15%,rgba(139,92,246,0.22),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_500px_at_80%_25%,rgba(236,72,153,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_500px_at_50%_80%,rgba(168,85,247,0.10),transparent)]" />
      </div>

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="space-y-4">
            <motion.div variants={fadeInUp} className="flex items-center w-full">
              <div className="text-7xl md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter text-white leading-none">
                {project.id}
              </div>
              <div className="flex-1 h-px bg-violet-500/25 mx-6 lg:mx-12 min-w-[50px]" />
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-violet-400/60 whitespace-nowrap">
                {project.tag}
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-white leading-[0.85] ml-[-0.05em] break-words"
              style={{
                textShadow: '0 0 60px rgba(139,92,246,0.4), 0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Play Walkthrough Button with waveform */}
          <motion.div variants={fadeInUp} className="flex items-center gap-5">
            <WaveformBars isPlaying={isPlaying} />
            <motion.button
              onClick={() => {
                if (!isPlaying && activeStep === project.pipeline.length - 1) {
                  setActiveStep(0);
                  if (stepRefs.current[0]) smoothScrollTo(stepRefs.current[0]!);
                }
                setIsPlaying(!isPlaying);
              }}
              className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all backdrop-blur-md ${
                isPlaying 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' 
                  : 'bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 border border-violet-500/20'
              }`}
            >
              {isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  PAUSE
                </>
              ) : (
                <>
                  <span className="text-lg leading-none">▶</span>
                  PLAY WALKTHROUGH
                </>
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* ── Intro & Problem ── */}
        <motion.div variants={fadeInUp} className="max-w-4xl mb-20">
          <p className="text-2xl md:text-3xl text-white/80 font-light leading-snug mb-12">
            {project.intro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div>
               <h2 className="text-[11px] font-bold uppercase tracking-widest text-violet-300 mb-6 flex items-center gap-3">
                 <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                 THE PROBLEM
               </h2>
               <p className="text-base text-white/60 font-light leading-relaxed">
                 {project.problem}
               </p>
             </div>
             <div>
               <h2 className="text-[11px] font-bold uppercase tracking-widest text-violet-300 mb-6 flex items-center gap-3">
                 <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                 ARCHITECTURE
               </h2>
               <p className="text-base text-white/60 font-light leading-relaxed">
                 {project.architecture}
               </p>
             </div>
          </div>
        </motion.div>

        {/* ── Screen Navigator (horizontal scrollable tabs) ── */}
        <motion.div
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-violet-400/50 mb-6 flex items-center gap-3">
            <span className="text-base">♫</span>
            EXPLORE THE APP
          </h2>
          <div
            className="flex gap-3 overflow-x-auto pb-3 -mx-2 px-2"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#8b5cf6 transparent' }}
          >
            {project.pipeline.map((stage, i) => (
              <ScreenTab
                key={stage.step}
                stage={stage}
                index={i}
                isActive={activeStep === i}
                onClick={() => goToStep(i)}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Feature Showcase Sections ── */}
        <div className="space-y-24 lg:space-y-40 py-10 pb-32">
          {project.pipeline.map((stage, index) => (
            <motion.div 
              key={stage.step}
              ref={el => stepRefs.current[index] = el}
              initial={{ opacity: 0.3, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-20%" }}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-700 ${
                  activeStep === index ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98]'
              }`}
            >
              {/* Left Column: Text Content */}
              <div 
                className={`flex-1 rounded-3xl p-8 lg:p-12 backdrop-blur-md border transition-all duration-500 w-full ${
                  activeStep === index 
                  ? 'bg-violet-950/25 border-violet-500/30 shadow-[0_0_50px_-12px_rgba(139,92,246,0.35)]' 
                  : 'bg-white/[0.02] border-white/5 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                    activeStep === index
                      ? 'bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/25'
                      : 'bg-white/10 text-white/40'
                  }`}>
                    {stage.step}
                  </div>
                  {activeStep === index && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-violet-300">Now Viewing</span>
                    </motion.div>
                  )}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white pr-8 mb-4">
                  {stage.title}
                </h3>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                  {stage.desc}
                </p>
              </div>

              {/* Right Column: App Screenshot / Video */}
              <div className="w-full lg:w-[450px] shrink-0 relative flex justify-center items-center">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-700 pointer-events-none -z-10">
                  <span className="text-xs tracking-widest font-bold opacity-30">MEDIA NOT LOADED</span>
                </div>

                <AnimatePresence mode="wait">
                  {activeStep === index && (
                    <motion.div
                      key={`media-${stage.step}`}
                      initial={{ opacity: 0, scale: 0.92, y: 28 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -28 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full relative"
                    >
                      {/* Warm glow behind media */}
                      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-500/15 via-pink-500/8 to-transparent blur-3xl -z-10" />

                      {stage.video ? (
                        <video 
                          src={stage.video} 
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-auto max-h-[80vh] object-contain rounded-3xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
                          onError={(e) => {
                            (e.target as HTMLVideoElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <img 
                          src={stage.image} 
                          alt={stage.title} 
                          className="w-full h-auto max-h-[80vh] object-contain rounded-3xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footer / Now Playing Bar ── */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-violet-500/10"
        >
          <div className="flex items-center gap-5">
            {/* Mini "album art" */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-500/20">
              V
            </div>
            <div>
              <div className="text-sm font-bold text-white/80 tracking-wide">Vikify</div>
              <div className="text-[10px] text-white/30 font-medium tracking-wider uppercase">Kotlin • ExoPlayer • Room DB</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <WaveformBars isPlaying={isPlaying} />
            <div className="flex gap-2">
              {['♫', '⟳', '⇆'].map((icon, i) => (
                <span
                  key={i}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[13px] text-white/30"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveProjectView;
