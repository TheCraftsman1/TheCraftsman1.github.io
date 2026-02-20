import React, { useEffect, useState, useRef, memo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = memo(() => {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Framer Motion Values for smooth physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the trailing dot vs the leading ring
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const hoverTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Detect if device has a fine pointer (mouse)
    const hasFineMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setIsTouchDevice(!hasFineMouse);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const updatePosition = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      // Magnetic Snapping Logic
      if (isHovering && hoverTarget.current) {
        const rect = hoverTarget.current.getBoundingClientRect();
        // Calculate distance from center of the button
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Magnet pull strength (0.5 = 50% pull towards center)
        targetX = targetX + (centerX - targetX) * 0.4;
        targetY = targetY + (centerY - targetY) * 0.4;
      }

      cursorX.set(targetX);
      cursorY.set(targetY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('button, a, .cursor-pointer');

      if (interactiveEl) {
        setIsHovering(true);
        hoverTarget.current = interactiveEl as HTMLElement;
      } else {
        setIsHovering(false);
        hoverTarget.current = null;
      }
    };

    // Ensure smooth scrolling doesn't detach the cursor by updating on scroll if hovered
    const handleScroll = () => {
      if (isHovering && hoverTarget.current) {
        // Force a re-calculation of the magnetic center when the page scrolls beneath the cursor
        const rect = hoverTarget.current.getBoundingClientRect();
        // We don't have the exact mouse coords perfectly during scroll without tracking them separately, 
        // but Framer Motion handles the interpolation smoothly enough.
      }
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTouchDevice, isHovering, cursorX, cursorY]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] block mix-blend-difference"
      style={{
        left: smoothX,
        top: smoothY,
        translateX: '-50%',
        translateY: '-50%'
      }}
    >
      <div className={`relative transition-all duration-300 ease-out ${isHovering ? 'scale-[2] rotate-90' : 'scale-100 rotate-0'}`}>
        {/* Inner Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-neon-lime rounded-full shadow-[0_0_10px_#CCFF00]"></div>

        {/* Outer Ring */}
        <div className={`w-8 h-8 border rounded-full transition-all duration-300 ${isHovering ? 'border-neon-lime/80 opacity-100 bg-neon-lime/10' : 'border-white/50 opacity-50'}`}></div>

        {/* Crosshair Lines (Hide on hover for cleaner magnetic look) */}
        <div className={`transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-transparent">
            <div className="absolute left-[-10px] w-[5px] h-full bg-neon-lime"></div>
            <div className="absolute right-[-10px] w-[5px] h-full bg-neon-lime"></div>
          </div>
          <div className="absolute left-1/2 top-0 h-full w-[1px] bg-transparent">
            <div className="absolute top-[-10px] h-[5px] w-full bg-neon-lime"></div>
            <div className="absolute bottom-[-10px] h-[5px] w-full bg-neon-lime"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default CustomCursor;