import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Maximize2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  FileCode, 
  Sparkles,
  X,
  ExternalLink
} from 'lucide-react';
import { Github } from './Github';
import { ProjectItem } from '../types';
import { getProjectById, getAdjacentProjects, projects } from '../data/projectsData';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ui/ThemeToggle';

interface ProjectPageProps {
  projectId: string;
  onBack: () => void;
  onNavigateProject: (id: string) => void;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({
  projectId,
  onBack,
  onNavigateProject,
}) => {
  const { isDark } = useTheme();
  const project = getProjectById(projectId) || projects[0];
  const { prev, next } = getAdjacentProjects(project.id);

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [heroMediaIndex, setHeroMediaIndex] = useState(0);

  const handleImageErrorFallback = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.src.endsWith('.webp')) {
      target.src = target.src.replace(/\.webp$/, '.png');
    }
  };
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveMediaIndex(0);
    setHeroMediaIndex(0);
    setFullscreenImage(null);
  }, [projectId]);

  // Handle escape key to close fullscreen image
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreenImage) setFullscreenImage(null);
        else onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImage, onBack]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const isMobileRatio = project.heroAspectRatio === 'mobile' || project.id === 'vikify';
  const heroImage = project.media?.[0]?.url || project.backgroundImage || project.image;
  const isVideo = project.media?.[0]?.type === 'video';

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#fba01d] selection:text-black relative ${
        isDark ? 'bg-[#070709] text-white' : 'bg-[#FAFAFC] text-zinc-900'
      }`}
      style={{
        backgroundImage: isDark
          ? 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)'
          : 'radial-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* Diffused Ambient Project Glow */}
      {heroImage && (
        <div
          className={`fixed -top-40 right-0 w-[700px] h-[700px] rounded-full pointer-events-none filter overflow-hidden transition-opacity duration-700 z-0 ${
            isDark ? 'opacity-20 blur-[130px]' : 'opacity-15 blur-[140px]'
          }`}
        >
          <img
            src={heroImage}
            alt=""
            loading="lazy"
            decoding="async"
            onError={handleImageErrorFallback}
            className="w-full h-full object-cover saturate-200"
          />
        </div>
      )}

      {/* ─── STICKY EDITORIAL TOP NAVIGATION BAR ─── */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-2xl border-b transition-colors duration-300 ${
          isDark
            ? 'bg-[#070709]/85 border-white/10'
            : 'bg-white/85 border-zinc-200/80 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Back Button & Breadcrumbs */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={onBack}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-all group ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 border border-zinc-200'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Works</span>
            </button>

            <span className={`hidden sm:inline ${isDark ? 'text-neutral-700' : 'text-zinc-300'}`}>|</span>

            <div className="hidden sm:flex items-center gap-2 truncate">
              <span
                className={`font-['Plus_Jakarta_Sans',sans-serif] text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                  isDark
                    ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/50'
                    : 'text-emerald-800 bg-emerald-500/10 border border-emerald-600/25'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
                {project.artifactBadge || 'PRODUCTION READY'}
              </span>
              <span
                className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-wider truncate ${
                  isDark ? 'text-neutral-400' : 'text-zinc-500'
                }`}
              >
                {project.category} · {project.year}
              </span>
            </div>
          </div>

          {/* Right: Actions (GitHub, Theme Toggle, ESC) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 font-['Plus_Jakarta_Sans',sans-serif] text-xs px-3.5 py-1.5 rounded-xl border transition-all ${
                  isDark
                    ? 'text-neutral-300 hover:text-white border-white/10 hover:border-white/25 bg-white/[0.03] hover:bg-white/[0.08]'
                    : 'text-zinc-700 hover:text-zinc-950 border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-100 shadow-2xs'
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View Code</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            <ThemeToggle />

            <button
              onClick={onBack}
              className={`flex items-center gap-1 font-['Plus_Jakarta_Sans',sans-serif] text-xs px-2.5 py-1.5 rounded-xl border transition-all ${
                isDark
                  ? 'text-neutral-400 hover:text-white border-white/10 hover:border-white/25 bg-white/[0.03]'
                  : 'text-zinc-500 hover:text-zinc-950 border-zinc-200 hover:border-zinc-300 bg-white'
              }`}
              title="Close (ESC)"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[10px] text-neutral-400">ESC</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN CASE STUDY CONTENT CONTAINER ─── */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">

        {/* ─── SECTION 1: ASYMMETRIC COMMAND-CENTER HERO (55/45) ─── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (7 cols / ~58%): The Spec Engine */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div>
              <div
                className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-wider mb-2.5 flex items-center gap-2 ${
                  isDark ? 'text-neutral-400' : 'text-zinc-500 font-medium'
                }`}
              >
                <span className="text-[#fba01d] font-bold">{project.number}</span>
                <span className={isDark ? 'text-neutral-600' : 'text-zinc-400'}>·</span>
                <span>{project.category}</span>
                <span className={isDark ? 'text-neutral-600' : 'text-zinc-400'}>·</span>
                <span>{project.year}</span>
              </div>

              <h1
                className={`text-4xl sm:text-6xl font-extrabold tracking-tight font-['Montserrat',sans-serif] leading-[1.08] ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}
              >
                {project.name}
                <span className="text-[#fba01d]">.</span>
              </h1>

              <p
                className={`mt-4 text-lg sm:text-xl font-medium leading-relaxed ${
                  isDark ? 'text-neutral-300' : 'text-zinc-800'
                }`}
              >
                {project.tagline}
              </p>

              <p
                className={`mt-3 text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-neutral-400' : 'text-zinc-600'
                }`}
              >
                {project.description}
              </p>
            </div>

            {/* Concrete Transformation 1: Inline Monospace Engineering Telemetry Strip (No Chunky Cards) */}
            {project.detailedMetrics && project.detailedMetrics.length > 0 && (
              <div
                className={`grid grid-cols-2 sm:grid-cols-4 gap-6 py-5 border-y my-6 transition-colors ${
                  isDark ? 'border-white/10' : 'border-neutral-200/80'
                }`}
              >
                {project.detailedMetrics.map((m, idx) => (
                  <div key={idx}>
                    <div
                      className={`font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-semibold tracking-tight ${
                        isDark ? 'text-white' : 'text-neutral-900'
                      }`}
                    >
                      {m.value}
                    </div>
                    <div
                      className={`font-['Plus_Jakarta_Sans',sans-serif] text-[11px] tracking-wider uppercase mt-0.5 ${
                        isDark ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Concrete Transformation 3: Structured Technical Spec Table */}
            {project.systemStack && project.systemStack.length > 0 ? (
              <div className="pt-1">
                <span
                  className={`text-[11px] font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-wider block mb-3 font-semibold ${
                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  SYSTEM SPECIFICATION & ARCHITECTURAL STACK
                </span>
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 font-['Plus_Jakarta_Sans',sans-serif] text-xs p-5 rounded-2xl border transition-colors ${
                    isDark
                      ? 'bg-white/[0.02] border-white/10 text-neutral-300'
                      : 'bg-white/80 border-neutral-200/90 text-neutral-700 shadow-2xs'
                  }`}
                >
                  {project.systemStack.map((item, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <span
                        className={`uppercase tracking-wider block text-[10px] font-semibold ${
                          isDark ? 'text-neutral-400' : 'text-neutral-500'
                        }`}
                      >
                        {item.category}
                      </span>
                      <div className="font-medium text-neutral-800 dark:text-neutral-200 truncate">
                        {item.items}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 pt-1">
                <span
                  className={`text-[11px] font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-wider block font-semibold ${
                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  CORE ARCHITECTURE & SYSTEMS STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-3 py-1.5 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] border transition-colors ${
                        isDark
                          ? 'bg-white/[0.04] text-neutral-300 border-white/10 hover:border-white/20'
                          : 'bg-zinc-100 text-zinc-700 border-zinc-200/90 hover:bg-zinc-200/70'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (5 cols / ~42%): The Artifact (Elevated Live Hardware / UI Canvas) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-start w-full">
            {isMobileRatio ? (
              /* REAL SMARTPHONE CHASSIS (20:9 FHD+ 1080x2400) */
              <div
                className={`w-full max-w-[360px] rounded-[3rem] border p-4 sm:p-5 flex flex-col items-center justify-between relative overflow-hidden group transition-all duration-300 ${
                  isDark
                    ? 'bg-white/[0.03] border-white/10 shadow-2xl'
                    : 'bg-zinc-50 border-zinc-200/90 shadow-xl shadow-zinc-900/5'
                }`}
              >
                {/* Ambient glow behind phone */}
                <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-80 rounded-full bg-gradient-to-tr from-amber-500/25 via-orange-500/15 to-transparent blur-3xl opacity-60" />
                </div>

                {/* Top Live Badge */}
                <div className="w-full flex items-center justify-between pb-2 px-1">
                  <span
                    className={`font-['Plus_Jakarta_Sans',sans-serif] text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                      isDark
                        ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/50'
                        : 'text-emerald-800 bg-emerald-500/10 border border-emerald-600/25'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {project.artifactBadge || '● AUDIO ENGINE ACTIVE (<20ms)'}
                  </span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] uppercase text-neutral-400">
                    20:9 FHD+
                  </span>
                </div>

                <div className="relative w-full flex items-center justify-center py-2">
                  <div
                    className={`relative w-[240px] sm:w-[260px] aspect-[9/20] rounded-[2.8rem] p-2 sm:p-2.5 transition-all duration-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] ${
                      isDark
                        ? 'bg-[#18181b] border-[4px] border-[#27272a] ring-1 ring-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.85)]'
                        : 'bg-[#27272a] border-[4px] border-[#3f3f46] ring-1 ring-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)]'
                    }`}
                  >
                    {/* Speaker micro-grille */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-neutral-600/60 z-30 pointer-events-none" />

                    {/* Centered punch-hole camera */}
                    <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-black border border-neutral-700/70 z-30 flex items-center justify-center pointer-events-none shadow-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1b1e2c]" />
                    </div>

                    {/* Screen Container */}
                    <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-black flex items-center justify-center shadow-inner group/screen">
                      {project.media?.[heroMediaIndex]?.type === 'video' ? (
                        <video
                          ref={videoRef}
                          src={project.media[heroMediaIndex].url}
                          preload="metadata"
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={project.media?.[heroMediaIndex]?.url || heroImage}
                          alt={project.media?.[heroMediaIndex]?.caption || project.name}
                          loading="lazy"
                          decoding="async"
                          onError={handleImageErrorFallback}
                          className="w-full h-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
                          onClick={() => setFullscreenImage(project.media?.[heroMediaIndex]?.url || heroImage)}
                        />
                      )}

                      {/* Specular glass reflection */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] pointer-events-none rounded-[2.2rem]" />

                      {/* Floating Quick Action Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/screen:opacity-100 transition-opacity flex flex-col justify-between p-3 pointer-events-none">
                        <div className="flex justify-between items-center pointer-events-auto">
                          {project.media?.[heroMediaIndex]?.type === 'video' && (
                            <button
                              onClick={toggleMute}
                              className="p-2 rounded-full bg-black/70 text-white/90 hover:text-white backdrop-blur-md transition-colors"
                              title={isMuted ? "Unmute Audio" : "Mute Audio"}
                            >
                              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                            </button>
                          )}
                          <button
                            onClick={() => setFullscreenImage(project.media?.[heroMediaIndex]?.url || heroImage)}
                            className="p-2 rounded-full bg-black/70 text-white/90 hover:text-white backdrop-blur-md ml-auto transition-colors"
                            title="Fullscreen"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {project.media?.[heroMediaIndex]?.type === 'video' && (
                          <div className="flex justify-center pointer-events-auto pb-6">
                            <button
                              onClick={togglePlay}
                              className="p-3 rounded-full bg-black/70 text-white hover:scale-110 transition-transform backdrop-blur-md shadow-lg"
                              title={isPlaying ? "Pause" : "Play"}
                            >
                              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Android gesture pill */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/40 z-30 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Footer status */}
                <div
                  className={`mt-2 w-full flex items-center justify-between text-xs font-['Plus_Jakarta_Sans',sans-serif] pt-2 border-t transition-colors ${
                    isDark ? 'border-white/10 text-neutral-400' : 'border-zinc-200/80 text-zinc-600'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate max-w-[210px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    <span className="truncate">{project.media?.[heroMediaIndex]?.caption || project.name}</span>
                  </div>
                  <span
                    className={`uppercase text-[10px] px-2 py-0.5 rounded font-['Plus_Jakarta_Sans',sans-serif] border ${
                      isDark
                        ? 'bg-white/5 text-neutral-400 border-white/10'
                        : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                    }`}
                  >
                    {project.media?.[heroMediaIndex]?.tag || 'UI MOTION'}
                  </span>
                </div>

                {/* Interactive Preview Selector Rail under Mobile Canvas */}
                {project.media && project.media.length > 1 && (
                  <div className={`mt-3 pt-3 border-t w-full ${isDark ? 'border-white/10' : 'border-zinc-200/80'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-wider font-semibold ${isDark ? 'text-neutral-400' : 'text-zinc-500'}`}>
                        PREVIEW ARTIFACTS ({project.media.length})
                      </span>
                      <span className="text-[10px] font-['Plus_Jakarta_Sans',sans-serif] text-neutral-400">
                        {heroMediaIndex + 1} / {project.media.length}
                      </span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                      {project.media.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setHeroMediaIndex(idx)}
                          className={`relative flex-shrink-0 w-11 h-18 rounded-lg overflow-hidden border-2 transition-all ${
                            heroMediaIndex === idx
                              ? (isDark ? 'border-amber-400 ring-2 ring-amber-400/30 scale-105' : 'border-zinc-950 ring-2 ring-zinc-950/20 scale-105')
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                          title={item.caption}
                        >
                          {item.type === 'video' ? (
                            <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center text-[9px] font-['Plus_Jakarta_Sans',sans-serif] text-white gap-0.5">
                              <Play className="w-3 h-3 text-emerald-400" />
                              <span>VID</span>
                            </div>
                          ) : (
                            <img
                              src={item.url}
                              alt={item.caption}
                              loading="lazy"
                              decoding="async"
                              onError={handleImageErrorFallback}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* HARDWARE / TERMINAL COMMAND-CENTER CASING (AquaSafeAI, SIRA, Insurix, HyFlex, etc.) */
              <div
                className={`w-full rounded-3xl border p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 ${
                  isDark
                    ? 'bg-white/[0.03] border-white/10 shadow-2xl'
                    : 'bg-white border-neutral-200/90 shadow-xl shadow-neutral-900/5'
                }`}
              >
                {/* Hardware Terminal Bezel Top Bar */}
                <div className="flex items-center justify-between pb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className={`text-[11px] font-['Plus_Jakarta_Sans',sans-serif] ml-2 font-medium ${isDark ? 'text-neutral-400' : 'text-zinc-500'}`}>
                      {project.id.toUpperCase()} · ARTIFACT
                    </span>
                  </div>

                  {/* Corner Live Status Pill */}
                  <span
                    className={`font-['Plus_Jakarta_Sans',sans-serif] text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-medium ${
                      isDark
                        ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/50'
                        : 'text-emerald-800 bg-emerald-500/10 border border-emerald-600/25'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {project.artifactBadge || '● TELEMETRY ARMED'}
                  </span>
                </div>

                {/* Primary Canvas Screen Frame */}
                <div
                  className={`relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border flex items-center justify-center ${
                    isDark
                      ? 'bg-black/60 border-white/10 shadow-inner'
                      : 'bg-zinc-100 border-zinc-200/90 shadow-xs'
                  }`}
                >
                  {project.media?.[heroMediaIndex]?.type === 'video' ? (
                    <div className="relative w-full h-full">
                      <video
                        src={project.media[heroMediaIndex].url}
                        preload="metadata"
                        controls
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <img
                      src={project.media?.[heroMediaIndex]?.url || heroImage}
                      alt={project.media?.[heroMediaIndex]?.caption || project.name}
                      loading="lazy"
                      decoding="async"
                      onError={handleImageErrorFallback}
                      className="w-full h-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
                      onClick={() => setFullscreenImage(project.media?.[heroMediaIndex]?.url || heroImage)}
                    />
                  )}

                  <button
                    onClick={() => setFullscreenImage(project.media?.[heroMediaIndex]?.url || heroImage)}
                    className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity border ${
                      isDark
                        ? 'bg-black/60 text-white/80 hover:text-white border-white/10'
                        : 'bg-white/85 text-zinc-700 hover:text-zinc-950 border-zinc-200/90 shadow-xs'
                    }`}
                    title="Zoom Fullscreen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Artifact Metadata Caption Bar */}
                <div
                  className={`mt-3 flex items-center justify-between text-xs font-['Plus_Jakarta_Sans',sans-serif] pt-1 ${
                    isDark ? 'text-neutral-400' : 'text-zinc-600'
                  }`}
                >
                  <span className="truncate max-w-[260px] font-medium">
                    {project.media?.[heroMediaIndex]?.caption || project.name}
                  </span>
                  <span
                    className={`uppercase text-[10px] px-2 py-0.5 rounded font-['Plus_Jakarta_Sans',sans-serif] border ${
                      isDark
                        ? 'bg-white/5 text-neutral-400 border-white/10'
                        : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                    }`}
                  >
                    {project.media?.[heroMediaIndex]?.tag || 'FEATURED'}
                  </span>
                </div>

                {/* Interactive Preview / Pinout Selector Strip */}
                {project.media && project.media.length > 1 && (
                  <div className={`mt-3.5 pt-3 border-t w-full ${isDark ? 'border-white/10' : 'border-neutral-200/80'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-wider font-semibold ${
                          isDark ? 'text-neutral-400' : 'text-zinc-500'
                        }`}
                      >
                        PINOUT & ARTIFACT SELECTOR ({project.media.length})
                      </span>
                      <span className={`text-[10px] font-['Plus_Jakarta_Sans',sans-serif] ${isDark ? 'text-neutral-500' : 'text-zinc-400'}`}>
                        {heroMediaIndex + 1} / {project.media.length}
                      </span>
                    </div>
                    <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin">
                      {project.media.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setHeroMediaIndex(idx)}
                          className={`relative flex-shrink-0 w-20 h-13 rounded-xl overflow-hidden border-2 transition-all ${
                            heroMediaIndex === idx
                              ? (isDark
                                  ? 'border-emerald-400 scale-105 shadow-md ring-2 ring-emerald-400/30'
                                  : 'border-zinc-950 scale-105 shadow-md ring-2 ring-zinc-950/20')
                              : 'border-transparent opacity-60 hover:opacity-100 hover:scale-102'
                          }`}
                          title={item.caption}
                        >
                          {item.type === 'video' ? (
                            <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center text-[9px] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-white gap-0.5">
                              <Play className="w-3.5 h-3.5 text-emerald-400" />
                              <span>VID</span>
                            </div>
                          ) : (
                            <img
                              src={item.url}
                              alt={item.caption}
                              loading="lazy"
                              decoding="async"
                              onError={handleImageErrorFallback}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ─── SECTION 2: CHALLENGE VS ENGINEERED SOLUTION ─── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div
            className={`p-6 sm:p-8 rounded-3xl border space-y-3 transition-colors ${
              isDark
                ? 'bg-rose-950/20 border-rose-900/40 text-neutral-200'
                : 'bg-rose-50/70 border-rose-200/80 text-zinc-800'
            }`}
          >
            <div
              className={`flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider ${
                isDark ? 'text-rose-400' : 'text-rose-700'
              }`}
            >
              <Activity className="w-4 h-4" /> The Challenge & Legacy Friction
            </div>
            <p className="text-sm sm:text-base leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div
            className={`p-6 sm:p-8 rounded-3xl border space-y-3 transition-colors ${
              isDark
                ? 'bg-emerald-950/20 border-emerald-900/40 text-neutral-200'
                : 'bg-emerald-50/70 border-emerald-200/80 text-zinc-800'
            }`}
          >
            <div
              className={`flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> The Engineered Solution
            </div>
            <p className="text-sm sm:text-base leading-relaxed">
              {project.solution}
            </p>
          </div>
        </section>

        {/* ─── SECTION 3: KEY DELIVERABLES & RELIABILITY GUARANTEES ─── */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border space-y-5 transition-colors ${
            isDark
              ? 'bg-white/[0.02] border-white/10'
              : 'bg-white border-zinc-200/90 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-4 border-inherit">
            <span
              className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider ${
                isDark ? 'text-neutral-400' : 'text-zinc-500 font-semibold'
              }`}
            >
              KEY DELIVERABLES & PRODUCTION GUARANTEES
            </span>
            <span className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] ${isDark ? 'text-neutral-500' : 'text-zinc-400'}`}>
              {project.highlights.length} AUDIT POINTS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2
                  className={`w-4 h-4 flex-shrink-0 mt-1 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                />
                <span
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-neutral-300' : 'text-zinc-700'
                  }`}
                >
                  {h}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 4: ARCHITECTURAL BLUEPRINT & TECH MATRIX ─── */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border space-y-6 transition-colors ${
            isDark
              ? 'bg-white/[0.02] border-white/10'
              : 'bg-white border-zinc-200/90 shadow-xs'
          }`}
        >
          <div>
            <span
              className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider block mb-3 ${
                isDark ? 'text-neutral-400' : 'text-zinc-500 font-semibold'
              }`}
            >
              SYSTEM ARCHITECTURAL BLUEPRINT
            </span>
            <div
              className={`p-5 rounded-2xl font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm border leading-relaxed overflow-x-auto ${
                isDark
                  ? 'bg-black/50 border-white/10 text-neutral-200'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-800'
              }`}
            >
              <code>{project.architecture}</code>
            </div>
            <p
              className={`text-xs sm:text-sm mt-3 ${
                isDark ? 'text-neutral-400' : 'text-zinc-600'
              }`}
            >
              Engineered with strict separation of concerns, high deterministic reliability, and unidirectional reactive state models.
            </p>
          </div>

          <div className="pt-2">
            <span
              className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider block mb-3 ${
                isDark ? 'text-neutral-400' : 'text-zinc-500 font-semibold'
              }`}
            >
              FULL TECHNOLOGY MATRIX
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {project.techStack?.map((tech, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-['Plus_Jakarta_Sans',sans-serif] transition-colors ${
                    isDark
                      ? 'bg-white/[0.02] border-white/10 text-neutral-300'
                      : 'bg-white border-zinc-200/90 text-zinc-800 shadow-2xs'
                  }`}
                >
                  <span>{tech}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isDark ? 'bg-emerald-400' : 'bg-emerald-600'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: FEATURE INNOVATIONS & CASE STUDY DECK ─── */}
        {project.slides && project.slides.length > 0 && (
          <section className="space-y-6">
            <div
              className={`flex items-center justify-between border-b pb-4 ${
                isDark ? 'border-white/10' : 'border-zinc-200'
              }`}
            >
              <div>
                <span
                  className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider ${
                    isDark ? 'text-neutral-400' : 'text-zinc-500 font-semibold'
                  }`}
                >
                  TECHNICAL DEEP DIVE
                </span>
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 font-['Montserrat',sans-serif] ${
                    isDark ? 'text-white' : 'text-zinc-950'
                  }`}
                >
                  Innovations & Feature Deck<span className="text-[#fba01d]">.</span>
                </h2>
              </div>
              <span className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] ${isDark ? 'text-neutral-500' : 'text-zinc-400'}`}>
                {project.slides.length} SLIDES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col justify-between rounded-3xl overflow-hidden border transition-all duration-300 group ${
                    isDark
                      ? 'bg-white/[0.02] border-white/10 hover:border-white/25 shadow-lg'
                      : 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-xs hover:shadow-md'
                  }`}
                >
                  {slide.image && (
                    <div
                      className={`relative h-52 w-full overflow-hidden cursor-zoom-in ${
                        isDark ? 'bg-black/50' : 'bg-zinc-100 border-b border-zinc-200/70'
                      }`}
                      onClick={() => setFullscreenImage(slide.image!)}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        loading="lazy"
                        decoding="async"
                        onError={handleImageErrorFallback}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {slide.tag && (
                        <span
                          className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase border ${
                            isDark
                              ? 'bg-black/80 text-white border-white/15'
                              : 'bg-white/95 text-zinc-800 border-zinc-200/90 shadow-2xs'
                          }`}
                        >
                          {slide.tag}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h3
                        className={`text-base font-bold ${
                          isDark ? 'text-white' : 'text-zinc-950'
                        }`}
                      >
                        {slide.title}
                      </h3>
                      {slide.subtitle && (
                        <p
                          className={`text-xs font-semibold mt-1 ${
                            isDark ? 'text-[#fba01d]' : 'text-amber-700'
                          }`}
                        >
                          {slide.subtitle}
                        </p>
                      )}
                      <p
                        className={`text-xs sm:text-sm leading-relaxed mt-2.5 ${
                          isDark ? 'text-neutral-400' : 'text-zinc-600'
                        }`}
                      >
                        {slide.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── SECTION 6: VISUALS & MEDIA GALLERY ─── */}
        {project.media && project.media.length > 0 && (
          <section className="space-y-6">
            <div
              className={`flex items-center justify-between border-b pb-4 ${
                isDark ? 'border-white/10' : 'border-zinc-200'
              }`}
            >
              <div>
                <span
                  className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider ${
                    isDark ? 'text-neutral-400' : 'text-zinc-500 font-semibold'
                  }`}
                >
                  VISUAL ARCHIVE
                </span>
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 font-['Montserrat',sans-serif] ${
                    isDark ? 'text-white' : 'text-zinc-950'
                  }`}
                >
                  Media & Visual Gallery<span className="text-[#fba01d]">.</span>
                </h2>
              </div>
              <span className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] ${isDark ? 'text-neutral-500' : 'text-zinc-400'}`}>
                {project.media.length} ITEMS
              </span>
            </div>

            <div>
              {/* Active Showcase Frame */}
              <div
                className={`relative rounded-3xl overflow-hidden border h-[420px] sm:h-[540px] flex items-center justify-center group shadow-2xl transition-colors ${
                  isDark ? 'bg-black border-white/10' : 'bg-zinc-950 border-zinc-300'
                }`}
              >
                {project.media[activeMediaIndex].type === 'video' ? (
                  <video
                    src={project.media[activeMediaIndex].url}
                    preload="metadata"
                    controls
                    autoPlay
                    loop
                    muted
                    className="max-h-full w-full object-contain"
                  />
                ) : (
                  <img
                    src={project.media[activeMediaIndex].url}
                    alt={project.media[activeMediaIndex].caption}
                    loading="lazy"
                    decoding="async"
                    onError={handleImageErrorFallback}
                    className="max-h-full w-full object-contain cursor-zoom-in"
                    onClick={() => setFullscreenImage(project.media[activeMediaIndex].url)}
                  />
                )}

                <button
                  onClick={() => setFullscreenImage(project.media[activeMediaIndex].url)}
                  className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 text-white hover:bg-black/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="View Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-white flex items-end justify-between">
                  <div>
                    <p className="text-sm sm:text-base font-bold">
                      {project.media[activeMediaIndex].caption}
                    </p>
                    {project.media[activeMediaIndex].tag && (
                      <span className="text-xs font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-wider text-emerald-400">
                        {project.media[activeMediaIndex].tag}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-['Plus_Jakarta_Sans',sans-serif] text-neutral-400">
                    {activeMediaIndex + 1} / {project.media.length}
                  </span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {project.media.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`relative flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeMediaIndex === idx
                        ? (isDark
                            ? 'border-white scale-105 shadow-md ring-2 ring-white/20'
                            : 'border-zinc-950 scale-105 shadow-md ring-2 ring-zinc-900/20')
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    {item.type === 'video' ? (
                      <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center text-[10px] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-white gap-1">
                        <Play className="w-4 h-4 text-emerald-400" />
                        <span>VIDEO</span>
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.caption}
                        loading="lazy"
                        decoding="async"
                        onError={handleImageErrorFallback}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── SECTION 7: SOURCE ARTIFACTS & MODULES ─── */}
        {project.files && project.files.length > 0 && (
          <section className="space-y-6">
            <div
              className={`flex items-center justify-between border-b pb-4 ${
                isDark ? 'border-white/10' : 'border-zinc-200'
              }`}
            >
              <div>
                <span
                  className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider ${
                    isDark ? 'text-neutral-400' : 'text-zinc-500 font-semibold'
                  }`}
                >
                  IMPLEMENTATION CODE
                </span>
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 font-['Montserrat',sans-serif] ${
                    isDark ? 'text-white' : 'text-zinc-950'
                  }`}
                >
                  Source Artifacts & Core Modules<span className="text-[#fba01d]">.</span>
                </h2>
              </div>
              <span className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] ${isDark ? 'text-neutral-500' : 'text-zinc-400'}`}>
                {project.files.length} MODULES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.files.map((file, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-colors ${
                    isDark
                      ? 'bg-white/[0.02] border-white/10 hover:border-white/20'
                      : 'bg-white border-zinc-200/90 shadow-2xs hover:border-zinc-300'
                  }`}
                >
                  <div
                    className={`font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold flex items-center justify-between ${
                      isDark ? 'text-white' : 'text-zinc-950'
                    }`}
                  >
                    <span>{file.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-normal ${
                        isDark ? 'bg-white/10 text-neutral-400' : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                      }`}
                    >
                      SOURCE
                    </span>
                  </div>
                  {file.meta && (
                    <div
                      className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] mt-1 ${
                        isDark ? 'text-neutral-400' : 'text-zinc-500'
                      }`}
                    >
                      {file.meta}
                    </div>
                  )}
                  {file.desc && (
                    <div
                      className={`text-xs mt-2 ${
                        isDark ? 'text-neutral-300' : 'text-zinc-600'
                      }`}
                    >
                      {file.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── SECTION 8: NEXT & PREVIOUS PROJECT NAVIGATION ─── */}
        <section
          className={`border-t pt-12 transition-colors ${
            isDark ? 'border-white/10' : 'border-zinc-200'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Previous Project Card */}
            <button
              onClick={() => onNavigateProject(prev.id)}
              className={`p-6 rounded-3xl border text-left flex items-center justify-between transition-all group ${
                isDark
                  ? 'bg-white/[0.02] hover:bg-white/[0.06] border-white/10 hover:border-white/25'
                  : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-zinc-300 shadow-xs hover:shadow-md'
              }`}
            >
              <div>
                <span
                  className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] flex items-center gap-1.5 mb-1.5 ${
                    isDark ? 'text-neutral-400' : 'text-zinc-500 font-medium'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  PREVIOUS CASE STUDY
                </span>
                <div
                  className={`text-lg sm:text-xl font-bold font-['Montserrat',sans-serif] ${
                    isDark ? 'text-white' : 'text-zinc-950'
                  }`}
                >
                  {prev.name}
                </div>
                <div
                  className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] mt-0.5 truncate max-w-[240px] ${
                    isDark ? 'text-neutral-500' : 'text-zinc-400'
                  }`}
                >
                  {prev.category}
                </div>
              </div>
            </button>

            {/* Next Project Card */}
            <button
              onClick={() => onNavigateProject(next.id)}
              className={`p-6 rounded-3xl border text-right flex items-center justify-between transition-all group ${
                isDark
                  ? 'bg-white/[0.02] hover:bg-white/[0.06] border-white/10 hover:border-white/25'
                  : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-zinc-300 shadow-xs hover:shadow-md'
              }`}
            >
              <div className="w-full">
                <span
                  className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] inline-flex items-center gap-1.5 mb-1.5 justify-end ${
                    isDark ? 'text-neutral-400' : 'text-zinc-500 font-medium'
                  }`}
                >
                  NEXT CASE STUDY
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div
                  className={`text-lg sm:text-xl font-bold font-['Montserrat',sans-serif] ${
                    isDark ? 'text-white' : 'text-zinc-950'
                  }`}
                >
                  {next.name}
                </div>
                <div
                  className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] mt-0.5 truncate max-w-[240px] ml-auto ${
                    isDark ? 'text-neutral-500' : 'text-zinc-400'
                  }`}
                >
                  {next.category}
                </div>
              </div>
            </button>
          </div>

          {/* Bottom Return Bar */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-inherit">
            <div className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] ${isDark ? 'text-neutral-500' : 'text-zinc-500'}`}>
              Engineered by{' '}
              <span className={isDark ? 'text-white font-semibold' : 'text-zinc-950 font-bold'}>
                Vishnu Kanchipati
              </span>{' '}
              · Production Architectures
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-colors ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Portfolio</span>
              </button>

              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isDark
                      ? 'bg-white text-black hover:bg-neutral-200 shadow-md'
                      : 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-xs'
                  }`}
                >
                  <span>View Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ─── FULLSCREEN MEDIA OVERLAY ─── */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            {fullscreenImage.endsWith('.mp4') ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="max-h-[92vh] max-w-[90vw] aspect-[9/20] rounded-3xl overflow-hidden shadow-2xl bg-black flex items-center justify-center border border-white/15"
              >
                <video
                  src={fullscreenImage}
                  preload="metadata"
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <img
                src={fullscreenImage}
                alt="Fullscreen preview"
                loading="eager"
                decoding="async"
                onError={handleImageErrorFallback}
                className="max-w-full max-h-[95vh] object-contain rounded-2xl shadow-2xl"
              />
            )}
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectPage;
