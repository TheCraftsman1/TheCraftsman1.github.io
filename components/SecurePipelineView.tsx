import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PipelineStage {
  step: string;
  title: string;
  desc: string;
  image?: string;
  video?: string;
  terminalLines?: string[];
  statusTag?: string;
}

interface ProjectData {
  id: string;
  tag: string;
  title: string;
  intro: string;
  problem: string;
  architecture: string;
  pipeline: PipelineStage[];
}

interface SecurePipelineViewProps {
  project: ProjectData;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

/* ─── Animated terminal line effect ──────────────────────────── */
const TerminalBlock: React.FC<{ lines: string[]; isActive: boolean }> = ({ lines, isActive }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setVisibleCount(0);
      return;
    }
    setVisibleCount(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= lines.length) clearInterval(interval);
    }, 180);
    return () => clearInterval(interval);
  }, [isActive, lines.length]);

  return (
    <div className="bg-black/80 border border-emerald-500/20 rounded-xl p-5 font-mono text-[11px] md:text-xs leading-relaxed overflow-hidden backdrop-blur-sm max-h-[240px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#10b981 transparent' }}>
      {lines.slice(0, visibleCount).map((line, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
          className={
            line.startsWith('[PASS]') || line.startsWith('[OK]') || line.startsWith('✓')
              ? 'text-emerald-400'
              : line.startsWith('[WARN]') || line.startsWith('⚠')
                ? 'text-amber-400'
                : line.startsWith('[FAIL]') || line.startsWith('[CRIT]') || line.startsWith('✗')
                  ? 'text-red-400'
                  : line.startsWith('$') || line.startsWith('>')
                    ? 'text-cyan-300'
                    : 'text-emerald-200/70'
          }
        >
          {line}
        </motion.div>
      ))}
      {visibleCount < lines.length && (
        <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-1" />
      )}
    </div>
  );
};

