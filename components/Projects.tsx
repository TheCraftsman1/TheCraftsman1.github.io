
import React from 'react';
import { SectionId, Project } from '../types';
import SectionTitle from './SectionTitle';
import ScrollReveal from './ScrollReveal';
import HorizontalScrollProjects from './HorizontalScrollProjects';
import SectionWave from './SectionWave';

const projects: Project[] = [
  {
    id: '1',
    title: 'Vikify',
    category: 'Android App',
    description: 'Premium music streaming app with Spotify integration and offline mode.',
    fullDetails: 'Vikify is a feature-rich Android music player built with Kotlin and ExoPlayer. It features Spotify playlist import, YouTube music integration, synchronized lyrics, and a stunning dark-themed UI. The app uses Firebase for analytics and crash reporting, with smooth animations powered by Material Design 3.',
    caseStudy: {
      problem: 'Android users lacked a unified, visually premium local media player that could seamlessly cross-pollinate with modern streaming platforms like Spotify and YouTube without subscription paywalls.',
      architecture: 'Developed entirely in Kotlin utilizing the robust ExoPlayer API for zero-latency audio decoding. Designed a fluid Material Design 3 interface handling complex media states across foreground and background services, integrated with Firebase for telemetry.',
      metrics: ['Zero-latency ExoPlayer decoding', 'Material 3 dynamic theming integration', 'Live Spotify API synchronization']
    },
    image: '/projects/vikify.png',
    tech: ['Kotlin', 'ExoPlayer', 'Firebase', 'Spotify API'],
    github: 'https://github.com/TheCraftsman1/vikify'
  },
  {
    id: '2',
    title: 'Secure-AI-Pipeline',
    category: 'DevSecOps',
    description: 'Enterprise-grade CI/CD pipeline with integrated security scanning.',
    fullDetails: 'A comprehensive DevSecOps solution for AI/ML projects. Features automated SAST/DAST scanning, container security analysis, vulnerability trending, and compliance status monitoring. Built with TypeScript and integrated with GitHub Actions for seamless workflow automation.',
    caseStudy: {
      problem: 'AI Studio deployments lacked native continuous integration frameworks that could automatically vet large-language model (LLM) endpoints for injection vulnerabilities prior to production server rollouts.',
      architecture: 'Architected an automated DevSecOps backbone using Node.js and GitHub Actions. Integrated directly with the Gemini API to construct a modular, secure deployment pipeline that strictly manages API key handling and node environment variables via `.env.local` abstraction.',
      metrics: ['Automated Gemini API key handling', 'Seamless AI Studio app deployment', 'Integrated SAST/DAST vulnerability scanning']
    },
    image: '/projects/secure-pipeline.png',
    tech: ['TypeScript', 'Docker', 'GitHub Actions', 'Security'],
    github: 'https://github.com/TheCraftsman1/Secure-AI-pipeline'
  },
  {
    id: '3',
    title: 'Fake News Detector',
    category: 'AI/ML',
    description: 'Machine learning model to detect misinformation in news articles.',
    fullDetails: 'An NLP-powered fake news detection system using TensorFlow and BERT/RoBERTa models. The system analyzes article text for misinformation patterns, provides confidence scores, and tracks factuality trends across sources. Features a neural network attention visualization for interpretability.',
    caseStudy: {
      problem: 'Proliferating misinformation across text, images, and video required a unified, multimodal detection platform capable of real-time fact-checking without compromising user privacy or speed.',
      architecture: 'Engineered a highly advanced Multi-Modal Detection platform. Fine-tuned a RoBERTa language model on the FakeNewsNet dataset for NLP analysis, and deployed OpenCV YuNet alongside custom CNN frequency domain analysis for deepfake image/video detection. Processed asynchronously with intelligent caching.',
      metrics: ['95%+ Accuracy on NLP benchmark datasets', 'Sub-30 second multi-modal processing speed', '150,000+ News source integration via NewsAPI', 'OpenCV YuNet Deepfake Detection architecture']
    },
    image: '/projects/fake-news.png',
    tech: ['Python', 'TensorFlow', 'NLP', 'BERT'],
    github: 'https://github.com/TheCraftsman1/fake-news'
  }
];

const Projects: React.FC = () => {
  return (
    <section id={SectionId.PROJECTS} className="py-32 bg-carbon-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionTitle title="Work" subtitle="Featured Projects" />
        </ScrollReveal>

        {/* Horizontal Scroll Projects */}
        <div className="mt-16">
          <ScrollReveal>
            <HorizontalScrollProjects projects={projects} />
          </ScrollReveal>
        </div>
      </div>

      {/* Wave Transition */}
      <SectionWave position="bottom" fillColor="#121212" />
    </section>
  );
};

export default Projects;
