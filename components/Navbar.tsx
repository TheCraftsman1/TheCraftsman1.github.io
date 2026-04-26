import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  scrollToSection: (id: SectionId) => void;
  activeSection: SectionId;
  currentView?: "work" | "home";
  setCurrentView?: React.Dispatch<React.SetStateAction<"work" | "home">>;
}

// Sections with dark backgrounds where the logo/nav should be white
const darkSections = new Set([SectionId.ABOUT, SectionId.EXPERIENCE]);

const Navbar: React.FC<NavbarProps> = ({ scrollToSection, activeSection }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Determine if we're on a dark section
  const isDark = darkSections.has(activeSection);

  const navItems = [
    { id: SectionId.HERO, label: 'Hero' },
    { id: SectionId.ABOUT, label: 'About' },
    { id: SectionId.EXPERIENCE, label: 'Exp' },
    { id: SectionId.PROJECTS, label: 'Work' },
    { id: SectionId.SKILLS, label: 'Skills' },
    { id: SectionId.CONTACT, label: 'Contact' },
  ];

  return (
    <>
      {/* Brand logo — adapts color based on active section background */}
      <div className="fixed top-6 left-6 sm:top-8 sm:left-8 z-[60] cursor-pointer group" onClick={() => scrollToSection(SectionId.HERO)} role="button" tabIndex={0} aria-label="Go to top" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection(SectionId.HERO); }}>
        <div 
          className={`text-2xl font-black tracking-[-0.05em] uppercase transition-all duration-500 drop-shadow-md ${
            isDark ? 'text-white' : 'text-neutral-900 group-hover:text-black'
          }`} 
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          V<span className={`transition-colors duration-500 ${
            isDark ? 'text-neutral-400 group-hover:text-neutral-200' : 'text-neutral-500 group-hover:text-neutral-700'
          }`}>K</span>
        </div>
      </div>

      {/* Desktop Vertical Nav fixed on the Right */}
      <nav className={`hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-end space-y-6 ${isMobileOpen ? 'hidden' : ''}`}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              aria-label={`Navigate to ${item.label} section`}
              className="group relative flex items-center justify-end w-full text-right"
            >
              <span className={`mr-4 transition-all duration-500 text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 ${
                isActive 
                  ? `opacity-100 -translate-x-2 ${isDark ? 'text-white' : 'text-black'}` 
                  : `${isDark ? 'text-neutral-400' : 'text-neutral-500'}`
              }`}>
                {item.label}
              </span>
              <div className="relative flex items-center justify-center w-6 h-6">
                {/* Background active pill tracker */}
                {isActive && (
                  <div className={`absolute inset-0 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.15)] ${isDark ? 'bg-white' : 'bg-neutral-900'}`} />
                )}
                {/* Tiny dot */}
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? `scale-125 ${isDark ? 'bg-neutral-900' : 'bg-white'}` 
                    : `group-hover:scale-150 ${isDark ? 'bg-neutral-500 group-hover:bg-neutral-300' : 'bg-neutral-300 group-hover:bg-neutral-500'}`
                }`} />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Mobile Toggle fixed top-right */}
      <div className="xl:hidden fixed top-5 right-5 sm:top-6 sm:right-6 z-[60]">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className={`p-3 border shadow-lg rounded-full transition-all ${
            isDark 
              ? 'text-white bg-white/10 border-white/20' 
              : 'text-black bg-white/40 backdrop-blur-sm border-white/40'
          }`}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 p-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setIsMobileOpen(false);
              }}
              className={`text-2xl uppercase tracking-[0.3em] font-bold transition-all ${activeSection === item.id ? 'text-neutral-900 scale-110' : 'text-neutral-400 hover:text-neutral-700'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
