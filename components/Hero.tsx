"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useSpring,
  useScroll,
  useVelocity,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  Download,
  Mail,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ThemeToggle } from "./ui/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { Magnetic } from "./ui/Magnetic";
import { TechItem } from "../types";
import {
  playHoverTick,
} from "../lib/sound";
import { MobileIdCard } from "./MobileIdCard";
import { Leetcode } from "./Leetcode";

export type { TechItem };

export const ROW_1_SYSTEMS = [
  {
    name: "Kotlin",
    category: "NATIVE MOBILE",
    tag: "Android SDK",
    context: "ExoPlayer · Room DB · Foreground Services",
    experience: "3+ Years",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    accent: "#9d72ff",
  },
  {
    name: "Docker",
    category: "CONTAINERS",
    tag: "DevSecOps",
    context: "Multi-Stage OCI Builds · Container Hardening",
    experience: "3+ Years",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    accent: "#38bdf8",
  },
  {
    name: "FastAPI",
    category: "HIGH-PERF API",
    tag: "Microservices",
    context: "Async Endpoints · Pydantic V2 · OpenAPI Specs",
    experience: "2+ Years",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    accent: "#2dd4bf",
  },
  {
    name: "PostgreSQL",
    category: "DATABASE",
    tag: "Storage Engine",
    context: "ACID Compliance · Connection Pooling · Indexing",
    experience: "3+ Years",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    accent: "#60a5fa",
  },
  {
    name: "AWS",
    category: "CLOUD INFRA",
    tag: "Cloud Native",
    context: "S3 Buckets · Lambda Serverless · CloudFront Edge",
    experience: "2+ Years",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    accent: "#ff9900",
  },
  {
    name: "Java",
    category: "CORE & DSA",
    tag: "Enterprise Core",
    context: "JVM Internals · Multithreading & High Concurrency",
    experience: "4+ Years",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    accent: "#fb923c",
  },
] satisfies readonly TechItem[];

export const ROW_2_CREATIVE = [
  {
    name: "PyTorch",
    category: "DEEP LEARNING",
    tag: "Applied AI",
    context: "Deep Learning · Transformers · Tensor Ops",
    experience: "2+ Years",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    accent: "#ff6442",
  },
  {
    name: "Next.js",
    category: "FULLSTACK WEB",
    tag: "React Framework",
    context: "App Router · SSR & Streaming · Server Actions",
    experience: "3+ Years",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    accent: "#ffffff",
  },
  {
    name: "React",
    category: "UI ARCHITECTURE",
    tag: "Client Core",
    context: "Concurrent Mode · Virtual DOM · Custom Hooks",
    experience: "3+ Years",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    accent: "#00d8ff",
  },
  {
    name: "TypeScript",
    category: "TYPE SAFETY",
    tag: "Static Typing",
    context: "Strict Typing · Generics · AST Compilation",
    experience: "3+ Years",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    accent: "#60a5fa",
  },
  {
    name: "Tailwind CSS",
    category: "DESIGN SYSTEM",
    tag: "Modern Styling",
    context: "Fluid Typography · JIT Compiler · Dark Mode",
    experience: "3+ Years",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    accent: "#22d3ee",
  },
  {
    name: "Python",
    category: "AI & BACKEND",
    tag: "Data & Systems",
    context: "NumPy & SciPy · AsyncIO · ML Inference",
    experience: "3+ Years",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    accent: "#58a6ff",
  },
] satisfies readonly TechItem[];

export const DEFAULT_TECH_STACK: readonly TechItem[] = [
  ...ROW_1_SYSTEMS,
  ...ROW_2_CREATIVE,
];

/**
 * Returns an accessible, vibrant accent tone tuned for light vs dark mode backgrounds.
 */
export function getEffectiveAccent(item: TechItem, isDark: boolean): string {
  if (item.name === "Next.js") {
    return isDark ? "#ffffff" : "#09090b";
  }
  if (!isDark) {
    switch (item.name) {
      case "FastAPI":
        return "#0d9488";
      case "Docker":
        return "#0284c7";
      case "PostgreSQL":
      case "TypeScript":
        return "#2563eb";
      case "React":
        return "#0284c7";
      case "Tailwind CSS":
        return "#0891b2";
      case "Python":
        return "#2563eb";
      case "Java":
        return "#ea580c";
      case "PyTorch":
        return "#dc2626";
      case "Kotlin":
        return "#7c3aed";
      case "AWS":
        return "#d97706";
      default:
        return item.accent;
    }
  }
  return item.accent;
}

