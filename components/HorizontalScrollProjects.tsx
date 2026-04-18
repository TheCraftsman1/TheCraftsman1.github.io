import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { X, ExternalLink, Github, ChevronRight, ChevronLeft, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface HorizontalScrollProjectsProps {
    projects: Project[];
}

// Premium 3D Card with mouse tracking
const ProjectCard: React.FC<{
    project: Project;
    index: number;
    onClick: () => void;
}> = ({ project, index, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

    const handleMouseMove = (e: React.MouseEvent) => {
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
        setIsHovered(false);
    };

    // Dynamic Glare Effect Logic
    const glareX = useTransform(x, [-0.5, 0.5], ['100%', '0%']);
    const glareY = useTransform(y, [-0.5, 0.5], ['100%', '0%']);
    const glareOpacity = useTransform(x, [-0.5, 0, 0.5], [0.1, 0.3, 0.1]);
    const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,${glareOpacity}) 0%, transparent 50%)`;

    return (
        <motion.div
            className="horizontal-scroll-item"
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
            style={{
                perspective: 1500,
            }}
        >
            <motion.div
                ref={cardRef}
                className="relative h-[480px] cursor-pointer group"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform', // Performance: hint to browser to GPU accelerate this
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
            >
                {/* Card container with glass effect */}
                <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500"
                    style={{
                        transform: 'translateZ(0)',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* Animated border gradient */}
                    <div className="absolute inset-0 rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: 'linear-gradient(135deg, #e5e5e5, #d4d4d4, #f5f5f5)',
                        }}
                    >
                        <div className="w-full h-full bg-white rounded-2xl" />
                    </div>

                    {/* Main card content */}
                    {/* Performance: Reduced blur radius from xl to md to save compositor thread overhead during 3D tilts */}
                    <div className="absolute inset-[1px] rounded-2xl bg-white border border-neutral-100 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
                        {/* Image section */}
                        <div className="relative h-56 overflow-hidden">
                            {/* Image */}
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                style={{
                                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                                    willChange: 'transform',
                                    transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            />

                            {/* Performance: Opacity overlay instead of CSS grayscale filter */}
                            <div
                                className="absolute inset-0 bg-white mix-blend-saturation transition-opacity duration-700 pointer-events-none"
                                style={{ opacity: isHovered ? 0 : 0.6 }}
                            />

                            {/* Gradient overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/50" />

                            {/* Animated shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent"
                                initial={{ x: '-100%' }}
                                animate={{ x: isHovered ? '100%' : '-100%' }}
                                transition={{ duration: 0.8, ease: 'easeInOut' }}
                            />

                            {/* Category badge */}
                            <div className="absolute top-4 left-4 z-20">
                                <motion.div
                                    className="relative overflow-hidden"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                >
                                    <div className="absolute inset-0 bg-neutral-100 blur-xl" />
                                    <span className="relative block px-4 py-1.5 bg-white/90 backdrop-blur-md border border-neutral-200 text-[10px] text-neutral-900 font-bold uppercase tracking-[0.2em]">
                                        {project.category}
                                    </span>
                                </motion.div>
                            </div>

                            {/* Hover overlay with arrow */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="w-16 h-16 rounded-full border-2 border-neutral-900/50 flex items-center justify-center"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{
                                        scale: isHovered ? 1 : 0,
                                        rotate: isHovered ? 0 : -180
                                    }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    <ArrowUpRight className="w-6 h-6 text-neutral-900" />
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Content section */}
                        <div className="p-6 relative" style={{ transform: 'translateZ(30px)' }}>
                            {/* Dynamic Interactive Sheen/Glare Overlay */}
                            {isHovered && (
                                <motion.div
                                    className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay"
                                    style={{
                                        background: glareBackground,
                                    }}
                                />
                            )}
                            {/* Title */}
                            <motion.h3
                                className="text-2xl font-orbitron font-bold text-neutral-900 uppercase tracking-wide mb-3"
                                style={{
                                    textShadow: isHovered ? '0 0 30px rgba(0,0,0,0.1)' : 'none',
                                    transition: 'text-shadow 0.3s ease',
                                }}
                            >
                                {project.title}
                            </motion.h3>

                            {/* Description */}
                            <p className="text-neutral-500 font-exo text-sm leading-relaxed line-clamp-2 mb-4">
                                {project.description}
                            </p>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-2">
                                {project.tech.slice(0, 3).map((t, i) => (
                                    <motion.span
                                        key={t}
                                        className="text-[10px] uppercase font-bold px-3 py-1.5 bg-neutral-50 text-neutral-600 border border-neutral-200 rounded-full"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + i * 0.05 }}
                                    >
                                        {t}
                                    </motion.span>
                                ))}
                                {project.tech.length > 3 && (
                                    <span className="text-[10px] uppercase font-bold px-3 py-1.5 text-gray-500">
                                        +{project.tech.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Bottom indicator */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-900"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.4 }}
                                style={{ transformOrigin: 'left' }}
                            />
                        </div>
                    </div>

                    {/* Floating particles on hover */}
                    <AnimatePresence>
                        {isHovered && (
                            <>
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 bg-neutral-900 rounded-full"
                                        initial={{
                                            opacity: 0,
                                            scale: 0,
                                            x: Math.random() * 400,
                                            y: Math.random() * 500,
                                        }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0, 1, 0],
                                            y: [Math.random() * 500, Math.random() * 500 - 50],
                                        }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                    />
                                ))}
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* Shadow */}
                <motion.div
                    className="absolute inset-0 rounded-2xl bg-neutral-900/10 blur-2xl -z-10"
                    style={{
                        transform: 'translateZ(-50px) translateY(20px)',
                        opacity: isHovered ? 0.3 : 0.1,
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

const HorizontalScrollProjects: React.FC<HorizontalScrollProjectsProps> = ({ projects }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const scrollAmount = direction === 'left' ? -450 : 450;
            containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="relative">
                {/* Navigation Arrows */}
                <AnimatePresence>
                    {canScrollLeft && (
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-black/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-neon-lime hover:text-black hover:border-neon-lime transition-all duration-300 hover:shadow-[0_0_30px_rgba(204,255,0,0.3)]"
                        >
                            <ChevronLeft size={24} />
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {canScrollRight && (
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-black/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-neon-lime hover:text-black hover:border-neon-lime transition-all duration-300 hover:shadow-[0_0_30px_rgba(204,255,0,0.3)]"
                        >
                            <ChevronRight size={24} />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Horizontal Scroll Container */}
                <div
                    ref={containerRef}
                    className="horizontal-scroll-container pb-8 pt-4"
                    onScroll={checkScroll}
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 100, opacity: 0 }}
                            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0, opacity: 1 }}
                            exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', y: -100, opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            className="bg-neutral-900 border border-white/10 max-w-5xl w-full relative overflow-hidden max-h-[90vh] rounded-2xl"
                            style={{ perspective: 1000 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <motion.button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 text-white bg-black/50 backdrop-blur-md p-3 rounded-full hover:bg-neon-lime hover:text-black transition-colors z-20 border border-white/10"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={24} />
                            </motion.button>

                            {/* Hero Image */}
                            <div className="w-full h-72 relative overflow-hidden">
                                <motion.img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />

                                {/* Title overlay */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <motion.span
                                        className="text-neon-lime text-sm font-exo uppercase tracking-[0.3em]"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {selectedProject.category}
                                    </motion.span>
                                    <motion.h2
                                        className="text-4xl md:text-5xl font-orbitron font-black text-white uppercase mt-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {selectedProject.title}
                                    </motion.h2>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 overflow-y-auto max-h-[calc(90vh-18rem)] rounded-b-2xl" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ccff00 transparent' }}>
                                {selectedProject.caseStudy ? (
                                    <div className="space-y-8 mb-8 font-exo">
                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                            <h4 className="text-neon-lime text-xs uppercase font-bold tracking-[0.2em] mb-3">The Problem</h4>
                                            <p className="leading-relaxed text-lg text-gray-300">{selectedProject.caseStudy.problem}</p>
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                                            <h4 className="text-neon-lime text-xs uppercase font-bold tracking-[0.2em] mb-3">Architecture & Solution</h4>
                                            <p className="leading-relaxed text-lg text-gray-300">{selectedProject.caseStudy.architecture}</p>
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                                            <h4 className="text-neon-lime text-xs uppercase font-bold tracking-[0.2em] mb-3">Key Metrics</h4>
                                            <ul className="list-disc pl-5 space-y-2 text-white/90 text-lg">
                                                {selectedProject.caseStudy.metrics.map((metric, idx) => (
                                                    <li key={idx} className="leading-relaxed">{metric}</li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </div>
                                ) : (
                                    <motion.p
                                        className="font-exo text-gray-300 leading-relaxed text-lg mb-8"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {selectedProject.fullDetails}
                                    </motion.p>
                                )}

                                {/* Tech Stack */}
                                <motion.div
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: selectedProject.caseStudy ? 0.7 : 0.5 }}
                                >
                                    <h4 className="text-xs uppercase text-gray-500 mb-4 font-bold tracking-wider">
                                        Tech Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedProject.tech.map((t, i) => (
                                            <motion.span
                                                key={t}
                                                className="text-sm uppercase font-bold px-4 py-2 bg-white/5 text-white border border-white/10 rounded-full hover:border-neon-lime hover:text-neon-lime transition-colors cursor-default"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: (selectedProject.caseStudy ? 0.7 : 0.5) + i * 0.05 }}
                                            >
                                                {t}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Links */}
                                <motion.div
                                    className="flex gap-4 pt-6 border-t border-white/10"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: selectedProject.caseStudy ? 0.8 : 0.6 }}
                                >
                                    {selectedProject.github && (
                                        <motion.a
                                            href={selectedProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-neon-lime text-black py-4 font-orbitron font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 rounded-lg"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            View Code <Github size={18} />
                                        </motion.a>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default HorizontalScrollProjects;
