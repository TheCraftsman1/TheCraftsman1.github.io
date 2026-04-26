import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { X, ExternalLink, ChevronRight, ChevronLeft, ArrowUpRight } from 'lucide-react';
import { Github } from './Github';
import { Project } from '../types';

interface HorizontalScrollProjectsProps {
    projects: Project[];
}

const METRIC_TOKEN_SPLIT = /(O\([^)]+\)|\b\d+(?:\.\d+)?%(?:\+)?|\b\d+(?:\.\d+)?s\b|\b\d+(?:\.\d+)?k\+?\b|\b\d{2,}\+\b|\bsub-\d+\s*second(?:s)?\b)/gi;
const METRIC_TOKEN_MATCH = /^(O\([^)]+\)|\d+(?:\.\d+)?%(?:\+)?|\d+(?:\.\d+)?s|\d+(?:\.\d+)?k\+?|\d{2,}\+|sub-\d+\s*second(?:s)?)$/i;

const renderMetricText = (text: string) =>
    text
        .split(METRIC_TOKEN_SPLIT)
        .filter(Boolean)
        .map((part, idx) =>
            METRIC_TOKEN_MATCH.test(part) ? (
                <span
                    key={`${part}-${idx}`}
                    className="font-mono text-cyan-200 bg-cyan-400/10 border border-cyan-400/20 rounded px-1.5 py-0.5"
                >
                    {part}
                </span>
            ) : (
                <span key={`${part}-${idx}`}>{part}</span>
            )
        );