export interface TechItemProps {
  item: TechItem;
  tooltipPlacement?: "top" | "bottom";
}

export function FramelessTechItem({
  item,
  tooltipPlacement = "top",
}: TechItemProps) {
  const [hovered, setHovered] = useState(false);
  const { isDark } = useTheme();
  const effectiveAccent = getEffectiveAccent(item, isDark);

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
        playHoverTick();
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered((prev) => !prev)}
      data-cursor={item.name}
      className="group/item relative flex items-center gap-2.5 sm:gap-3 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer flex-shrink-0 transition-all duration-300 select-none will-change-transform"
      style={{
        background: isDark
          ? hovered
            ? `${effectiveAccent}1f`
            : `${effectiveAccent}0a`
          : "#ffffff",
        border: isDark
          ? hovered
            ? `1px solid ${effectiveAccent}90`
            : `1px solid ${effectiveAccent}35`
          : hovered
            ? "1px solid rgba(212, 212, 216, 1)"
            : "1px solid rgba(228, 228, 231, 0.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: isDark
          ? hovered
            ? `0 0 24px ${effectiveAccent}38, 0 8px 24px rgba(0, 0, 0, 0.6), inset 0 1px 1.5px rgba(255, 255, 255, 0.25)`
            : `0 4px 14px rgba(0, 0, 0, 0.35), 0 0 12px ${effectiveAccent}12, inset 0 1px 1px rgba(255, 255, 255, 0.08)`
          : hovered
            ? "0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)"
            : "0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)",
        transform: hovered
          ? isDark
            ? "scale(1.05)"
            : "translateY(-2px)"
          : isDark
            ? "scale(1)"
            : "translateY(0)",
        zIndex: hovered ? 40 : 1,
      }}
    >
      {/* Brand Icon */}
      <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110">
        <img
          src={item.icon}
          alt={item.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`w-full h-full object-contain transition-all duration-300 opacity-100 ${
            item.name === "Next.js" ? (isDark ? "invert brightness-200" : "") : ""
          }`}
          style={{
            filter: isDark
              ? hovered
                ? item.name === "AWS"
                  ? "drop-shadow(0 0 10px rgba(255, 153, 0, 0.95))"
                  : item.name === "Next.js"
                  ? "drop-shadow(0 0 10px rgba(255, 255, 255, 0.95)) invert(1)"
                  : `drop-shadow(0 0 10px ${effectiveAccent}dd)`
                : `drop-shadow(0 2px 6px ${effectiveAccent}40)`
              : "none",
          }}
        />
      </div>

      {/* Typography */}
      <span
        className="font-['Montserrat',sans-serif] text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 whitespace-nowrap text-zinc-900 dark:text-inherit"
        style={{
          color: isDark ? effectiveAccent : undefined,
          textShadow: isDark && hovered
            ? `0 0 12px ${effectiveAccent}90`
            : isDark
              ? `0 0 6px ${effectiveAccent}30`
              : "none",
        }}
      >
        {item.name}
      </span>

      {/* Separator Pip */}
      <span
        className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover/item:scale-125 bg-zinc-300 dark:bg-inherit"
        style={{
          backgroundColor: isDark ? effectiveAccent : undefined,
          boxShadow: isDark ? `0 0 6px ${effectiveAccent}` : "none",
        }}
      />

      {/* Category Pill Tag */}
      <span
        className="text-[10px] font-['Plus_Jakarta_Sans',sans-serif] tracking-wider uppercase font-semibold transition-colors duration-300 whitespace-nowrap hidden sm:inline-block text-zinc-500 dark:text-inherit"
        style={{
          color: isDark
            ? hovered
              ? "#ffffff"
              : `${effectiveAccent}cc`
            : hovered
              ? "#18181b"
              : "#71717a",
        }}
      >
        {item.category}
      </span>
    </div>
  );
}

export const LiquidGlassTechCard = FramelessTechItem;

const PORTRAIT_URL = "/vishnu_hero_no_bg.webp";
const FALLBACK_PORTRAIT_URL = "/vishnu_hero_no_bg.png";

