
import React from 'react';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import ScrollReveal from './ScrollReveal';
import { RotateCcw } from 'lucide-react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const About: React.FC = () => {
    return (
        <section id={SectionId.ABOUT} className="relative py-32 bg-carbon-gray overflow-hidden">
            {/* Decorative skewed stripe */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-carbon-black -skew-x-12 translate-x-1/3 border-l border-white/5"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <SectionTitle title="Engineer Profile" subtitle="Who I Am" />
                </ScrollReveal>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Image Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative group perspective-1000"
                    >
                        <div className="absolute -inset-4 bg-neon-lime/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative aspect-[3/4] bg-neutral-900 border-2 border-white/10 overflow-hidden transform transition-transform duration-500 group-hover:rotate-y-6 group-hover:rotate-x-6 preserve-3d shadow-2xl">
                            {/* Placeholder for Profile Image */}
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                                <span className="text-white/20 font-orbitron text-4xl font-bold">VK</span>
                            </div>

                            {/* Tech Overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-z-10">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="font-orbitron text-3xl font-bold uppercase text-white drop-shadow-lg">Vishnu K.</p>
                                        <p className="font-exo text-xs text-neon-lime tracking-widest mt-1">FULL STACK ENGINEER</p>
                                    </div>
                                    <div className="text-right hidden md:block">
                                        <p className="text-xs text-gray-400 font-mono border border-white/20 px-2 py-1 rounded bg-black/40">ID: VK-2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-8">
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-orbitron font-bold text-white uppercase leading-[1.1]"
                        >
                            Engineering with <span className="text-neon-lime">Logic</span>.<br />
                            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Speed</span>.
                        </motion.h3>

                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 96 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="h-1 bg-neon-lime"
                        ></motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="font-exo text-gray-300 text-lg leading-relaxed"
                        >
                            I approach software development like a race: <strong className="text-white">precision, efficiency, and constant optimization</strong>. As a Computer Science student, I build high-performance applications that solve real-world problems with cinematic flair. My goal is to bridge the gap between complex backend logic and stunning frontend experiences.
                        </motion.p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                viewport={{ once: true }}
                                className="p-6 bg-white/5 border border-white/10 hover:border-neon-lime transition-colors group backdrop-blur-sm"
                            >
                                <h4 className="font-orbitron text-4xl text-white font-bold group-hover:text-neon-lime transition-colors">
                                    <CountUp end={20} duration={2.5} suffix="+" enableScrollSpy scrollSpyOnce />
                                </h4>
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">Projects Shipped</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1.0 }}
                                viewport={{ once: true }}
                                className="p-6 bg-white/5 border border-white/10 hover:border-neon-lime transition-colors group backdrop-blur-sm"
                            >
                                <h4 className="font-orbitron text-4xl text-white font-bold group-hover:text-neon-lime transition-colors">
                                    <CountUp end={100} duration={3} suffix="%" enableScrollSpy scrollSpyOnce />
                                </h4>
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">Focus</p>
                            </motion.div>
                        </div>

                        {/* Coding Profiles */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                            viewport={{ once: true }}
                            className="pt-8"
                        >
                            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Connect</p>
                            <div className="flex gap-6">
                                <a href="https://github.com/TheCraftsman1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-lime transition-colors transform hover:scale-110 duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                                </a>
                                <a href="https://www.linkedin.com/in/sree-vishnu-kanchipati-479422331/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-lime transition-colors transform hover:scale-110 duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                                </a>
                                <a href="https://leetcode.com/u/dPqPqsFd0k/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-lime transition-colors transform hover:scale-110 duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg>
                                </a>
                            </div>
                        </motion.div>

                        {/* Mobile Hint */}
                        <div className="md:hidden flex items-center gap-2 text-gray-600 text-xs animate-pulse">
                            <RotateCcw size={12} />
                            <span>Rotate for immersive view</span>
                        </div>
                    </div>
                </div>

                <style>{`
                    .perspective-1000 { perspective: 1000px; }
                    .preserve-3d { transform-style: preserve-3d; }
                    .translate-z-10 { transform: translateZ(20px); }
                    .rotate-y-6 { transform: rotateY(6deg); }
                    .rotate-x-6 { transform: rotateX(6deg); }
                `}</style>
            </div>
        </section>
    );
};

export default About;
