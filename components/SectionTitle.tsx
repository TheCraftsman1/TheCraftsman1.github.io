import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-start border-l-4 border-gradient-to-b from-cyan-400 to-purple-600 pl-6 py-2" style={{ borderImage: 'linear-gradient(to bottom, #00ffd5, #7c7cff) 1' }}>
      <span className="text-gradient-cyan-purple font-exo font-bold uppercase tracking-[0.2em] text-sm mb-1">{subtitle}</span>
      <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white uppercase tracking-tighter">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;