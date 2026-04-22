import React from 'react';
import { motion, type Variants } from 'motion/react';
import { AppItem } from '../constants';
import { BadgeCheck, Sparkles, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface AppGridProps {
  items: AppItem[];
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const AppGrid = ({ items }: AppGridProps) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map((app) => (
        <motion.button
          key={app.id}
          variants={itemAnim}
          onClick={() => window.open(app.url, '_blank')}
          className={cn(
            "group relative flex flex-col text-left p-6 rounded-[28px] border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-500",
            "hover:bg-white/[0.05] hover:border-white/20 hover:scale-[1.02] hover:-translate-y-1"
          )}
        >
          {/* Accent glow on hover */}
          <div 
            className="absolute -right-12 -top-12 w-32 h-32 blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{ backgroundColor: app.accent }}
          />

          <div className="flex justify-between items-start mb-6">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
              style={{ 
                backgroundColor: `${app.accent}33`,
                border: `1px solid ${app.accent}66`
              }}
            >
              <i className="material-icons text-3xl" style={{ color: app.accent }}>{app.icon}</i>
            </div>

            <div className="flex gap-2">
              {app.isNew && (
                <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-500 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles size={10} /> New
                </div>
              )}
              {app.isVerified && (
                <div className="flex items-center gap-1 bg-blue-400/10 text-blue-400 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <BadgeCheck size={10} /> Verified
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
              {app.name}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
              {app.description}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">
            <span>GET APP</span>
            <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-white/10 transition-colors" />
            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};
