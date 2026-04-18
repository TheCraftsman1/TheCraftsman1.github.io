import React from 'react';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const stats = [
  { value: 20, suffix: '+', label: 'Projects Shipped' },
  { value: 3, suffix: '+', label: 'Years Coding' },
  { value: 200, suffix: '+', label: 'DSA Problems' },
  { value: 100, suffix: '%', label: 'Passion' },
];

const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="relative py-32 md:py-40 bg-white overflow-hidden border-t border-neutral-100">
      {/* Structural grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle title="About" subtitle="Who I Am" number="01" />

        {/* Cinematic layout */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-start">
          {/* Profile Image — editorial treatment */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative group">
              {/* Offset decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-neutral-200 rounded-2xl group-hover:border-neutral-300 transition-colors duration-700" />
              
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100">
                <img
                  src="/profile-image.jpg"
                  alt="Vishnu Kanchipati"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                {/* Minimal overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating name badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white border border-neutral-200 rounded-xl px-6 py-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="text-xl font-black uppercase tracking-tight text-neutral-900" style={{ fontFamily: "'Syne', sans-serif" }}>Vishnu K.</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mt-0.5">Full Stack Engineer</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="lg:col-span-7 lg:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Pull Quote */}
              <ScrollReveal animation="fade-up">
                <h3
                  className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 uppercase leading-[1] tracking-tight"
                  style={{ fontFamily: "'Syne', 'Inter', sans-serif" }}
                >
                  Building with<br />
                  <span className="text-amber-500">precision</span> &amp;<br />
                  <span className="text-neutral-300">purpose.</span>
                </h3>
              </ScrollReveal>

              {/* Bio paragraph */}
              <ScrollReveal delay={200} animation="fade-up">
                <p className="text-neutral-500 text-lg leading-relaxed max-w-xl font-light">
                  I approach software development like a race — <strong className="text-neutral-800 font-semibold">precision, efficiency, and constant optimization</strong>. As a Computer Science student, I build high-performance applications that solve real-world problems. My goal is to bridge the gap between complex backend logic and stunning frontend experiences.
                </p>
              </ScrollReveal>

              {/* Social links — large interactive blocks */}
              <div className="flex gap-3 pt-2">
                {[
                  { href: 'https://github.com/TheCraftsman1', label: 'GitHub', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                  )},
                  { href: 'https://www.linkedin.com/in/sree-vishnu-kanchipati-479422331/', label: 'LinkedIn', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                  )},
                  { href: 'https://leetcode.com/u/dPqPqsFd0k/', label: 'LeetCode', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg>
                  )},
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Stats — staggered offset cards */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`p-5 border border-neutral-100 rounded-xl bg-white hover:border-neutral-300 transition-all duration-300 group ${index % 2 === 1 ? 'md:translate-y-4' : ''}`}
                >
                  <div className="text-3xl md:text-4xl font-black tracking-tighter text-neutral-900 group-hover:text-amber-500 transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
                    <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 mt-1.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