export interface PerspectiveTunnelPortfolioProps {
  brandName?: string;
  portraitUrl?: string;
  techStack?: readonly TechItem[];
  onReplay?: () => void;
}

export default function PerspectiveTunnelPortfolio({
  brandName = "Vishnu Kanchipati",
  portraitUrl = PORTRAIT_URL,
  techStack = DEFAULT_TECH_STACK,
}: PerspectiveTunnelPortfolioProps) {
  const { isDark } = useTheme();
  const reduce = useReducedMotion();
  const [imgSrc, setImgSrc] = useState(portraitUrl);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const row1TrackRef = useRef<HTMLDivElement>(null);
  const row2TrackRef = useRef<HTMLDivElement>(null);

  const row1Items = useMemo(() => {
    if (techStack !== DEFAULT_TECH_STACK && techStack.length > 0) {
      return techStack.slice(0, Math.ceil(techStack.length / 2));
    }
    return ROW_1_SYSTEMS;
  }, [techStack]);

  const row2Items = useMemo(() => {
    if (techStack !== DEFAULT_TECH_STACK && techStack.length > 0) {
      return techStack.slice(Math.ceil(techStack.length / 2));
    }
    return ROW_2_CREATIVE;
  }, [techStack]);

  // Seamless duplication
  const row1Sequence = useMemo(() => [...row1Items, ...row1Items], [row1Items]);
  const row2Sequence = useMemo(() => [...row2Items, ...row2Items], [row2Items]);

  // Dynamic Scroll Velocity Acceleration
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 45,
    stiffness: 350,
  });

  useMotionValueEvent(smoothVelocity, "change", (latest) => {
    if (reduce) return;
    const speed = 1 + Math.min(Math.abs(latest) / 320, 2.5);

    const applySpeed = (el: HTMLDivElement | null) => {
      if (!el) return;
      try {
        const anims = el.getAnimations ? el.getAnimations() : [];
        anims.forEach((anim) => {
          anim.playbackRate = speed;
        });
      } catch {
        // Fallback for environments lacking Web Animations API
      }
    };

    applySpeed(row1TrackRef.current);
    applySpeed(row2TrackRef.current);
  });

  useEffect(() => {
    setImgSrc(portraitUrl);
  }, [portraitUrl]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Subtle desktop mouse-driven parallax for portrait (clamped, gentle 2D shift)
  const portraitMouseX = useSpring(0, { damping: 25, stiffness: 120 });
  const portraitMouseY = useSpring(0, { damping: 25, stiffness: 120 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || typeof window === "undefined" || window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    portraitMouseX.set(normX * 14);
    portraitMouseY.set(normY * 12);
  };

  const handleHeroMouseLeave = () => {
    portraitMouseX.set(0);
    portraitMouseY.set(0);
  };


  return (
    <div
      className="min-h-screen w-full bg-slate-50 dark:bg-[#070707] text-zinc-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif] relative overflow-x-hidden selection:bg-[#fba01d] selection:text-black transition-colors duration-300"
      style={{
        backgroundImage: isDark
          ? "linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px)"
          : "linear-gradient(to right, rgba(0, 0, 0, 0.022) 1px, transparent 1px)",
        backgroundSize: "16.66vw 100%",
      }}
    >
      {/* ================= LEFT FLOATING SOCIAL SIDEBAR ================= */}
      <div className="hidden lg:flex fixed left-6 top-[52%] -translate-y-1/2 flex-col gap-3.5 z-50">
        {[
          { icon: "fa-github", href: "https://github.com/TheCraftsman1", title: "GitHub" },
          { icon: "fa-linkedin-in", href: "https://in.linkedin.com/in/sree-vishnu-kanchipati-479422331", title: "LinkedIn" },
          { icon: "leetcode", href: "https://leetcode.com/u/Vishnu_Kanchipati/", title: "LeetCode" },
          { icon: "fa-envelope", href: "mailto:vishnukanchipati@gmail.com", title: "Email" },
        ].map((s, idx) => (
          <Magnetic key={idx} maxOffset={8}>
            <LiquidButton
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.title}
              aria-label={s.title}
              data-cursor={s.title}
              variant="default"
              size="icon"
              className="hover:border-[#fba01d]/60 hover:text-[#fba01d] text-zinc-800 dark:text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fba01d]"
            >
              {s.icon === 'leetcode' ? (
                <Leetcode size={14} />
              ) : (
                <i className={`fa-brands ${s.icon === 'fa-envelope' ? 'fa-solid' : 'fa-brands'} ${s.icon}`} />
              )}
            </LiquidButton>
          </Magnetic>
        ))}
      </div>

      {/* ================= TOP NAVBAR ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 dark:bg-white/[0.015] border-b border-zinc-200/80 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto px-6 py-4 sm:py-5 flex items-center justify-between">
          <a
            href="#"
            data-cursor="Top"
            className="text-[24px] sm:text-[26px] font-bold text-zinc-950 dark:text-white tracking-[-0.5px] no-underline flex items-center gap-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fba01d] rounded-md px-1"
          >
            {brandName}
            <span className="text-[#fba01d]">.</span>
          </a>

          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {[
              { label: "Home", href: "#" },
              { label: "About", href: "#about" },
              { label: "Work", href: "#work" },
              { label: "Lab", href: "#lab" },
              { label: "Capabilities", href: "#capabilities" },
              { label: "Notes", href: "#notes" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onMouseEnter={playHoverTick}
                  data-cursor={item.label}
                  className="text-zinc-600 hover:text-zinc-950 dark:text-[#e0e0e0] dark:hover:text-[#fba01d] text-[13px] font-medium no-underline transition-colors font-['Montserrat',sans-serif] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fba01d] rounded-md px-1.5 py-0.5"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Magnetic maxOffset={6}>
              <ThemeToggle />
            </Magnetic>

            {/* Mobile Navigation Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/[0.04] text-zinc-800 dark:text-zinc-200 hover:text-[#fba01d] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden border-t border-zinc-200/80 dark:border-white/[0.08] bg-white/95 dark:bg-[#0c0c0e]/95 backdrop-blur-2xl px-6 py-4 overflow-hidden"
            >
              <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                {[
                  { label: "Home", href: "#" },
                  { label: "About", href: "#about" },
                  { label: "Work", href: "#work" },
                  { label: "Lab", href: "#lab" },
                  { label: "Capabilities", href: "#capabilities" },
                  { label: "Notes", href: "#notes" },
                  { label: "Contact", href: "#contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1.5 text-zinc-700 hover:text-zinc-950 dark:text-neutral-200 dark:hover:text-[#fba01d] text-sm font-semibold tracking-wide no-underline transition-colors font-['Montserrat',sans-serif]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ================= HERO SECTION (MOBILE ID CARD OR DESKTOP EDITORIAL) ================= */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-14 lg:pl-20 xl:pl-16 pt-4 sm:pt-12 pb-6 sm:pb-10 relative z-20"
      >
        {/* MOBILE VIEW (< md): High-Precision Developer ID Card (Untouched) */}
        <div className="block md:hidden w-full">
          <MobileIdCard
            imgSrc={imgSrc}
            onImageError={() => {
              if (imgSrc !== FALLBACK_PORTRAIT_URL) {
                setImgSrc(FALLBACK_PORTRAIT_URL);
              }
            }}
          />
        </div>

        {/* DESKTOP / TABLET VIEW (>= md): Editorial Two-Column Hero */}
        <div className="hidden md:flex relative w-full min-h-[560px] lg:min-h-[600px] items-center justify-center">
          {/* Soft Ambient Radial Glow behind Portrait on Desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[550px] lg:w-[680px] h-[550px] lg:h-[680px] rounded-full pointer-events-none -z-10 select-none"
            style={{
              background: isDark
                ? "radial-gradient(circle at 60% 50%, rgba(251, 160, 29, 0.12) 0%, rgba(251, 160, 29, 0.03) 50%, transparent 72%)"
                : "radial-gradient(circle at 60% 50%, rgba(251, 160, 29, 0.08) 0%, rgba(251, 160, 29, 0.02) 50%, transparent 72%)",
              filter: "blur(60px)",
            }}
          />

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center lg:items-start relative z-10">
            
            {/* ── LEFT COLUMN: VISHNU KANCHIPATI NAME & INTRO ── */}
            <div className="lg:col-span-7 flex flex-col items-start z-30 text-left pt-2 lg:pt-0">
              
              {/* 1. Live Status Badge (Stagger 0.0s) */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.12] backdrop-blur-2xl mb-4 sm:mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.2)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fba01d] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fba01d]"></span>
                </span>
                <span className="text-[11px] sm:text-xs font-['Plus_Jakarta_Sans',sans-serif] tracking-wide text-zinc-800 dark:text-neutral-200 font-semibold">
                  Available for opportunities
                </span>
              </motion.div>

              {/* 2. Bold Editorial Name (Stagger 0.1s) */}
              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Montserrat',sans-serif] font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] text-zinc-950 dark:text-white mb-3.5 sm:mb-4 transition-colors duration-300"
              >
                Vishnu <br />
                <span className="text-[#fba01d]">Kanchipati<span className="text-zinc-950 dark:text-white">.</span></span>
              </motion.h1>

              {/* 3. Primary Moniker (Stagger 0.2s) */}
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Montserrat',sans-serif] text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 transition-colors duration-300"
              >
                The Ultimate Craftsman<span className="text-[#fba01d]">.</span>
              </motion.p>

              {/* 4. Meaningful Professional Subtitle (Stagger 0.28s) */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center flex-wrap gap-2 text-xs sm:text-sm lg:text-[15px] font-semibold font-['Plus_Jakarta_Sans',sans-serif] tracking-wide text-zinc-700 dark:text-zinc-300 mb-2 sm:mb-2.5"
              >
                <span className="hover:text-zinc-950 dark:hover:text-white transition-colors">Full-Stack Developer</span>
                <span className="text-[#fba01d] font-bold">•</span>
                <span className="hover:text-zinc-950 dark:hover:text-white transition-colors">AI Builder</span>
                <span className="text-[#fba01d] font-bold">•</span>
                <span className="hover:text-zinc-950 dark:hover:text-white transition-colors">Creative Technologist</span>
              </motion.div>

              {/* 5. Short Philosophy Line (Stagger 0.36s) - Lightened gray for improved contrast */}
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base lg:text-[17px] text-zinc-700 dark:text-zinc-200 font-normal leading-relaxed max-w-xl mb-7 sm:mb-8"
              >
                Building thoughtful digital products, from concept to production.
              </motion.p>

              {/* 6. Refined Action Buttons with Hierarchy (Stagger 0.45s) */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-2.5"
              >
                {/* 1. Explore Work — solid orange or restrained orange glow */}
                <Magnetic maxOffset={8}>
                  <LiquidButton
                    href="#work"
                    variant="amberSolid"
                    size="lg"
                    data-cursor="Explore Work"
                    className="h-12 px-6 sm:px-7 font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm tracking-wider uppercase text-zinc-950 bg-gradient-to-r from-[#fba01d] to-[#f59e0b] hover:from-[#ffb03a] hover:to-[#fba01d] border border-[#fba01d] shadow-[0_4px_22px_rgba(251,160,29,0.36)] hover:shadow-[0_8px_32px_rgba(251,160,29,0.58)] transition-all duration-300 rounded-full sm:min-w-[160px] group/cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fba01d] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#070707]"
                  >
                    <span>Explore Work</span>
                    <ArrowRight size={15} className="text-zinc-950 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                  </LiquidButton>
                </Magnetic>

                {/* 2. Resume / CV — subtle outlined style */}
                <Magnetic maxOffset={8}>
                  <LiquidButton
                    href="/vishnu-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download Vishnu's Resume (PDF)"
                    variant="outline"
                    size="lg"
                    data-cursor="Download CV"
                    className="h-12 px-6 sm:px-7 font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm tracking-wider uppercase text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/20 bg-zinc-100/40 dark:bg-white/[0.03] hover:border-[#fba01d]/60 hover:text-[#fba01d] dark:hover:text-[#fba01d] hover:bg-zinc-100/80 dark:hover:bg-white/[0.08] shadow-xs hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 rounded-full sm:min-w-[160px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fba01d] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#070707]"
                  >
                    <Download size={15} className="text-[#fba01d]" />
                    <span>Resume / CV</span>
                  </LiquidButton>
                </Magnetic>

                {/* 3. Get in Touch — minimal ghost button */}
                <Magnetic maxOffset={8}>
                  <LiquidButton
                    href="mailto:vishnukanchipati@gmail.com"
                    aria-label="Send email to Vishnu Kanchipati"
                    variant="ghost"
                    size="lg"
                    data-cursor="Contact"
                    className="h-12 px-6 sm:px-7 font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm tracking-wider uppercase text-zinc-700 dark:text-neutral-300 hover:text-zinc-950 dark:hover:text-white border border-transparent hover:border-zinc-200 dark:hover:border-white/10 hover:bg-zinc-100/60 dark:hover:bg-white/[0.05] transition-all duration-300 rounded-full sm:min-w-[155px] group/ghost focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fba01d] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#070707]"
                  >
                    <Mail size={15} className="text-zinc-500 dark:text-neutral-400 group-hover/ghost:text-[#fba01d] transition-colors" />
                    <span>Get In Touch</span>
                  </LiquidButton>
                </Magnetic>
              </motion.div>

              {/* 7. Subtle Scroll Indicator (Stagger 0.58s) */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 sm:mt-9 pt-2 flex items-center"
              >
                <a
                  href="#about"
                  aria-label="Scroll down to explore portfolio"
                  data-cursor="Scroll"
                  className="group/scroll inline-flex items-center gap-3 text-[11px] font-['Plus_Jakarta_Sans',sans-serif] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-neutral-300 hover:text-[#fba01d] dark:hover:text-[#fba01d] transition-colors cursor-pointer select-none no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fba01d] rounded-full px-2 py-1 -ml-2"
                >
                  <span className="relative flex items-center justify-center w-5 h-8 rounded-full border border-zinc-300/80 dark:border-white/20 group-hover/scroll:border-[#fba01d]/70 transition-colors">
                    <motion.span
                      animate={
                        reduce
                          ? undefined
                          : {
                              y: [0, 9, 0],
                              opacity: [1, 0.25, 1],
                            }
                      }
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-1 h-1.5 rounded-full bg-[#fba01d]"
                    />
                  </span>
                  <span>Scroll to explore</span>
                </a>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN: PURE AMBER SUN CIRCLE + SEATED PORTRAIT (WITH SUBTLE PARALLAX & BREATHING GLOW) ── */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex items-center lg:items-start justify-center relative z-20 pt-2 lg:pt-0"
            >
              <motion.div
                style={reduce ? undefined : { x: portraitMouseX, y: portraitMouseY }}
                className="relative flex items-center justify-center -translate-y-6 sm:-translate-y-8 lg:-translate-y-12 transition-transform duration-200"
              >

                {/* Subtle Breathing Outer Golden Aura Glow behind circle */}
                <motion.div
                  animate={
                    reduce
                      ? undefined
                      : {
                          scale: [1, 1.05, 1],
                          opacity: isDark ? [0.45, 0.75, 0.45] : [0.32, 0.58, 0.32],
                        }
                  }
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-4 sm:-inset-6 lg:-inset-7 rounded-full pointer-events-none -z-10"
                  style={{
                    background: isDark
                      ? "radial-gradient(circle, rgba(251, 160, 29, 0.52) 0%, rgba(245, 158, 11, 0.2) 48%, transparent 72%)"
                      : "radial-gradient(circle, rgba(251, 160, 29, 0.42) 0%, rgba(245, 158, 11, 0.14) 48%, transparent 72%)",
                    filter: "blur(38px)",
                  }}
                />

                {/* The Iconic Solid/Gradient Amber Circle Disc */}
                <div
                  className="relative w-[270px] h-[270px] sm:w-[330px] sm:h-[330px] lg:w-[390px] lg:h-[390px] rounded-full overflow-hidden flex items-center justify-center pointer-events-none select-none"
                  style={{
                    background:
                      "radial-gradient(circle at 48% 36%, #ffc043 0%, #fba01d 46%, #e08300 82%, #b45e00 100%)",
                    boxShadow: isDark
                      ? "0 0 65px rgba(251, 160, 29, 0.45), 0 25px 60px rgba(0, 0, 0, 0.75), inset 0 2px 4px rgba(255, 255, 255, 0.45), inset 0 -6px 18px rgba(0, 0, 0, 0.35)"
                      : "0 10px 40px rgba(251, 160, 29, 0.35), 0 20px 45px rgba(0, 0, 0, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.6), inset 0 -4px 12px rgba(0, 0, 0, 0.15)",
                    border: isDark
                      ? "2px solid rgba(255, 255, 255, 0.28)"
                      : "2px solid rgba(255, 255, 255, 0.5)",
                    clipPath: "circle(50% at 50% 50%)",
                    WebkitClipPath: "circle(50% at 50% 50%)",
                  }}
                >
                  {/* Soft Backlight Highlight behind Vishnu's Head/Torso */}
                  <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 32%, rgba(255, 255, 255, 0.38) 0%, rgba(251, 160, 29, 0.15) 50%, transparent 72%)",
                    }}
                  />

                  {/* Portrait Seated Directly INSIDE the Circle - Natural Proportions 100% Preserved */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
                    <div
                      className="relative flex items-center justify-center pointer-events-none"
                    >
                      <picture>
                        <source srcSet="/vishnu_hero_no_bg.webp" type="image/webp" />
                        <img
                          src={imgSrc}
                          fetchPriority="high"
                          loading="eager"
                          decoding="async"
                          width={450}
                          height={450}
                          onError={() => {
                            if (imgSrc !== FALLBACK_PORTRAIT_URL) {
                              setImgSrc(FALLBACK_PORTRAIT_URL);
                            }
                          }}
                          alt="Vishnu Kanchipati Portrait"
                          className="h-[310px] sm:h-[380px] lg:h-[450px] w-auto max-w-none object-cover pointer-events-none select-none"
                          style={{
                            transform: isMobile ? "translate3d(0, 16px, 0)" : "translate3d(0, 22px, 0)",
                            WebkitTransform: isMobile ? "translate3d(0, 16px, 0)" : "translate3d(0, 22px, 0)",
                            WebkitBackfaceVisibility: "hidden",
                            willChange: "transform",
                            filter: isDark
                              ? "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 30px rgba(251, 160, 29, 0.3)) contrast(1.05) brightness(1.02)"
                              : "drop-shadow(0 15px 25px rgba(0, 0, 0, 0.35)) drop-shadow(0 0 20px rgba(251, 160, 29, 0.22)) contrast(1.03) brightness(1.02)",
                          }}
                        />
                      </picture>
                    </div>
                  </div>

                  {/* Subtle Inner Hairline Accent Ring */}
                  <div className="absolute inset-2 sm:inset-3 rounded-full border border-white/20 pointer-events-none z-20" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= DUAL-ROW OPPOSITION KINETIC TECH MARQUEE ================= */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative z-30 select-none py-4 sm:py-6 my-1"
      >
        {/* Dual-Row Counter-Rotating Kinetic Marquee with GPU Acceleration */}
        <div className="kinetic-marquee-container kinetic-marquee-mask relative w-full overflow-hidden pt-4 pb-4 sm:pt-12 sm:pb-12 group/marquee select-none">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-transparent via-transparent dark:from-[#070707] dark:via-[#070707]/60 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-transparent via-transparent dark:from-[#070707] dark:via-[#070707]/60 to-transparent z-20" />

          <div className="flex flex-col gap-3.5 sm:gap-4.5 w-full">
            {/* ROW 1 (Left <- Right) */}
            <div
              ref={row1TrackRef}
              className="kinetic-marquee-track-left flex items-center will-change-transform marquee-gpu"
            >
              <div className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
                {row1Sequence.map((item, idx) => (
                  <FramelessTechItem
                    key={`r1-a-${item.name}-${idx}`}
                    item={item}
                    tooltipPlacement="top"
                  />
                ))}
              </div>
              <div
                className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4"
                aria-hidden="true"
              >
                {row1Sequence.map((item, idx) => (
                  <FramelessTechItem
                    key={`r1-b-${item.name}-${idx}`}
                    item={item}
                    tooltipPlacement="top"
                  />
                ))}
              </div>
            </div>

            {/* ROW 2 (Right -> Left) */}
            <div
              ref={row2TrackRef}
              className="kinetic-marquee-track-right flex items-center will-change-transform marquee-gpu"
            >
              <div className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
                {row2Sequence.map((item, idx) => (
                  <FramelessTechItem
                    key={`r2-a-${item.name}-${idx}`}
                    item={item}
                    tooltipPlacement="bottom"
                  />
                ))}
              </div>
              <div
                className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4"
                aria-hidden="true"
              >
                {row2Sequence.map((item, idx) => (
                  <FramelessTechItem
                    key={`r2-b-${item.name}-${idx}`}
                    item={item}
                    tooltipPlacement="bottom"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export { PerspectiveTunnelPortfolio as Hero };
