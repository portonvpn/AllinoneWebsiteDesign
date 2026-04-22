import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';

export const AstroDiver = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 300;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    resize();

    const draw = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const bars = 64;
      const barWidth = canvas.width / bars;
      
      for (let i = 0; i < bars; i++) {
        const mouseFactor = Math.max(0, 1 - Math.abs(mouseRef.current.x - i * barWidth) / 200);
        const baseline = Math.sin(time + i * 0.2) * 20;
        const reactive = mouseFactor * 50 * Math.sin(time * 2);
        const height = 10 + Math.abs(baseline + reactive);
        
        const x = i * barWidth;
        const y = canvas.height / 2;
        
        ctx.fillStyle = `rgba(185, 131, 255, ${0.1 + mouseFactor * 0.4})`;
        ctx.fillRect(x, y - height / 2, barWidth - 4, height);
        
        // Glow effect
        if (mouseFactor > 0.5) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#b983ff';
          ctx.fillRect(x, y - height / 2, barWidth - 4, height);
          ctx.shadowBlur = 0;
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden opacity-40 hover:opacity-100 transition-opacity duration-1000">
      <canvas ref={canvasRef} className="w-full cursor-crosshair" />
      <div className="flex justify-between px-8 py-2 text-[10px] font-mono text-purple-400/40 uppercase tracking-[0.3em]">
        <span>AstroDiver Frequency Engine</span>
        <span>Reactive Visualizer Active</span>
      </div>
    </div>
  );
};
