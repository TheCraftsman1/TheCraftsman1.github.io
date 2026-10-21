"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playThemeChime } from '../../lib/sound';

export interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    // Will switch to opposite: if currently dark, next is light
    playThemeChime(!isDark);
    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      data-cursor="Theme"
      className={`group/theme-btn relative inline-flex items-center justify-center gap-2 rounded-full cursor-pointer transition-all duration-300 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#fba01d] ${
        showLabel ? 'h-9 px-3.5 text-xs font-semibold' : 'size-9 sm:size-10'
      } ${
        isDark
          ? 'bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/15 hover:border-white/35 shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]'
          : 'bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200/80 hover:border-zinc-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]'
      } backdrop-blur-xl ${className}`}
    >
      {/* Specular Inner Rim */}
      <span
        className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 ${
          isDark
            ? 'shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1.5px_rgba(0,0,0,0.4)]'
            : 'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)]'
        }`}
      />

      {/* Subtle radial aura on hover */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-[#fba01d]/15 to-transparent opacity-0 group-hover/theme-btn:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Animated Icon Container */}
      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#fba01d] flex items-center justify-center"
            >
              <Moon size={16} strokeWidth={2.2} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-amber-500 flex items-center justify-center"
            >
              <Sun size={16} strokeWidth={2.2} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-zinc-700 dark:text-zinc-200 font-['Plus_Jakarta_Sans',sans-serif] tracking-tight font-medium">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
