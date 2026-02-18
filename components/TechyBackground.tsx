import React, { memo } from 'react';

interface TechyBackgroundProps {
    variant?: 'circuit' | 'dots' | 'grid';
    className?: string;
    opacity?: number;
}

const TechyBackground: React.FC<TechyBackgroundProps> = memo(({
    variant = 'circuit',
    className = '',
    opacity = 0.3
}) => {
    if (variant === 'dots') {
        // Static dots - no animation
        return (
            <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-neon-lime"
                        style={{
                            left: `${(i * 10) % 100}%`,
                            top: `${(i * 13) % 100}%`,
                            opacity: opacity * 0.5,
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
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#techGrid)" />
                </svg>
            </div>
        );
    }

    // Default: circuit pattern - static SVG, no animations
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ opacity }}>
            <svg className="absolute w-full h-full" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="rgba(204,255,0,0.4)" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>

                {/* Static circuit lines */}
                <line x1="0%" y1="20%" x2="100%" y2="20%" stroke="url(#circuitGradient)" strokeWidth="1" strokeDasharray="20 40" />
                <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="url(#circuitGradient)" strokeWidth="1" strokeDasharray="15 35" />
                <line x1="0%" y1="80%" x2="100%" y2="80%" stroke="url(#circuitGradient)" strokeWidth="1" strokeDasharray="25 45" />

                {/* Static connection nodes */}
                <circle cx="25%" cy="20%" r="4" fill="rgba(204,255,0,0.4)" />
                <circle cx="75%" cy="50%" r="3" fill="rgba(0,240,255,0.4)" />
                <circle cx="50%" cy="80%" r="5" fill="rgba(204,255,0,0.3)" />
            </svg>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-neon-lime/20" />
            <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-neon-cyan/20" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-neon-cyan/20" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-neon-lime/20" />
        </div>
    );
});

export default TechyBackground;
