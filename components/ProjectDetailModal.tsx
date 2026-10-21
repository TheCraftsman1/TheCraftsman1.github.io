import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  ChevronRight, 
  ArrowUpRight,
  Maximize2,
  Play,
  Pause,
  Image as ImageIcon,
  Compass,
  FileCode,
  CheckCircle2,
  Volume2,
  VolumeX,
  Smartphone
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface PresentationSlide {
  title: string;
  subtitle?: string;
  desc: string;
  image?: string;
  tag?: string;
}

export interface ProjectDetailData {
  id: string;
  number: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  architecture: string;
  description: string;
  problem: string;
  solution: string;
  highlights: string[];
  techStack: string[];
  backgroundImage?: string;
  metrics?: { label: string; value: string }[];
  systemStack?: { category: string; items: string }[];
  artifactBadge?: string;
  heroAspectRatio?: 'mobile' | 'landscape';
  href: string;
  slides?: PresentationSlide[];
  media: {
    type: 'image' | 'video';
    url: string;
    caption: string;
    tag?: string;
  }[];
  files?: {
    name: string;
    meta?: string;
    desc?: string;
  }[];
}

interface ProjectDetailModalProps {
  project: ProjectDetailData | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'gallery' | 'files'>('overview');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

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

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreenImage) setFullscreenImage(null);
        else onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, fullscreenImage, onClose]);

  useEffect(() => {
    setActiveMediaIndex(0);
    setActiveTab('overview');
    setFullscreenImage(null);
  }, [project]);

  if (!project) return null;

  // Ambient artwork for subtle glow
  const heroImage = project.media?.[0]?.url || project.backgroundImage || project.href;
  const isVideo = project.media?.[0]?.type === 'video';
  const isMobileRatio = project.heroAspectRatio === 'mobile' || project.id === 'vikify' || project.media?.[0]?.tag?.toLowerCase().includes('mobile');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className={`absolute inset-0 transition-colors duration-300 ${
              isDark ? 'bg-black/85 backdrop-blur-xl' : 'bg-black/40 backdrop-blur-md'
            }`}
          />

          {/* Expansive Floating Case Study Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className={`relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl transition-colors duration-300 overflow-hidden z-10 backdrop-blur-3xl ${
              isDark
                ? 'bg-[#0c0c0f]/95 text-white border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9)]'
                : 'bg-[#fbfbfd]/95 text-zinc-900 border border-black/[0.08] shadow-[0_25px_80px_rgba(0,0,0,0.14)]'
            }`}
          >
            {/* ─── AMBIENT PROJECT GLOW (Subtle & Non-Intrusive) ─── */}
            {heroImage && (
              <div
                className={`absolute -top-32 -right-32 w-[620px] h-[620px] rounded-full pointer-events-none filter overflow-hidden transition-opacity duration-500 ${
                  isDark ? 'opacity-20 blur-[110px]' : 'opacity-15 blur-[120px]'
                }`}
              >
                <img src={heroImage} alt="" className="w-full h-full object-cover saturate-200" />
              </div>
            )}

            {/* ─── 1. MINIMALIST TOP BAR ─── */}
            <div
              className={`relative z-10 flex items-center justify-between px-6 sm:px-8 py-4 border-b transition-colors ${
                isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/[0.06] bg-zinc-50/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`font-['Plus_Jakarta_Sans',sans-serif] text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-colors ${
                    isDark
                      ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/50'
                      : 'text-emerald-800 bg-emerald-500/10 border border-emerald-600/25'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
                  PRODUCTION READY
                </span>
                <span
                  className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] tracking-wider uppercase hidden sm:inline ${
                    isDark ? 'text-neutral-400' : 'text-zinc-500 font-medium'
                  }`}
                >
                  {project.category} · {project.year}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 font-['Plus_Jakarta_Sans',sans-serif] text-xs px-3.5 py-1.5 rounded-lg border transition-all ${
                      isDark
                        ? 'text-neutral-300 hover:text-white border-white/10 hover:border-white/25 bg-white/[0.03] hover:bg-white/[0.08]'
                        : 'text-zinc-700 hover:text-zinc-950 border-zinc-200/90 hover:border-zinc-300 bg-white hover:bg-zinc-100 shadow-2xs'
                    }`}
                  >
                    <span>GITHUB</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isDark ? 'text-neutral-400' : 'text-zinc-500'}`} />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className={`flex items-center gap-1 text-xs font-['Plus_Jakarta_Sans',sans-serif] px-2.5 py-1.5 rounded-lg transition-colors ${
                    isDark
                      ? 'text-neutral-400 hover:text-white hover:bg-white/10'
                      : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100'
                  }`}
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                  <span className={`text-[10px] hidden sm:inline ${isDark ? 'text-neutral-500' : 'text-zinc-400'}`}>[ESC]</span>
                </button>
              </div>
            </div>

            {/* ─── 2. SEGMENTED EDITORIAL TABS ─── */}
            <div
              className={`relative z-10 flex gap-8 px-6 sm:px-8 border-b text-sm font-medium overflow-x-auto transition-colors ${
                isDark
                  ? 'border-white/10 text-neutral-400 bg-white/[0.01]'
                  : 'border-black/[0.06] text-zinc-500 bg-zinc-50/50'
              }`}
            >
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3.5 transition-colors relative whitespace-nowrap ${
                  activeTab === 'overview'
                    ? (isDark ? 'text-white font-semibold' : 'text-zinc-950 font-semibold')
                    : (isDark ? 'hover:text-neutral-200' : 'hover:text-zinc-900')
                }`}
              >
                Overview & Impact
                {activeTab === 'overview' && (
                  <motion.div
                    layoutId="modal-tab-indicator"
                    className={`absolute bottom-0 inset-x-0 h-[2px] rounded-full ${
                      isDark
                        ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]'
                        : 'bg-zinc-950 shadow-[0_0_8px_rgba(0,0,0,0.15)]'
                    }`}
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab('architecture')}
                className={`py-3.5 transition-colors relative whitespace-nowrap ${
                  activeTab === 'architecture'
                    ? (isDark ? 'text-white font-semibold' : 'text-zinc-950 font-semibold')
                    : (isDark ? 'hover:text-neutral-200' : 'hover:text-zinc-900')
                }`}
              >
                Architecture & Tech Stack
                {activeTab === 'architecture' && (
                  <motion.div
                    layoutId="modal-tab-indicator"
                    className={`absolute bottom-0 inset-x-0 h-[2px] rounded-full ${
                      isDark
                        ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]'
                        : 'bg-zinc-950 shadow-[0_0_8px_rgba(0,0,0,0.15)]'
                    }`}
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`py-3.5 transition-colors relative whitespace-nowrap ${
                  activeTab === 'gallery'
                    ? (isDark ? 'text-white font-semibold' : 'text-zinc-950 font-semibold')
                    : (isDark ? 'hover:text-neutral-200' : 'hover:text-zinc-900')
                }`}
              >
                Visuals & Media ({project.media?.length || 0})
                {activeTab === 'gallery' && (
                  <motion.div
                    layoutId="modal-tab-indicator"
                    className={`absolute bottom-0 inset-x-0 h-[2px] rounded-full ${
                      isDark
                        ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]'
                        : 'bg-zinc-950 shadow-[0_0_8px_rgba(0,0,0,0.15)]'
                    }`}
                  />
                )}
              </button>

              {project.files && project.files.length > 0 && (
                <button
                  onClick={() => setActiveTab('files')}
                  className={`py-3.5 transition-colors relative whitespace-nowrap ${
                    activeTab === 'files'
                      ? (isDark ? 'text-white font-semibold' : 'text-zinc-950 font-semibold')
                      : (isDark ? 'hover:text-neutral-200' : 'hover:text-zinc-900')
                  }`}
                >
                  Source Artifacts ({project.files.length})
                  {activeTab === 'files' && (
                    <motion.div
                      layoutId="modal-tab-indicator"
                      className={`absolute bottom-0 inset-x-0 h-[2px] rounded-full ${
                        isDark
                          ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]'
                          : 'bg-zinc-950 shadow-[0_0_8px_rgba(0,0,0,0.15)]'
                      }`}
                    />
                  )}
                </button>
              )}
            </div>

            {/* ─── 3. SCROLLABLE CONTENT BODY ─── */}
            <div className="relative z-10 flex-1 overflow-y-auto px-6 sm:px-8 py-8 space-y-10">

              {/* TAB 1: OVERVIEW & IMPACT */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-10"
                >
                  {/* 2-COLUMN HERO SECTION */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Info Column (7 Cols / ~60%) */}
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <div
                          className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-wider mb-1.5 flex items-center gap-2 ${
                            isDark ? 'text-neutral-400' : 'text-zinc-500 font-medium'
                          }`}
                        >
                          <span>{project.number}</span>
                          <span className={isDark ? 'text-neutral-600' : 'text-zinc-400'}>·</span>
                          <span>{project.category}</span>
                        </div>
                        <h1
                          className={`text-4xl sm:text-5xl font-extrabold tracking-tight font-['Montserrat',sans-serif] ${
                            isDark ? 'text-white' : 'text-zinc-950'
                          }`}
                        >
                          {project.name}
                        </h1>
                        <p
                          className={`mt-3 text-base sm:text-lg font-medium leading-relaxed ${
                            isDark ? 'text-neutral-300' : 'text-zinc-800'
                          }`}
                        >
                          {project.tagline}
                        </p>
                        <p
                          className={`mt-3 text-sm leading-relaxed ${
                            isDark ? 'text-neutral-400' : 'text-zinc-600'
                          }`}
                        >
                          {project.description}
                        </p>
                      </div>

                      {/* Inline Monospace Dashboard Metrics (Telemetry Rail) */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div
                          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y my-4 transition-colors ${
                            isDark ? 'border-white/10' : 'border-neutral-200/80'
                          }`}
                        >
                          {project.metrics.map((m, idx) => (
                            <div key={idx}>
                              <div
                                className={`text-xl font-bold font-['Plus_Jakarta_Sans',sans-serif] tracking-tight ${
                                  isDark ? 'text-white' : 'text-neutral-900'
                                }`}
                              >
                                {m.value}
                              </div>
                              <div
                                className={`text-[10px] font-['Plus_Jakarta_Sans',sans-serif] tracking-wider uppercase mt-0.5 ${
                                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}
                              >
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Structured Technical Spec Table */}
                      {project.systemStack && project.systemStack.length > 0 ? (
                        <div className="pt-1">
                          <span
                            className={`text-[10px] font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-wider block mb-2 font-semibold ${
                              isDark ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                          >
                            SYSTEM SPECIFICATION
                          </span>
                          <div
                            className={`grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 font-['Plus_Jakarta_Sans',sans-serif] text-xs p-3.5 rounded-xl border transition-colors ${
                              isDark
                                ? 'bg-white/[0.02] border-white/10 text-neutral-300'
                                : 'bg-white/80 border-neutral-200/90 text-neutral-700 shadow-2xs'
                            }`}
                          >
                            {project.systemStack.map((item, idx) => (
                              <div key={idx} className="space-y-0.5">
                                <span
                                  className={`uppercase tracking-wider block text-[9px] font-semibold ${
                                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                                  }`}
                                >
                                  {item.category}
                                </span>
                                <div className="font-medium text-neutral-800 dark:text-neutral-200 truncate text-[11px]">
                                  {item.items}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5 pt-1">
                          <span
                            className={`text-[10px] font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-wider block font-semibold ${
                              isDark ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                          >
                            CORE ARCHITECTURE STACK
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack?.slice(0, 6).map((tag, idx) => (
                              <span
                                key={idx}
                                className={`text-xs px-3 py-1 rounded-lg font-['Plus_Jakarta_Sans',sans-serif] border transition-colors ${
                                  isDark
                                    ? 'bg-white/[0.04] text-neutral-300 border-white/10'
                                    : 'bg-zinc-100 text-zinc-700 border-zinc-200/80 hover:bg-zinc-200/60'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Hero Preview Column (5 Cols / ~40%) */}
                    {isMobileRatio ? (
                      <div
                        className={`lg:col-span-5 rounded-3xl border p-4 sm:p-5 flex flex-col items-center justify-between relative overflow-hidden group transition-colors ${
                          isDark
                            ? 'bg-white/[0.03] border-white/10'
                            : 'bg-zinc-50/80 border-zinc-200/90 shadow-2xs'
                        }`}
                      >
                        {/* Ambient artwork radial glow */}
                        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                          <div className="w-56 h-72 rounded-full bg-gradient-to-tr from-amber-500/25 via-orange-500/15 to-transparent blur-3xl opacity-60" />
                        </div>

                        {/* Real Smartphone Chassis Mockup in 20:9 FHD+ */}
                        <div className="relative w-full flex items-center justify-center py-1">
                          <div
                            className={`relative w-[220px] sm:w-[250px] aspect-[9/20] rounded-[2.8rem] p-2 sm:p-2.5 transition-all duration-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] ${
                              isDark
                                ? 'bg-[#18181b] border-[4px] border-[#27272a] ring-1 ring-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.85)]'
                                : 'bg-[#27272a] border-[4px] border-[#3f3f46] ring-1 ring-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)]'
                            }`}
                          >
                            {/* Speaker micro-grille */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-neutral-600/60 z-30 pointer-events-none" />

                            {/* Centered punch-hole selfie camera */}
                            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-black border border-neutral-700/70 z-30 flex items-center justify-center pointer-events-none shadow-xs">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#1b1e2c]" />
                            </div>

                            {/* Phone Screen Container */}
                            <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-black flex items-center justify-center shadow-inner group/screen">
                              {isVideo ? (
                                <video
                                  ref={videoRef}
                                  src={project.media[0].url}
                                  autoPlay
                                  loop
                                  muted={isMuted}
                                  playsInline
                                  className="w-full h-full object-cover"
                                />
                              ) : heroImage ? (
                                <img
                                  src={heroImage}
                                  alt={project.name}
                                  className="w-full h-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
                                  onClick={() => setFullscreenImage(heroImage)}
                                />
                              ) : (
                                <span className="text-xs font-['Plus_Jakarta_Sans',sans-serif] text-neutral-500">[ Mobile Preview ]</span>
                              )}

                              {/* Specular glass reflection layer */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] pointer-events-none rounded-[2.2rem]" />

                              {/* Floating Quick Action Overlay */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/screen:opacity-100 transition-opacity flex flex-col justify-between p-3 pointer-events-none">
                                <div className="flex justify-between items-center pointer-events-auto">
                                  {isVideo && (
                                    <button
                                      onClick={toggleMute}
                                      className="p-2 rounded-full bg-black/70 text-white/90 hover:text-white backdrop-blur-md transition-colors"
                                      title={isMuted ? "Unmute Audio" : "Mute Audio"}
                                    >
                                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                                    </button>
                                  )}
                                  <button
                                    onClick={() => setFullscreenImage(isVideo ? project.media[0].url : heroImage)}
                                    className="p-2 rounded-full bg-black/70 text-white/90 hover:text-white backdrop-blur-md ml-auto transition-colors"
                                    title="Fullscreen"
                                  >
                                    <Maximize2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                {isVideo && (
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

                              {/* Android bottom gesture pill */}
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/40 z-30 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        {/* Caption & Indicator Footer */}
                        <div
                          className={`mt-3 w-full flex items-center justify-between text-xs font-['Plus_Jakarta_Sans',sans-serif] pt-2 border-t transition-colors ${
                            isDark ? 'border-white/10 text-neutral-400' : 'border-zinc-200/80 text-zinc-600'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate max-w-[210px]">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                            <span className="truncate">{project.media?.[0]?.caption || project.name}</span>
                          </div>
                          <span
                            className={`uppercase text-[10px] px-2 py-0.5 rounded font-['Plus_Jakarta_Sans',sans-serif] border ${
                              isDark
                                ? 'bg-white/5 text-neutral-400 border-white/10'
                                : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                            }`}
                          >
                            20:9 FHD+
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`lg:col-span-5 rounded-2xl border p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden group transition-colors ${
                          isDark
                            ? 'bg-white/[0.03] border-white/10'
                            : 'bg-zinc-50/80 border-zinc-200/90 shadow-2xs'
                        }`}
                      >
                        <div
                          className={`relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden border flex items-center justify-center ${
                            isDark
                              ? 'bg-black/60 border-white/10 shadow-inner'
                              : 'bg-zinc-100 border-zinc-200/90 shadow-2xs'
                          }`}
                        >
                          {isVideo ? (
                            <div className="relative w-full h-full">
                              <video
                                src={project.media[0].url}
                                controls
                                autoPlay
                                loop
                                muted
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : heroImage ? (
                            <img
                              src={heroImage}
                              alt={project.name}
                              className="w-full h-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
                              onClick={() => setFullscreenImage(heroImage)}
                            />
                          ) : (
                            <span className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] ${isDark ? 'text-neutral-500' : 'text-zinc-400'}`}>
                              [ Visual Preview ]
                            </span>
                          )}

                          {heroImage && (
                            <button
                              onClick={() => setFullscreenImage(heroImage)}
                              className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity border ${
                                isDark
                                  ? 'bg-black/60 text-white/80 hover:text-white border-white/10'
                                  : 'bg-white/85 text-zinc-700 hover:text-zinc-950 border-zinc-200/90 shadow-xs'
                              }`}
                              title="Zoom"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div
                          className={`mt-3 flex items-center justify-between text-xs font-['Plus_Jakarta_Sans',sans-serif] ${
                            isDark ? 'text-neutral-400' : 'text-zinc-600'
                          }`}
                        >
                          <span className="truncate max-w-[260px]">
                            {project.media?.[0]?.caption || project.name}
                          </span>
                          <span className={`uppercase font-medium ${isDark ? 'text-neutral-500' : 'text-zinc-400'}`}>
                            {project.media?.[0]?.tag || 'FEATURED'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CHALLENGE VS ENGINEERED SOLUTION CARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <div
                      className={`p-6 rounded-2xl border space-y-2 transition-colors ${
                        isDark
                          ? 'bg-white/[0.02] border-white/10'
                          : 'bg-rose-50/70 border-rose-200/80'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider ${
                          isDark ? 'text-rose-400' : 'text-rose-700'
                        }`}
                      >
                        <Activity className="w-4 h-4" /> The Challenge & Legacy Friction
                      </div>
                      <p
                        className={`text-sm leading-relaxed ${
                          isDark ? 'text-neutral-300' : 'text-zinc-700'
                        }`}
                      >
                        {project.problem}
                      </p>
                    </div>

                    <div
                      className={`p-6 rounded-2xl border space-y-2 transition-colors ${
                        isDark
                          ? 'bg-white/[0.02] border-white/10'
                          : 'bg-emerald-50/70 border-emerald-200/80'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider ${
                          isDark ? 'text-emerald-400' : 'text-emerald-700'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4" /> The Engineered Solution
                      </div>
                      <p
                        className={`text-sm leading-relaxed ${
                          isDark ? 'text-neutral-300' : 'text-zinc-700'
                        }`}
                      >
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* VISUAL PRESENTATION SLIDES (Embedded Media Cards) */}
                  {project.slides && project.slides.length > 0 && (
                    <div className="space-y-5 pt-2">
                      <div
                        className={`flex items-center justify-between border-b pb-3 ${
                          isDark ? 'border-white/10' : 'border-black/[0.06]'
                        }`}
                      >
                        <h3
                          className={`text-sm font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider flex items-center gap-2 ${
                            isDark ? 'text-white' : 'text-zinc-950'
                          }`}
                        >
                          <Layers className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                          <span>Case Study Innovations & Feature Deck</span>
                        </h3>
                        <span className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] ${isDark ? 'text-neutral-500' : 'text-zinc-400'}`}>
                          {project.slides.length} SLIDES
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {project.slides.map((slide, idx) => (
                          <div
                            key={idx}
                            className={`flex flex-col justify-between rounded-2xl overflow-hidden border transition-all group ${
                              isDark
                                ? 'bg-white/[0.02] border-white/10 hover:border-white/20'
                                : 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-2xs hover:shadow-md'
                            }`}
                          >
                            {slide.image && (
                              <div
                                className={`relative h-44 w-full overflow-hidden cursor-zoom-in ${
                                  isDark ? 'bg-black/50' : 'bg-zinc-100 border-b border-zinc-200/70'
                                }`}
                                onClick={() => setFullscreenImage(slide.image!)}
                              >
                                <img
                                  src={slide.image}
                                  alt={slide.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {slide.tag && (
                                  <span
                                    className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase border ${
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

                            <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                              <div>
                                <h4
                                  className={`text-sm font-bold ${
                                    isDark ? 'text-white' : 'text-zinc-950'
                                  }`}
                                >
                                  {slide.title}
                                </h4>
                                {slide.subtitle && (
                                  <p
                                    className={`text-xs font-medium mt-1 ${
                                      isDark ? 'text-amber-400/90' : 'text-amber-700'
                                    }`}
                                  >
                                    {slide.subtitle}
                                  </p>
                                )}
                                <p
                                  className={`text-xs leading-relaxed mt-1.5 ${
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
                    </div>
                  )}

                  {/* HIGHLIGHTS BULLET MATRIX */}
                  <div
                    className={`p-6 rounded-2xl border space-y-4 transition-colors ${
                      isDark
                        ? 'bg-white/[0.02] border-white/10'
                        : 'bg-white border-zinc-200/90 shadow-2xs'
                    }`}
                  >
                    <span
                      className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider ${
                        isDark ? 'text-neutral-400' : 'text-zinc-500'
                      }`}
                    >
                      KEY DELIVERABLES & RELIABILITY GUARANTEES
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isDark ? 'text-emerald-400' : 'text-emerald-600'
                            }`}
                          />
                          <span
                            className={`text-xs sm:text-sm ${
                              isDark ? 'text-neutral-300' : 'text-zinc-700'
                            }`}
                          >
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: SYSTEM ARCHITECTURE */}
              {activeTab === 'architecture' && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  <div
                    className={`p-6 sm:p-8 rounded-2xl border space-y-3 transition-colors ${
                      isDark
                        ? 'bg-white/[0.02] border-white/10'
                        : 'bg-white border-zinc-200/90 shadow-2xs'
                    }`}
                  >
                    <span
                      className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider ${
                        isDark ? 'text-neutral-400' : 'text-zinc-500'
                      }`}
                    >
                      ARCHITECTURAL BLUEPRINT
                    </span>
                    <div
                      className={`p-4 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm border ${
                        isDark
                          ? 'bg-black/50 border-white/10 text-neutral-200'
                          : 'bg-zinc-100 border-zinc-200/90 text-zinc-800'
                      }`}
                    >
                      {project.architecture}
                    </div>
                    <p
                      className={`text-sm leading-relaxed pt-2 ${
                        isDark ? 'text-neutral-400' : 'text-zinc-600'
                      }`}
                    >
                      Engineered with strict separation of concerns, high deterministic reliability, and unidirectional reactive state models.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <span
                      className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider ${
                        isDark ? 'text-neutral-400' : 'text-zinc-500'
                      }`}
                    >
                      FULL TECHNOLOGY MATRIX
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {project.techStack.map((tech, idx) => (
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
                </motion.div>
              )}

              {/* TAB 3: VISUALS & MEDIA GALLERY */}
              {activeTab === 'gallery' && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {project.media && project.media.length > 0 ? (
                    <div>
                      {/* Active Showcase Frame */}
                      <div
                        className={`relative rounded-2xl overflow-hidden border h-[460px] flex items-center justify-center group shadow-xl ${
                          isDark ? 'bg-black/70 border-white/10' : 'bg-zinc-950 border-zinc-300/80'
                        }`}
                      >
                        {project.media[activeMediaIndex].type === 'video' ? (
                          <video
                            src={project.media[activeMediaIndex].url}
                            controls
                            autoPlay
                            loop
                            muted
                            className="max-h-[460px] w-full object-contain"
                          />
                        ) : (
                          <img
                            src={project.media[activeMediaIndex].url}
                            alt={project.media[activeMediaIndex].caption}
                            className="max-h-[460px] w-full object-contain cursor-zoom-in"
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
                                className="w-full h-full object-cover"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className={`text-sm ${isDark ? 'text-neutral-500' : 'text-zinc-500'}`}>No media available.</p>
                  )}
                </motion.div>
              )}

              {/* TAB 4: SOURCE ARTIFACTS */}
              {activeTab === 'files' && project.files && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <span
                    className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider ${
                      isDark ? 'text-neutral-400' : 'text-zinc-500'
                    }`}
                  >
                    CORE SOURCE ARTIFACTS & MODULES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.files.map((file, idx) => (
                      <div
                        key={idx}
                        className={`p-5 rounded-2xl border flex flex-col justify-between transition-colors ${
                          isDark
                            ? 'bg-white/[0.02] border-white/10'
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
                </motion.div>
              )}
            </div>

            {/* ─── 4. MINIMALIST FOOTER ─── */}
            <div
              className={`relative z-10 flex items-center justify-between px-6 sm:px-8 py-4 border-t transition-colors ${
                isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/[0.06] bg-zinc-50/70'
              }`}
            >
              <div className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] ${isDark ? 'text-neutral-500' : 'text-zinc-500'}`}>
                Engineered by{' '}
                <span className={isDark ? 'text-white font-semibold' : 'text-zinc-950 font-bold'}>
                  Vishnu Kanchipati
                </span>{' '}
                · Production Architecture
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className={`text-xs font-['Plus_Jakarta_Sans',sans-serif] px-4 py-2 rounded-xl transition-colors ${
                    isDark
                      ? 'text-neutral-400 hover:text-white hover:bg-white/5'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                  }`}
                >
                  Close [ESC]
                </button>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-colors ${
                      isDark
                        ? 'bg-white text-black hover:bg-neutral-200 shadow-sm'
                        : 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-2xs'
                    }`}
                  >
                    <span>View on GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Fullscreen Image / Video Overlay */}
          <AnimatePresence>
            {fullscreenImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFullscreenImage(null)}
                className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
              >
                {fullscreenImage.endsWith('.mp4') ? (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="max-h-[92vh] max-w-[90vw] aspect-[9/20] rounded-3xl overflow-hidden shadow-2xl bg-black flex items-center justify-center border border-white/15"
                  >
                    <video
                      src={fullscreenImage}
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
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
