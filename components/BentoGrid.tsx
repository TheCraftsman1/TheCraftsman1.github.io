import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Globe, Zap, Code, Terminal, Cloud } from 'lucide-react';

interface BentoItem {
    id: string;
    title: string;
    value?: string;
    subtitle?: string;
    icon?: React.ReactNode;
    size?: 'default' | 'wide' | 'tall' | 'large';
    skills?: { name: string; value: number }[];
}

const bentoItems: BentoItem[] = [
    {
        id: 'repos',
        title: 'GitHub Repos',
        value: '6+',
        subtitle: 'Active projects',
        icon: <Activity className="w-5 h-5" />,
        size: 'default',
    },
    {
        id: 'years',
        title: 'Years Coding',
        value: '2+',
        subtitle: 'Experience',
        icon: <Zap className="w-5 h-5" />,
        size: 'default',
    },
    {
        id: 'languages',
        title: 'Languages',
        size: 'wide',
        skills: [
            { name: 'Java', value: 90 },
            { name: 'Python', value: 85 },
            { name: 'JavaScript', value: 80 },
            { name: 'Dart', value: 75 },
        ],
    },
    {
        id: 'frameworks',
        title: 'Frameworks',
        size: 'tall',
        skills: [
            { name: 'Flutter', value: 85 },
            { name: 'React', value: 80 },
            { name: 'JavaFX', value: 90 },
            { name: 'Firebase', value: 70 },
            { name: 'Node.js', value: 75 },
        ],
    },
    {
        id: 'tools',
        title: 'Tools',
        size: 'tall',
        skills: [
            { name: 'Docker', value: 80 },
            { name: 'Git', value: 85 },
            { name: 'AWS', value: 65 },
            { name: 'Figma', value: 70 },
        ],
    },
    {
        id: 'special',
        title: 'Specializations',
        size: 'wide',
        icon: <Cpu className="w-6 h-6" />,
        subtitle: 'Full-Stack Dev • AI/ML • DevOps',
    },
];

const BentoGrid: React.FC = () => {
    return (
        <div className="bento-grid">
            {bentoItems.map((item, index) => {
                const sizeClass = item.size === 'large' ? 'bento-card-large' :
                    item.size === 'wide' ? 'bento-card-wide' :
                        item.size === 'tall' ? 'bento-card-tall' : '';

                return (
                    <motion.div
                        key={item.id}
                        className={`bento-card group ${sizeClass} relative glass-panel-2 overflow-hidden border border-slate-200 hover:border-sky-300 transition-all duration-500`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ delay: index * 0.1, duration: 0.6, type: 'spring', stiffness: 50 }}
                        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                    >
                        {/* Background subtle noise/glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-100/40 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_120%,rgba(14,165,233,0.15),transparent_50%)] transition-opacity duration-500 pointer-events-none" />
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <h3 className="text-slate-500 font-exo text-xs uppercase tracking-widest font-bold">
                                {item.title}
                            </h3>
                            {item.icon && (
                                <motion.span
                                    className="text-sky-500 p-2 rounded-lg bg-sky-50 border border-sky-200"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    {item.icon}
                                </motion.span>
                            )}
                        </div>

                        {/* Value Display */}
                        {item.value && (
                            <div className="mb-2">
                                <span className="text-5xl font-orbitron font-bold text-slate-900 group-hover:text-sky-500 transition-colors">
                                    {item.value}
                                </span>
                                {item.subtitle && (
                                    <p className="text-slate-500 text-sm mt-1">{item.subtitle}</p>
                                )}
                            </div>
                        )}

                        {/* Subtitle Only */}
                        {item.subtitle && !item.value && !item.skills && (
                            <p className="text-slate-600 font-exo">{item.subtitle}</p>
                        )}

                        {/* Skills Bars */}
                        {item.skills && (
                            <div className="space-y-3 mt-4">
                                {item.skills.map((skill, idx) => (
                                    <div key={skill.name} className="group/skill">
                                        <div className="flex justify-between text-xs text-slate-500 mb-1 font-exo uppercase">
                                            <span>{skill.name}</span>
                                            <span>{skill.value}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300 relative">
                                            {/* Glow track under the fill */}
                                            <div className="absolute inset-0 bg-sky-100/60 opacity-0 group-hover/skill:opacity-100 transition-opacity" />
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.value}%` }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 1,
                                                    delay: index * 0.1 + idx * 0.1,
                                                    ease: [0.22, 1, 0.36, 1] // Custom easeOut Quint
                                                }}
                                                className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 shadow-[0_0_10px_rgba(14,165,233,0.35)] relative"
                                            >
                                                {/* Leading edge highlight */}
                                                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
                                            </motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                            <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-sky-400/60 to-transparent" />
                            <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-sky-400/60 to-transparent" />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default BentoGrid;
