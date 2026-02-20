import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StageSpotlightProps {
    isOn: boolean;
    intensity?: number;
    className?: string;
}

const StageSpotlight: React.FC<StageSpotlightProps> = ({
    isOn,
    intensity = 1,
    className = '',
}) => {
    const [flickerIntensity, setFlickerIntensity] = useState(1);
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);

    // Subtle flicker for realism
    useEffect(() => {
        if (!isOn) return;

        const flickerAnimation = (timestamp: number) => {
            if (timestamp - lastTimeRef.current > 100) {
                const baseFlicker = 0.97 + Math.random() * 0.06;
                setFlickerIntensity(baseFlicker);
                lastTimeRef.current = timestamp;
            }
            animationRef.current = requestAnimationFrame(flickerAnimation);
        };

        animationRef.current = requestAnimationFrame(flickerAnimation);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isOn]);

    const currentIntensity = intensity * flickerIntensity;

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
            {/* Simple elegant spotlight cone */}
            <AnimatePresence>
                {isOn && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentIntensity }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="absolute inset-0"
                    >
                        {/* Main light cone - clean and focused */}
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 origin-top"
                            style={{
                                width: '280px',
                                height: '100%',
                                background: `
                  linear-gradient(
                    180deg,
                    rgba(255, 245, 230, 0.95) 0%,
                    rgba(255, 235, 200, 0.7) 8%,
                    rgba(255, 220, 170, 0.4) 20%,
                    rgba(255, 200, 140, 0.15) 40%,
                    transparent 60%
                  )
                `,
                                clipPath: 'polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)',
                                filter: 'blur(1px)',
                            }}
                        />

                        {/* Soft outer glow */}
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 origin-top"
                            style={{
                                width: '400px',
                                height: '100%',
                                background: `
                  linear-gradient(
                    180deg,
                    rgba(255, 240, 210, 0.5) 0%,
                    rgba(255, 220, 180, 0.25) 15%,
                    rgba(255, 200, 150, 0.08) 35%,
                    transparent 55%
                  )
                `,
                                clipPath: 'polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)',
                                filter: 'blur(15px)',
                            }}
                        />

                        {/* Light source glow at top */}
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-12"
                            style={{
                                background: 'radial-gradient(ellipse 50% 100% at 50% 0%, rgba(255, 250, 240, 0.9) 0%, rgba(255, 240, 220, 0.4) 50%, transparent 100%)',
                                filter: 'blur(8px)',
                            }}
                        />

                        {/* Subtle ambient fill */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(255, 245, 230, 0.08) 0%, transparent 60%)',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StageSpotlight;
