
import React from 'react';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import ScrollReveal from './ScrollReveal';
import { Camera, Gamepad2, Disc } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const OffTrack: React.FC = () => {
  const hobbies = [
    {
      id: 1,
      title: "Photography",
      icon: <Camera size={32} />,
      desc: "Capturing motion and moments.",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Sim Racing",
      icon: <Gamepad2 size={32} />,
      desc: "Pushing digital lap times.",
      image: "https://images.unsplash.com/photo-1547754980-3df97fed72a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Music",
      icon: <Disc size={32} />,
      desc: "Fuel for the coding sessions.",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id={SectionId.OFF_TRACK} className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionTitle title="Off Track" subtitle="Life Behind the Code" />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => (
            <ScrollReveal key={hobby.id} animation="fade-up" delay={index * 200}>
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1000}
                className="h-full"
              >
                <div className="group relative h-80 overflow-hidden border border-white/10 cursor-pointer">
                  <img
                    src={hobby.image}
                    alt={hobby.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-neon-lime mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {hobby.icon}
                      </div>
                      <h3 className="text-2xl font-orbitron font-bold text-white uppercase">{hobby.title}</h3>
                      <p className="text-gray-300 font-exo text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {hobby.desc}
                      </p>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-neon-lime border-l-[50px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </Tilt>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffTrack;