const ProjectCard: React.FC<{
    project: Project;
    index: number;
    onClick: () => void;
}> = ({ project, index, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 90 });
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 90 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

    const glareX = useTransform(x, [-0.5, 0.5], ['90%', '10%']);
    const glareY = useTransform(y, [-0.5, 0.5], ['90%', '10%']);
    const glareOpacity = useTransform(x, [-0.5, 0, 0.5], [0.08, 0.2, 0.08]);
    const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(34,211,238,${glareOpacity}) 0%, transparent 55%)`;

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

    return (
        <motion.div
            className="horizontal-scroll-item"
            initial={{ opacity: 0, x: 60, rotateY: -8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
            style={{ perspective: 1400 }}
        >
            <motion.article
                ref={cardRef}
                className="relative h-[520px] cursor-pointer group"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
            >
                <div
                    className="relative h-full rounded-3xl overflow-hidden"
                    style={{ transform: 'translateZ(0)', transformStyle: 'preserve-3d' }}
                >
                    <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-cyan-300/60 via-white/20 to-amber-200/40 opacity-70">
                        <div className="h-full w-full rounded-3xl bg-[#0b1118]" />
                    </div>

                    <div
                        className="absolute inset-[1px] rounded-3xl border border-white/10 bg-[#0b1118] overflow-hidden"
                        style={{ transform: 'translateZ(0)' }}
                    >
                        <div className="relative h-56 overflow-hidden">
                            <motion.img
                                src={project.image}
                                alt={`${project.title} project proof`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                style={{
                                    transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                                    transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                                    willChange: 'transform',
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1118] via-[#0b1118]/50 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-amber-400/5" />

                            <div className="absolute top-4 left-4 z-20">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100">
                                    {project.category}
                                </span>
                            </div>

                            {project.caseStudy?.proofNote && (
                                <div className="absolute bottom-4 left-4 right-4 z-20">
                                    <span className="inline-block w-full truncate px-3 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-cyan-300/25 text-[10px] uppercase tracking-[0.14em] text-cyan-100 font-mono">
                                        Proof | {project.caseStudy.proofNote}
                                    </span>
                                </div>
                            )}

                            <motion.div
                                className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1px]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <motion.div
                                    className="w-14 h-14 rounded-full border border-cyan-200/60 bg-black/40 flex items-center justify-center"
                                    initial={{ scale: 0.6, opacity: 0 }}
                                    animate={{
                                        scale: isHovered ? 1 : 0.6,
                                        opacity: isHovered ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <ArrowUpRight className="w-5 h-5 text-cyan-100" />
                                </motion.div>
                            </motion.div>
                        </div>

                        <div className="relative p-6 h-[calc(100%-14rem)] flex flex-col" style={{ transform: 'translateZ(26px)' }}>
                            {isHovered && (
                                <motion.div
                                    className="absolute inset-0 pointer-events-none z-0 mix-blend-screen"
                                    style={{ background: glareBackground }}
                                />
                            )}

                            <div className="relative z-10 flex-1 flex flex-col">
                                <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wide mb-3 leading-tight">
                                    {project.title}
                                </h3>

                                <p className="text-neutral-300 font-exo text-sm leading-relaxed line-clamp-4 mb-5">
                                    {renderMetricText(project.description)}
                                </p>

                                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 pr-2 mb-5">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="shrink-0 text-[10px] uppercase font-bold px-3 py-1.5 bg-white/5 text-neutral-200 border border-white/15 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-2 mt-auto">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cyan-300/35 bg-cyan-300/10 text-cyan-100 text-[10px] uppercase tracking-[0.16em] font-bold hover:bg-cyan-300/20 transition-colors duration-300 pointer-events-auto"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Source Code {'{}'} <Github className="w-3.5 h-3.5" />
                                        </a>
                                    )}

                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/25 bg-white/10 text-white text-[10px] uppercase tracking-[0.16em] font-bold hover:bg-white/20 transition-colors duration-300 pointer-events-auto"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Live Demo <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    )}

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onClick();
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-200/35 bg-amber-200/10 text-amber-100 text-[10px] uppercase tracking-[0.16em] font-bold hover:bg-amber-200/20 transition-colors duration-300"
                                    >
                                        Open Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            <motion.div
                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-300 via-cyan-100 to-amber-200"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.35 }}
                                style={{ transformOrigin: 'left' }}
                            />
                        </div>
                    </div>
                </div>

                <motion.div
                    className="absolute inset-0 rounded-3xl bg-cyan-200/15 blur-2xl -z-10"
                    style={{
                        transform: 'translateZ(-50px) translateY(16px)',
                        opacity: isHovered ? 0.28 : 0.12,
                    }}
                />
            </motion.article>
        </motion.div>
    );
};

const HorizontalScrollProjects: React.FC<HorizontalScrollProjectsProps> = ({ projects }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        if (!containerRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setCanScrollLeft(scrollLeft > 4);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
    };

    useEffect(() => {
        checkScroll();
        const handleResize = () => checkScroll();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [projects.length]);

    const scroll = (direction: 'left' | 'right') => {
        if (!containerRef.current) return;

        const scrollAmount = direction === 'left' ? -460 : 460;
        containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <>
            <div className="relative">
                <AnimatePresence>
                    {canScrollLeft && (
                        <motion.button
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/70 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center hover:border-cyan-300/60 hover:text-cyan-100 transition-all duration-300"
                            aria-label="Scroll projects left"
                        >
                            <ChevronLeft size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {canScrollRight && (
                        <motion.button
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 16 }}
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/70 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center hover:border-cyan-300/60 hover:text-cyan-100 transition-all duration-300"
                            aria-label="Scroll projects right"
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>

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

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-[#0a1016] border border-white/10 max-w-5xl w-full relative overflow-hidden max-h-[90vh] rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-5 right-5 text-white bg-black/45 backdrop-blur-md p-2.5 rounded-full hover:bg-white hover:text-black transition-colors z-20 border border-white/15"
                                whileHover={{ scale: 1.06, rotate: 90 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Close project details"
                            >
                                <X size={20} />
                            </motion.button>

                            <div className="w-full h-72 relative overflow-hidden">
                                <motion.img
                                    src={selectedProject.image}
                                    alt={`${selectedProject.title} details`}
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.08 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1016] via-[#0a1016]/50 to-transparent" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <motion.span
                                        className="text-cyan-200 text-xs font-mono uppercase tracking-[0.2em]"
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {selectedProject.category}
                                    </motion.span>
                                    <motion.h2
                                        className="text-4xl md:text-5xl font-orbitron font-black text-white uppercase mt-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {selectedProject.title}
                                    </motion.h2>
                                </div>
                            </div>

                            <div className="p-8 overflow-y-auto max-h-[calc(90vh-18rem)] rounded-b-2xl" style={{ scrollbarWidth: 'thin', scrollbarColor: '#34d399 transparent' }}>
                                {selectedProject.caseStudy ? (
                                    <div className="space-y-8 mb-10 font-exo">
                                        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                                            <h4 className="text-cyan-200 text-[11px] uppercase font-bold tracking-[0.2em] mb-3">The Problem</h4>
                                            <p className="leading-relaxed text-lg text-neutral-300">{selectedProject.caseStudy.problem}</p>
                                        </motion.div>

                                        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                            <h4 className="text-cyan-200 text-[11px] uppercase font-bold tracking-[0.2em] mb-3">Architecture & Solution</h4>
                                            <p className="leading-relaxed text-lg text-neutral-300">{selectedProject.caseStudy.architecture}</p>
                                        </motion.div>

                                        {selectedProject.pipeline && (
                                            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
                                                <h4 className="text-cyan-200 text-[11px] uppercase font-bold tracking-[0.2em] mb-4">Pipeline Stages</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {selectedProject.pipeline.map((step, idx) => (
                                                        <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors group">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <span className="w-6 h-6 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-[10px] font-bold text-cyan-200 group-hover:bg-cyan-400/20 transition-colors">
                                                                    0{idx + 1}
                                                                </span>
                                                                <span className="text-sm font-bold text-white uppercase tracking-wider">{step.step}</span>
                                                            </div>
                                                            <p className="text-xs text-neutral-400 leading-relaxed font-exo">
                                                                {step.description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                                            <h4 className="text-cyan-200 text-[11px] uppercase font-bold tracking-[0.2em] mb-3">Key Metrics</h4>
                                            <ul className="list-disc pl-5 space-y-3 text-neutral-100 text-base">
                                                {selectedProject.caseStudy.metrics.map((metric, idx) => (
                                                    <li key={idx} className="leading-relaxed">{renderMetricText(metric)}</li>
                                                ))}
                                            </ul>
                                        </motion.div>

                                        {selectedProject.caseStudy.hardestPart && (
                                            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                                <h4 className="text-cyan-200 text-[11px] uppercase font-bold tracking-[0.2em] mb-3">The Biggest Challenge</h4>
                                                <p className="leading-relaxed text-base text-neutral-300">{selectedProject.caseStudy.hardestPart}</p>
                                            </motion.div>
                                        )}

                                        {selectedProject.caseStudy.proofNote && (
                                            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                                                <h4 className="text-cyan-200 text-[11px] uppercase font-bold tracking-[0.2em] mb-3">Proof Artifact</h4>
                                                <p className="font-mono text-sm text-cyan-100 bg-cyan-400/10 border border-cyan-400/20 rounded-lg px-4 py-3">
                                                    {selectedProject.caseStudy.proofNote}
                                                </p>
                                            </motion.div>
                                        )}
                                    </div>
                                ) : (
                                    <motion.p
                                        className="font-exo text-neutral-300 leading-relaxed text-lg mb-8"
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {selectedProject.fullDetails}
                                    </motion.p>
                                )}

                                <motion.div
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: selectedProject.caseStudy ? 0.5 : 0.2 }}
                                >
                                    <h4 className="text-[11px] uppercase text-neutral-500 mb-4 font-bold tracking-[0.2em]">
                                        Tech Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedProject.tech.map((tech, i) => (
                                            <motion.span
                                                key={tech}
                                                className="text-xs uppercase font-bold px-4 py-2 bg-white/5 text-neutral-100 border border-white/10 rounded-full"
                                                initial={{ opacity: 0, scale: 0.86 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: (selectedProject.caseStudy ? 0.5 : 0.2) + i * 0.04 }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="flex flex-wrap gap-3 pt-6 border-t border-white/10"
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: selectedProject.caseStudy ? 0.58 : 0.28 }}
                                >
                                    {selectedProject.github && (
                                        <motion.a
                                            href={selectedProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-300/15 border border-cyan-300/35 text-cyan-100 text-xs uppercase tracking-[0.16em] font-bold hover:bg-cyan-300/25 transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Source Code {'{}'} <Github size={16} />
                                        </motion.a>
                                    )}

                                    {selectedProject.liveUrl && (
                                        <motion.a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs uppercase tracking-[0.16em] font-bold hover:bg-white/20 transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Live Demo <ExternalLink size={16} />
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
