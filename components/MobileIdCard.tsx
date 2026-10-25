import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, ArrowUpRight, Cpu, Sparkles, CheckCircle2, ShieldCheck, MapPin, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { LiquidButton } from './ui/liquid-glass-button';
import { playClickSnap, playHoverTick } from '../lib/sound';
import { Github } from './Github';
import { Linkedin } from './Linkedin';
import { Leetcode } from './Leetcode';

interface MobileIdCardProps {
  imgSrc: string;
  onImageError?: () => void;
}

export const MobileIdCard: React.FC<MobileIdCardProps> = ({ imgSrc, onImageError }) => {
  const { isDark } = useTheme();

  const handleScrollToWork = (e: React.MouseEvent) => {
    playClickSnap();
    const el = document.getElementById('work');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[360px] mx-auto px-1 py-2 select-none relative"
    >
      {/* ================= LANYARD & BADGE CLIP ASSEMBLY ================= */}
      <div className="flex flex-col items-center justify-center -mb-2 relative z-30 pointer-events-none">
        {/* Metal Hanging Clasp */}
        <div className="w-8 h-3 rounded-t-sm bg-gradient-to-b from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-800 border-x border-t border-zinc-400/80 dark:border-white/20 shadow-sm flex items-center justify-center">
          <div className="w-4 h-1 rounded-full bg-zinc-700/60 dark:bg-black/40" />
        </div>
        {/* Swivel Ring */}
        <div className="w-5 h-2 border-2 border-zinc-400 dark:border-zinc-500 rounded-b-md -mt-0.5" />
      </div>

      {/* ================= THE MAIN ID CARD BODY ================= */}
      <div
        className={`relative w-full rounded-[26px] p-5 sm:p-6 transition-all duration-300 overflow-hidden ${isDark
          ? 'bg-zinc-950/90 text-white border border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(251,160,29,0.18),inset_0_1px_1.5px_rgba(255,255,255,0.22)]'
          : 'bg-white/95 text-zinc-900 border border-zinc-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)]'
          } backdrop-blur-2xl`}
      >
        {/* Holographic Angle Sheen Overlay */}
        <div
          className="absolute -inset-[100%] pointer-events-none opacity-40 dark:opacity-30 mix-blend-overlay"
          style={{
            background:
              'linear-gradient(135deg, transparent 40%, rgba(251,160,29,0.25) 50%, rgba(255,255,255,0.4) 52%, transparent 60%)',
          }}
        />

        {/* Fine Technical Grid Watermark */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Precision Corner Crosshairs [ + ] */}
        <span className="absolute top-3.5 left-3.5 font-['Plus_Jakarta_Sans',sans-serif] text-[9px] text-[#fba01d]/70 font-semibold select-none leading-none">
          +
        </span>
        <span className="absolute top-3.5 right-3.5 font-['Plus_Jakarta_Sans',sans-serif] text-[9px] text-[#fba01d]/70 font-semibold select-none leading-none">
          +
        </span>
        <span className="absolute bottom-3.5 left-3.5 font-['Plus_Jakarta_Sans',sans-serif] text-[9px] text-[#fba01d]/70 font-semibold select-none leading-none">
          +
        </span>
        <span className="absolute bottom-3.5 right-3.5 font-['Plus_Jakarta_Sans',sans-serif] text-[9px] text-[#fba01d]/70 font-semibold select-none leading-none">
          +
        </span>

        {/* ================= LANYARD PUNCH HOLE ================= */}
        <div className="w-14 h-2 rounded-full bg-zinc-200/90 dark:bg-black/70 border border-zinc-300 dark:border-white/10 mx-auto shadow-inner mb-4 relative z-10" />

        {/* ================= HEADER: CHIP & AVAILABILITY STATUS ================= */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-zinc-200/80 dark:border-white/[0.08] relative z-10">
          {/* Microchip / Holographic Security Tag */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-5 rounded bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 dark:from-amber-400 dark:to-amber-700 p-0.5 shadow-sm border border-amber-200/50 flex flex-col justify-between">
              <div className="flex justify-between h-1">
                <span className="w-1 h-full bg-amber-800/40 rounded-xs" />
                <span className="w-1 h-full bg-amber-800/40 rounded-xs" />
              </div>
              <div className="h-[2px] w-full bg-amber-800/30 rounded-xs" />
              <div className="flex justify-between h-1">
                <span className="w-1 h-full bg-amber-800/40 rounded-xs" />
                <span className="w-1 h-full bg-amber-800/40 rounded-xs" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-widest text-[#fba01d] leading-none uppercase">
                ID·PASS · 2026
              </span>
              <span className="text-[8px] font-['Plus_Jakarta_Sans',sans-serif] text-zinc-500 dark:text-neutral-400 uppercase tracking-tight mt-0.5">
                CRAFTSMAN OS
              </span>
            </div>
          </div>

          {/* Live Availability Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 text-[#fba01d]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fba01d] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#fba01d]" />
            </span>
            <span className="text-[9.5px] font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-wider uppercase">
              Available
            </span>
          </div>
        </div>

        {/* ================= BIOMETRIC PHOTO ID (AMBER CIRCLE) ================= */}
        <div className="flex flex-col items-center justify-center relative z-10 mb-4">
          <div className="relative group">
            {/* Subtle Rotating HUD Biometric Tick Ring */}
            <div className="absolute -inset-2.5 rounded-full border border-dashed border-[#fba01d]/30 pointer-events-none animate-[spin_40s_linear_infinite]" />

            {/* Ambient Warm Aura */}
            <div
              className="absolute -inset-2 rounded-full pointer-events-none -z-10"
              style={{
                background:
                  'radial-gradient(circle, rgba(251, 160, 29, 0.45) 0%, rgba(245, 158, 11, 0.15) 55%, transparent 72%)',
                filter: 'blur(16px)',
              }}
            />

            {/* Circular Amber Disc Portrait */}
            <div
              className="relative w-32 h-32 rounded-full overflow-hidden flex items-center justify-center pointer-events-none select-none shadow-md border-2 border-white/40 dark:border-white/30"
              style={{
                background:
                  'radial-gradient(circle at 48% 36%, #ffc043 0%, #fba01d 46%, #e08300 82%, #b45e00 100%)',
                clipPath: 'circle(50% at 50% 50%)',
                WebkitClipPath: 'circle(50% at 50% 50%)',
              }}
            >
              {/* Backlight highlight */}
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 32%, rgba(255, 255, 255, 0.38) 0%, rgba(251, 160, 29, 0.15) 50%, transparent 72%)',
                }}
              />

              {/* Seated Portrait Photo */}
              <picture>
                <source srcSet="/vishnu_hero_mobile.webp" type="image/webp" />
                <source srcSet="/vishnu_hero_no_bg.webp" type="image/webp" />
                <img
                  src={imgSrc}
                  alt="Vishnu Kanchipati"
                  width={288}
                  height={360}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onError={onImageError}
                  className="h-[148px] w-auto max-w-none object-cover pointer-events-none select-none relative z-10"
                  style={{
                    transform: 'translate3d(0, 8px, 0)',
                    WebkitTransform: 'translate3d(0, 8px, 0)',
                    WebkitBackfaceVisibility: 'hidden',
                    willChange: 'transform',
                    filter: isDark
                      ? 'drop-shadow(0 12px 18px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 16px rgba(251, 160, 29, 0.3)) contrast(1.05)'
                      : 'drop-shadow(0 10px 14px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 12px rgba(251, 160, 29, 0.2)) contrast(1.03)',
                  }}
                />
              </picture>

              {/* Inner Rim */}
              <div className="absolute inset-1.5 rounded-full border border-white/20 pointer-events-none z-20" />
            </div>

            {/* Verification Watermark Badge Over Portrait */}
            <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-white/20 shadow-md flex items-center gap-1 z-30">
              <ShieldCheck size={11} className="text-[#fba01d]" />
              <span className="text-[8px] font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-wider uppercase text-zinc-800 dark:text-zinc-200">
                VERIFIED
              </span>
            </div>
          </div>

          {/* Name & Title */}
          <div className="text-center mt-3.5">
            <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white font-['Montserrat',sans-serif] leading-tight">
              Vishnu <span className="text-[#fba01d]">Kanchipati.</span>
            </h2>
            <p className="text-xs font-bold text-zinc-700 dark:text-neutral-300 font-['Montserrat',sans-serif] mt-0.5">
              The Ultimate Craftsman<span className="text-[#fba01d]">.</span>
            </p>
            <p className="text-[10px] font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-[0.18em] text-[#fba01d] font-semibold mt-1">
              Full-Stack & Systems Engineer
            </p>
          </div>
        </div>

        {/* ================= SPECIFICATIONS & CREDENTIALS GRID ================= */}
        <div className="grid grid-cols-[0.94fr_1.06fr] gap-2 p-2 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.08] relative z-10 mb-4 text-left">
          {/* Cell 1: Base / College */}
          <div className="p-1.5 min-w-0">
            <span className="block text-[8px] font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-widest text-zinc-500 dark:text-neutral-400 font-semibold truncate">
              ACADEMIC / CGPA
            </span>
            <span className="block text-[10.5px] font-bold text-zinc-950 dark:text-white mt-0.5 truncate">
              IARE · 8.59 CGPA
            </span>
          </div>

          {/* Cell 2: Discipline */}
          <div className="p-1.5 border-l border-zinc-200/80 dark:border-white/[0.08] min-w-0">
            <span className="block text-[8px] font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-widest text-zinc-500 dark:text-neutral-400 font-semibold truncate">
              CORE SPECIALTY
            </span>
            <span
              className="block font-bold text-zinc-950 dark:text-white mt-0.5 tracking-tight truncate"
              style={{ fontSize: '9.25px' }}
            >
              Programming · Cloud · AI
            </span>
          </div>

          {/* Cell 3: Metrics */}
          <div className="p-1.5 border-t border-zinc-200/80 dark:border-white/[0.08] min-w-0">
            <span className="block text-[8px] font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-widest text-zinc-500 dark:text-neutral-400 font-semibold truncate">
              ARSENAL / CODE
            </span>
            <span
              className="block font-bold text-zinc-950 dark:text-white mt-0.5 tracking-tight truncate"
              style={{ fontSize: '9.25px' }}
            >
              200+ DSA Problems Solved
            </span>
          </div>

          {/* Cell 4: Location */}
          <div className="p-1.5 border-t border-l border-zinc-200/80 dark:border-white/[0.08] min-w-0">
            <span className="block text-[8px] font-['Plus_Jakarta_Sans',sans-serif] uppercase tracking-widest text-zinc-500 dark:text-neutral-400 font-semibold truncate">
              BASE / CADENCE
            </span>
            <span className="block text-[10.5px] font-bold text-zinc-950 dark:text-white mt-0.5 truncate">
              Hyderabad, IN · Daily
            </span>
          </div>
        </div>

        {/* ================= INTERACTIVE ACTION BUTTONS ================= */}
        <div className="flex flex-col gap-2.5 relative z-10 mb-4">
          {/* Primary CTA: Explore Work */}
          <LiquidButton
            href="#work"
            variant="amber"
            size="default"
            onClick={handleScrollToWork}
            onMouseEnter={playHoverTick}
            className="w-full justify-center font-bold text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(251,160,29,0.3)] h-11"
          >
            <span>Explore Work</span>
            <ArrowUpRight size={15} />
          </LiquidButton>

          {/* Secondary Actions: CV & Contact */}
          <div className="grid grid-cols-2 gap-2">
            <LiquidButton
              href="/vishnu-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="default"
              size="default"
              onClick={playClickSnap}
              onMouseEnter={playHoverTick}
              className="w-full justify-center font-bold text-[11px] tracking-wider uppercase h-10 border border-zinc-200/80 dark:border-white/10"
            >
              <Download size={13} className="text-[#fba01d]" />
              <span>Resume / CV</span>
            </LiquidButton>

            <LiquidButton
              href="mailto:vishnukanchipati@gmail.com"
              variant="ghost"
              size="default"
              onClick={playClickSnap}
              onMouseEnter={playHoverTick}
              className="w-full justify-center font-bold text-[11px] tracking-wider uppercase h-10 border border-zinc-200/80 dark:border-white/10"
            >
              <Mail size={13} className="text-[#fba01d]" />
              <span>Get in Touch</span>
            </LiquidButton>
          </div>

          {/* Social Quick-Links Strip */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <a
              href="https://github.com/TheCraftsman1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSnap}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/10 text-zinc-700 dark:text-neutral-300 hover:text-[#fba01d] dark:hover:text-[#fba01d] hover:border-[#fba01d]/50 transition-colors shadow-xs"
              aria-label="GitHub Profile"
            >
              <Github size={15} />
            </a>
            <a
              href="https://in.linkedin.com/in/sree-vishnu-kanchipati-479422331"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSnap}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/10 text-zinc-700 dark:text-neutral-300 hover:text-[#fba01d] dark:hover:text-[#fba01d] hover:border-[#fba01d]/50 transition-colors shadow-xs"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://leetcode.com/u/Vishnu_Kanchipati/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSnap}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/10 text-zinc-700 dark:text-neutral-300 hover:text-[#fba01d] dark:hover:text-[#fba01d] hover:border-[#fba01d]/50 transition-colors shadow-xs"
              aria-label="LeetCode Profile"
            >
              <Leetcode size={15} />
            </a>
            <a
              href="mailto:vishnukanchipati@gmail.com"
              onClick={playClickSnap}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/10 text-zinc-700 dark:text-neutral-300 hover:text-[#fba01d] dark:hover:text-[#fba01d] hover:border-[#fba01d]/50 transition-colors shadow-xs"
              aria-label="Send Email"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>

        {/* ================= CARD FOOTER: MACHINE BARCODE STRIP ================= */}
        <div className="pt-3 border-t border-zinc-200/80 dark:border-white/[0.08] relative z-10 flex flex-col items-center">
          {/* Aesthetic Vector Barcode */}
          <div className="w-full max-w-[220px] h-7 flex items-center justify-between opacity-70 dark:opacity-60 overflow-hidden">
            {[3, 1, 4, 1, 5, 2, 1, 3, 2, 4, 1, 2, 5, 1, 3, 2, 1, 4, 2, 3, 1, 5, 2, 1, 4, 1, 3, 2].map(
              (w, i) => (
                <span
                  key={i}
                  className="bg-current h-full"
                  style={{ width: `${w}px` }}
                />
              )
            )}
          </div>
          <span className="text-[8.5px] font-['Plus_Jakarta_Sans',sans-serif] tracking-[0.25em] text-zinc-500 dark:text-neutral-400 uppercase mt-1">
            VK-8492026 // SYSTEM CRAFTSMAN
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileIdCard;
