import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  scrollToSection: (id: SectionId) => void;
  activeSection: SectionId;
  currentView?: "work" | "home";
  setCurrentView?: React.Dispatch<React.SetStateAction<"work" | "home">>;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection, activeSection }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
      {/* Brand logo fixed at top-left asymmetrically */}
      <div className="fixed top-8 left-8 z-[60] cursor-pointer group" onClick={() => scrollToSection(SectionId.HERO)}>
        <div className="text-2xl font-black tracking-[-0.05em] uppercase text-neutral-900 group-hover:text-black transition-all duration-300 drop-shadow-md" style={{ fontFamily: "'Syne', sans-serif" }}>
          V<span className="text-neutral-500 group-hover:text-neutral-700 transition-colors duration-300">K</span>
        </div>
      </div>

      {/* Desktop Vertical Nav fixed on the Right */}
      <nav className={`hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-end space-y-6 ${isMobileOpen ? 'hidden' : ''}`}>
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative flex items-center justify-end w-full text-right"
            >
              <span className={`mr-4 transition-all duration-500 text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 ${isActive ? 'text-black opacity-100 -translate-x-2' : 'text-neutral-500'}`}>
                {item.label}
              </span>
              <div className="relative flex items-center justify-center w-6 h-6">
                {/* Background active pill tracker */}
                {isActive && (
                  <div className="absolute inset-0 bg-neutral-900 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.15)]" />
                )}
                {/* Tiny dot */}
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-white scale-125' : 'bg-neutral-300 group-hover:bg-neutral-500 group-hover:scale-150'}`} />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Mobile Toggle fixed top-right */}
      <div className="xl:hidden fixed top-6 right-6 z-[60]">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-3 text-black bg-white/40 backdrop-blur-lg border border-white/40 shadow-lg rounded-full transition-all"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300 p-6">
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
