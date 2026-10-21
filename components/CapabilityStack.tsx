import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Server, Cpu, Layers } from 'lucide-react';
import { CapabilityCluster } from '../types';
import { playHoverTick, playClickSnap } from '../lib/sound';
import { useTheme } from '../context/ThemeContext';

const CLUSTERS = [
  {
    id: 'mobile',
    title: 'Native & Cross-Platform Mobile',
    icon: <Smartphone size={20} className="text-[#fba01d]" />,
    accent: '#fba01d',
    technologies: [
      {
        name: 'Kotlin',
        role: 'Android SDK · ExoPlayer · Room DB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
        accent: '#7f52ff',
      },
      {
        name: 'Jetpack Compose',
        role: 'Declarative State & Modern UI',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
        accent: '#3ddc84',
      },
      {
        name: 'Flutter',
        role: 'Cross-Platform Framework',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
        accent: '#02569b',
      },
      {
        name: 'Dart',
        role: 'Client Programming Language',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg',
        accent: '#0175c2',
      },
      {
        name: 'Android SDK',
        role: 'NDK C++ · MediaSession · Room',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-plain.svg',
        accent: '#3ddc84',
      },
    ],
  },
  {
    id: 'devsecops',
    title: 'DevSecOps & Backend Systems',
    icon: <Server size={20} className="text-[#38bdf8]" />,
    accent: '#38bdf8',
    technologies: [
      {
        name: 'Docker',
        role: 'Containerization · Multi-Stage Builds',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
        accent: '#2496ed',
      },
      {
        name: 'GitHub Actions',
        role: 'Automated CI/CD · SAST/DAST Gating',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',
        accent: '#2088ff',
      },
      {
        name: 'FastAPI',
        role: 'High-Performance Asynchronous APIs',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
        accent: '#009688',
      },
      {
        name: 'PostgreSQL',
        role: 'ACID Storage Engine · Indexing',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
        accent: '#336791',
      },
      {
        name: 'AWS',
        role: 'EC2 · S3 Buckets · Lambda',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
        accent: '#ff9900',
      },
      {
        name: 'Node.js',
        role: 'V8 Runtime · Microservices',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
        accent: '#68a063',
      },
    ],
  },
  {
    id: 'ai-ml',
    title: 'Applied AI & Deep Learning',
    icon: <Cpu size={20} className="text-[#a855f7]" />,
    accent: '#a855f7',
    technologies: [
      {
        name: 'PyTorch',
        role: 'Deep Learning · Neural Architectures',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
        accent: '#ee4c2c',
      },
      {
        name: 'Python',
        role: 'NumPy · SciPy · Model Serving',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        accent: '#3776ab',
      },
      {
        name: 'TensorFlow',
        role: 'Tensor Computation · Export Formats',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
        accent: '#ff6f00',
      },
      {
        name: 'Google AI Studio',
        role: 'LLM Workflows · Prompt Systems',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg',
        accent: '#ea4335',
      },
      {
        name: 'Transformers',
        role: 'BERT · RoBERTa · Attention Hooks',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        accent: '#f59e0b',
      },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & Interaction Systems',
    icon: <Layers size={20} className="text-[#34d399]" />,
    accent: '#34d399',
    technologies: [
      {
        name: 'Next.js',
        role: 'App Router · SSR & Streaming',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
        accent: '#ffffff',
      },
      {
        name: 'React',
        role: 'Concurrent Mode · Custom Hooks',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        accent: '#00d8ff',
      },
      {
        name: 'TypeScript',
        role: 'Strict Typing · AST Compilation',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
        accent: '#3178c6',
      },
      {
        name: 'Tailwind CSS',
        role: 'Fluid Tokens · JIT Compiler',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        accent: '#06b6d4',
      },
      {
        name: 'Framer Motion',
        role: 'Spring Physics · Gesture Controls',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg',
        accent: '#f43f5e',
      },
      {
        name: 'Three.js',
        role: 'WebGL · Shaders · 3D Scene Graph',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg',
        accent: '#10b981',
      },
    ],
  },
] satisfies readonly CapabilityCluster[];

const MOBILE_FILTER_TABS = [
  { id: 'mobile', label: 'Mobile', count: 5 },
  { id: 'devsecops', label: 'Backend', count: 6 },
  { id: 'ai-ml', label: 'AI & ML', count: 5 },
  { id: 'frontend', label: 'Frontend', count: 6 },
  { id: 'all', label: 'All', count: 22 },
] as const;

export const CapabilityStack: React.FC = () => {
  const { isDark } = useTheme();
  const [activeMobileFilter, setActiveMobileFilter] = useState<string>('mobile');

  const mobileClusters = activeMobileFilter === 'all'
    ? CLUSTERS
    : CLUSTERS.filter((c) => c.id === activeMobileFilter);

  const clusterIds = CLUSTERS.map((c) => c.id);

  const handleNextMobileCluster = () => {
    playClickSnap();
    const currentIdx = clusterIds.indexOf(activeMobileFilter);
    if (currentIdx === -1) {
      setActiveMobileFilter(clusterIds[0]);
    } else {
      const nextIdx = (currentIdx + 1) % clusterIds.length;
      setActiveMobileFilter(clusterIds[nextIdx]);
    }
  };

  const handlePrevMobileCluster = () => {
    playClickSnap();
    const currentIdx = clusterIds.indexOf(activeMobileFilter);
    if (currentIdx === -1) {
      setActiveMobileFilter(clusterIds[clusterIds.length - 1]);
    } else {
      const prevIdx = (currentIdx - 1 + clusterIds.length) % clusterIds.length;
      setActiveMobileFilter(clusterIds[prevIdx]);
    }
  };

  return (
    <section
      className="relative w-full py-8 sm:py-16 md:py-20 border-t border-zinc-200/80 dark:border-white/10 overflow-hidden transition-colors duration-300 section-contained"
      id="capabilities"
    >
      <span id="stack" className="absolute -top-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Heading */}
        <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4 mb-3.5 sm:mb-8 md:mb-12 border-b border-zinc-200/80 dark:border-white/10 pb-3 sm:pb-6">
          <div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-['Montserrat',sans-serif]">
              Capabilities<span className="text-[#fba01d]">.</span>
            </h2>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP / LAPTOP VIEW (md+): The Spacious, Premium 2x2 Grid   */}
        {/* ============================================================== */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-8">
          {CLUSTERS.map((cluster) => (
            <motion.div
              key={cluster.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
              className="relative rounded-2xl p-6 bg-white dark:bg-white/[0.025] dark:hover:bg-white/[0.045] backdrop-blur-2xl border border-zinc-200/80 hover:border-zinc-300 dark:border-white/[0.12] dark:hover:border-white/[0.25] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.8)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.22)] transition-all duration-300 overflow-hidden flex flex-col justify-between group item-contained"
            >
              {/* Top Specular Edge Highlight */}
              <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/35 to-transparent pointer-events-none z-20" />

              <div>
                {/* Cluster Heading */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/[0.03] backdrop-blur-md border border-zinc-200/80 dark:border-white/15 flex items-center justify-center text-zinc-900 dark:text-white shadow-xs">
                    {cluster.icon}
                  </div>
                  <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-zinc-950 dark:text-white tracking-tight">
                    {cluster.title}
                  </h3>
                </div>

                {/* Tech Stack Chips (2 columns on desktop so names never truncate) */}
                <div className="grid grid-cols-2 gap-2.5">
                  {cluster.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      onMouseEnter={playHoverTick}
                      data-cursor={tech.name}
                      title={tech.role}
                      className="relative flex items-center gap-2.5 p-2.5 rounded-xl bg-zinc-50/80 hover:bg-white dark:bg-white/[0.025] dark:hover:bg-white/[0.07] backdrop-blur-xl border border-zinc-200/80 hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/25 transition-all duration-200 group/item shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer select-none"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/[0.04] backdrop-blur-md border border-zinc-200/70 dark:border-white/10 flex items-center justify-center p-1.5 shrink-0 group-hover/item:scale-110 group-hover/item:border-zinc-300 dark:group-hover/item:border-white/30 transition-transform duration-200 shadow-xs">
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          loading="lazy"
                          decoding="async"
                          className={`w-full h-full object-contain ${
                            tech.name === 'Next.js' && isDark ? 'invert brightness-200' : ''
                          }`}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>

                      <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[13px] text-zinc-900 dark:text-zinc-100 group-hover/item:text-amber-600 dark:group-hover/item:text-[#fba01d] transition-colors truncate tracking-tight">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* MOBILE VIEW (< md): Compact, Space-Optimized Domain Switcher  */}
        {/* ============================================================== */}
        <div className="md:hidden">
          {/* Mobile Filter Tabs Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 mb-3.5 -mx-4 px-4">
            {MOBILE_FILTER_TABS.map((tab) => {
              const isActive = activeMobileFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    playClickSnap();
                    setActiveMobileFilter(tab.id);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold transition-all shrink-0 cursor-pointer select-none flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xs'
                      : 'bg-zinc-100 hover:bg-zinc-200/70 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-zinc-600 dark:text-neutral-400 hover:text-zinc-950 dark:hover:text-white border border-zinc-200/70 dark:border-white/10'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-medium transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white dark:bg-black/10 dark:text-zinc-950'
                        : 'bg-zinc-200/80 dark:bg-white/10 text-zinc-500 dark:text-neutral-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Execution Cluster Card */}
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {mobileClusters.map((cluster) => (
                <motion.div
                  key={cluster.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onPanEnd={(_e, info) => {
                    if (activeMobileFilter === 'all') return;
                    if (info.offset.x < -45) {
                      handleNextMobileCluster();
                    } else if (info.offset.x > 45) {
                      handlePrevMobileCluster();
                    }
                  }}
                  className="relative rounded-xl p-3.5 bg-white dark:bg-white/[0.025] backdrop-blur-2xl border border-zinc-200/80 dark:border-white/[0.12] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.22)] transition-all duration-300 overflow-hidden flex flex-col justify-between group item-contained touch-pan-y"
                >
                  {/* Top Specular Edge Highlight */}
                  <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/35 to-transparent pointer-events-none z-20" />

                  <div>
                    {/* Cluster Heading */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="p-1.5 rounded-lg bg-zinc-50 dark:bg-white/[0.03] backdrop-blur-md border border-zinc-200/80 dark:border-white/15 flex items-center justify-center text-zinc-900 dark:text-white shadow-xs">
                        {cluster.icon}
                      </div>
                      <h3 className="font-['Montserrat',sans-serif] font-bold text-sm text-zinc-950 dark:text-white tracking-tight">
                        {cluster.title}
                      </h3>
                    </div>

                    {/* Compact Mobile Tech Item Chips */}
                    <div className="grid grid-cols-2 gap-1.5">
                      {cluster.technologies.map((tech) => (
                        <div
                          key={tech.name}
                          onMouseEnter={playHoverTick}
                          data-cursor={tech.name}
                          title={tech.role}
                          className="relative flex items-center gap-2 px-2 py-1.5 rounded-lg bg-zinc-50/80 hover:bg-white dark:bg-white/[0.025] dark:hover:bg-white/[0.07] backdrop-blur-xl border border-zinc-200/80 hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/25 transition-all duration-200 group/item shadow-[0_1px_2px_rgba(0,0,0,0.03)] cursor-pointer select-none"
                        >
                          <div className="w-5 h-5 rounded-md bg-white dark:bg-white/[0.04] backdrop-blur-md border border-zinc-200/70 dark:border-white/10 flex items-center justify-center p-0.5 shrink-0 group-hover/item:scale-110 group-hover/item:border-zinc-300 dark:group-hover/item:border-white/30 transition-transform duration-200 shadow-xs">
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              loading="lazy"
                              decoding="async"
                              className={`w-full h-full object-contain ${
                                tech.name === 'Next.js' && isDark ? 'invert brightness-200' : ''
                              }`}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[11px] text-zinc-900 dark:text-zinc-100 group-hover/item:text-amber-600 dark:group-hover/item:text-[#fba01d] transition-colors truncate tracking-tight">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile Swipe Indicators & Dot Navigation */}
          {activeMobileFilter !== 'all' && (
            <div className="flex items-center justify-between mt-2.5 px-0.5">
              <div className="flex items-center gap-1.5">
                {CLUSTERS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      playClickSnap();
                      setActiveMobileFilter(c.id);
                    }}
                    aria-label={`Go to ${c.title}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeMobileFilter === c.id
                        ? 'w-6 bg-[#fba01d]'
                        : 'w-1.5 bg-zinc-300 dark:bg-white/20 hover:bg-zinc-400'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[9px] font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-[0.16em] text-zinc-400 dark:text-neutral-500">
                ← SWIPE OR TAP TABS →
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CapabilityStack;
