/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParticleSimulator } from './components/ParticleSimulator';
import { SmoothieSlider } from './components/SmoothieSlider';
import { AppGrid } from './components/AppGrid';
import { Terminal } from './components/Terminal';
import { AstroDiver } from './components/AstroDiver';
import { APPS } from './constants';
import { Info, ExternalLink, RefreshCcw } from 'lucide-react';
import Lenis from 'lenis';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isLoreOpen, setIsLoreOpen] = useState(false);
  const [activePage, setActivePage] = useState<'main' | 'secret' | 'fake'>('main');
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // Initialize smooth scroll (Stringtune vibe)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const unlockAudio = useCallback(() => {
    if (audioUnlocked) return;
    const audio = document.getElementById('bg-audio') as HTMLAudioElement;
    if (audio) {
      audio.play().catch(() => {});
      setAudioUnlocked(true);
    }
  }, [audioUnlocked]);

  const vaultTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleVaultClick = () => {
    unlockAudio();
    
    if (vaultTimerRef.current) {
      // Double click detected
      clearTimeout(vaultTimerRef.current);
      vaultTimerRef.current = null;
      setIsTerminalOpen(true);
      setIsLoreOpen(false);
    } else {
      // First click
      vaultTimerRef.current = setTimeout(() => {
        setIsLoreOpen(true);
        vaultTimerRef.current = null;
      }, 300);
    }
  };

  if (activePage === 'secret') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center" onClick={unlockAudio}>
        <ParticleSimulator />
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="relative z-10 space-y-8"
        >
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 uppercase tracking-tighter">
            Secret Access Granted
          </h1>
          <div className="grid gap-4 max-w-sm mx-auto w-full">
            <a href="https://beeg.com" target="_blank" className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-2xl font-black text-white hover:bg-purple-500/20 transition-all">BEEG</a>
            <a href="https://pornhub.com" target="_blank" className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-2xl font-black text-white hover:bg-orange-500/20 transition-all">PH</a>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 mx-auto text-white/40 hover:text-white transition-colors pt-8 uppercase font-mono tracking-widest text-sm"
          >
            <RefreshCcw size={16} /> Exit Vault
          </button>
        </motion.div>
      </div>
    );
  }

  if (activePage === 'fake') {
    return (
      <div className="min-h-screen bg-[#0b0615] flex flex-col items-center justify-center p-8 text-center" onClick={unlockAudio}>
        <ParticleSimulator />
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative z-10 space-y-8"
        >
          <h1 className="text-8xl font-black text-white tracking-tighter italic">Surprise!!</h1>
          <div className="p-4 bg-white/5 border border-white/10 rounded-[40px] shadow-2xl">
            <img 
              src="https://raw.githubusercontent.com/portonvpn/Allinone/main/asaru.JPG" 
              className="w-full max-w-sm rounded-[32px] mx-auto"
              alt="Surprise"
            />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-black text-white italic">asaru67 💀</p>
            <p className="text-white/40 font-mono text-sm tracking-[0.4em uppercase]">System compromised</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-12 py-4 bg-white text-black rounded-full font-black hover:scale-105 transition-transform"
          >
            GO BACK
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30" onClick={unlockAudio}>
      <ParticleSimulator />
      
      {/* Background Audio */}
      <audio id="bg-audio" src="https://raw.githubusercontent.com/portonvpn/Allinone/main/aurora.mp3" loop />

      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <span className="text-sm font-mono font-bold tracking-[0.3em] text-white/50">ZORO.OSS</span>
        </div>
        <div className="pointer-events-auto flex items-center gap-6">
           <button 
             onClick={handleVaultClick}
             className="group flex flex-col items-end gap-1 cursor-pointer"
           >
             <span className="text-[10px] font-mono text-purple-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest leading-none">Access Console</span>
             <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors underline underline-offset-4 decoration-purple-500/40">The Cemduo</span>
           </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-32 max-w-6xl">
        <header className="mb-20 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/10 blur-[100px] rounded-full"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white uppercase italic">
              All in one<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">Downloader</span>
            </h1>
            <div className="flex items-center justify-center gap-4 text-xs font-mono text-white/30 uppercase tracking-[0.4em]">
              <span>v5.9.1 stable</span>
              <div className="w-1 h-1 bg-white/20 rounded-full" />
              <span>Production Ready</span>
            </div>
          </motion.div>
        </header>

        {/* Smoothie Slider Section */}
        <section className="mb-32">
          <SmoothieSlider items={APPS.slice(0, 3)} />
        </section>

        {/* App Grid Section */}
        <section className="mb-32">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tight">Full Library</h2>
            <div className="h-[1px] flex-1 mx-8 bg-white/5 hidden md:block" />
            <span className="text-xs font-mono text-white/20 uppercase tracking-widest">{APPS.length} Modules Available</span>
          </div>
          <AppGrid items={APPS} />
        </section>

        {/* AstroDiver Visualizer Section */}
        <section className="mb-32">
           <AstroDiver />
        </section>

        {/* Footer */}
        <footer className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2">
            <h3 className="text-xl font-bold italic">Zoro Hub</h3>
            <p className="text-sm text-white/40 max-w-sm">Every downloader and premium hub in one place. Powered by the next generation of creative modules.</p>
          </div>
          <div className="flex gap-12">
             <div className="space-y-4">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">Foundation</span>
                <ul className="space-y-2 text-sm text-white/60">
                   <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Source Code</a></li>
                </ul>
             </div>
             <div className="space-y-4">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">Network</span>
                <ul className="space-y-2 text-sm text-white/60">
                   <li><a href="#" className="hover:text-white transition-colors">Support Hub</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">API Status</a></li>
                </ul>
             </div>
          </div>
        </footer>
      </main>

      {/* Overlays */}
      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
        onGrantAccess={setActivePage}
      />

      <AnimatePresence>
        {isLoreOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoreOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md bg-[#1a1a2e] border border-white/10 rounded-[32px] p-8 overflow-hidden"
            >
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-purple-400 mb-1">The Cemduo</h2>
                <p className="text-sm text-white/40 mb-8">Minecraft Bedwars / Cubecraft Legends</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { label: 'PvP Skill', value: 'Elite / 10' },
                    { label: 'Teamwork', value: 'Unstoppable' },
                    { label: 'Bridging', value: 'God Speed' },
                    { label: 'Win Record', value: '56.87s' },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{stat.label}</span>
                      <p className="text-lg font-bold text-white mt-1 italic">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setIsLoreOpen(false)}
                  className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-tight hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  Return to Hub
                </button>
              </div>

              {/* Decorative circle */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