/* ─── Pipeline Node (interactive clickable dot) ──────────────── */
const PipelineNode: React.FC<{
  stage: PipelineStage;
  index: number;
  isActive: boolean;
  isComplete: boolean;
  onClick: () => void;
}> = ({ stage, index, isActive, isComplete, onClick }) => (
  <button
    onClick={onClick}
    className={`relative group flex flex-col items-center gap-2 transition-all duration-500 focus:outline-none ${
      isActive ? 'scale-110' : 'scale-100 hover:scale-105'
    }`}
  >
    {/* Pulse ring */}
    {isActive && (
      <motion.div
        className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full border border-emerald-400/40"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    )}
    <div
      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-2 ${
        isActive
          ? 'bg-emerald-500 border-emerald-300 text-black shadow-[0_0_30px_rgba(16,185,129,0.5)]'
          : isComplete
            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
            : 'bg-white/5 border-white/15 text-white/40 group-hover:border-emerald-500/30 group-hover:text-emerald-300/60'
      }`}
    >
      {isComplete && !isActive ? '✓' : stage.step}
    </div>
    <span
      className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-300 ${
        isActive ? 'text-emerald-300' : 'text-white/30 group-hover:text-white/50'
      }`}
    >
      {stage.title}
    </span>
  </button>
);

/* ─── Status badge component ────────────────────────────────── */
const StatusBadge: React.FC<{ tag: string }> = ({ tag }) => {
  const color =
    tag === 'SECURED' || tag === 'PASSED'
      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
      : tag === 'SCANNING' || tag === 'ACTIVE'
        ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
        : 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300';

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border ${color}`}>
      {(tag === 'SCANNING' || tag === 'ACTIVE') && (
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      )}
      {(tag === 'SECURED' || tag === 'PASSED') && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      )}
      {tag}
    </span>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
/* ─── Lenis smooth scroll helper ──────────────────────────────── */
const smoothScrollTo = (el: HTMLElement) => {
  const lenis = (window as any).lenis;
  if (lenis) {
    lenis.scrollTo(el, { duration: 2, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

const SecurePipelineView: React.FC<SecurePipelineViewProps> = ({ project }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeStepRef = useRef(0);
  const isPlayingRef = useRef(false);
  const ticking = useRef(false);
  const autoPlayInterval = 6000;

  // Keep refs in sync with state
  useEffect(() => { activeStepRef.current = activeStep; }, [activeStep]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  const stages: PipelineStage[] = project.pipeline.map((s, i) => ({
    ...s,
    image: s.image || [
      '/projects/secure_pipeline/threat_modelling.png',
      '/projects/secure_pipeline/data_sanitization.png',
      '/projects/secure_pipeline/sast_scan.png',
      '/projects/secure_pipeline/adversarial_audit.png',
      '/projects/secure_pipeline/policy_gate.png',
      '/projects/secure_pipeline/secure_ingress.png',
    ][i],
    statusTag: s.statusTag || ['ANALYZED', 'SECURED', 'SCANNING', 'AUDITED', 'PASSED', 'ACTIVE'][i],
    terminalLines: s.terminalLines || [
      // Stage 1: Threat Modelling
      [
        '$ nexusbuild scan --mode=threat-model',
        '> Initializing attack surface mapper...',
        '> Enumerating model endpoints: 4 found',
        '> Scanning training data interfaces...',
        '[OK]  API Gateway: /v1/predict — TLS 1.3 enforced',
        '[OK]  API Gateway: /v1/batch — Rate limited (100 RPM)',
        '[WARN] Data Ingress: /upload — Missing input validation',
        '[OK]  Model Registry: Artifact signatures verified',
        '> Threat vectors identified: 3 HIGH, 1 MEDIUM',
        '✓ Threat model report generated → ./reports/threat_model.json',
      ],
      // Stage 2: Data Sanitization
      [
        '$ nexusbuild sanitize --dataset=training_v3',
        '> Loading dataset manifest (42,816 records)...',
        '> Running PII detector (regex + NER hybrid)...',
        '[PASS] Email patterns: 0 found in feature set',
        '[PASS] SSN patterns: 0 found in feature set',
        '[WARN] Phone numbers: 3 found → REDACTED',
        '> Poison detection: statistical outlier scan...',
        '[PASS] Distribution integrity: KL-div < 0.02',
        '[PASS] Label consistency: 99.7% agreement',
        '✓ Sanitized dataset written → /data/clean_v3.parquet',
      ],
      // Stage 3: SAST Scan
      [
        '$ nexusbuild sast --config=.security.yml',
        '> Scanning 847 files across 12 modules...',
        '> Engine: Semgrep + custom rules (47 active)',
        '[PASS] src/pipeline/deploy.ts — No findings',
        '[PASS] src/api/auth.ts — No findings',
        '[WARN] src/utils/crypto.ts:42 — Weak RNG seed (MEDIUM)',
        '[PASS] Dockerfile — No privilege escalation',
        '[PASS] .github/workflows/*.yml — Secrets masked',
        '> Coverage: 100% of CI/CD surface scanned',
        '✓ SAST report: 0 CRITICAL, 0 HIGH, 1 MEDIUM',
      ],
      // Stage 4: Adversarial Audit
      [
        '$ nexusbuild adversarial --model=prod_v2.1',
        '> Loading model weights (1.2GB)...',
        '> Running FGSM evasion attack (ε=0.03)...',
        '[PASS] Model accuracy under FGSM: 94.2% (baseline 96.1%)',
        '> Running PGD attack (steps=40, ε=0.01)...',
        '[PASS] Model accuracy under PGD: 92.8%',
        '> Running model inversion probe...',
        '[PASS] Reconstruction fidelity < 12% — SAFE',
        '[PASS] Membership inference AUC: 0.51 (near random)',
        '✓ Adversarial robustness: STRONG — all thresholds met',
      ],
      // Stage 5: Policy Gate
      [
        '$ nexusbuild policy --frameworks=GDPR,NIST',
        '> Evaluating 38 compliance controls...',
        '[PASS] GDPR Art.17 — Right to erasure: DELETE endpoint verified',
        '[PASS] GDPR Art.22 — Automated decisions: Explainability module active',
        '[PASS] NIST AI 100-1 — Bias metrics: Demographic parity Δ < 0.05',
        '[PASS] NIST AI 100-1 — Model card: All fields populated',
        '[PASS] Data retention: 90-day auto-purge configured',
        '[PASS] Audit trail: Immutable logging to S3 Glacier',
        '> Compliance score: 38/38 controls PASSED',
        '✓ Policy gate APPROVED — ready for production release',
      ],
      // Stage 6: Secure Ingress
      [
        '$ nexusbuild deploy --env=production --verify',
        '> Configuring API gateway ingress rules...',
        '[OK]  TLS termination: Let\'s Encrypt cert (expires 2026-11-14)',
        '[OK]  Rate limiting: 200 RPM per API key enforced',
        '[OK]  Auth: JWT + HMAC-SHA256 token validation',
        '[OK]  CORS: Allowlist restricted to 3 origins',
        '[OK]  WAF rules: SQL injection, XSS filters active',
        '[OK]  Health check: /healthz responding 200 (12ms)',
        '> Model endpoint: https://api.nexusbuild.ai/v1/predict',
        '✓ Deployment LIVE — all ingress checks passed',
      ],
    ][i],
  }));

  /* Auto-play timer */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          const next = (prev + 1) % stages.length;
          if (stageRefs.current[next]) {
            smoothScrollTo(stageRefs.current[next]!);
          }
          if (next === 0) {
            setIsPlaying(false);
            return prev;
          }
          return next;
        });
      }, autoPlayInterval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  /* Scroll tracking — registers ONCE, uses refs, throttled with rAF */
  useEffect(() => {
    const handleScroll = () => {
      if (isPlayingRef.current || ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        let detected = activeStepRef.current;
        for (let i = 0; i < stageRefs.current.length; i++) {
          const ref = stageRefs.current[i];
          if (ref) {
            const rect = ref.getBoundingClientRect();
            if (rect.top > 0 && rect.top < window.innerHeight * 0.6) {
              detected = i;
            }
          }
        }
        if (detected !== activeStepRef.current) {
          setActiveStep(detected);
        }
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // empty deps — registers once

  const goToStep = useCallback((index: number) => {
    setActiveStep(index);
    if (stageRefs.current[index]) smoothScrollTo(stageRefs.current[index]!);
  }, []);

  return (
    <div className="w-full relative overflow-hidden rounded-[3rem] px-6 lg:px-16 pt-24 pb-12 transition-all duration-700 bg-[#060d06] text-white shadow-2xl">
      {/* ── Immersive Background ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/projects/secure_pipeline/bg.png"
          alt="Background"
          className="w-full h-full object-cover opacity-75 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d06]/50 via-[#060d06]/30 to-[#060d06]/70" />
        {/* Multi-point radial glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_20%_30%,rgba(16,185,129,0.25),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_80%_20%,rgba(6,182,212,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_500px_at_50%_70%,rgba(16,185,129,0.12),transparent)]" />
        {/* Visible grid overlay */}
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(16,185,129,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.5)_1px,transparent_1px)] bg-[size:40px_40px]" />
        {/* Diagonal scan line effect */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:repeating-linear-gradient(135deg,rgba(16,185,129,0.8)_0px,transparent_2px,transparent_40px)]" />
      </div>

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="space-y-4">
            <motion.div variants={fadeInUp} className="flex items-center w-full">
              <div className="text-7xl md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter text-white leading-none">
                {project.id}
              </div>
              <div className="flex-1 h-px bg-emerald-500/20 mx-6 lg:mx-12 min-w-[50px]" />
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-emerald-400/60 whitespace-nowrap">
                {project.tag}
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] ml-[-0.05em] break-words drop-shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Play Presentation Button */}
          <motion.button
            variants={fadeInUp}
            onClick={() => {
              if (!isPlaying && activeStep === stages.length - 1) {
                setActiveStep(0);
                if (stageRefs.current[0]) smoothScrollTo(stageRefs.current[0]!);
              }
              setIsPlaying(!isPlaying);
            }}
            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all backdrop-blur-md ${
              isPlaying
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/20'
            }`}
          >
            {isPlaying ? (
              <>
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                STOP PIPELINE
              </>
            ) : (
              <>
                <span className="text-lg leading-none">▶</span>
                RUN PIPELINE
              </>
            )}
          </motion.button>
        </div>

        {/* ── Intro & Problem ── */}
        <motion.div variants={fadeInUp} className="max-w-4xl mb-20">
          <p className="text-2xl md:text-3xl text-white/80 font-light leading-snug mb-12">
            {project.intro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-emerald-300 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                THE PROBLEM
              </h2>
              <p className="text-base text-white/60 font-light leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-emerald-300 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                ARCHITECTURE
              </h2>
              <p className="text-base text-white/60 font-light leading-relaxed">
                {project.architecture}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Interactive Pipeline Flow (horizontal node diagram) ── */}
        <motion.div
          variants={fadeInUp}
          className="mb-20 bg-black/30 backdrop-blur-md border border-emerald-500/10 rounded-2xl p-6 md:p-8 overflow-x-auto"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#10b981 transparent' }}
        >
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-emerald-400/60 mb-8 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            PIPELINE EXECUTION STATUS
          </h2>
          <div className="flex items-start justify-between min-w-[600px] relative">
            {/* Connection line */}
            <div className="absolute top-5 md:top-6 left-[5%] right-[5%] h-[2px] bg-white/5 z-0" />
            <motion.div
              className="absolute top-5 md:top-6 left-[5%] h-[2px] bg-gradient-to-r from-emerald-500 to-emerald-400 z-0"
              animate={{ width: `${(activeStep / (stages.length - 1)) * 90}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            {stages.map((stage, i) => (
              <div key={stage.step} className="relative z-10">
                <PipelineNode
                  stage={stage}
                  index={i}
                  isActive={activeStep === i}
                  isComplete={i < activeStep}
                  onClick={() => goToStep(i)}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Stage Detail Sections ── */}
        <div className="space-y-24 lg:space-y-40 py-10 pb-32">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.step}
              ref={(el) => (stageRefs.current[index] = el)}
              initial={{ opacity: 0.3, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-20%' }}
              className={`transition-all duration-700 ${
                activeStep === index ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98]'
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                {/* Left Column: Text + Terminal */}
                <div
                  className={`flex-1 rounded-3xl p-8 lg:p-12 backdrop-blur-md border transition-all duration-500 w-full ${
                    activeStep === index
                      ? 'bg-emerald-950/30 border-emerald-500/40 shadow-[0_0_60px_-15px_rgba(16,185,129,0.35)]'
                      : 'bg-white/[0.02] border-white/5 shadow-sm'
                  }`}
                >
                  {/* Step badge & status */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-xl font-bold text-emerald-300">
                      {stage.step}
                    </div>
                    {stage.statusTag && <StatusBadge tag={stage.statusTag} />}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold tracking-[0.1em] text-white uppercase pr-8 mb-4">
                    {stage.title}
                  </h3>
                  <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light mb-8">
                    {stage.desc}
                  </p>

                  {/* Terminal Output */}
                  {stage.terminalLines && (
                    <TerminalBlock lines={stage.terminalLines} isActive={activeStep === index} />
                  )}
                </div>

                {/* Right Column: Stage Image */}
                <div className="w-full lg:w-[450px] shrink-0 relative flex justify-center items-center">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-700 pointer-events-none -z-10">
                    <span className="text-xs tracking-widest font-bold opacity-30">MEDIA NOT LOADED</span>
                  </div>

                  <AnimatePresence mode="wait">
                    {activeStep === index && (
                      <motion.div
                        key={`img-${stage.step}`}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full relative"
                      >
                        {/* Glow behind image */}
                        <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-3xl -z-10 scale-110" />
                        <img
                          src={stage.image}
                          alt={stage.title}
                          className="w-full h-auto max-h-[80vh] object-contain rounded-3xl border border-emerald-500/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footer / Security Summary Bar ── */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-between gap-6 pt-12 border-t border-emerald-500/10"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-300">All Stages Operational</span>
            </div>
            <span className="text-[10px] font-mono text-white/20 tracking-wider">
              NEXUSBUILD AI • NEURAL FABRICATION OS V4.0
            </span>
          </div>
          <div className="flex gap-3">
            {['GDPR', 'NIST', 'SOC2'].map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-[0.15em] text-white/40"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SecurePipelineView;
