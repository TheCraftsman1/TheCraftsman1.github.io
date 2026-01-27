
import React, { useState } from 'react';
import { SectionId, Project } from '../types';
import SectionTitle from './SectionTitle';
import ScrollReveal from './ScrollReveal';
import { X, ExternalLink, Github, ChevronRight } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { motion, AnimatePresence } from 'framer-motion';

const projects: Project[] = [
  {
    id: '1',
    title: 'EDUFAC',
    category: 'Mobile App',
    description: 'Student-Faculty File Sharing App built with Flutter.',
    fullDetails: 'EDUFAC streamlines communication between students and faculty. Features include real-time file sharing, notifications, and a secure login system. Built using Flutter for cross-platform compatibility and Firebase for the backend.',
    image: 'https://picsum.photos/800/600?random=1',
    tech: ['Flutter', 'Dart', 'Firebase']
  },
  {
    id: '2',
    title: 'SkyCast AI',
    category: 'AI System',
    description: 'AI-Based Weather Data Visualization System using JavaFX.',
    fullDetails: 'An advanced desktop application that visualizes historical weather data and predicts future trends using simple AI regression models. The UI is crafted with JavaFX for a responsive, modern desktop experience.',
    image: 'https://picsum.photos/800/600?random=2',
    tech: ['JavaFX', 'AI/ML', 'Java']
  },
  {
    id: '3',
    title: 'TollSim',
    category: 'Simulation',
    description: 'Toll Booth Simulation System with Java GUI.',
    fullDetails: 'A comprehensive simulation of toll plaza operations. It handles vehicle queuing, automatic fee calculation based on vehicle type, and statistical reporting. Features a custom Java Swing GUI.',
    image: 'https://picsum.photos/800/600?random=3',
    tech: ['Java', 'Swing', 'Algorithms']
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id={SectionId.PROJECTS} className="py-32 bg-carbon-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionTitle title="Grand Prix" subtitle="Featured Works" />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1000}
                className="h-full"
              >
                <div
                  onClick={() => setSelectedProject(project)}
                  className="group relative cursor-pointer h-full glass-panel overflow-hidden hover:border-neon-lime transition-all duration-500"
                >
                  {/* Image Container */}
                  <div className="overflow-hidden aspect-video relative">
                    <div className="absolute inset-0 bg-neon-lime/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                    />
                    {/* Overlay Badge */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-3 py-1 border-l-2 border-neon-lime">
                      <span className="text-xs text-white font-bold uppercase">{project.category}</span>
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="p-6 relative bg-gradient-to-b from-transparent to-black/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-neon-lime transition-colors uppercase">{project.title}</h3>
                        <div className="h-0.5 w-0 bg-neon-lime group-hover:w-full transition-all duration-500 mt-2"></div>
                      </div>
                      <ChevronRight className="text-gray-600 group-hover:text-neon-lime transition-colors transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-gray-400 font-exo text-sm mt-4 line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-neutral-900 border border-white/20 max-w-4xl w-full relative shadow-[0_0_100px_rgba(204,255,0,0.1)] flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-neon-lime hover:text-black transition-colors z-20"
              >
                <X size={24} />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent md:bg-gradient-to-r"></div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                <span className="text-neon-lime text-sm font-exo uppercase tracking-widest mb-2">{selectedProject.category}</span>
                <h2 className="text-4xl font-orbitron font-black text-white uppercase mb-6">{selectedProject.title}</h2>

                <p className="font-exo text-gray-300 leading-relaxed mb-8">
                  {selectedProject.fullDetails}
                </p>

                <div className="mb-auto">
                  <h4 className="text-xs uppercase text-gray-500 mb-4 font-bold tracking-wider">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="text-xs uppercase font-bold px-3 py-1.5 bg-white/5 text-white border border-white/10 hover:border-neon-lime transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
                  <button className="flex-1 bg-neon-lime text-black py-4 font-orbitron font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 clip-path-slant">
                    Launch <ExternalLink size={18} />
                  </button>
                  <button className="flex-1 bg-transparent border border-white/20 text-white py-4 font-orbitron font-bold uppercase hover:bg-white/10 transition-colors flex items-center justify-center gap-2 clip-path-slant">
                    Code <Github size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
