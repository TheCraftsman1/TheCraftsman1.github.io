import React from 'react';
import { motion } from 'framer-motion';

interface TechyBackgroundProps {
    variant?: 'circuit' | 'dots' | 'grid';
    className?: string;
    opacity?: number;
}

const TechyBackground: React.FC<TechyBackgroundProps> = ({
    variant = 'circuit',
    className = '',
    opacity = 0.3
}) => {
    if (variant === 'dots') {
        return (
            <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
                {/* Floating dots pattern */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-neon-lime"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: opacity * (0.3 + Math.random() * 0.7),
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [opacity * 0.3, opacity, opacity * 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
        );
    }

    if (variant === 'grid') {
        return (
            <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
                <svg className="w-full h-full" style={{ opacity }}>
                    <defs>
                        <pattern id="techGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(204,255,0,0.1)" strokeWidth="1" />
                            <circle cx="0" cy="0" r="2" fill="rgba(204,255,0,0.2)" className="animate-circuit" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#techGrid)" />
                </svg>
            </div>
        );
    }

    // Default: circuit pattern
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ opacity }}>
            {/* Animated circuit lines */}
            <svg className="absolute w-full h-full" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="rgba(204,255,0,0.6)" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>

                {/* Horizontal circuit lines */}
                <motion.line
                    x1="0%"
                    y1="20%"
                    x2="100%"
                    y2="20%"
                    stroke="url(#circuitGradient)"
                    strokeWidth="1"
                    strokeDasharray="20 40"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -60 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.line
                    x1="0%"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    stroke="url(#circuitGradient)"
                    strokeWidth="1"
                    strokeDasharray="15 35"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: 50 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.line
                    x1="0%"
                    y1="80%"
                    x2="100%"
                    y2="80%"
                    stroke="url(#circuitGradient)"
                    strokeWidth="1"
                    strokeDasharray="25 45"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -70 }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Connection nodes */}
                <motion.circle
                    cx="25%"
                    cy="20%"
                    r="4"
                    fill="rgba(204,255,0,0.5)"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle
                    cx="75%"
                    cy="50%"
                    r="3"
                    fill="rgba(0,240,255,0.5)"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.circle
                    cx="50%"
                    cy="80%"
                    r="5"
                    fill="rgba(204,255,0,0.4)"
                    animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
            </svg>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-neon-lime/20" />
            <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-neon-cyan/20" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-neon-cyan/20" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-neon-lime/20" />
        </div>
    );
};

export default TechyBackground;
