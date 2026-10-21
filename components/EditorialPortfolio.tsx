import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import Hero from './Hero';
import About from './About';
import EngineeringLab from './EngineeringLab';
import CapabilityStack from './CapabilityStack';
import EngineeringNotes from './EngineeringNotes';
import Footer from './Footer';
import { GlassFilter } from './ui/liquid-glass-button';
import GlassFolder from './ui/glass-folder-cards';
import ProjectDetailModal, { ProjectDetailData } from './ProjectDetailModal';
import { ProjectItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { projects } from '../data/projectsData';
import { playClickSnap, playHoverTick } from '../lib/sound';

interface EditorialPortfolioProps {
  onReplay?: () => void;
  onOpenProject?: (project: ProjectItem) => void;
}

const EditorialPortfolio: React.FC<EditorialPortfolioProps> = ({ onReplay, onOpenProject }) => {
  const { isDark } = useTheme();
  const [selectedProject, setSelectedProject] = useState<ProjectDetailData | null>(null);
  const [folderWidth, setFolderWidth] = useState<number>(340);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      return 'grid';
    }
    return 'carousel';
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateFolderWidth = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      if (w < 380) {
        setFolderWidth(260);
      } else if (w < 640) {
        setFolderWidth(280);
      } else if (w < 768) {
        setFolderWidth(305);
      } else {
        setFolderWidth(340);
      }
    };
    updateFolderWidth();
    window.addEventListener('resize', updateFolderWidth, { passive: true });
    return () => window.removeEventListener('resize', updateFolderWidth);
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const width = container.offsetWidth;
    if (width > 0) {
      const idx = Math.round(scrollLeft / width);
      if (idx >= 0 && idx < projects.length && idx !== activeIndex) {
        setActiveIndex(idx);
      }
    }
  };

  const scrollToIndex = (idx: number) => {
    if (!scrollContainerRef.current) return;
    playClickSnap();
    const container = scrollContainerRef.current;
    const target = idx * container.offsetWidth;
    container.scrollTo({ left: target, behavior: 'smooth' });
    setActiveIndex(idx);
  };

  const handlePrev = () => {
    const target = activeIndex > 0 ? activeIndex - 1 : projects.length - 1;
    scrollToIndex(target);
  };

  const handleNext = () => {
    const target = activeIndex < projects.length - 1 ? activeIndex + 1 : 0;
    scrollToIndex(target);
  };

  const handleOpenProject = (project: ProjectItem) => {
    if (onOpenProject) {
      onOpenProject(project);
      return;
    }
    setSelectedProject({
      id: project.id,
      number: project.number,
      name: project.name,
      tagline: project.tagline || project.type,
      category: project.category || project.type,
      year: project.year || '2025 — 2026',
      architecture: project.architecture,
      description: project.description,
      problem: project.problem || 'Legacy architectures suffer from high operational latency, brittle state recovery, and opaque execution patterns.',
      solution: project.solution || project.description,
      highlights: [...project.highlights],
      techStack: project.techStack ? [...project.techStack] : project.architecture.split(' · '),
      backgroundImage: project.backgroundImage || project.folderImage || project.image,
      metrics: project.detailedMetrics ? [...project.detailedMetrics] : undefined,
      systemStack: project.systemStack ? [...project.systemStack] : undefined,
      artifactBadge: project.artifactBadge,
      heroAspectRatio: project.heroAspectRatio || (project.id === 'vikify' ? 'mobile' : 'landscape'),
      href: project.href,
      slides: project.slides ? [...project.slides] : undefined,
      media: project.media ? [...project.media] : [{ type: 'image', url: project.image, caption: project.name }],
      files: project.files ? project.files.map(f => ({ name: f.name, meta: f.meta })) : undefined,
    });
  };

  return (
    <main className="w-full min-h-screen bg-[#FAFAFA] dark:bg-[#070707] text-zinc-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden selection:bg-[#fba01d] selection:text-black relative transition-colors duration-300" id="hero">
      {/* Full Hero */}
      <Hero onReplay={onReplay} />

      {/* Section 02: About Me */}
      <About />

      {/* Section 03: Selected Work Section */}
      <section className="relative w-full py-12 sm:py-20 border-t border-zinc-200/80 dark:border-white/10 overflow-hidden transition-colors duration-300 section-contained" id="work">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Section Header with View Mode Switcher */}
          <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10 border-b border-zinc-200/80 dark:border-white/10 pb-4 sm:pb-6">
            <div>
              <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-['Montserrat',sans-serif]">
                Selected Works<span className="text-[#fba01d]">.</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Desktop View Switcher: Slide View (1 at a time) vs Grid */}
              <div className="hidden md:flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/10 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-medium">
                <button
                  type="button"
                  onClick={() => {
                    playClickSnap();
                    setViewMode('carousel');
                  }}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === 'carousel'
                      ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-bold shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  <span>Slide View (1 at a time)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSnap();
                    setViewMode('grid');
                  }}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-bold shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  <LayoutGrid size={13} />
                  <span>Grid</span>
                </button>
              </div>

              {/* Status / Count Pill */}
              <span className="text-[11px] sm:text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-zinc-500 dark:text-neutral-400 tracking-wider">
                {viewMode === 'grid' ? `${projects.length} ARCHITECTURES` : `${activeIndex + 1} OF ${projects.length} ARCHITECTURES`}
              </span>
            </div>
          </div>

          {/* ================= VIEW 1: HORIZONTAL SCROLLING (ONE AT A TIME) ================= */}
          {/* Always active on mobile (< md), or on desktop when viewMode === 'carousel' */}
          <div className={`${viewMode === 'carousel' ? 'block' : 'block md:hidden'} w-full`}>
            {/* Carousel Navigation Header */}
            <div className="flex items-center justify-between gap-2 mb-2 px-1 sm:px-4">
              {/* Active Project Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/10 backdrop-blur-md shadow-xs">
                <span className="text-[10px] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#fba01d]">
                  {projects[activeIndex]?.number || '01'} ·
                </span>
                <span className="text-xs font-bold text-zinc-950 dark:text-white font-['Montserrat',sans-serif]">
                  {projects[activeIndex]?.name}
                </span>
                <span className="hidden xs:inline text-[9px] font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-zinc-500 dark:text-neutral-400 uppercase">
                  · {projects[activeIndex]?.type.split(' · ')[0]}
                </span>
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  onMouseEnter={playHoverTick}
                  aria-label="Previous project"
                  className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-white/[0.04] hover:bg-zinc-100 dark:hover:bg-white/[0.1] border border-zinc-200/80 dark:border-white/15 text-zinc-700 dark:text-neutral-300 hover:text-[#fba01d] transition-colors shadow-xs cursor-pointer active:scale-95"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  onMouseEnter={playHoverTick}
                  aria-label="Next project"
                  className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-white/[0.04] hover:bg-zinc-100 dark:hover:bg-white/[0.1] border border-zinc-200/80 dark:border-white/15 text-zinc-700 dark:text-neutral-300 hover:text-[#fba01d] transition-colors shadow-xs cursor-pointer active:scale-95"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Horizontal One-At-A-Time Snap Container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none items-center pt-4 sm:pt-6 pb-6 select-none scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.number}
                  className="min-w-full w-full shrink-0 flex flex-col items-center justify-center snap-center px-4"
                >
                  {/* Glass Folder centered 1 at a time */}
                  <div className="relative flex justify-center items-center">
                    <GlassFolder
                      width={folderWidth}
                      label={project.name}
                      meta={project.type.split(' · ')[1] || `${project.files?.length || 4} files`}
                      tone={isDark ? "dark" : "light"}
                      art={project.art}
                      seed={project.seed}
                      image={project.folderImage}
                      files={project.files ? [...project.files] : undefined}
                      action="arrow"
                      appearDelay={0}
                      onActionClick={() => handleOpenProject(project)}
                      onProjectOpen={() => handleOpenProject(project)}
                      onFileSelect={() => handleOpenProject(project)}
                    />
                  </div>

                  {/* Under-Card Micro Specs Pill */}
                  <div className="mt-4 flex flex-col items-center text-center max-w-sm px-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/10 backdrop-blur-md shadow-xs mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#fba01d]" />
                      <span className="text-[10px] font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-wider uppercase text-zinc-800 dark:text-neutral-200">
                        {project.category || project.type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-neutral-400 line-clamp-1 font-['Plus_Jakarta_Sans',sans-serif]">
                      {project.tagline || project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots & Navigation Status */}
            <div className="flex flex-col items-center justify-center mt-2 gap-2">
              <div className="flex items-center gap-2">
                {projects.map((p, i) => (
                  <button
                    key={p.number}
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to project ${p.name}`}
                    className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                      activeIndex === i
                        ? 'w-7 bg-[#fba01d] shadow-[0_0_8px_rgba(251,160,29,0.7)]'
                        : 'w-2 bg-zinc-300 dark:bg-white/20 hover:bg-zinc-400 dark:hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[9px] font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-neutral-500">
                ← SWIPE OR USE ARROWS →
              </span>
            </div>
          </div>

          {/* ================= VIEW 2: MULTI-COLUMN GRID ================= */}
          {/* Only shown on desktop when viewMode === 'grid' */}
          <div className={`${viewMode === 'grid' ? 'hidden md:grid' : 'hidden'} max-w-[1240px] mx-auto grid-cols-1 items-start justify-items-center gap-x-8 gap-y-12 sm:gap-x-10 sm:gap-y-14 md:grid-cols-2 xl:grid-cols-3 pt-4 sm:pt-6 pb-6 sm:pb-8`}>
            {projects.map((project, idx) => (
              <div key={project.number} className="flex flex-col items-center w-full">
                <GlassFolder
                  width={folderWidth}
                  label={project.name}
                  meta={project.type.split(' · ')[1] || `${project.files?.length || 4} files`}
                  tone={isDark ? "dark" : "light"}
                  art={project.art}
                  seed={project.seed}
                  image={project.folderImage}
                  files={project.files ? [...project.files] : undefined}
                  action="arrow"
                  appearDelay={idx * 80}
                  onActionClick={() => handleOpenProject(project)}
                  onProjectOpen={() => handleOpenProject(project)}
                  onFileSelect={() => handleOpenProject(project)}
                />
                {/* Under-Card Micro Specs Pill */}
                <div className="mt-4 flex flex-col items-center text-center max-w-sm px-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/10 backdrop-blur-md shadow-xs mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fba01d]" />
                    <span className="text-[10px] font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-wider uppercase text-zinc-800 dark:text-neutral-200">
                      {project.category || project.type}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-neutral-400 line-clamp-1 font-['Plus_Jakarta_Sans',sans-serif]">
                    {project.tagline || project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04: The Engineering Lab / Shipped Archive */}
      <EngineeringLab />

      {/* Section 05: Capability-Driven Tech Stack */}
      <CapabilityStack />

      {/* Section 06: Under the Hood Engineering Notes */}
      <EngineeringNotes />

      {/* Section 07: Contact & Credibility */}
      <Footer />
      <GlassFilter />

      {/* Big Floating Presentation Window (Fallback if opened without route) */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
};

export default EditorialPortfolio;
