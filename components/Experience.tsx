import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import ScrollReveal from './ScrollReveal';
import { Calendar, MapPin, Building2, GraduationCap, Trophy, Code2 } from 'lucide-react';

interface ExperienceItem {
    id: string;
    type: 'work' | 'education' | 'achievement';
    title: string;
    organization: string;
    location: string;
    date: string;
    description: string;
    tags?: string[];
    icon: React.ReactNode;
}

const experiences: ExperienceItem[] = [
    {
        id: '1',
        type: 'education',
        title: 'B.Tech Computer Science',
        organization: 'VNR VJIET',
        location: 'Hyderabad, India',
        date: '2022 - 2026',
        description: 'Pursuing Bachelor of Technology in Computer Science and Engineering with focus on software development, algorithms, and emerging technologies.',
        tags: ['Data Structures', 'Algorithms', 'Web Development', 'AI/ML'],
        icon: <GraduationCap className="w-5 h-5" />
    },
    {
        id: '2',
        type: 'achievement',
        title: '20+ Projects Delivered',
        organization: 'Open Source & Personal',
        location: 'Remote',
        date: '2023 - Present',
        description: 'Built and shipped over 20 projects including mobile apps, web applications, DevOps pipelines, and AI/ML solutions.',
        tags: ['Full Stack', 'Mobile Dev', 'DevOps', 'AI/ML'],
        icon: <Trophy className="w-5 h-5" />
    },
    {
        id: '3',
        type: 'work',
        title: 'Freelance Developer',
        organization: 'Self-Employed',
        location: 'Remote',
        date: '2023 - Present',
        description: 'Delivering high-quality software solutions for clients worldwide. Specializing in React, Node.js, Flutter, and cloud technologies.',
        tags: ['React', 'Node.js', 'Flutter', 'AWS'],
        icon: <Code2 className="w-5 h-5" />
    },
    {
        id: '4',
        type: 'achievement',
        title: 'LeetCode Problem Solver',
        organization: 'LeetCode',
        location: 'Online',
        date: '2023 - Present',
        description: 'Solved 200+ algorithmic problems, strengthening problem-solving skills and deepening understanding of data structures.',
        tags: ['Algorithms', 'Problem Solving', 'DSA'],
        icon: <Trophy className="w-5 h-5" />
    }
];

const TimelineItem: React.FC<{
    item: ExperienceItem;
    index: number;
    isLast: boolean;
}> = ({ item, index, isLast }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} mb-12 last:mb-0`}>
            {/* Timeline line */}
            {!isLast && (
                <div className="absolute left-1/2 top-12 w-[2px] h-full bg-gradient-to-b from-neon-lime/50 via-neon-cyan/30 to-transparent -translate-x-1/2" />
            )}

            {/* Center dot */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: 'spring' }}
                className={`absolute left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center
          ${item.type === 'work' ? 'bg-gradient-to-br from-cyan-500 to-blue-600' :
                        item.type === 'education' ? 'bg-gradient-to-br from-purple-500 to-pink-600' :
                            'bg-gradient-to-br from-neon-lime to-green-500'}
          shadow-lg shadow-current/30`}
                style={{
                    boxShadow: item.type === 'achievement' ? '0 0 30px rgba(204, 255, 0, 0.3)' :
                        item.type === 'education' ? '0 0 30px rgba(168, 85, 247, 0.3)' :
                            '0 0 30px rgba(0, 240, 255, 0.3)'
                }}
            >
                <span className="text-white">{item.icon}</span>
            </motion.div>

            {/* Content card */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`w-[calc(50%-3rem)] ${isEven ? 'pr-8' : 'pl-8'}`}
            >
                <div className="glass-panel-2 p-6 rounded-xl hover:border-neon-lime/30 transition-all duration-300 group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-neon-lime transition-colors">
                                {item.title}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                <Building2 className="w-4 h-4" />
                                <span>{item.organization}</span>
                            </div>
                        </div>
                        <span className={`text-xs font-exo px-3 py-1 rounded-full
              ${item.type === 'work' ? 'bg-cyan-500/20 text-cyan-400' :
                                item.type === 'education' ? 'bg-purple-500/20 text-purple-400' :
                                    'bg-neon-lime/20 text-neon-lime'}`}>
                            {item.type.toUpperCase()}
                        </span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{item.location}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {item.description}
                    </p>

                    {/* Tags */}
                    {item.tags && (
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-exo uppercase tracking-wider px-2 py-1 bg-white/5 text-gray-400 rounded border border-white/10"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-lime/5 to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
            </motion.div>

            {/* Empty space for the other side */}
            <div className="w-[calc(50%-3rem)]" />
        </div>
    );
};

const Experience: React.FC = () => {
    return (
        <section id={SectionId.EXPERIENCE} className="py-32 bg-carbon-black relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]" />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-grid-pattern bg-[length:40px_40px]" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <SectionTitle title="Journey" subtitle="Experience & Education" />
                </ScrollReveal>

                {/* Timeline */}
                <div className="mt-20">
                    {experiences.map((item, index) => (
                        <TimelineItem
                            key={item.id}
                            item={item}
                            index={index}
                            isLast={index === experiences.length - 1}
                        />
                    ))}
                </div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { value: '20+', label: 'Projects' },
                        { value: '200+', label: 'DSA Problems' },
                        { value: '3+', label: 'Years Coding' },
                        { value: '∞', label: 'Cups of Coffee' }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="text-center p-6 glass-panel-2 rounded-xl"
                        >
                            <div className="text-4xl font-orbitron font-bold text-neon-lime mb-2">
                                {stat.value}
                            </div>
                            <div className="text-xs font-exo uppercase tracking-wider text-gray-500">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
