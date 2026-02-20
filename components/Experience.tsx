import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
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
        organization: 'IARE',
        location: 'Hyderabad, India',
        date: '2024 - 2028',
        description: 'Pursuing Bachelor of Technology in Computer Science and Engineering with focus on software development, algorithms, and emerging technologies.',
        tags: ['Data Structures', 'Algorithms', 'Web Development'],
        icon: <GraduationCap className="w-5 h-5" />
    },
];

const TimelineItem: React.FC<{
    item: ExperienceItem;
    index: number;
    isLast: boolean;
}> = ({ item, index, isLast }) => {
    const isEven = index % 2 === 0;
    const cardRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    // Timeline Scroll Fill Animation
    const { scrollYProgress } = useScroll({
        target: lineRef,
        offset: ["start center", "end center"]
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // 3D Card Tilt Logistics
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} mb-12 last:mb-0`} ref={lineRef}>
            {/* Timeline base line */}
            {!isLast && (
                <div className="absolute left-1/2 top-12 w-[2px] h-full bg-white/5 -translate-x-1/2">
                    {/* Animated Fill Line */}
                    <motion.div
                        className="w-full bg-gradient-to-b from-neon-lime via-neon-cyan to-transparent"
                        style={{ height: lineHeight, originY: 0 }}
                    />
                </div>
            )}

            {/* Center dot */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                className={`absolute left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center
          ${item.type === 'work' ? 'bg-gradient-to-br from-cyan-500 to-blue-600' :
                        item.type === 'education' ? 'bg-gradient-to-br from-purple-500 to-pink-600' :
                            'bg-gradient-to-br from-neon-lime to-green-500'}
          shadow-[0_0_15px_rgba(0,0,0,0.5)] border-2 border-carbon-black`}
            >
                <span className="text-white">{item.icon}</span>
            </motion.div>

            {/* Content card Wrapper */}
            <div className={`w-[calc(50%-3rem)] ${isEven ? 'pr-8' : 'pl-8'} perspective-1000`}>
                {/* 3D Content Card */}
                <motion.div
                    ref={cardRef}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        willChange: 'transform',
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(0)' // GPU isolation
                    }}
                    className="relative group cursor-crosshair"
                >
                    <div className="glass-panel-2 p-6 rounded-xl hover:border-white/20 border border-white/5 transition-colors duration-300 relative overflow-hidden bg-white/[0.02] backdrop-blur-md">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3 relative z-10" style={{ transform: 'translateZ(20px)' }}>
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
                  ${item.type === 'work' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20' :
                                    item.type === 'education' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' :
                                        'bg-neon-lime/20 text-neon-lime border border-neon-lime/20'}`}>
                                {item.type.toUpperCase()}
                            </span>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3 relative z-10" style={{ transform: 'translateZ(10px)' }}>
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
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 relative z-10" style={{ transform: 'translateZ(10px)' }}>
                            {item.description}
                        </p>

                        {/* Tags */}
                        {item.tags && (
                            <div className="flex flex-wrap gap-2 relative z-10" style={{ transform: 'translateZ(15px)' }}>
                                {item.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] font-exo uppercase tracking-wider px-2 py-1 bg-white/5 text-gray-300 hover:text-white rounded border border-white/10 hover:border-white/30 transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Subtle Glowing Background layer */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-lime/0 to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                </motion.div>
            </div>

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
                            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
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
