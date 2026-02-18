import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    // Smooth spring animation for the progress bar
    const smoothProgress = useSpring(scrollProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            className="scroll-progress"
            style={{ width: smoothProgress }}
        />
    );
};

export default ScrollProgress;
