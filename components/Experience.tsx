import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import { Calendar, MapPin, Building2, GraduationCap } from 'lucide-react';
import CountUp from 'react-countup';
import { ParallaxSection } from './ParallaxSection';
import ScrollReveal from './ScrollReveal';

interface ExperienceItem {
  id: string;
  type: 'work' | 'education' | 'achievement';
  title: string;
  organization: string;
  location: string;
  date: string;
  year: string;
  description: string;
  tags?: string[];
  icon: React.ReactNode;
  accent: string;
}

const experiences: ExperienceItem[] = [
  {
    id: '1',
    type: 'education',
    title: 'B.Tech Computer Science',
    organization: 'IARE',
    location: 'Hyderabad, India',
    date: '2024 - 2028',
    year: '2024',
    description: 'Pursuing Bachelor of Technology in Computer Science and Engineering with focus on software development, algorithms, and emerging technologies.',
    tags: ['Data Structures', 'Algorithms', 'Web Development', 'AI/ML'],
    icon: <GraduationCap className="w-6 h-6" />,
    accent: '#f59e0b',
  },
];

const ticker = [
  { value: 20, suffix: '+', label: 'Projects' },
  { value: 200, suffix: '+', label: 'DSA Problems' },
  { value: 3, suffix: '+', label: 'Years Coding' },
  { value: 10, suffix: '+', label: 'Technologies' },
];

const Experience: React.FC = () => {
  return (
    <section id={SectionId.EXPERIENCE} className="py-32 md:py-40 bg-white relative overflow-hidden border-t border-neutral-100">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle title="Journey" subtitle="Experience & Education" number="02" />

        {/* Hero image + experience card layout */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Portrait photo — blends with the grey tones */}
          <motion.div
            className="lg:col-span-4 relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <ParallaxSection direction="vertical" speed={0.15}>
            <div className="relative group">
              {/* Matching grey background frame to blend with photo's grey bg */}
              <div className="absolute -inset-3 bg-gradient-to-b from-neutral-200/40 to-neutral-100/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative rounded-2xl overflow-hidden bg-neutral-200" style={{ aspectRatio: '3/4' }}>
                <img
                  src="/journey-photo.jpg"
                  alt="Vishnu Kanchipati"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Bottom fade that matches the section's neutral-50 background */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-transparent to-transparent opacity-60" />
                {/* Subtle grey tone overlay to unify with section */}
                <div className="absolute inset-0 bg-neutral-50/10 mix-blend-overlay pointer-events-none" />
              </div>

              {/* Floating label at bottom */}
              <motion.div
                className="absolute -bottom-4 left-4 right-4 bg-white border border-neutral-200 rounded-xl px-5 py-3 shadow-lg flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-neutral-900" style={{ fontFamily: "'Syne', sans-serif" }}>Vishnu K.</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">CS Undergrad</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Available" />
              </motion.div>
            </div>
            </ParallaxSection>
          </motion.div>

          {/* Experience cards column */}
          <div className="lg:col-span-8 space-y-8">
            {experiences.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >


                <div className="relative editorial-card p-8 md:p-10">
                  {/* Icon badge */}
                  <motion.div
                    className="absolute top-8 right-8 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: item.accent }}
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Type + meta */}
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-4">{item.type}</span>

                  <div className="flex flex-wrap gap-4 text-sm text-neutral-500 font-medium mb-3">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{item.organization}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <h3
                    className="text-2xl md:text-4xl font-black tracking-tight text-neutral-900 uppercase leading-[1.1] mb-4 pr-16"
                    style={{ fontFamily: "'Syne', 'Inter', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-neutral-500 leading-relaxed text-base font-light max-w-2xl mb-6">
                    {item.description}
                  </p>

                  {/* Tags */}
                  {item.tags && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          className="text-[11px] font-bold uppercase tracking-wider px-4 py-2 bg-neutral-50 text-neutral-600 hover:bg-neutral-900 hover:text-white rounded-lg border border-neutral-100 hover:border-neutral-900 transition-all duration-300 cursor-default"
                          whileHover={{ y: -1 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ticker stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-24 border-t border-b border-neutral-200 py-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {ticker.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div
                  className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 group-hover:text-amber-500 transition-colors duration-300"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
