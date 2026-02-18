
import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 500);
          setTimeout(onComplete, 1500); // Allow exit animation to finish
          return 100;
        }
        // Non-linear progress for realism
        const increment = Math.random() * 15;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center transition-transform duration-1000 ease-in-expo ${isExiting ? '-translate-y-full' : 'translate-y-0'
        }`}
    >
      <div className="relative w-64 md:w-96">
        {/* Speedometer / RPM Arc */}
        <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
          <div className="w-full h-full border-t-2 border-gray-800 rounded-t-full opacity-50"></div>
        </div>

        <div className="text-center mb-4 relative z-10">
          <h1 className="text-6xl font-orbitron font-black text-white tracking-tighter">
            {Math.floor(progress)}<span className="text-neon-lime text-2xl">%</span>
          </h1>
          <p className="text-neon-lime text-xs font-exo tracking-[0.3em] animate-pulse">SYSTEM INITIALIZATION</p>
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-gray-900 relative overflow-hidden">
          <div
            className="h-full bg-neon-lime shadow-[0_0_20px_#CCFF00] transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Decor */}
        <div className="mt-2 flex justify-between text-[10px] text-gray-500 font-exo">
          <span>TMP: 98°C</span>
          <span>RPM: 12000</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
