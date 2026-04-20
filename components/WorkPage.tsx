import React from 'react';
import { motion } from 'framer-motion';

const projectsData = [
  {
    id: '01',
    tag: '2025 • LEAD ANDROID DEVELOPER',
    title: 'VIKIFY',
    intro: 'Reduced playback startup lag to near-instant with Room-backed indexing.',
    problem: 'Typical mobile players had fragile queue recovery and inconsistent offline behavior after process death or background service interruptions.',
    architecture: 'Built a Kotlin playback engine around ExoPlayer with a unidirectional state model, Room persistence for queue/library snapshots, and deterministic service-to-UI reconciliation.',
    pipeline: [
      { step: '1', title: 'DEPENDENCY BRIDGE', desc: 'Mediating between service and UI lifecycles.' },
      { step: '2', title: 'METADATA HYDRATION', desc: 'Async loading of album art and lyrics.' },
      { step: '3', title: 'EXOPLAYER ENGINE', desc: 'Unidirectional playback control logic.' },
      { step: '4', title: 'ROOM PERSISTENCE', desc: 'Caching queue and library snapshots.' }
    ]
  },
  {
    id: '02',
    tag: '2026 • DEVSECOPS ENGINEER',
    title: 'SECURE AI PIPELINE',
    intro: 'Policy-driven DevSecOps for AI artifact provenance.',
    problem: 'Manual release checks for AI endpoints were slow and inconsistent, creating security blind spots and delayed deployments.',
    architecture: 'Engineered a modular GitHub Actions pipeline with Dockerized scan stages, secrets isolation, policy gates, and typed TypeScript scripts for report aggregation and failure routing.',
    pipeline: [
      { step: '1', title: 'THREAT MODELLING', desc: 'Attack surface analysis for model and data.' },
      { step: '2', title: 'DATA SANITIZATION', desc: 'Poisoning protection and PII filtering.' },
      { step: '3', title: 'SAST SCAN', desc: 'Automated security testing of CI/CD scripts.' },
      { step: '4', title: 'ADVERSARIAL AUDIT', desc: 'Evasion and inversion robustness testing.' },
      { step: '5', title: 'POLICY GATE', desc: 'Automated compliance checks (GDPR/NIST).' },
      { step: '6', title: 'SECURE INGRESS', desc: 'Verified, rate-limited model endpoints.' }
    ]
  },
  {
    id: '03',
    tag: '2025 • AI RESEARCHER',
    title: 'FAKE NEWS DETECTOR',
    intro: 'Multi-modal NLP misinformation detection engine.',
    problem: 'Single-modality classifiers missed misinformation cues when text claims and media evidence diverged.',
    architecture: 'Fine-tuned RoBERTa on labeled corpora, added OpenCV feature extraction for media validation, and orchestrated both via an async scoring pipeline with confidence fusion.',
    pipeline: [
      { step: '1', title: 'SOURCE SCRAPING', desc: 'Multi-source news and metadata collection.' },
      { step: '2', title: 'NLP ENCODING', desc: 'Vectorization with fine-tuned RoBERTa.' },
      { step: '3', title: 'VISION ANALYSIS', desc: 'Media manipulation checks via OpenCV.' },
      { step: '4', title: 'MODALITY FUSION', desc: 'Cross-referencing text and visual signals.' },
      { step: '5', title: 'CONFIDENCE RATING', desc: 'Weighted veracity scoring (0-100%).' },
      { step: '6', title: 'INTERPRETABILITY', desc: 'Generating attention maps for verdict logic.' }
    ]
  },
  {
    id: '04',
    tag: '2026 • FULL STACK ENGINEER',
    title: 'AIRMAP.VIKI',
    intro: 'AI-powered environmental tracking and eco-assistance.',
    problem: 'Existing environmental tracking apps lacked conversational AI capabilities, making it difficult for users to interpret complex AQI data and receive immediate, personalized eco-advice.',
    architecture: 'Built a responsive React frontend integrating Google Maps for real-time visualization. Engineered a highly optimized Python backend utilizing FastAPI, edge-tts for voice synthesis, and local LLM integration via Ollama for offline fallback capabilities.',
    pipeline: [
      { step: '1', title: 'IOT INGESTION', desc: 'Real-time AQI data from global sensors.' },
      { step: '2', title: 'KRIGING ANALYTICS', desc: 'Interpolation for unmonitored locations.' },
      { step: '3', title: 'GEO-RENDERING', desc: 'Multi-layered React mapping of trends.' },
      { step: '4', title: 'INTENT PARSING', desc: 'Voice query extraction for eco-concerns.' },
      { step: '5', title: 'LLM SYNTHESIS', desc: 'Local AI advice generation via Ollama.' },
      { step: '6', title: 'TTS FEEDBACK', desc: 'Low-latency voice alerts for health safety.' }
    ]
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

interface WorkPageProps {
  setCurrentView: React.Dispatch<React.SetStateAction<'home' | 'work'>>;
}

const WorkPage: React.FC<WorkPageProps> = ({ setCurrentView }) => {
  return (
    <section className="min-h-screen bg-white font-sans text-neutral-900 pb-40 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-12 md:pt-16">
        
        {/* Back Link to Projects completely replacing VK Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-24 lg:mb-40 flex items-center"
        >
          <button 
            onClick={() => {
              setCurrentView('home');
              setTimeout(() => {
                const element = document.getElementById('projects');
                if (element) {
                   const lenis = (window as any).lenis;
                   if (lenis) {
                     lenis.scrollTo(element, { offset: 0, duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                   } else {
                     element.scrollIntoView({ behavior: 'smooth' });
                   }
                }
              }, 100);
            }}
            className="group flex flex-col items-start gap-1 focus:outline-none"
          >
             <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-900 transition-colors">
               <span className="text-lg leading-none transform group-hover:-translate-x-1 transition-transform">&larr;</span> 
               BACK TO PROJECTS
             </span>
             <div className="h-[1px] w-0 bg-neutral-900 group-hover:w-full transition-all duration-500 ease-out"></div>
          </button>
        </motion.div>

        <div className="space-y-40 md:space-y-64 lg:space-y-[28rem]">
          {projectsData.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-32 lg:space-y-48"
            >
              {/* Main Hero Section */}
              <div className="space-y-12 lg:space-y-20">
                {/* Index, Line & Tag Row */}
                <motion.div variants={fadeInUp} className="flex items-center w-full">
                  <div className="text-7xl md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter text-neutral-900 leading-none">
                    {project.id}
                  </div>
                  <div className="flex-1 h-px bg-neutral-200 mx-6 lg:mx-12" />
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 whitespace-nowrap">
                    {project.tag}
                  </div>
                </motion.div>

                {/* Massive Project Title & Intro Text */}
                <motion.div variants={fadeInUp} className="space-y-8 lg:space-y-12 pt-8">
                  <h1 className="text-5xl sm:text-6xl md:text-[8rem] lg:text-[12rem] font-black uppercase tracking-tighter text-neutral-900 leading-[0.85] ml-[-0.05em] break-words">
                    {project.title}
                  </h1>
                  <p className="text-2xl md:text-3xl lg:text-[2.5rem] text-neutral-600 font-light leading-snug lg:leading-[1.3] max-w-5xl">
                    {project.intro}
                  </p>
                </motion.div>
              </div>

              {/* Text Sections: Problem & Architecture */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 w-full">
                <motion.div variants={fadeInUp}>
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-8 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    THE PROBLEM
                  </h2>
                  <p className="text-lg md:text-xl lg:text-[1.35rem] text-neutral-500 font-light leading-relaxed">
                    {project.problem}
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-8 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    ARCHITECTURE
                  </h2>
                  <p className="text-lg md:text-xl lg:text-[1.35rem] text-neutral-500 font-light leading-relaxed">
                    {project.architecture}
                  </p>
                </motion.div>
              </div>

              {/* Pipeline Stages Component */}
              {project.pipeline && project.pipeline.length > 0 && (
                <motion.div variants={fadeInUp} className="w-full">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-12 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    PIPELINE STAGES
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {project.pipeline.map((stage) => (
                      <motion.div 
                        key={stage.step}
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-2xl border border-neutral-100 shadow-sm shadow-black/5 p-8 lg:p-10 flex flex-col sm:flex-row gap-6 md:gap-8 items-start transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:border-neutral-200"
                      >
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center text-sm lg:text-base font-bold text-neutral-900 shrink-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                          {stage.step}
                        </div>
                        <div className="space-y-3 pt-1">
                          <h3 className="text-sm font-bold tracking-[0.15em] text-neutral-900 uppercase">
                            {stage.title}
                          </h3>
                          <p className="text-[14px] lg:text-[15px] text-neutral-500 leading-relaxed font-light">
                            {stage.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkPage;
