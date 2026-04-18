import React, { useRef, useState, useEffect } from 'react';
import { Project } from '../types';
import SectionTitle from './SectionTitle';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Github, ArrowUpRight, Code2, Cpu, Globe2, Smartphone } from 'lucide-react';

const projects: Project[] = [
  {
    id: '1',
    title: 'Vikify',
    tagline: 'Premium audio decoding & Spotify synchronization.',
    category: 'Android App',
    year: '2025',
    color: '#f59e0b', // amber
    role: 'Lead Android Developer',
    description: 'Premium music streaming app with Spotify integration and offline mode.',
    fullDetails: 'Vikify is a feature-rich Android music player built with Kotlin and ExoPlayer. It features Spotify playlist import, YouTube music integration, synchronized lyrics, and a stunning dark-themed UI. The app uses Firebase for analytics and crash reporting, with smooth animations powered by Material Design 3.',
    caseStudy: {
      problem: 'Android users lacked a unified, visually premium local media player that could seamlessly cross-pollinate with modern streaming platforms like Spotify and YouTube without subscription paywalls.',
      architecture: 'Developed entirely in Kotlin utilizing the robust ExoPlayer API for zero-latency audio decoding. Designed a fluid Material Design 3 interface handling complex media states across foreground and background services, integrated with Firebase for telemetry.',
      metrics: ['Zero-latency decoding', 'Material 3 integration', 'Live Spotify Sync']
    },
    image: '/projects/vikify.png',
    tech: ['Kotlin', 'ExoPlayer', 'Firebase', 'Spotify API'],
    github: 'https://github.com/TheCraftsman1/vikify'
  },
  {
    id: '2',
    title: 'AirMap.viki',
    tagline: 'AI-powered environmental tracking and eco-assistance.',
    category: 'Full Stack AI',
    year: '2026',
    color: '#0ea5e9', // sky blue
    role: 'Full Stack Engineer',
    description: 'An AI-powered Eco-Assistant app providing real-time AQI tracking and voice-enabled interactions.',
    fullDetails: 'An AI-powered Eco-Assistant app that provides real-time Air Quality Index (AQI) tracking, interactive environmental maps, and voice-enabled AI assistance to help users make eco-friendly and health-conscious decisions.',
    caseStudy: {
      problem: 'Existing environmental tracking apps lacked conversational AI capabilities, making it difficult for users to interpret complex AQI data and receive immediate, personalized eco-advice.',
      architecture: 'Built a responsive React frontend integrating Google Maps for real-time visualization. Engineered a highly optimized Python backend utilizing FastAPI, edge-tts for voice synthesis, and local LLM integration via Ollama for offline fallback capabilities.',
      metrics: ['Real-time React mapping', 'Local LLM integration', 'Voice-enabled AI']
    },
    image: '/projects/airmap.png',
    tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'Ollama', 'Google Maps'],
    github: 'https://github.com/TheCraftsman1/slam_project'
  },
  {
    id: '3',
    title: 'Secure-Pipeline',
    tagline: 'Enterprise-grade DevSecOps with integrated scanning.',
    category: 'DevSecOps',
    year: '2026',
    color: '#10b981', // emerald
    role: 'DevSecOps Engineer',
    description: 'Enterprise-grade CI/CD pipeline with integrated security scanning.',
    fullDetails: 'A comprehensive DevSecOps solution for AI/ML projects. Features automated SAST/DAST scanning, container security analysis, vulnerability trending, and compliance status monitoring.',
    caseStudy: {
      problem: 'AI Studio deployments lacked native continuous integration frameworks that could automatically vet large-language model (LLM) endpoints for injection vulnerabilities prior to production server rollouts.',
      architecture: 'Architected an automated DevSecOps backbone using Node.js and GitHub Actions. Integrated directly with the Gemini API to construct a modular, secure deployment pipeline that strictly manages API key handling and node environment variables via `.env.local` abstraction.',
      metrics: ['Automated Key Handling', 'AI App Deployment', 'SAST/DAST Scanning']
    },
    image: '/projects/secure-pipeline.png',
    tech: ['TypeScript', 'Docker', 'GitHub Actions', 'Security'],
    github: 'https://github.com/TheCraftsman1/Secure-AI-pipeline'
  },
  {
    id: '4',
    title: 'Fake News Detector',
    tagline: 'Multi-modal NLP misinformation detection engine.',
    category: 'Machine Learning',
    year: '2025',
    color: '#8b5cf6', // violet
    role: 'AI Researcher',
    description: 'Machine learning model to detect misinformation in news articles.',
    fullDetails: 'An NLP-powered fake news detection system using TensorFlow and BERT/RoBERTa models.',
    caseStudy: {
      problem: 'Proliferating misinformation across text, images, and video required a unified, multimodal detection platform capable of real-time fact-checking without compromising user privacy or speed.',
      architecture: 'Engineered a highly advanced Multi-Modal Detection platform. Fine-tuned a RoBERTa language model on the FakeNewsNet dataset for NLP analysis, and deployed OpenCV YuNet alongside custom CNN frequency domain analysis for deepfake image/video detection.',
      metrics: ['95%+ NLP Accuracy', '<30s Processing', '150k+ Integrations']
    },
    image: '/projects/fake-news.png',
    tech: ['Python', 'TensorFlow', 'NLP', 'BERT'],
    github: 'https://github.com/TheCraftsman1/fake-news'
  }
];

