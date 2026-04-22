import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { AppItem } from '../constants';
import { cn } from '../lib/utils';

interface SmoothieSliderProps {
  items: AppItem[];
}

export const SmoothieSlider = ({ items }: SmoothieSliderProps) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % items.length);
  const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

  const current = items[index];

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] mb-12 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col md:flex-row items-center gap-8"
          style={{
            backgroundImage: `radial-gradient(circle at 100% 0%, ${current.accent}22 0%, transparent 50%)`,
          }}
        >
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                style={{ backgroundColor: current.accent }}
              >
                <i className="material-icons text-2xl">{current.icon}</i>
              </div>
              <span className="text-sm font-mono text-white/50 tracking-widest uppercase">Featured</span>
            </div>
            
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-2">
                {current.name}
              </h2>
              <p className="text-lg text-white/70 font-medium max-w-md">
                {current.description}
              </p>
            </div>

            <button
              onClick={() => window.open(current.url, '_blank')}
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform active:scale-95"
            >
              Launch Now <ExternalLink size={18} />
            </button>
          </div>

          <div className="hidden md:flex flex-1 justify-center relative">
             <div 
                className="w-48 h-48 rounded-full blur-[60px] opacity-20 absolute"
                style={{ backgroundColor: current.accent }}
             />
             <i 
                className="material-icons text-[160px] opacity-80"
                style={{ color: current.accent }}
             >
                {current.icon}
             </i>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button 
          onClick={prev}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <div 
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-white" : "bg-white/20"
              )}
            />
          ))}
        </div>
        <button 
          onClick={next}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
