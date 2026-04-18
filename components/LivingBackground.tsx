'use client';

import React, { useEffect, useRef } from 'react';

interface Branch {
  x: number;
  y: number;
  angle: number;
  speed: number;
  life: number;
  maxLife: number;
  thickness: number;
  generation: number;
}

const LivingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let branches: Branch[] = [];
    let animationFrameId: number;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const createBranch = (x: number, y: number, angle: number, generation: number): Branch => {
      return {
        x,
        y,
        angle,
        speed: Math.random() * 2.5 + 1.2, // Fast, aggressive growth
        life: 0,
        maxLife: Math.random() * 150 + 100,
        thickness: Math.max(0.8, 5 - generation * 0.8), // Bold, ink-like thickness
        generation
      };
    };

    const init = () => {
      branches = [];
      // Seeding from the edges with high-impact "ink bursts"
      for (let i = 0; i < 4; i++) {
        branches.push(createBranch(
          Math.random() * width, 
          height + 10, 
          -Math.PI / 2 + (Math.random() - 0.5) * 1.5, 
          0
        ));
      }
      
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(0, 0, width, height);
    };

    init();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Interaction: Dropping "heavy ink" at cursor position
      if (Math.random() < 0.2 && branches.length < 500) {
         branches.push(createBranch(mouseX, mouseY, Math.random() * Math.PI * 2, 1));
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      // Fast fade to keep the "impact" fresh and avoid a messy screen
      ctx.fillStyle = 'rgba(250, 250, 250, 0.04)'; 
      ctx.fillRect(0, 0, width, height);

      let newBranches: Branch[] = [];

      for (let i = branches.length - 1; i >= 0; i--) {
        const branch = branches[i];

        ctx.beginPath();
        ctx.moveTo(branch.x, branch.y);

        branch.angle += (Math.random() - 0.5) * 0.25;
        
        // Interaction pull
        const dx = mouseX - branch.x;
        const dy = mouseY - branch.y;
        const distSq = dx * dx + dy * dy;
        
        if (distSq > 100 && distSq < 300000) {
          const targetAngle = Math.atan2(dy, dx);
          let angleDiff = targetAngle - branch.angle;
          while(angleDiff <= -Math.PI) angleDiff += Math.PI * 2;
          while(angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          
          branch.angle += angleDiff * 0.005; 
        }

        branch.x += Math.cos(branch.angle) * branch.speed;
        branch.y += Math.sin(branch.angle) * branch.speed;

        ctx.lineTo(branch.x, branch.y);
        
        // Pure black with organic opacity based on generation for depth
        const opacity = Math.max(0.1, 0.8 - (branch.generation * 0.12));
        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`; 
        
        // Subtle "ink bleed" glow
        // ctx.shadowBlur = 2;
        // ctx.shadowColor = `rgba(0, 0, 0, ${opacity * 0.2})`;
        
        ctx.lineWidth = branch.thickness;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        branch.life++;

        // Frequent bifurcation for a complex, living network
        if (branch.life < branch.maxLife && Math.random() < 0.04 && branch.generation < 7 && branches.length + newBranches.length < 700) {
          const spread = Math.random() * 1.0 + 0.2;
          newBranches.push(createBranch(branch.x, branch.y, branch.angle + spread, branch.generation + 1));
          newBranches.push(createBranch(branch.x, branch.y, branch.angle - spread, branch.generation + 1));
          
          if (Math.random() > 0.3) {
             branch.life = branch.maxLife; // Force energy into children
          }
        }

        if (branch.life >= branch.maxLife || 
            branch.x < -100 || branch.x > width + 100 || 
            branch.y < -100 || branch.y > height + 100) {
          branches.splice(i, 1);
        }
      }

      branches.push(...newBranches);

      // Maintain the population
      if (branches.length < 150 && Math.random() < 0.1) {
        branches.push(createBranch(
            Math.random() > 0.5 ? -20 : width + 20, 
            Math.random() * height, 
            Math.random() * Math.PI, 
            0
        ));
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default LivingBackground;
