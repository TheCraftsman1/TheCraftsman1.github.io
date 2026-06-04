import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import { Network, GraduationCap, Plus, Minus, Code2 } from 'lucide-react';
import CountUp from 'react-countup';

const experiences = [
  {
    id: 'iare',
    type: 'Formal Architecture',
    title: 'B.Tech in Computer Science',
    organization: '< Institute of Aeronautical Engineering />',
    date: '2024 — 2028',
    gpa: '8.5',
    image: '/iare.jpg',
    icon: <GraduationCap className="w-6 h-6 text-teal-500 dark:text-teal-400" />,
    bullets: [
      'Architecting foundations in Operating Systems, DBMS, and Network Protocols.',
      'Bridging theoretical Computer Science with modern Full-Stack development.',
    ],
    deepDive: [
      'Engineered resilient software patterns applied to academic projects.',
      'Participated in hackathons and coding competitions representing the university.',
    ],
    tags: ['Data Structures', 'Algorithms', 'System Design'],
  },
  {
    id: 'dsa',
    type: 'Independent Study',
    title: 'Algorithmic Problem Solving',
    organization: '< LeetCode & GeeksForGeeks />',
    date: '2024 — Present',
    icon: <Network className="w-6 h-6 text-teal-500 dark:text-teal-400" />,
    bullets: [
      'Conquered 200+ complex algorithmic challenges, focusing on Graph Theory and Dynamic Programming.',
      'Optimized brute-force solutions to achieve O(N) time complexity metrics.',
    ],
    deepDive: [
      'Maintained top percentile ranking in competitive programming contests.',
      'Developed deep understanding of memory management and algorithmic efficiency.',
    ],
    languages: [
      { name: 'Java', color: 'bg-teal-500 dark:bg-teal-400', width: '60%' },
      { name: 'C++', color: 'bg-neutral-800 dark:bg-white', width: '40%' },
    ],
  },
];

const SpotlightCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/50 p-8 md:p-10 transition-colors duration-500 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm dark:shadow-none ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(45, 212, 191, 0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const ExperienceNode = ({ data }: { data: typeof experiences[0] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <SpotlightCard className="mb-8">
      <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          {data.image ? (
             <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 border border-neutral-200 dark:border-neutral-800 shadow-inner">
               <img src={data.image} alt={data.title} loading="lazy" className="w-full h-full object-contain" />
             </div>
          ) : (
            <div className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 flex items-center justify-center shrink-0 shadow-inner transition-colors duration-500">
              {data.icon}
            </div>
          )}
          <div>
            <h3 className="text-xl md:text-3xl font-black tracking-tight text-neutral-900 dark:text-white transition-colors duration-500">{data.title}</h3>
            <div className="flex items-center flex-wrap gap-2 text-sm mt-1">
              <span className="text-neutral-500 dark:text-neutral-400 font-mono transition-colors duration-500">{data.organization}</span>
              {data.gpa && (
                <>
                  <span className="text-neutral-300 dark:text-neutral-600">•</span>
                  <span className="text-teal-600 dark:text-teal-400 font-mono transition-colors duration-500">CGPA: {data.gpa}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {data.bullets.map((bullet, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-teal-500 dark:text-teal-400 mt-1 font-mono transition-colors duration-500">{'>'}</span>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-light transition-colors duration-500">
              {bullet.split(/(\d+%|\d+\+|O\(N\))/).map((part, j) => 
                /(\d+%|\d+\+|O\(N\))/.test(part) ? (
                  <span key={j} className="text-teal-600 dark:text-teal-300 font-mono bg-teal-500/10 dark:bg-teal-400/10 px-1 py-0.5 rounded transition-colors duration-500">{part}</span>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </p>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-6 space-y-3 border-t border-neutral-200 dark:border-neutral-800/50 mt-4 transition-colors duration-500">
              {data.deepDive.map((bullet, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-neutral-400 dark:text-neutral-600 mt-1 font-mono transition-colors duration-500">{'>'}</span>
                  <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-light text-sm transition-colors duration-500">{bullet}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
        <button
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'Collapse details' : 'Expand details'}
          className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors uppercase tracking-widest bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-full"
        >
          {expanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          {expanded ? 'Collapse Scope' : 'View Architecture'}
        </button>

        {data.tags && (
          <div className="flex gap-2">
            {data.tags.map(tag => (
              <span key={tag} className="text-xs font-mono text-teal-700 dark:text-teal-400/80 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.05)] dark:shadow-[0_0_10px_rgba(45,212,191,0.1)] transition-colors duration-500">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {data.languages && (
          <div className="flex flex-col gap-1 w-full max-w-[200px]">
            <div className="flex justify-between text-[10px] font-mono text-neutral-500 dark:text-neutral-500 uppercase tracking-widest transition-colors duration-500">
              <span>Stack Distribution</span>
            </div>
            <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-900 rounded-full overflow-hidden flex transition-colors duration-500">
              {data.languages.map((lang) => (
                <div key={lang.name} className={`h-full ${lang.color} transition-colors duration-500`} style={{ width: lang.width }} title={`${lang.name} (${lang.width})`} />
              ))}
            </div>
            <div className="flex gap-3 text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mt-1 transition-colors duration-500">
              {data.languages.map((lang) => (
                <span key={lang.name} className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${lang.color} transition-colors duration-500`} />
                  {lang.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </SpotlightCard>
  );
};

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id={SectionId.EXPERIENCE} className="min-h-screen py-24 bg-neutral-50 dark:bg-[#09090b] relative overflow-hidden text-neutral-600 dark:text-neutral-300 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={containerRef}>
        <SectionTitle title="The Journey" subtitle="Training Ground" number="02" />

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* Left Column: The Timeline (30%) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-32">
            <div className="flex relative h-[600px]">
              {/* Background Path */}
              <svg className="absolute left-6 top-0 w-8 h-full text-neutral-200 dark:text-neutral-800 transition-colors duration-500" viewBox="0 0 40 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0 L20 600" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M20 100 Q 40 150 20 200" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M20 300 Q 0 350 20 400" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              
              {/* Active Glowing Path */}
              <svg className="absolute left-6 top-0 w-8 h-full" viewBox="0 0 40 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path 
                  d="M20 0 L20 600" 
                  stroke="#2dd4bf" 
                  strokeWidth="3" 
                  style={{ pathLength }}
                  className="drop-shadow-[0_0_5px_rgba(45,212,191,0.5)] dark:drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]"
                />
              </svg>

              <div className="pl-16 space-y-32 pt-8">
                {experiences.map((exp, i) => (
                  <motion.div 
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.2 }}
                    className="relative"
                  >
                    <div className="absolute -left-[45px] top-2 w-3 h-3 bg-white dark:bg-black border-2 border-teal-500 dark:border-teal-400 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.5)] dark:shadow-[0_0_10px_rgba(45,212,191,0.8)] z-10 transition-colors duration-500" />
                    <span className="text-sm font-mono text-teal-700 dark:text-teal-400 bg-teal-500/10 dark:bg-teal-400/10 px-3 py-1 rounded inline-block whitespace-nowrap border border-teal-500/20 dark:border-teal-400/20 transition-colors duration-500">{exp.date}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Academic Nodes (70%) */}
          <div className="lg:col-span-9 space-y-12">
            {experiences.map((data, index) => (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ExperienceNode data={data} />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
