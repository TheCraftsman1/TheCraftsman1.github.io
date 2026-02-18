import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxSectionProps {
    children: React.ReactNode;
    speed?: number;
    direction?: 'vertical' | 'horizontal';
    className?: string;
    offset?: number;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
    children,
    speed = 0.5,
    direction = 'vertical',
    className = '',
    offset = 0,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`start end`, `end start`],
    });

    // Transform based on direction
    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
    const x = useTransform(scrollYProgress, [0, 1], direction === 'horizontal' ? [50 * speed, -50 * speed] : [0, 0]);

    // Smooth out the animation
    const smoothY = useSpring(y, { damping: 20, stiffness: 100 });
    const smoothX = useSpring(x, { damping: 20, stiffness: 100 });

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div
                style={{
                    y: direction === 'vertical' ? smoothY : 0,
                    x: direction === 'horizontal' ? smoothX : 0,
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

// Sticky header with progress indicator
export const StickySectionHeader: React.FC<{
    title: string;
    progress: number;
}> = ({ title, progress }) => {
    return (
        <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-orbitron font-bold text-white uppercase">
                    {title}
                </h2>
                {/* Progress bar */}
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
                    <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-neon-lime"
                            style={{ width: `${progress * 100}%` }}
                        />
                    </div>
                    <span className="text-xs text-neon-lime font-bold">
                        {Math.round(progress * 100)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

// Parallax background layers
export const ParallaxBackground: React.FC<{
    layers: {
        speed: number;
        children: React.ReactNode;
        className?: string;
    }[];
}> = ({ layers }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {layers.map((layer, i) => (
                <ParallaxSection
                    key={i}
                    speed={layer.speed}
                    className={`absolute inset-0 ${layer.className || ''}`}
                >
                    {layer.children}
                </ParallaxSection>
            ))}
        </div>
    );
};

export default ParallaxSection;
