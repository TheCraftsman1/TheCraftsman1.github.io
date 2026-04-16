
import React from 'react';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import ScrollReveal from './ScrollReveal';
import BentoGrid from './BentoGrid';
import SectionWave from './SectionWave';

const Telemetry: React.FC = () => {
    return (
        <section id={SectionId.SKILLS} className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200/70">
            {/* Wave Transition from Hero */}
            <SectionWave position="top" fillColor="#ffffff" />

            {/* Decorative Data Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-[10%] left-0 w-full h-[1px] bg-neon-lime dashed"></div>
                <div className="absolute bottom-[20%] left-0 w-full h-[1px] bg-neon-lime dashed"></div>
                <div className="absolute top-0 left-[10%] h-full w-[1px] bg-white dashed"></div>
                <div className="absolute top-0 right-[10%] h-full w-[1px] bg-white dashed"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <SectionTitle title="Skills" subtitle="Tech Stack" />
                </ScrollReveal>

                {/* Bento Grid Layout */}
                <div className="mt-16">
                    <ScrollReveal>
                        <BentoGrid />
                    </ScrollReveal>
                </div>
            </div>

            {/* Wave Transition to Contact */}
            <SectionWave position="bottom" fillColor="#f8fafc" />
        </section>
    );
};

export default Telemetry;
