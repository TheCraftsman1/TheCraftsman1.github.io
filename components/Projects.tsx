
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
