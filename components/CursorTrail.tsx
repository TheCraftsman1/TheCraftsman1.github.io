import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CursorTrailProps {
    color?: string;
    particleCount?: number;
}

const CursorTrail: React.FC<CursorTrailProps> = ({
    color = '#00f0ff',
    particleCount = 20
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation
    const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
            {/* Main cursor dot */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                className="fixed"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
            >
                <div
                    className="w-3 h-3 rounded-full"
                    style={{
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
                    }}
                />
            </motion.div>

            {/* Trail particles */}
            {Array.from({ length: particleCount }).map((_, i) => (
                <TrailParticle
                    key={i}
                    index={i}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    color={color}
                    isVisible={isVisible}
                />
            ))}
        </div>
    );
};

interface TrailParticleProps {
    index: number;
    mouseX: any;
    mouseY: any;
    color: string;
    isVisible: boolean;
}

const TrailParticle: React.FC<TrailParticleProps> = ({
    index,
    mouseX,
    mouseY,
    color,
    isVisible
}) => {
    // Calculate delay and scale based on index
    const delay = index * 0.02;
    const scale = 1 - (index / 20);
    const size = 8 - (index * 0.3);

    const springConfig = {
        damping: 20 + index * 2,
        stiffness: 300 - index * 10,
        mass: 1 + index * 0.1
    };

    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    return (
        <motion.div
            style={{
                x,
                y,
                translateX: '-50%',
                translateY: '-50%',
                scale,
            }}
            className="fixed rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 0.6 - (index * 0.025) : 0 }}
            transition={{ delay }}
        >
            <div
                style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                    opacity: (1 - index / 20) * 0.5,
                    boxShadow: `0 0 ${5 + index}px ${color}`,
                }}
                className="rounded-full"
            />
        </motion.div>
    );
};

export default CursorTrail;
