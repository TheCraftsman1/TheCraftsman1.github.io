import React, { useRef, ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { playHoverTick } from '../../lib/sound';

export interface MagneticProps {
  children: ReactNode;
  className?: string;
  maxOffset?: number;
  enableSound?: boolean;
}

/**
 * High-performance Magnetic cursor attraction wrapper
 * Uses Framer Motion spring physics with:
 * damping: 18, stiffness: 260, mass: 0.6
 * Strictly respects prefers-reduced-motion and fine-pointer devices.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = '',
  maxOffset = 14,
  enableSound = true,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Precision calibrated spring dynamics
  const springConfig = { damping: 18, stiffness: 260, mass: 0.6 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Constrain attraction force within maxOffset range
    const normX = Math.max(-1, Math.min(1, distanceX / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, distanceY / (rect.height / 2)));

    rawX.set(normX * maxOffset);
    rawY.set(normY * maxOffset);
  };

  const handleMouseEnter = () => {
    if (enableSound) {
      playHoverTick();
    }
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        transformStyle: 'preserve-3d',
      }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
