import React, { useEffect, useState, memo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = memo(() => {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Core cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Trailing ring physics - tighter for modern feel
  const springConfig = { damping: 28, stiffness: 300, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect if device has a fine pointer (mouse)
    const hasFineMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setIsTouchDevice(!hasFineMouse);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Triggers for links, buttons, or any explicit interactive element
      const isInteractive = target.closest('button, a, input, textarea, select, .cursor-pointer');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice, cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Central crisp dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%'
        }}
      >
        <motion.div 
          className="w-2 h-2 bg-white rounded-full"
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Trailing outline/highlight */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          left: smoothX,
          top: smoothY,
          x: '-50%',
          y: '-50%'
        }}
      >
        <motion.div
          className="rounded-full bg-white flex items-center justify-center"
          animate={{
            width: isHovering ? 64 : 32,
            height: isHovering ? 64 : 32,
            backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
            border: isHovering ? '0px solid white' : '1px solid rgba(255, 255, 255, 0.5)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </motion.div>
    </>
  );
});

export default CustomCursor;