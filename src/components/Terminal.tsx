import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onGrantAccess: (type: 'secret' | 'fake') => void;
}

export const Terminal = ({ isOpen, onClose, onGrantAccess }: TerminalProps) => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setInput('');
      setStatus('idle');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = input.toLowerCase().trim();

    if (code === 'gamdom') {
      setStatus('success');
      setTimeout(() => {
        onGrantAccess('secret');
        onClose();
      }, 800);
    } else if (code === 'cemduo') {
      setStatus('success');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#b983ff', '#7f00ff', '#ffffff']
      });
      setTimeout(() => {
        onGrantAccess('fake');
        onClose();
      }, 800);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 1000);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-3xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#1a1a2e] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-xl">
                    <TerminalIcon size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-mono font-bold text-white/40 uppercase tracking-[0.2em]">System Auth</h2>
                    <p className="text-xs font-mono text-purple-400/60 tracking-wider">SECURE_SHELL_V5.9</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="ENTER ACCESS KEY"
                    className="w-full bg-black/20 border-2 border-white/5 focus:border-purple-500/50 rounded-2xl p-6 text-center text-3xl font-mono tracking-[0.5em] text-purple-400 placeholder:text-white/5 outline-none transition-all"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 text-red-400 font-mono text-xs"
                      >
                        <ShieldAlert size={14} /> ACCESS DENIED. RETRYING...
                      </motion.div>
                    )}
                    {status === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 text-emerald-400 font-mono text-xs"
                      >
                        <CheckCircle2 size={14} /> IDENTITY VERIFIED. REDIRECTING...
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-8 flex flex-col items-center gap-4">
                  <p className="text-[10px] font-mono text-white/20 text-center uppercase tracking-widest leading-loose">
                    BY PROCEEDING YOU AGREE TO SYSTEM PROTOCOLS<br/>
                    UNAUTHORIZED ENTRANCE IS LOGGED
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
