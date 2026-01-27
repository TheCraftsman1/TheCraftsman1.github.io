
import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  scrollToSection: (id: SectionId) => void;
  activeSection: SectionId;
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
    { id: SectionId.HERO, label: 'Start' },
    { id: SectionId.ABOUT, label: 'Profile' },
    { id: SectionId.PROJECTS, label: 'Work' },
    { id: SectionId.STATS, label: 'Telemetry' },
    { id: SectionId.OFF_TRACK, label: 'Off Track' },
    { id: SectionId.CONTACT, label: 'Connect' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-orbitron font-bold text-white tracking-tighter cursor-pointer group flex items-center"
          onClick={() => scrollToSection(SectionId.HERO)}
        >
          <span className="group-hover:text-neon-lime transition-colors">V</span>
          <span className="group-hover:translate-x-0.5 transition-transform">K</span>
          <span className="text-neon-lime animate-pulse ml-0.5">.</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-xs font-exo uppercase font-bold tracking-[0.15em] transition-colors duration-300 relative group ${activeSection === item.id ? 'text-neon-lime' : 'text-gray-400 hover:text-white'}`}
            >
              {item.label}
              <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-neon-lime transition-all duration-300 shadow-[0_0_10px_#CCFF00] ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white hover:text-neon-lime transition-colors" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              scrollToSection(item.id);
              setIsMobileOpen(false);
            }}
            className={`text-2xl font-orbitron uppercase font-bold tracking-widest hover:text-neon-lime hover:scale-110 transition-all ${activeSection === item.id ? 'text-neon-lime' : 'text-white'}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
