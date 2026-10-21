import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { EngineeringNote } from '../types';
import { playNoteExpand, playClickSnap, playHoverTick } from '../lib/sound';
import { TiltCard } from './ui/TiltCard';

const NOTES = [
  {
    id: 'note-1',
    tag: 'ANDROID 14+ RUNTIME & AUDIO',
    readTime: '3 min read',
    title: 'Decoupling Android Background Audio: Overcoming MediaSession Service Kills',
    summary: 'How isolating the ExoPlayer instance inside a foreground MediaSessionService prevented operating system audio thread termination during rapid UI destruction.',
    challenge: 'In modern Android (especially Android 13/14 battery optimization policies), binding an audio player directly to Activity lifecycles causes playback stutter or outright process termination when the user switches apps or enters battery-saver state. The system frequently kills unbound background threads.',
    solution: 'Engineered a standalone, decoupled MediaSessionService running as a Foreground Service with a persistent notification channel. Implemented MediaControllerCompat communication over IPC, passing only immutable command states rather than raw playback references. Combined this with Room DB audio metadata indexing to decouple playback state from UI recomposition.',
    takeaway: 'Never tie long-lived background audio state to the Android view tree. Treat audio playback as a headless daemon with an independent IPC controller bridge.',
    stack: ['Kotlin', 'Android SDK', 'ExoPlayer', 'MediaSessionService', 'Room DB'],
  },
  {
    id: 'note-2',
    tag: 'DEVSECOPS & SUPPLY CHAIN',
    readTime: '4 min read',
    title: 'Shifting Security Left: Constructing Zero-Trust Trivy Gating in CI/CD',
    summary: 'Eliminating false-positive blocking loops while guaranteeing zero critical vulnerabilities reach the public container registry.',
    challenge: 'Naive CI/CD vulnerability scanners frequently block pull requests on low-severity non-exploitable operating system packages in base Docker images. This creates deployment fatigue and tempts developers to bypass security policies altogether.',
    solution: 'Architected a two-tiered gating strategy in GitHub Actions. Tier 1 executes fast SAST linting and dependency tree checks on every commit. Tier 2 builds multi-stage minimal scratch/distroless Docker images and scans base layers using Trivy with a custom .trivyignore threshold for CVE CVSS scores >= 8.5. Successfully scanned images are cryptographically signed using Cosign prior to registry pushing.',
    takeaway: 'Effective DevSecOps is about developer velocity. Automated gates must distinguish between academic CVE warnings and actionable, exploitable production attack vectors.',
    stack: ['Docker', 'GitHub Actions', 'Trivy', 'Cosign', 'Bash', 'CI/CD'],
  },
  {
    id: 'note-3',
    tag: 'APPLIED AI & INTERPRETABILITY',
    readTime: '3 min read',
    title: 'Attention Weight Inspection: Auditing Transformer Misinformation Reasoning',
    summary: 'Extracting BERT multi-head self-attention tensors to verify whether the classifier is evaluating semantic coherence or overfitting on sensational keywords.',
    challenge: 'Deep learning classification models often achieve 95%+ validation accuracy on benchmark datasets simply by memorizing sensational buzzwords (e.g., "SHOCKING", "SECRET") rather than detecting real syntactic deception or factual inconsistency.',
    solution: 'Fine-tuned a transformer encoder (BERT/RoBERTa) with a custom classification head in PyTorch. Implemented hook registrations across the final transformer encoder layers to extract the 12 attention heads during inference. Computed normalized attention matrices across tokens to construct heat-maps, exposing whether high-confidence predictions were driven by semantic clauses or isolated tokens.',
    takeaway: 'Accuracy without interpretability is a liability in production ML. Inspecting attention distributions is mandatory for debugging feature collapse.',
    stack: ['Python', 'PyTorch', 'BERT', 'Transformers', 'FastAPI', 'NLP'],
  },
] satisfies readonly EngineeringNote[];

