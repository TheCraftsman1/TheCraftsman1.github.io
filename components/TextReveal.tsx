import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    animationType?: 'char' | 'word' | 'typewriter';
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

const TextReveal: React.FC<TextRevealProps> = ({
    text,
    className = '',
    delay = 0,
    animationType = 'char',
    as: Component = 'span',
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (animationType === 'typewriter') {
        return (
            <Component className={`typewriter ${className}`}>
                {isVisible && (
                    <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{
                            duration: text.length * 0.05,
                            ease: 'linear',
                            delay: delay
                        }}
                        className="inline-block overflow-hidden whitespace-nowrap"
                    >
                        {text}
                    </motion.span>
                )}
            </Component>
        );
    }

    if (animationType === 'word') {
        const words = text.split(' ');
        return (
            <Component className={className}>
                {words.map((word, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            delay: delay + index * 0.1,
                            duration: 0.4,
                        }}
                        className="inline-block mr-2"
                    >
                        {word}
                    </motion.span>
                ))}
            </Component>
        );
    }

    // Character animation (default)
    const chars = text.split('');
    return (
        <Component className={className}>
            {chars.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        delay: delay + index * 0.03,
                        duration: 0.3,
                    }}
                    className="inline-block"
                    style={{
                        display: char === ' ' ? 'inline' : 'inline-block',
                        width: char === ' ' ? '0.3em' : 'auto',
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </Component>
    );
};

export default TextReveal;
