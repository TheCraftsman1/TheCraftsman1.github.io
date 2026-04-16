
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
    { id: SectionId.HERO, label: 'Home' },
    { id: SectionId.ABOUT, label: 'About' },
    { id: SectionId.PROJECTS, label: 'Work' },
    { id: SectionId.SKILLS, label: 'Skills' },
    { id: SectionId.CONTACT, label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-panel-intense py-3 border-b border-sky-300/40 shadow-[0_10px_35px_rgba(14,165,233,0.18)]' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-orbitron font-bold text-slate-900 tracking-tighter cursor-pointer group flex items-center"
          onClick={() => scrollToSection(SectionId.HERO)}
        >
          <span className="group-hover:text-sky-500 transition-colors">V</span>
          <span className="group-hover:translate-x-0.5 transition-transform">K</span>
          <span className="text-sky-500 animate-pulse ml-0.5">.</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
               className={`text-xs font-exo uppercase font-bold tracking-[0.15em] transition-colors duration-300 relative group ${activeSection === item.id ? 'text-sky-600' : 'text-slate-500 hover:text-slate-900'}`}
             >
               {item.label}
               <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-sky-500 transition-all duration-300 shadow-[0_0_12px_rgba(14,165,233,0.45)] ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
             </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-900 hover:text-sky-500 transition-colors" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              scrollToSection(item.id);
              setIsMobileOpen(false);
            }}
            className={`text-2xl font-orbitron uppercase font-bold tracking-widest hover:text-sky-500 hover:scale-110 transition-all ${activeSection === item.id ? 'text-sky-600' : 'text-slate-900'}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
