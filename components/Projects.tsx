import React from 'react';
import { SectionId, Project } from '../types';
import SectionTitle from './SectionTitle';
import ScrollReveal from './ScrollReveal';
import HorizontalScrollProjects from './HorizontalScrollProjects';

const projects: Project[] = [
  {
    id: '0',
    title: 'Vikify',
    category: 'Android Systems',
    description: 'Reduced playback startup lag to near-instant and stabilized offline sessions by engineering an ExoPlayer state machine with Room-backed indexing.',
    fullDetails: 'Vikify is a Kotlin Android music player focused on real playback reliability. It handles offline libraries, queue persistence, synchronized lyrics, and Spotify playlist import with deterministic playback state restoration.',
    image: '/vikify.png',
    tech: ['Kotlin', 'ExoPlayer', 'Firebase', 'Spotify API', 'Room DB'],
    github: 'https://github.com/TheCraftsman1/vikify',
    pipeline: [
      { step: 'Dependency Bridge', description: 'Mediating between service and UI lifecycles.' },
      { step: 'Metadata Hydration', description: 'Async loading of album art and lyrics.' },
      { step: 'ExoPlayer Engine', description: 'Unidirectional playback control logic.' },
      { step: 'Room Persistence', description: 'Caching queue and library snapshots.' },
      { step: 'Deterministic Sync', description: 'Service-to-client queue reconciliation.' },
      { step: 'Offline Fallback', description: 'Graceful restoration during network loss.' }
    ]
  },
  {
    id: '1',
    title: 'Secure AI Pipeline',
    category: 'DevSecOps',
    description: 'Reduced deployment time by 40% and eliminated manual vulnerability checks by engineering an automated DevSecOps pipeline using Docker and GitHub Actions.',
    fullDetails: 'A policy-driven CI/CD pipeline for AI services with layered SAST/DAST checks, container scanning, and artifact-level reporting. Every stage emits auditable outputs so security review can happen during delivery, not after release.',
    image: '/projects/secure_pipeline.png',
    tech: ['TypeScript', 'Docker', 'GitHub Actions', 'Security', 'Node.js'],
    github: 'https://github.com/TheCraftsman1/Secure-AI-pipeline',
    pipeline: [
      { step: 'Threat Modelling', description: 'Attack surface analysis for model and data.' },
      { step: 'Data Sanitization', description: 'Poisoning protection and PII filtering.' },
      { step: 'SAST Scan', description: 'Automated security testing of CI/CD scripts.' },
      { step: 'Adversarial Audit', description: 'Evasion and inversion robustness testing.' },
      { step: 'Policy Gate', description: 'Automated compliance checks (GDPR/NIST).' },
      { step: 'Secure Ingress', description: 'Verified, rate-limited model endpoints.' }
    ]
  },
  {
    id: '2',
    title: 'Fake News Detector',
    category: 'ML + Vision',
    description: 'Improved misinformation classification to 95%+ benchmark accuracy and reduced inference wait time to sub-30 seconds by combining fine-tuned RoBERTa scoring with OpenCV-assisted media checks.',
    fullDetails: 'A multi-modal misinformation analysis engine that blends NLP confidence scoring with visual signal inspection. The pipeline uses asynchronous workers, cached model artifacts, and confidence calibration to keep throughput high while preserving interpretability.',
    image: '/projects/fake_news.png',
    tech: ['Python', 'TensorFlow', 'NLP', 'BERT', 'OpenCV'],
    github: 'https://github.com/TheCraftsman1/fake-news',
    pipeline: [
      { step: 'Source Scraping', description: 'Multi-source news and metadata collection.' },
      { step: 'NLP Encoding', description: 'Vectorization with fine-tuned RoBERTa.' },
      { step: 'Vision Analysis', description: 'Media manipulation checks via OpenCV.' },
      { step: 'Modality Fusion', description: 'Cross-referencing text and visual signals.' },
      { step: 'Confidence Rating', description: 'Weighted veracity scoring (0-100%).' },
      { step: 'Interpretability', description: 'Generating attention maps for verdict logic.' }
    ]
  },
  {
    id: '3',
    title: 'AirMap.viki',
    category: 'Full Stack AI',
    description: 'Engineered a highly optimized Python backend utilizing FastAPI and edge-tts, serving a responsive React frontend mapping real-time AQI.',
    fullDetails: 'An AI-powered Eco-Assistant app that provides real-time Air Quality Index (AQI) tracking, interactive environmental maps, and voice-enabled AI assistance to help users make eco-friendly and health-conscious decisions.',
    image: '/projects/airmap_viki.png',
    tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'Ollama', 'Google Maps'],
    github: 'https://github.com/TheCraftsman1/slam_project',
    pipeline: [
      { step: 'IoT Ingestion', description: 'Real-time AQI data from global sensors.' },
      { step: 'Kriging Analytics', description: 'Interpolation for unmonitored locations.' },
      { step: 'Geo-Rendering', description: 'Multi-layered React mapping of trends.' },
      { step: 'Intent Parsing', description: 'Voice query extraction for eco-concerns.' },
      { step: 'LLM Synthesis', description: 'Local AI advice generation via Ollama.' },
      { step: 'TTS Feedback', description: 'Low-latency voice alerts for health safety.' }
    ]
  }
];

interface ProjectsProps {
  setCurrentView: React.Dispatch<React.SetStateAction<'home' | 'work'>>;
}

const Projects: React.FC<ProjectsProps> = ({ setCurrentView }) => {
  return (
    <section id={SectionId.PROJECTS} className="min-h-[100dvh] flex flex-col justify-center py-20 bg-neutral-50 dark:bg-[#050b12] relative overflow-hidden border-t border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white transition-colors duration-500">
      
      {/* Light Mode Radiants */}
      <div className="absolute inset-0 pointer-events-none opacity-100 dark:opacity-0 bg-[radial-gradient(1100px_600px_at_20%_-10%,rgba(34,211,238,0.08),transparent),radial-gradient(900px_520px_at_95%_10%,rgba(251,191,36,0.06),transparent)] transition-opacity duration-500" />
      
      {/* Dark Mode Radiants */}
      <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 bg-[radial-gradient(1100px_600px_at_20%_-10%,rgba(34,211,238,0.14),transparent),radial-gradient(900px_520px_at_95%_10%,rgba(251,191,36,0.1),transparent)] transition-opacity duration-500" />
      
      {/* Light Mode Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-100 dark:opacity-0 [background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:48px_48px] transition-opacity duration-500" />
      
      {/* Dark Mode Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] transition-opacity duration-500" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-16">
            <div>
              <SectionTitle title="Proof of Work" subtitle="Engineering Case Studies" />
              <p className="mt-6 max-w-2xl text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors duration-500">
                Real build artifacts, measurable outcomes, and the hardest engineering trade-offs behind each system.
              </p>
          </div>
          <button
            onClick={() => {
              setCurrentView('work');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
              className="text-neutral-600 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-200 transition-colors duration-300 uppercase tracking-widest text-sm font-semibold flex items-center gap-2 group"
          >
              View All Work
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
          </button>
        </div>
        </ScrollReveal>

        {/* Horizontal Scroll Projects */}
        <div className="mt-16">
          <ScrollReveal>
            <HorizontalScrollProjects projects={projects} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Projects;