export const EngineeringNotes: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<EngineeringNote | null>(null);

  const handleOpenNote = (note: EngineeringNote) => {
    playNoteExpand();
    setSelectedNote(note);
  };

  const handleCloseNote = () => {
    playClickSnap();
    setSelectedNote(null);
  };

  return (
    <section
      className="relative w-full py-12 sm:py-20 border-t border-zinc-200/80 dark:border-white/10 overflow-hidden transition-colors duration-300 section-contained"
      id="notes"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12 border-b border-zinc-200/80 dark:border-white/10 pb-4 sm:pb-6">
          <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-['Montserrat',sans-serif]">
            Engineering Notes<span className="text-[#fba01d]">.</span>
          </h2>
        </div>

        {/* 3 Notes Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {NOTES.map((note) => (
            <TiltCard
              key={note.id}
              maxTilt={6}
              dataCursor="Read Note"
              onClick={() => handleOpenNote(note)}
              className="h-full"
            >
              <div
                onMouseEnter={playHoverTick}
                className="group relative flex flex-col justify-between h-full bg-white dark:bg-white/[0.025] dark:hover:bg-white/[0.055] backdrop-blur-2xl border border-zinc-200/80 hover:border-zinc-300 dark:border-white/[0.12] dark:hover:border-white/[0.28] rounded-xl sm:rounded-2xl p-4 sm:p-7 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.8)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.22)] cursor-pointer overflow-hidden item-contained"
              >
                {/* Top Specular Edge Highlight */}
                <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/35 to-transparent pointer-events-none z-20" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[9.5px] font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-widest text-[#fba01d] uppercase">
                      {note.tag}
                    </span>
                    <span className="text-[10px] font-['Plus_Jakarta_Sans',sans-serif] text-zinc-500 dark:text-neutral-400">
                      {note.readTime}
                    </span>
                  </div>

                  <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#fba01d] transition-colors mb-3 leading-snug">
                    {note.title}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-neutral-300 leading-relaxed mb-6 font-['Plus_Jakarta_Sans',sans-serif]">
                    {note.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200/60 dark:border-white/5 flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-['Plus_Jakarta_Sans',sans-serif] text-zinc-500 dark:text-neutral-400 font-semibold group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    Read Post-Mortem
                  </span>
                  <span className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-[#fba01d] text-zinc-800 hover:text-black dark:bg-white/[0.04] dark:hover:bg-[#fba01d] dark:text-white dark:hover:text-black border border-zinc-200/80 hover:border-[#fba01d] dark:border-white/15 dark:hover:border-[#fba01d] flex items-center justify-center transition-all duration-300 shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Full Post-Mortem Modal */}
        <AnimatePresence>
          {selectedNote && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-md"
              onClick={handleCloseNote}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#0c0c0e]/95 backdrop-blur-3xl border border-zinc-200 dark:border-white/[0.2] rounded-2xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.3)] text-left overflow-hidden"
              >
                {/* Top Specular Edge Highlight */}
                <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/50 to-transparent pointer-events-none z-20" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleCloseNote}
                  className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.1] text-zinc-500 hover:text-zinc-950 dark:text-neutral-400 dark:hover:text-white border border-zinc-200 dark:border-white/10 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-wider text-[#fba01d] uppercase">
                    {selectedNote.tag}
                  </span>
                  <span className="text-zinc-400 dark:text-neutral-400 font-['Plus_Jakarta_Sans',sans-serif] text-xs">·</span>
                  <span className="text-[10px] font-['Plus_Jakarta_Sans',sans-serif] text-zinc-500 dark:text-neutral-400">
                    {selectedNote.readTime}
                  </span>
                </div>

                <h3 className="font-['Montserrat',sans-serif] font-black text-xl sm:text-2xl text-zinc-900 dark:text-white mb-6 pr-8">
                  {selectedNote.title}
                </h3>

                {/* The Challenge */}
                <div className="mb-6 p-4 rounded-xl bg-red-500/[0.05] dark:bg-white/[0.02] border border-red-500/30 backdrop-blur-xl shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  <div className="flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1.5">
                    <AlertTriangle size={14} />
                    <span>The System Bottleneck / Challenge</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-neutral-300 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
                    {selectedNote.challenge}
                  </p>
                </div>

                {/* The Solution */}
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/[0.05] dark:bg-white/[0.02] border border-emerald-500/30 backdrop-blur-xl shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  <div className="flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1.5">
                    <CheckCircle2 size={14} />
                    <span>Architectural Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-neutral-300 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
                    {selectedNote.solution}
                  </p>
                </div>

                {/* The Takeaway */}
                <div className="mb-6 p-4 rounded-xl bg-amber-500/[0.05] dark:bg-white/[0.02] border border-amber-500/30 backdrop-blur-xl shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  <div className="flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-amber-600 dark:text-[#fba01d] uppercase tracking-wider mb-1.5">
                    <Lightbulb size={14} />
                    <span>Key Production Takeaway</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-neutral-300 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
                    {selectedNote.takeaway}
                  </p>
                </div>

                {/* Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-200/60 dark:border-white/10">
                  {selectedNote.stack.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-['Plus_Jakarta_Sans',sans-serif] px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/[0.05] text-zinc-800 dark:text-neutral-200 border border-zinc-200/80 dark:border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EngineeringNotes;
