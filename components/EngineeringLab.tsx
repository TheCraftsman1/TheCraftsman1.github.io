import React, { useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  GitCommit,
  CheckCircle2,
  Code2,
  Sparkles,
  Flame,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { Github } from './Github';
import { useTheme } from '../context/ThemeContext';
import { Magnetic } from './ui/Magnetic';
import { LiquidButton } from './ui/liquid-glass-button';

export const EngineeringLab: React.FC = () => {
  const { isDark } = useTheme();
  const calendarScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // On small screens, automatically scroll the calendar to the right so recent commits are immediately visible
    if (calendarScrollRef.current && typeof window !== 'undefined' && window.innerWidth < 768) {
      const container = calendarScrollRef.current;
      setTimeout(() => {
        container.scrollLeft = container.scrollWidth - container.clientWidth;
      }, 350);
    }
  }, []);

  return (
    <section
      className="relative w-full py-12 sm:py-20 border-t border-zinc-200/80 dark:border-white/10 overflow-hidden transition-colors duration-300 section-contained"
      id="lab"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 border-b border-zinc-200/80 dark:border-white/10 pb-4 sm:pb-6">
          <div>
            <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-['Montserrat',sans-serif]">
              GitHub Contribution Activity<span className="text-[#fba01d]">.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-['Plus_Jakarta_Sans',sans-serif] text-zinc-500 dark:text-neutral-400 tracking-wider">
              LIVE SYNC · OPEN SOURCE · DAILY MOMENTUM
            </span>
          </div>
        </div>

        {/* Live GitHub Contribution Graph Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-white/[0.025] backdrop-blur-2xl border border-zinc-200/80 dark:border-white/[0.12] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.22)] overflow-hidden group item-contained"
        >
          {/* Top Specular Edge Highlight */}
          <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/35 to-transparent pointer-events-none z-20" />

          {/* Matrix Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-200/80 dark:border-white/[0.08]">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/15 backdrop-blur-md flex items-center justify-center text-zinc-900 dark:text-white shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                <Github size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-['Montserrat',sans-serif] font-bold text-zinc-950 dark:text-white text-base">
                    GitHub Contribution Activity
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-['Plus_Jakarta_Sans',sans-serif] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    Live Sync
                  </span>
                </div>
                <span className="text-xs font-['Plus_Jakarta_Sans',sans-serif] text-zinc-500 dark:text-neutral-400">
                  @TheCraftsman1 · Public & Aggregated Private Repositories
                </span>
              </div>
            </div>

            <Magnetic maxOffset={8}>
              <LiquidButton
                href="https://github.com/TheCraftsman1"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                data-cursor="Inspect GitHub"
                className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold tracking-wide gap-1.5 group/link"
              >
                <span>View GitHub Profile</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </LiquidButton>
            </Magnetic>
          </div>

          {/* Mobile Swipe Hint Bar */}
          <div className="flex md:hidden items-center justify-between pb-2 text-[10px] font-['Plus_Jakarta_Sans',sans-serif] text-zinc-500 dark:text-neutral-400 select-none">
            <span>← Swipe for earlier months</span>
            <span className="text-[#fba01d] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fba01d] animate-ping" />
              Latest activity on right →
            </span>
          </div>

          {/* Calendar Graph Container - Responsive Scroll with Auto-Scroll to Recent */}
          <div
            ref={calendarScrollRef}
            className="w-full overflow-x-auto pb-4 pt-1 flex justify-start md:justify-center text-zinc-700 dark:text-neutral-300 min-h-[140px] scrollbar-none select-none"
            style={{
              scrollbarWidth: 'thin',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <GitHubCalendar
              username="TheCraftsman1"
              colorScheme={isDark ? 'dark' : 'light'}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
              throwOnError={false}
              theme={{
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
              }}
              labels={{
                totalCount: '{{count}} contributions in the last year',
              }}
            />
          </div>

          {/* Telemetry Micro-Metrics Bar */}
          <div className="pt-4 mt-2 border-t border-zinc-200/80 dark:border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs font-['Plus_Jakarta_Sans',sans-serif]">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-neutral-400 p-2.5 rounded-xl bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5">
              <GitCommit size={14} className="text-[#fba01d]" />
              <span>
                <strong className="text-zinc-950 dark:text-white font-semibold">237+</strong> Commits
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-neutral-400 p-2.5 rounded-xl bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>
                <strong className="text-zinc-950 dark:text-white font-semibold">GPG Signed</strong> Merges
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-neutral-400 p-2.5 rounded-xl bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5">
              <Code2 size={14} className="text-blue-500" />
              <span>
                <strong className="text-zinc-950 dark:text-white font-semibold">Kotlin · TS · Python</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-neutral-400 p-2.5 rounded-xl bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5">
              <Sparkles size={14} className="text-amber-500" />
              <span>
                <strong className="text-zinc-950 dark:text-white font-semibold">Active</strong> Daily Cadence
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EngineeringLab;
