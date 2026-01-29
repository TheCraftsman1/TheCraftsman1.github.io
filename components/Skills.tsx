
import React from 'react';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import ScrollReveal from './ScrollReveal';
import { Activity, Cpu, Database, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Telemetry: React.FC = () => {
    return (
        <section id={SectionId.STATS} className="py-24 bg-carbon-gray relative overflow-hidden border-t border-white/5">
            {/* Decorative Data Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-[10%] left-0 w-full h-[1px] bg-neon-lime dashed"></div>
                <div className="absolute bottom-[20%] left-0 w-full h-[1px] bg-neon-lime dashed"></div>
                <div className="absolute top-0 left-[10%] h-full w-[1px] bg-white dashed"></div>
                <div className="absolute top-0 right-[10%] h-full w-[1px] bg-white dashed"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <SectionTitle title="Skills" subtitle="Tech Stack" />
                </ScrollReveal>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Core Stats */}
                    <ScrollReveal animation="slide-right" delay={200} className="space-y-6">
                        <div className="bg-black/50 border border-white/10 p-6 clip-path-slant-right hover:border-neon-lime transition-colors group">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-gray-400 font-exo uppercase text-xs tracking-widest">GitHub Repos</h3>
                                <Activity className="text-neon-lime w-4 h-4" />
                            </div>
                            <div className="text-5xl font-orbitron font-bold text-white group-hover:text-neon-lime transition-colors">
                                6<span className="text-2xl align-top">+</span>
                            </div>
                            <div className="mt-4 h-1 w-full bg-gray-800">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "60%" }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="h-full bg-neon-lime animate-pulse"
                                ></motion.div>
                            </div>
                        </div>

                        <div className="bg-black/50 border border-white/10 p-6 clip-path-slant-right hover:border-neon-lime transition-colors group">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-gray-400 font-exo uppercase text-xs tracking-widest">Years Coding</h3>
                                <Zap className="text-neon-lime w-4 h-4" />
                            </div>
                            <div className="text-5xl font-orbitron font-bold text-white group-hover:text-neon-lime transition-colors">
                                2<span className="text-2xl align-top">+</span>
                            </div>
                            <div className="mt-4 h-1 w-full bg-gray-800">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "40%" }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="h-full bg-neon-lime"
                                ></motion.div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Center Column: Tech Stack Radar (Simulated with bars for CSS simplicity) */}
                    <ScrollReveal animation="fade-up" delay={400} className="lg:col-span-2 bg-black/30 border border-white/10 p-8 relative">
                        <div className="absolute top-0 right-0 p-2 bg-neon-lime text-black text-[10px] font-bold uppercase">System Active</div>

                        <h3 className="text-xl font-orbitron font-bold text-white uppercase mb-8">Technical Loadout</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Skill Group 1 */}
                            <div className="space-y-4">
                                <h4 className="text-neon-lime font-exo text-xs uppercase tracking-widest border-b border-white/10 pb-2 flex items-center gap-2">
                                    <Cpu size={14} /> Languages
                                </h4>
                                {[
                                    { name: 'Java', val: 90 },
                                    { name: 'Python', val: 85 },
                                    { name: 'JavaScript', val: 80 },
                                    { name: 'Dart', val: 75 }
                                ].map((s, i) => (
                                    <div key={s.name} className="group">
                                        <div className="flex justify-between text-xs text-gray-400 mb-1 font-exo uppercase">
                                            <span>{s.name}</span>
                                            <span>{s.val}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-800 skew-x-[-20deg]">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${s.val}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                viewport={{ once: true }}
                                                className="h-full bg-white group-hover:bg-neon-lime transition-colors duration-300"
                                            ></motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Skill Group 2 */}
                            <div className="space-y-4">
                                <h4 className="text-neon-lime font-exo text-xs uppercase tracking-widest border-b border-white/10 pb-2 flex items-center gap-2">
                                    <Globe size={14} /> Frameworks & Tools
                                </h4>
                                {[
                                    { name: 'Flutter', val: 85 },
                                    { name: 'React', val: 80 },
                                    { name: 'JavaFX', val: 90 },
                                    { name: 'Firebase', val: 70 }
                                ].map((s, i) => (
                                    <div key={s.name} className="group">
                                        <div className="flex justify-between text-xs text-gray-400 mb-1 font-exo uppercase">
                                            <span>{s.name}</span>
                                            <span>{s.val}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-800 skew-x-[-20deg]">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${s.val}%` }}
                                                transition={{ duration: 1, delay: 0.4 + (i * 0.1) }}
                                                viewport={{ once: true }}
                                                className="h-full bg-white group-hover:bg-neon-lime transition-colors duration-300"
                                            ></motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Telemetry;
