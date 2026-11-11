import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  Sparkles,
  Headphones,
  Sliders,
  Database,
  Layers,
  Radio,
  Music,
  CheckCircle2,
  Zap,
  Info,
  Download
} from 'lucide-react';
import { ProjectItem } from '../types';
import { Github } from './Github';
import './VikifyShowcase.css';

const APK_URL = '/downloads/Vikify-2.0.apk';
const SOURCE_URL = 'https://github.com/TheCraftsman1/vikify/releases/download/v2.0-android-source/Vikify-2.0-source.zip';

function ApkDownload({ compact = false }: { compact?: boolean }) {
  return (
    <a href={APK_URL} download className={`vs-download${compact ? ' vs-download-compact' : ''}`}>
      <Download size={compact ? 15 : 19} aria-hidden="true" />
      <span>{compact ? 'Get APK' : 'Download now'}</span>
      {!compact && <span className="vs-apk-label">APK</span>}
    </a>
  );
}

export interface VikifyShowcaseProps {
  project: ProjectItem;
  onBack: () => void;
  onNavigateProject: (id: string) => void;
  prevProject?: ProjectItem;
  nextProject?: ProjectItem;
}

export interface ScreenAsset {
  id: string;
  title: string;
  chapterLabel: string;
  subtitle: string;
  image: string;
  badge: string;
  description: string;
  keyFeatures: string[];
  specs: string;
}

export const VIKIFY_SCREENS: ScreenAsset[] = [
  {
    "id": "now-playing",
    "title": "Now Playing",
    "chapterLabel": "Now Playing",
    "subtitle": "Am I Dreaming",
    "image": "/projects/vikify/screens/now-playing-am-i-dreaming.png",
    "badge": "Core Player",
    "description": "Album artwork, transport controls, and a shortcut to DJ Studio.",
    "keyFeatures": [
      "Artwork palette",
      "Media3 playback",
      "DJ Studio shortcut"
    ],
    "specs": "478 × 1024"
  },
  {
    "id": "lyrics",
    "title": "Synced lyrics",
    "chapterLabel": "Synced lyrics",
    "subtitle": "Words in motion",
    "image": "/projects/vikify/screens/lyrics-am-i-dreaming.png",
    "badge": "Lyrics",
    "description": "Highlighted lines and a focused reading view.",
    "keyFeatures": [
      "Line highlights",
      "Lyric navigation",
      "Artwork ambiance"
    ],
    "specs": "478 × 1024"
  },
  {
    "id": "dj-ai",
    "title": "DJ Studio",
    "chapterLabel": "DJ Studio",
    "subtitle": "Your next set",
    "image": "/projects/vikify/screens/dj-ai-studio.png",
    "badge": "DJ Studio",
    "description": "A music companion with voice and text requests.",
    "keyFeatures": [
      "Voice and text",
      "Mix requests",
      "Queue planning"
    ],
    "specs": "478 × 1024"
  },
  {
    "id": "artist-rotation",
    "title": "Artist hub",
    "chapterLabel": "Artist hub",
    "subtitle": "The Weeknd",
    "image": "/projects/vikify/screens/artist-weeknd-rotation.png",
    "badge": "Artists",
    "description": "Albums, top tracks, and a persistent mini-player.",
    "keyFeatures": [
      "Discography",
      "Top tracks",
      "Mini-player"
    ],
    "specs": "478 × 1024"
  },
  {
    "id": "explore",
    "title": "Explore",
    "chapterLabel": "Explore",
    "subtitle": "Moods and moments",
    "image": "/projects/vikify/screens/explore-moods.png",
    "badge": "Discovery",
    "description": "Browse visual stations by mood or moment.",
    "keyFeatures": [
      "Mood stations",
      "Genre discovery",
      "Quick access"
    ],
    "specs": "478 × 1024"
  },
  {
    "id": "library",
    "title": "Your library",
    "chapterLabel": "Your library",
    "subtitle": "Cloud and local",
    "image": "/projects/vikify/screens/library-dashboard.png",
    "badge": "Library",
    "description": "Downloads, local music, Spotify playlists, and listening highlights.",
    "keyFeatures": [
      "Downloads",
      "Local music",
      "Spotify playlists"
    ],
    "specs": "478 × 1024"
  },
  {
    "id": "first-launch",
    "title": "First launch",
    "chapterLabel": "First launch",
    "subtitle": "A simple beginning",
    "image": "/projects/vikify/screens/first-launch-welcome.png",
    "badge": "Welcome",
    "description": "Choose a name and start listening.",
    "keyFeatures": [
      "Personal greeting",
      "Optional connections",
      "Start listening"
    ],
    "specs": "478 × 1024"
  }
];

