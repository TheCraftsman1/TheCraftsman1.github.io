import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[9999] block mix-blend-difference"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className={`relative transition-all duration-300 ease-out ${isHovering ? 'scale-150' : 'scale-100'}`}>
        {/* Inner Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neon-lime rounded-full shadow-[0_0_10px_#CCFF00]"></div>

        {/* Outer Ring */}
        <div className={`w-8 h-8 border border-white/50 rounded-full transition-all duration-300 ${isHovering ? 'border-neon-lime opacity-100' : 'opacity-50'}`}></div>

        {/* Crosshair Lines */}
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
  );
};

export default CustomCursor;