const CategoryIcon = ({ category, className, style }: { category: string, className?: string, style?: React.CSSProperties }) => {
  if (category.includes('Android')) return <Smartphone className={className} style={style} />;
  if (category.includes('AI') || category.includes('Machine')) return <Cpu className={className} style={style} />;
  if (category.includes('DevSecOps')) return <Globe2 className={className} style={style} />;
  return <Code2 className={className} style={style} />;
};

const ProjectBlock = ({ project, index, isEven }: { project: Project; index: number; isEven: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20%", once: true });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} id={`work-${project.id}`} className="relative py-24 border-t border-neutral-100 first:border-0 scroll-mt-24">
      <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Image Side (Hero Parallax) */}
        <motion.div 
          className="w-full lg:w-1/2 relative"
          initial={{ opacity: 0, x: isEven ? 60 : -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 60 : -60 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Accent decoration */}
          <div className="absolute -inset-4 md:-inset-6 border border-neutral-200 rounded-[2.5rem] bg-white -z-10 transition-colors duration-500" />
          
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm shadow-neutral-200 group">
            <motion.img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover origin-center"
              style={{ y, scale: 1.05 }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-500" />
            
            {/* Category Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-neutral-200">
              <CategoryIcon category={project.category} className="w-4 h-4" style={{ color: project.color }} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-900">{project.category}</span>
            </div>
            
            {/* Hover Action */}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-500 ease-out">
                  <ArrowUpRight className="w-6 h-6 text-neutral-900" />
                </div>
              </a>
            )}
          </div>
        </motion.div>

        {/* Content Side */}
        <div className="w-full lg:w-1/2 space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl md:text-5xl font-black text-neutral-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                0{index + 1}
              </span>
              <div className="h-[2px] w-12" style={{ backgroundColor: project.color }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">{project.year} • {project.role}</span>
            </div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 uppercase tracking-tight leading-[1] mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              {project.title}
            </h3>
            <p className="text-xl md:text-2xl text-neutral-600 font-light leading-snug">
              {project.tagline}
            </p>
          </motion.div>

          {/* Case Study Details */}
          {project.caseStudy && (
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 mb-3 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  The Problem
                </h4>
                <p className="text-neutral-500 leading-relaxed font-light">{project.caseStudy.problem}</p>
              </div>
              
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 mb-3 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  Architecture
                </h4>
                <p className="text-neutral-500 leading-relaxed font-light">{project.caseStudy.architecture}</p>
              </div>

              {/* Advanced Metrics / Highlights grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {project.caseStudy.metrics.map((metric, i) => (
                  <div key={i} className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl">
                    <div className="text-sm font-bold text-neutral-900 leading-tight">
                      {metric}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tech Stack & Links */}
          <motion.div 
            className="pt-6 border-t border-neutral-100"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map(t => (
                <span key={t} className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider bg-white border border-neutral-200 text-neutral-500 rounded-xl shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all cursor-default">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-neutral-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center gap-3 button-shine shadow-xl shadow-neutral-900/20 hover:shadow-neutral-900/40 hover:-translate-y-1"
                >
                  <Github className="w-4 h-4" /> View Source
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white border border-neutral-200 text-neutral-900 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-neutral-50 transition-all flex items-center gap-3"
                >
                  <Globe2 className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

const WorkPage: React.FC = () => {
  const [activeProject, setActiveProject] = useState('1');

  useEffect(() => {
    // Reset scroll to top when mounting
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const sections = projects.map(p => document.getElementById(`work-${p.id}`));
      let current = '1';
      sections.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section.id.replace('work-', '');
          }
        }
      });
      setActiveProject(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(`work-${id}`);
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: -100, duration: 1.2 });
      } else {
        const top = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-white pt-32 pb-40 relative"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-neutral-50 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24 lg:mb-32">
          <SectionTitle title="Case Studies" subtitle="Deep Dive Projects" number="0" />
          
          <motion.div
            className="flex items-baseline gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tighter" style={{ fontFamily: "'Syne', sans-serif" }}>04</span>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400">Case Studies</span>
          </motion.div>
        </div>

        {/* Sticky Sidebar Navigation (Desktop only) */}
        <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-20 h-auto pointer-events-none">
          <div className="flex flex-col gap-6 pointer-events-auto">
            {projects.map((p, i) => (
              <button 
                key={p.id}
                onClick={() => scrollTo(p.id)}
                className="group flex flex-col items-center gap-2"
              >
                <div 
                  className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${activeProject === p.id ? 'scale-125 border-neutral-900 bg-neutral-900' : 'border-neutral-300 bg-white group-hover:border-neutral-500'}`}
                />
                <span className={`text-[9px] font-bold uppercase tracking-widest ${activeProject === p.id ? 'text-zinc-100' : 'text-neutral-400'} opacity-0 group-hover:opacity-100 transition-opacity absolute left-6 whitespace-nowrap`}>
                  {p.title}
                </span>
                {i < projects.length - 1 && (
                  <div className={`w-[1px] h-12 mt-2 transition-colors duration-300 ${activeProject === p.id ? 'bg-neutral-200' : 'bg-zinc-900'}`} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-16 pl-0 lg:pl-16">
          {projects.map((project, index) => (
            <ProjectBlock 
              key={project.id} 
              project={project} 
              index={index} 
              isEven={index % 2 !== 0} 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkPage;