interface FocusPoint {
  id: 'artwork' | 'playback' | 'companion';
  label: string;
  badge: string;
  targetArea: string;
  center: number;
  scale: number;
  explanation: string;
  architecturePoint: string;
}

const NOW_PLAYING_FOCUS_POINTS: FocusPoint[] = [
  {
    id: 'artwork',
    label: 'Artwork',
    badge: 'Material You M3',
    targetArea: 'Top 45% · Spider-Verse Chromatic Emblem',
    center: 22,
    scale: 2.25,
    explanation: 'The player takes its palette from the album artwork.',
    architecturePoint: 'Artwork colors are cached and blended as the track changes.'
  },
  {
    id: 'playback',
    label: 'Controls',
    badge: 'Media3 ExoPlayer',
    targetArea: 'Middle 35% · Scrubber & Transport Engine',
    center: 64,
    scale: 2.2,
    explanation: 'Scrub, pause, or skip from a single playback surface.',
    architecturePoint: 'AndroidX Media3 handles playback in a dedicated foreground service.'
  },
  {
    id: 'companion',
    label: 'DJ Studio',
    badge: 'Conversational Studio',
    targetArea: 'Bottom 25% · Embedded DJ AI Pill',
    center: 83,
    scale: 2.3,
    explanation: 'Open DJ Studio directly from the player.',
    architecturePoint: 'The DJ interface shares the player’s queue and music session.'
  }
];

const LYRIC_DEMO_LINES = [
  { text: 'Not done fighting', time: '0:22' },
  { text: "I don't feel I've lost", time: '0:28' },
  { text: 'Am I dreaming?', time: '0:34' },
  { text: 'Is there more like us?', time: '0:40' },
  { text: 'Sound becomes space', time: '0:46' }
];

const DJ_PROMPTS = [
  {
    id: 'synthwave',
    label: 'Late-night synthwave',
    mood: 'Cyberpunk & Night Driving',
    bpm: '118 — 124 BPM',
    arc: 'Metro Boomin ➔ Kavinsky ➔ Asthenic',
    intent: 'Smoothly transitions from modern hip-hop 808s into lush analog synthesizers, sidechained basslines, and reflective night-drive atmospheres.'
  },
  {
    id: 'energy',
    label: 'Turn up the energy',
    mood: 'High-Velocity Escalation',
    bpm: '135 — 145 BPM',
    arc: 'Metro Boomin ➔ Travis Scott ➔ Hardtek',
    intent: 'Builds percussive density, selects high-tempo vocal anthems, and accelerates queue rhythm without abrupt genre dissonance.'
  },
  {
    id: 'focus',
    label: 'Deep focus & chill',
    mood: 'Distraction-Free Immersion',
    bpm: '78 — 86 BPM',
    arc: 'Metro Boomin ➔ Lofi Loft ➔ Headspace',
    intent: 'Filters out aggressive transient spikes, suppresses loud mid-range vocal lines, and weaves warm vinyl crackle with repetitive melodic motifs.'
  }
];

