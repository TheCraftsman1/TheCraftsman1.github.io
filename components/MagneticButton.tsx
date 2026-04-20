import React, { useRef, memo, ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
    children: ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = memo(({
    children,
    onClick,
    href,
    className = ''
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Subtle parallax effect for the content
    const textX = useTransform(springX, (value) => value * 0.4);
    const textY = useTransform(springY, (value) => value * 0.4);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * 0.2);
        y.set(distanceY * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const content = (
        <motion.div
            ref={ref}
            className={`inline-block relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            onClick={onClick}
        >
            <motion.div style={{ x: textX, y: textY }} className="w-full h-full flex items-center justify-center">
                {children}
            </motion.div>
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
                {content}
            </a>
        );
    }

    return content;
});

export default MagneticButton;
