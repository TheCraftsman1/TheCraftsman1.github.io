import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface NavbarProps {
  scrollToSection: (id: SectionId) => void;
  activeSection: SectionId;
  currentView?: "work" | "home";
  setCurrentView?: React.Dispatch<React.SetStateAction<"work" | "home">>;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: SectionId.HERO, label: 'Home' },
    { id: SectionId.ABOUT, label: 'About' },
    { id: SectionId.PROJECTS, label: 'Work' },
    { id: SectionId.SKILLS, label: 'Skills' },
    { id: SectionId.CONTACT, label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'backdrop-blur-xl bg-white/70 py-4 border-b border-black/5 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand / Logo */}
        <MagneticButton>
          <div
            onClick={() => scrollToSection(SectionId.HERO)}
            className="cursor-pointer"
          >
            <div className="text-|e font-bold tracking-tighter uppercase text-black inline-flex" style={{ letterSpacing: '-0.05em' }}>
              V<span className="text-gray-400">K</span>
               <span className="text-gray-400 font-normal ml-2" style={{ fontSize: '10px', letterSpacing: 'normal' }}>©2026</span>
            </div>
          </div>
        </MagneticButton>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-2">
          {navItems.map((item) => (
            <MagneticButton key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`${activeSection === item.id ? 'text-black' : 'text-gray-400'} px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:text-black relative group hover:bg-black/5 rounded-full`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
                )}
              </button>
            </MagneticButton>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-black hover:bg-black/5 rounded-full transition-colors"
          >
            {
              isMobileOpen ? <X size={24} /> : <Menu size={24} />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      (
        isMobileOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-2xl py-6 flex flex-col items-center space-y-6">
            {
              navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`${activeSection === item.id ? 'text-black font-bold' : 'text-gray-500'} text-lg uppercase tracking-widest`}
                >
                  {item.label}
                </button>
              ))
            }
          </div>
        )
      )
    </nav>
  );
};

export default Navbar;