export const VikifyShowcase: React.FC<VikifyShowcaseProps> = ({
  project,
  onBack,
  onNavigateProject,
  prevProject,
  nextProject,
}) => {
  const [reduceMotion, setReduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  // Active Microscope State
  const [activeFocusId, setActiveFocusId] = useState<'artwork' | 'playback' | 'companion'>('artwork');
  const activeFocus = NOW_PLAYING_FOCUS_POINTS.find(p => p.id === activeFocusId) || NOW_PLAYING_FOCUS_POINTS[0];

  // Synced Lyrics Demonstration State
  const [activeLyricIndex, setActiveLyricIndex] = useState(1);
  const [isLyricPlaying, setIsLyricPlaying] = useState(true);

  // AI DJ Prompt Chips State
  const [selectedDjPrompt, setSelectedDjPrompt] = useState(DJ_PROMPTS[0]);

  // Full Screen Screenshot Inspector Modal State
  const [inspectedIndex, setInspectedIndex] = useState<number | null>(null);
  const inspectorRef = useRef<HTMLDialogElement>(null);

  // Active Chapter Navigation tracking
  const [activeSection, setActiveSection] = useState('now-playing');

  // Timed lyric demonstration ticker
  useEffect(() => {
    if (!isLyricPlaying || reduceMotion) return;
    const interval = setInterval(() => {
      setActiveLyricIndex(prev => (prev + 1) % LYRIC_DEMO_LINES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isLyricPlaying, reduceMotion]);

  // Handle Keyboard Navigation for Fullscreen Inspector
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (inspectedIndex === null) return;

    if (e.key === 'Escape') {
      setInspectedIndex(null);
    } else if (e.key === 'ArrowRight') {
      setInspectedIndex(prev => (prev !== null ? (prev + 1) % VIKIFY_SCREENS.length : 0));
    } else if (e.key === 'ArrowLeft') {
      setInspectedIndex(prev => (prev !== null ? (prev - 1 + VIKIFY_SCREENS.length) % VIKIFY_SCREENS.length : 0));
    }
  }, [inspectedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (inspectedIndex !== null) {
      inspectorRef.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      inspectorRef.current?.close();
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, inspectedIndex]);

  // Track active section for jump nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['now-playing', 'lyrics', 'dj-ai', 'mosaic', 'engineering', 'finale'];
      const scrollPos = window.scrollY + 220;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
    }
  };

  const inspectedScreen = inspectedIndex !== null ? VIKIFY_SCREENS[inspectedIndex] : null;

  return (
    <MotionConfig reducedMotion="user">
    <div className="vikify-showcase min-h-screen w-full bg-[#07070B] text-zinc-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#F500B7] selection:text-white relative overflow-x-clip">

      {/* ─── AMBIENT ATMOSPHERIC BACKGROUND SYSTEM ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Living Magenta Glow (Artwork-derived) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[750px] rounded-full bg-[#F500B7]/15 blur-[120px] transition-all duration-1000" />
        {/* Subtle Electric Cyan Accent */}
        <div className="absolute top-48 right-[10%] w-[550px] h-[550px] rounded-full bg-[#1FDAC5]/10 blur-[130px] transition-all duration-1000" />
        {/* Deep Midnight Violet Undertone */}
        <div className="absolute top-[800px] left-[5%] w-[650px] h-[650px] rounded-full bg-[#6C2AA8]/15 blur-[140px] transition-all duration-1000" />
        {/* Subtle Static Grain for Organic Depth */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        />
      </div>

      {/* ─── STICKY EDITORIAL TOP NAVIGATION BAR ─── */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#07070B]/85 border-b border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Left: Back Button & Project Identity */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={onBack}
              aria-label="Back to selected works"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-all group shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Back to Works</span><span className="sm:hidden">Back</span>
            </button>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-['Montserrat',sans-serif] font-bold text-sm tracking-wide text-white">
                Vikify
              </span>
              <span className="text-white/40 hidden md:inline text-xs">·</span>
              <span className="text-neutral-400 text-xs hidden md:inline truncate">
                Native Android Music Player
              </span>
            </div>
          </div>

          {/* Center: Chapter Jump Navigation (Desktop) */}
          <nav aria-label="Showcase Chapters" className="hidden xl:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/10">
            {[
              { id: 'now-playing', label: 'Now Playing' },
              { id: 'lyrics', label: 'Synced Lyrics' },
              { id: 'dj-ai', label: 'AI DJ Studio' },
              { id: 'mosaic', label: 'Discovery & Library' },
              { id: 'engineering', label: 'Architecture' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                  activeSection === item.id
                    ? 'bg-[#F500B7]/20 text-white font-semibold shadow-xs border border-[#F500B7]/40'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: Availability Badge, GitHub & Theme */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Status Badge */}
            <ApkDownload compact />

            {/* GitHub Repo */}
            <a
              href="https://github.com/TheCraftsman1/vikify"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Inspect Vikify source code on GitHub"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
            >
              <Github size={14} />
              <span className="hidden sm:inline">GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400" />
            </a>

            {/* Theme Toggle */}
          </div>

        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-24 sm:space-y-36">

        {/* ─── ACT 00 & ACT 01: THE INVITATION & NOW PLAYING MASTERPIECE ─── */}
        <section id="now-playing" className="pt-2 sm:pt-6 space-y-12">

          {/* Editorial Case Study Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#F500B7] animate-pulse" />
              <span>Vikify · Android · Version 2.0</span>
            </div>

            <h1 className="font-['Montserrat',sans-serif] text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Sound becomes space.
            </h1>

            <p className="text-base sm:text-xl text-neutral-300 font-normal leading-relaxed">
              Your artwork. Your lyrics. Your next favorite track.
            </p>

            <div className="vs-hero-actions">
              <ApkDownload />
              <span className="vs-build">Android 8.0+ · 54.8 MB</span>
              <a href={SOURCE_URL} className="vs-source">Source code <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
          </div>

          {/* 12-Column Asymmetric Now Playing Spotlight Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left 5 Cols: Editorial Narrative & Interactive UI Microscope */}
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">

              {/* Micro-Equalizer & Ambient Status */}
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <div className="flex items-end gap-1 h-3.5 w-4" aria-hidden="true">
                  <span className="w-1 bg-[#F500B7] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-full" />
                  <span className="w-1 bg-[#1FDAC5] rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-2/3" />
                  <span className="w-1 bg-[#6C2AA8] rounded-full animate-[pulse_1.0s_ease-in-out_infinite_0.4s] h-4/5" />
                  <span className="w-1 bg-[#F500B7] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.1s] h-1/2" />
                </div>
                <span className="text-xs font-semibold text-neutral-200">
                  Colors from the artwork
                </span>
              </div>

              {/* Chapter Narrative */}
              <div className="space-y-3">
                <h2 className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  The room changes with the song.
                </h2>
                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                  Pick a detail below. See the player up close.
                </p>
              </div>

              {/* ─── SIGNATURE INTERACTION: UI MICROSCOPE ─── */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-4">

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#F500B7]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                      Explore Interface Details
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-neutral-400">
                      Zoom in
                  </span>
                </div>

                {/* Focus Point Tabs */}
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10">
                  {NOW_PLAYING_FOCUS_POINTS.map(point => (
                    <button
                      key={point.id}
                      onClick={() => setActiveFocusId(point.id)}
                      aria-pressed={activeFocusId === point.id}
                      className={`min-h-11 px-2 py-2 rounded-xl text-xs font-medium transition-all text-center truncate ${
                        activeFocusId === point.id
                          ? 'bg-[#F500B7] text-white font-bold shadow-md'
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {point.label}
                    </button>
                  ))}
                </div>

                {/* Microscope Magnifier Card */}
                <div className="relative overflow-hidden aspect-[16/10] rounded-2xl border border-white/15 bg-black/80 shadow-2xl group">
                  <img
                    src="/projects/vikify/screens/now-playing-am-i-dreaming.png"
                    alt={`Enlarged screen detail: ${activeFocus.label}`}
                    className="vs-microscope-image"
                    style={{
                      width: `${activeFocus.scale * 100}%`,
                      transform: `translate(-50%, -${activeFocus.center}%)`
                    }}
                  />
                  {/* Subtle Specular Overlay & Reticle */}
                  <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-2xl" />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider text-[#1FDAC5] uppercase">
                    {activeFocus.badge}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-neutral-300">
                    {activeFocus.scale}× Magnification
                  </div>
                </div>

                {/* Focus Description & Rationale */}
                <div className="space-y-1.5 pt-1">
                  <h3 className="font-['Montserrat',sans-serif] text-sm font-bold text-white flex items-center justify-between">
                    <span>{activeFocus.label}</span>
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {activeFocus.explanation}
                  </p>
                  <details className="text-[11px] text-neutral-400 pt-1">
                    <summary className="cursor-pointer">How it works</summary>
                    <p className="pt-2">{activeFocus.architecturePoint}</p>
                  </details>
                </div>

              </div>

              {/* Action row to launch fullscreen inspection */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setInspectedIndex(0)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-black hover:bg-neutral-200 transition-colors shadow-lg group"
                >
                  <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>View full screen</span>
                </button>
                <span className="text-xs text-neutral-400">
                  Am I Dreaming · Metro Boomin
                </span>
              </div>

            </div>

            {/* Right 7 Cols: Generous Genuine Phone Display with Localized Light */}
            <div className="lg:col-span-7 flex justify-center items-center relative order-1 lg:order-2 py-6">

              {/* Localized Ambient Glow Blobs positioned directly behind phone */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Magenta Top Glow */}
                <div className="absolute top-4 w-[380px] h-[380px] rounded-full bg-[#F500B7]/25 blur-[75px]" />
                {/* Cyan Right Glow */}
                <div className="absolute top-1/3 right-10 w-[280px] h-[280px] rounded-full bg-[#1FDAC5]/20 blur-[70px]" />
                {/* Deep Burgundy Lower Glow */}
                <div className="absolute bottom-10 left-12 w-[340px] h-[340px] rounded-full bg-[#321327]/35 blur-[85px]" />
              </div>

              {/* The Genuine Phone Image: NO FAKE BEZELS, Crisp 478x1024, Full Visibility */}
              <button type="button"
                className="relative z-10 cursor-zoom-in group transition-transform duration-500 hover:scale-[1.015]"
                onClick={() => setInspectedIndex(0)}
                title="Click to inspect Now Playing in full resolution"
              >
                <img
                  src="/projects/vikify/screens/now-playing-am-i-dreaming.png"
                  alt="Real Vikify Now Playing screen showing Am I Dreaming with colorful Spider-Verse artwork and real Android device frame"
                  loading="eager"
                  decoding="async"
                  className="w-[300px] sm:w-[350px] lg:w-[390px] xl:w-[410px] h-auto object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.85)] rounded-[42px]"
                />

                {/* Micro Hover Hint */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl flex items-center gap-1.5">
                  <Maximize2 className="w-3 h-3 text-[#1FDAC5]" />
                  <span>Click to expand 478×1024</span>
                </div>
              </button>

            </div>

          </div>

        </section>

        {/* ─── ACT 02: SYNCED LYRICS SHOWCASE ─── */}
        <section id="lyrics" className="pt-8 space-y-12 border-t border-white/10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left 6 Cols: Large Real Synced Lyrics Screen */}
            <div className="lg:col-span-6 flex justify-center items-center relative py-6">

              {/* Deep Plum & Violet Backlight */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[420px] h-[480px] rounded-full bg-[#A855F7]/20 blur-[85px]" />
                <div className="w-[300px] h-[300px] rounded-full bg-[#EC4899]/15 blur-[70px] translate-y-24" />
              </div>

              <button type="button"
                className="relative z-10 cursor-zoom-in group transition-transform duration-500 hover:scale-[1.015]"
                onClick={() => setInspectedIndex(1)}
                title="Click to inspect Synced Lyrics screen"
              >
                <img
                  src="/projects/vikify/screens/lyrics-am-i-dreaming.png"
                  alt="Real Vikify Synced Lyrics screen displaying line highlights and deep violet ambiance"
                  loading="lazy"
                  decoding="async"
                  className="w-[290px] sm:w-[340px] lg:w-[380px] h-auto object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.85)] rounded-[42px]"
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl flex items-center gap-1.5">
                  <Maximize2 className="w-3 h-3 text-purple-400" />
                  <span>Click to expand lyrics</span>
                </div>
              </button>

            </div>

            {/* Right 6 Cols: Editorial Typography & Live Lyric Highlight Demo */}
            <div className="lg:col-span-6 space-y-6">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
                <Music className="w-3.5 h-3.5 text-purple-400" />
                <span>Synced lyrics</span>
              </div>

              <div className="space-y-3">
                <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  The words find their moment.
                </h2>
                <p className="text-base text-neutral-300 leading-relaxed">
                  Follow the track, line by line. Tap a verse in this preview.
                </p>
              </div>

              {/* ─── LIVE LYRIC DEMONSTRATION WIDGET ─── */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-950/20 to-black/40 border border-purple-500/20 backdrop-blur-xl space-y-5">

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                      Lyrics preview
                    </span>
                  </div>

                  {/* Demo Play/Pause Control */}
                  <button
                    onClick={() => setIsLyricPlaying(!isLyricPlaying)}
                    disabled={!!reduceMotion}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title={isLyricPlaying ? 'Pause demonstration' : 'Resume demonstration'}
                  >
                    {isLyricPlaying ? (
                      <>
                        <Pause className="w-3 h-3" />
                        <span>Pause Demo</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span>Play Demo</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Animated Demonstration Lyric Block */}
                <div className="space-y-3 py-2">
                  {LYRIC_DEMO_LINES.map((line, idx) => {
                    const isActive = idx === activeLyricIndex;
                    return (
                      <button type="button"
                        key={idx}
                        className={`w-full min-h-11 text-left flex items-center justify-between gap-3 transition-all duration-500 cursor-pointer ${
                          isActive
                            ? 'text-white font-bold text-xl sm:text-2xl scale-[1.02] pl-3 border-l-2 border-[#F500B7]'
                            : 'text-neutral-500 text-base sm:text-lg pl-0 hover:text-neutral-300'
                        }`}
                        onClick={() => {
                          setActiveLyricIndex(idx);
                          setIsLyricPlaying(false);
                        }}
                      >
                        <span>{line.text}</span>
                        <span className="text-xs font-normal text-neutral-400 tracking-wider">
                          {line.time}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                  <span>Am I Dreaming</span>
                  <span className="text-purple-300">Tap a line</span>
                </div>

              </div>


            </div>

          </div>

        </section>

        {/* ─── ACT 03: INTELLIGENT AI DJ SHOWCASE ─── */}
        <section id="dj-ai" className="pt-8 space-y-12 border-t border-white/10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left 6 Cols: Narrative, AI DJ Avatar Concept & Prompt Chips */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-300">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>DJ Studio</span>
              </div>

              <div className="space-y-3">
                <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Set the mood.
                </h2>
                <p className="text-base text-neutral-300 leading-relaxed">
                  Pick a vibe. Preview the direction of the next set.
                </p>
              </div>

              {/* ─── INTERACTIVE PROMPT CHIPS ─── */}
              <div className="space-y-4 p-6 rounded-3xl bg-gradient-to-b from-blue-950/20 to-black/40 border border-blue-500/20 backdrop-blur-xl">

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                    Try a request
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Interaction preview
                  </span>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2">
                  {DJ_PROMPTS.map(prompt => (
                    <button
                      key={prompt.id}
                      onClick={() => setSelectedDjPrompt(prompt)}
                      aria-pressed={selectedDjPrompt.id === prompt.id}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedDjPrompt.id === prompt.id
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                          : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                      }`}
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>

                {/* Narrative Preview Card */}
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{selectedDjPrompt.mood}</span>
                    <span className="font-semibold text-blue-400">{selectedDjPrompt.bpm}</span>
                  </div>
                  <div className="vs-queue-arc" aria-label="Example queue progression">
                    {selectedDjPrompt.arc.split(' ➔ ').map((artist, index) => (
                      <React.Fragment key={artist}>
                        {index > 0 && <ArrowRight size={14} aria-hidden="true" />}
                        <span><i aria-hidden="true" />{artist}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                  <span>Example mix · Try DJ Studio in the Android app.</span>
                </div>

              </div>

              {/* Action row */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setInspectedIndex(2)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-black hover:bg-neutral-200 transition-colors shadow-lg group"
                >
                  <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>View DJ Studio</span>
                </button>
                <span className="text-xs text-neutral-400">
                  White 3D Avatar & Conversational Input
                </span>
              </div>

            </div>

            {/* Right 6 Cols: Genuine AI DJ Screenshot */}
            <div className="lg:col-span-6 flex justify-center items-center relative order-1 lg:order-2 py-6">

              {/* Midnight Navy & Royal Blue Glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[420px] h-[480px] rounded-full bg-blue-600/25 blur-[90px]" />
                <div className="w-[300px] h-[300px] rounded-full bg-indigo-600/20 blur-[75px]" />
              </div>

              <button type="button"
                className="relative z-10 cursor-zoom-in group transition-transform duration-500 hover:scale-[1.015]"
                onClick={() => setInspectedIndex(2)}
                title="Click to inspect AI DJ Studio screen"
              >
                <img
                  src="/projects/vikify/screens/dj-ai-studio.png"
                  alt="Real Vikify AI DJ Studio screen showing 3D mascot avatar with headphones and conversational input bar"
                  loading="lazy"
                  decoding="async"
                  className="w-[290px] sm:w-[340px] lg:w-[380px] h-auto object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.85)] rounded-[42px]"
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl flex items-center gap-1.5">
                  <Maximize2 className="w-3 h-3 text-blue-400" />
                  <span>Click to expand AI DJ</span>
                </div>
              </button>

            </div>

          </div>

        </section>

        {/* ─── ACT 04: THE DAILY RITUAL — ASYMMETRIC EDITORIAL BENTO ─── */}
        <section id="mosaic" className="pt-8 space-y-12 border-t border-white/10">

          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>Discovery & library</span>
            </div>
            <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              The daily ritual of discovery.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Find a mood. Follow an artist. Keep your favorites close.
            </p>
          </div>

          {/* Asymmetric Bento Mosaic Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">

            {/* Bento 1: Dominant Explore Moods Panel (7 Cols) */}
            <button type="button"
              className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setInspectedIndex(4)}
            >
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Visual Mood Browsing
                  </span>
                  <span className="text-xs text-neutral-400">Click to expand</span>
                </div>
                <h3 className="font-['Montserrat',sans-serif] text-2xl font-bold text-white">
                  Find your mood.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Coffee breaks, night drives, and everything between.
                </p>
              </div>

              <div className="flex justify-center items-center overflow-hidden py-2 relative">
                <div className="absolute inset-0 bg-emerald-500/10 blur-[60px] pointer-events-none" />
                <img
                  src="/projects/vikify/screens/explore-moods.png"
                  alt="Real Vikify Explore screen with rich photography mood tiles"
                  loading="lazy"
                  decoding="async"
                  className="w-[260px] sm:w-[300px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] rounded-[36px] group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 mt-4">
                <span>Explore · Moods & Moments</span>
                <span className="text-white font-semibold flex items-center gap-1">
                  Inspect Screen <Maximize2 className="w-3 h-3 text-emerald-400" />
                </span>
              </div>
            </button>

            {/* Bento 2: Artist & Daily Rotation Hub (5 Cols) */}
            <button type="button"
              className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setInspectedIndex(3)}
            >
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Artist Immersion
                  </span>
                  <span className="text-xs text-neutral-400">Click to expand</span>
                </div>
                <h3 className="font-['Montserrat',sans-serif] text-2xl font-bold text-white">
                  Get closer to the artist.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Latest releases, top tracks, and a player that follows you.
                </p>
              </div>

              <div className="flex justify-center items-center overflow-hidden py-2 relative">
                <div className="absolute inset-0 bg-indigo-500/10 blur-[60px] pointer-events-none" />
                <img
                  src="/projects/vikify/screens/artist-weeknd-rotation.png"
                  alt="Real Vikify Artist Hub screen featuring The Weeknd"
                  loading="lazy"
                  decoding="async"
                  className="w-[240px] sm:w-[270px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] rounded-[36px] group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 mt-4">
                <span>The Weeknd · Discography Hub</span>
                <span className="text-white font-semibold flex items-center gap-1">
                  Inspect Screen <Maximize2 className="w-3 h-3 text-indigo-400" />
                </span>
              </div>
            </button>

            {/* Bento 3: Unified Hybrid Library Band (8 Cols) */}
            <button type="button"
              className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row gap-6 items-center justify-between group cursor-pointer"
              onClick={() => setInspectedIndex(5)}
            >
              <div className="space-y-3 sm:max-w-md">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Hybrid Architecture
                </span>
                <h3 className="font-['Montserrat',sans-serif] text-2xl font-bold text-white">
                  Your music, together.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Downloads, local files, and Spotify playlists in one library.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <span>Open high-resolution inspection</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="shrink-0 flex justify-center py-2 relative">
                <div className="absolute inset-0 bg-amber-500/10 blur-[50px] pointer-events-none" />
                <img
                  src="/projects/vikify/screens/library-dashboard.png"
                  alt="Real Vikify Library dashboard showing Top Artist Metro Boomin card"
                  loading="lazy"
                  decoding="async"
                  className="w-[220px] sm:w-[250px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] rounded-[36px] group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              </button>

              {/* Bento 4: Minimalist First Impression Onboarding (4 Cols) */}
            <button type="button"
              className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setInspectedIndex(6)}
            >
              <div className="space-y-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  First Impression
                </span>
                <h3 className="font-['Montserrat',sans-serif] text-xl font-bold text-white">
                  Quiet Onboarding.
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  A name, then your music.
                </p>
              </div>

              <div className="flex justify-center items-center py-2 relative">
                <img
                  src="/projects/vikify/screens/first-launch-welcome.png"
                  alt="Real Vikify first launch screen with 3D waveform sculpture"
                  loading="lazy"
                  decoding="async"
                  className="w-[180px] sm:w-[200px] h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.8)] rounded-[30px] group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 mt-2">
                <span>First Run Onboarding</span>
                <span className="text-white font-semibold flex items-center gap-1">
                  Inspect <Maximize2 className="w-3 h-3" />
                </span>
              </div>
              </button>

            </div>

        </section>

        {/* ─── ACT 05: THE ENGINEERING — BEHIND THE SOUND ─── */}
        <section id="engineering" className="pt-8 space-y-8 border-t border-white/10">
          <div className="space-y-3 max-w-3xl">
            <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Behind the sound.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              A dedicated playback service connects streaming, local audio, and queue recovery.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-5 sm:p-8">
            <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-[#1FDAC5]/[0.06] blur-[80px] pointer-events-none" aria-hidden="true" />
            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-5 lg:gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Radio className="h-4 w-4" aria-hidden="true" />
                  <span>Stream resolution</span>
                </div>
                <div className="rounded-2xl border border-[#1FDAC5]/20 bg-[#1FDAC5]/[0.04] px-5 py-4 flex items-center justify-between gap-3">
                  <span className="font-['Montserrat',sans-serif] text-lg font-bold text-white">InnerTubeX</span>
                  <span className="text-xs text-[#1FDAC5]">Primary</span>
                </div>
                <div className="flex items-center gap-3 px-5 text-xs text-neutral-500">
                  <span className="h-5 border-l border-dashed border-white/20" aria-hidden="true" />
                  <span>Fallback when needed</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 flex items-center justify-between gap-3">
                  <span className="font-['Montserrat',sans-serif] text-lg font-bold text-white">NewPipe</span>
                  <span className="text-xs text-neutral-400">Resolver</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 py-1 text-neutral-500" aria-hidden="true">
                <ArrowRight className="h-6 w-6 rotate-90 lg:rotate-0" />
                <span className="text-[11px]">Audio stream</span>
              </div>

              <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <Headphones className="h-6 w-6 text-white" aria-hidden="true" />
                  <span className="text-[11px] text-neutral-400">AndroidX Media3</span>
                </div>
                <h3 className="font-['Montserrat',sans-serif] text-xl sm:text-2xl font-bold tracking-tight text-white mt-5">Playback service</h3>
                <p className="text-xs text-neutral-400 mt-2">MediaSessionService · ExoPlayer</p>
                <div className="flex items-end gap-1.5 h-10 mt-6" aria-hidden="true">
                  {[14, 23, 17, 30, 21, 36, 26, 18, 28, 14, 22, 16].map((height, index) => (
                    <span key={index} className="flex-1 rounded-full bg-gradient-to-t from-white/10 to-white/70" style={{ height }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
              {[
                { icon: Layers, title: 'Audio cache', detail: 'Read ahead for upcoming tracks' },
                { icon: Music, title: 'Local files', detail: 'Play audio stored on your device' },
                { icon: Database, title: 'Queue snapshot', detail: 'Restore tracks and playback position' },
              ].map(item => (
                <div key={item.title} className="flex items-center sm:items-start gap-3 p-4 rounded-2xl bg-black/30 border border-white/[0.07]">
                  <item.icon className="h-4 w-4 shrink-0 text-neutral-300 mt-0.5" aria-hidden="true" />
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ─── ACT 06: THE QUIET FINALE & NAVIGATION ─── */}
        <section id="finale" className="pt-12 pb-16 space-y-12 border-t border-white/10">

          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Take Vikify with you.
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
              Android 8.0+ · 54.8 MB · Version 2.0
            </p>
          </div>

          {/* Action Navigation Cluster */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">

            <ApkDownload />
            {/* Matching release source */}
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group"
            >
              <Github size={18} />
              <span>Source code</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Back to All Works */}
            <button
              onClick={onBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Works</span>
            </button>

            {/* Next Project if available */}
            {nextProject && (
              <button
                onClick={() => onNavigateProject(nextProject.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors group"
              >
                <span>Next: {nextProject.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}

          </div>

          {/* Footer Metadata */}
          <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div>
              Designed & Engineered by <span className="text-neutral-300 font-medium">Vishnu Kanchipati</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Android · Kotlin · Media3 · Jetpack Compose</span>
              <span>·</span>
              <span className="text-emerald-400 font-medium">Available</span>
            </div>
          </div>

        </section>

      </main>

      {/* ─── FULL SCREEN SCREENSHOT INSPECTOR MODAL DIALOG ─── */}
      <dialog ref={inspectorRef} className="vs-inspector" onCancel={event => { event.preventDefault(); setInspectedIndex(null); }} aria-label="Vikify screenshot inspector">
      <AnimatePresence>
        {inspectedScreen && inspectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-label={`Screenshot Inspector: ${inspectedScreen.title}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6"
            onClick={() => setInspectedIndex(null)}
          >

            {/* Modal Dialog Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="vs-inspector-card relative w-full max-w-5xl max-h-[92vh] flex flex-col items-center justify-between rounded-3xl bg-[#09090F] border border-white/15 p-4 sm:p-6 shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >

              {/* Modal Header */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-white/10">
                <div className="space-y-0.5 min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#F500B7]/20 text-[#F500B7] text-[10px] font-bold tracking-wider uppercase">
                      {inspectedScreen.badge}
                    </span>
                    <span className="text-xs text-neutral-400 truncate hidden sm:inline">
                      {inspectedScreen.chapterLabel}
                    </span>
                  </div>
                  <h3 className="font-['Montserrat',sans-serif] text-base sm:text-lg font-bold text-white truncate">
                    {inspectedScreen.title}
                  </h3>
                </div>

                {/* Close Button */}
                <button autoFocus
                  onClick={() => setInspectedIndex(null)}
                  aria-label="Close Inspector"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: High Resolution Screen View */}
              <div className="vs-inspector-image relative w-full flex-1 flex items-center justify-center py-4 min-h-[350px] overflow-hidden">

                {/* Previous Navigation Button */}
                <button
                  onClick={() => setInspectedIndex((inspectedIndex - 1 + VIKIFY_SCREENS.length) % VIKIFY_SCREENS.length)}
                  aria-label="Previous screenshot"
                  className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* The Uncropped Genuine High-Resolution Screenshot */}
                <img
                  src={inspectedScreen.image}
                  alt={inspectedScreen.title}
                  className="max-h-[62vh] sm:max-h-[68vh] w-auto object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.9)] rounded-[32px] sm:rounded-[38px]"
                />

                {/* Next Navigation Button */}
                <button
                  onClick={() => setInspectedIndex((inspectedIndex + 1) % VIKIFY_SCREENS.length)}
                  aria-label="Next screenshot"
                  className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

              </div>

              {/* Modal Footer: Descriptions, Specs & Keyboard shortcuts */}
              <div className="w-full pt-3 border-t border-white/10 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <p className="text-neutral-300 leading-relaxed max-w-2xl">
                    {inspectedScreen.description}
                  </p>
                  <div className="flex items-center gap-3 shrink-0 text-neutral-400">
                    <span className="font-medium text-white">{inspectedScreen.specs}</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden sm:inline">Use ← → keys to navigate</span>
                  </div>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {inspectedScreen.keyFeatures.map((feat, fidx) => (
                    <span
                      key={fidx}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-neutral-300"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
      </dialog>

    </div>
    </MotionConfig>
  );
};

export default VikifyShowcase;
