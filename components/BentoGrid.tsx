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
                        className={`bento-card group ${sizeClass}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-400 font-exo text-xs uppercase tracking-widest">
                                {item.title}
                            </h3>
                            {item.icon && (
                                <span className="text-neon-lime group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </span>
                            )}
                        </div>

                        {/* Value Display */}
                        {item.value && (
                            <div className="mb-2">
                                <span className="text-5xl font-orbitron font-bold text-white group-hover:text-neon-lime transition-colors">
                                    {item.value}
                                </span>
                                {item.subtitle && (
                                    <p className="text-gray-500 text-sm mt-1">{item.subtitle}</p>
                                )}
                            </div>
                        )}

                        {/* Subtitle Only */}
                        {item.subtitle && !item.value && !item.skills && (
                            <p className="text-gray-400 font-exo">{item.subtitle}</p>
                        )}

                        {/* Skills Bars */}
                        {item.skills && (
                            <div className="space-y-3 mt-4">
                                {item.skills.map((skill, idx) => (
                                    <div key={skill.name} className="group/skill">
                                        <div className="flex justify-between text-xs text-gray-400 mb-1 font-exo uppercase">
                                            <span>{skill.name}</span>
                                            <span>{skill.value}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.value}%` }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: index * 0.1 + idx * 0.1,
                                                    ease: 'easeOut'
                                                }}
                                                className="h-full bg-gradient-to-r from-neon-lime to-cyan-400 group-hover/skill:shadow-[0_0_10px_rgba(204,255,0,0.5)] transition-shadow"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                            <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-neon-lime/50 to-transparent" />
                            <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-neon-lime/50 to-transparent" />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default BentoGrid;
