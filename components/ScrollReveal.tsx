
import React, { useRef, useEffect, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'slide-right' | 'slide-left' | 'zoom-in' | 'blur-in' | 'scale-fade';
  delay?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = () => {
    switch (animation) {
      case 'slide-right':
        return 'translate-x-20 opacity-0';
      case 'slide-left':
        return '-translate-x-20 opacity-0';
      case 'zoom-in':
        return 'scale-90 opacity-0';
      case 'blur-in':
        return 'opacity-0 blur-sm scale-95';
      case 'scale-fade':
        return 'scale-75 opacity-0';
      case 'fade-up':
      default:
        return 'translate-y-10 opacity-0';
    }
  };

  const getVisibleClass = () => {
    switch (animation) {
      case 'slide-right':
        return 'translate-x-0 opacity-100';
      case 'slide-left':
        return 'translate-x-0 opacity-100';
      case 'zoom-in':
        return 'scale-100 opacity-100';
      case 'blur-in':
        return 'opacity-100 blur-0 scale-100';
      case 'scale-fade':
        return 'scale-100 opacity-100';
      case 'fade-up':
      default:
        return 'translate-y-0 opacity-100';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? getVisibleClass() : getAnimationClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
