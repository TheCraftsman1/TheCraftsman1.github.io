import React, { useRef, ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  onClick?: () => void;
  dataCursor?: string;
}

/**
 * 3D Perspective Tilt Card with hardware-accelerated transforms
 * Normalizes pointer coordinates to (-0.5, 0.5) and renders a dynamic specular glare.
 * Respects prefers-reduced-motion and animates solely on compositor threads.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 7,
  glareOpacity = 0.14,
  onClick,
  dataCursor,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Normalized mouse coordinates: (-0.5, 0.5)
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);
  const isHovered = useMotionValue(0);

  // Precision calibrated spring smoothing
  const springConfig = { damping: 22, stiffness: 240, mass: 0.5 };
  const smoothX = useSpring(normX, springConfig);
  const smoothY = useSpring(normY, springConfig);
  const smoothHover = useSpring(isHovered, { damping: 20, stiffness: 300 });

  // 3D rotation transforms
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Glare position percentage (0% to 100%)
  const glareLeft = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareTop = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);
  const glareOp = useTransform(smoothHover, [0, 1], [0, glareOpacity]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    normX.set(x);
    normY.set(y);
    isHovered.set(1);
  };

  const handleMouseLeave = () => {
    normX.set(0);
    normY.set(0);
    isHovered.set(0);
  };

  if (shouldReduceMotion) {
    return (
      <div className={className} onClick={onClick} data-cursor={dataCursor}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: '1100px' }}
      className="w-full h-full"
      data-cursor={dataCursor}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative will-change-transform transform-gpu ${className}`}
      >
        {children}

        {/* Dynamic Specular Glare Follower */}
        <motion.div
          aria-hidden="true"
          style={{
            left: glareLeft,
            top: glareTop,
            opacity: glareOp,
            transform: 'translate3d(-50%, -50%, 0)',
          }}
          className="pointer-events-none absolute w-[240%] h-[240%] rounded-full bg-radial from-white/35 via-amber-200/10 to-transparent blur-2xl z-30"
        />
      </motion.div>
    </div>
  );
};

export default TiltCard;
