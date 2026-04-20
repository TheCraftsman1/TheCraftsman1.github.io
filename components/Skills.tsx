import React, { useState } from 'react';
import { SectionId } from '../types';
import { motion } from 'framer-motion';

const skillsData = [
  {
    id: 'FRONTEND',
    sysReq: '[SYS.REQ.01]',
    description: 'Client-side architecture and interactive interfaces.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="square" strokeLinejoin="miter" d="M3 3h18v18H3z" />
        <path strokeLinecap="square" strokeLinejoin="miter" d="M3 9h18M9 21V9" />
      </svg>
    ),
    primary: ['React', 'React Native', 'TypeScript'],
    secondary: ['Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    id: 'BACKEND',
    sysReq: '[SYS.REQ.02]',
    description: 'Server logic, data pipelines, and APIs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="square" strokeLinejoin="miter" d="M4 6h16v12H4z" />
        <path strokeLinecap="square" strokeLinejoin="miter" d="M8 6v12M16 6v12" />
        <path strokeLinecap="square" strokeLinejoin="miter" d="M4 12h16" />
      </svg>
    ),
    primary: ['Node.js', 'PostgreSQL', 'Python'],
    secondary: ['Express', 'Java', 'C++', 'MongoDB'],
  },
  {
    id: 'INFRA',
    sysReq: '[SYS.REQ.03]',
    description: 'Cloud deployment, containerization, and CI/CD.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="square" strokeLinejoin="miter" d="M12 3l9 4-9 4-9-4 9-4z" />
        <path strokeLinecap="square" strokeLinejoin="miter" d="M3 11l9 4 9-4M3 16l9 4 9-4" />
      </svg>
    ),
    primary: ['Docker', 'AWS', 'Vercel'],
    secondary: ['Git', 'Firebase', 'Linux'],
  }
];

const Crosshair = ({ position }: { position: string }) => {
  const positioning = {
    'top-left': '-top-1.5 -left-1.5',
    'top-right': '-top-1.5 -right-1.5',
    'bottom-left': '-bottom-1.5 -left-1.5',
    'bottom-right': '-bottom-1.5 -right-1.5',
  }[position];

  return (
    <div className={`absolute w-3 h-3 pointer-events-none z-20 ${positioning}`}>
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-neutral-300" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-neutral-300" />
    </div>
  );
};

const Skills: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section 
      id={SectionId.SKILLS} 
      className="min-h-screen py-24 bg-white relative text-black overflow-hidden border-t border-neutral-200"
    >
      {/* Micro-grid background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #f4f4f5 1px, transparent 1px), linear-gradient(to bottom, #f4f4f5 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col">
        
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-neutral-200 pb-12 relative">
          <Crosshair position="bottom-left" />
          <Crosshair position="bottom-right" />
          
          <div>
            <span className="font-mono text-[10px] text-[#888888] tracking-[0.2em] uppercase block mb-4">
              [ DIRECTORY // CAPABILITIES ]
            </span>
            <h2 
              className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none text-black"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              SKILLS
            </h2>
          </div>
          
          <div className="max-w-sm text-[#888888] font-mono text-xs leading-relaxed uppercase tracking-wider">
            Execution matrices spanning client applications, distributed backends, and cloud orchestration.
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] bg-neutral-200 border border-neutral-200 relative p-[1px]">
          <Crosshair position="top-left" />
          <Crosshair position="top-right" />
          <Crosshair position="bottom-left" />
          <Crosshair position="bottom-right" />

          {skillsData.map((category) => {
            const isHovered = hoveredCategory === category.id;
            const isDimmed = hoveredCategory !== null && hoveredCategory !== category.id;

            return (
              <motion.div
                key={category.id}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                animate={{
                  opacity: isDimmed ? 0.4 : 1,
                  backgroundColor: isHovered ? '#f7f7f8' : '#ffffff',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative p-10 flex flex-col h-full overflow-hidden bg-white"
              >
                {/* Tech spec header */}
                <div className="flex justify-between items-start mb-16">
                  <span className="font-mono text-[10px] text-[#888888] tracking-widest">
                    {category.sysReq}
                  </span>
                  <div className={`p-2 transition-colors duration-300 ${isHovered ? 'text-black' : 'text-[#888888]'}`}>
                    {category.icon}
                  </div>
                </div>

                {/* Category Title */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-black mb-4 flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-black' : 'bg-transparent border border-black'} transition-colors duration-300`} />
                    {category.id}
                  </h3>
                  <p className="text-[#888888] text-sm font-mono tracking-tight leading-relaxed max-w-[200px]">
                    {category.description}
                  </p>
                </div>

                {/* Tech Stack List */}
                <div className="mt-auto flex flex-col gap-6">
                  <div>
                    <span className="block font-mono text-[9px] text-[#888888] uppercase tracking-[0.2em] mb-3 border-b border-neutral-100 pb-2">
                      Primary Matrix
                    </span>
                    <ul className="flex flex-col gap-1">
                      {category.primary.map(skill => (
                        <li 
                          key={skill} 
                          className="text-black font-medium text-lg md:text-xl tracking-tight transition-transform duration-300 cursor-default"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          <span className={`inline-block mr-2 opacity-0 -translate-x-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : ''}`}>›</span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="block font-mono text-[9px] text-[#888888] uppercase tracking-[0.2em] mb-3 border-b border-neutral-100 pb-2">
                      Secondary Support
                    </span>
                    <ul className="flex flex-wrap gap-x-4 gap-y-2">
                      {category.secondary.map(skill => (
                        <li 
                          key={skill} 
                          className="text-[#888888] font-normal text-sm hover:text-black transition-colors duration-300 cursor-default"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Hover line indicator */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-[2px] bg-black w-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
