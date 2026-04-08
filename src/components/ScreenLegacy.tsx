import React from 'react';
import { Screen } from '../types';

interface ScreenLegacyProps {
  onNavigate: (screen: Screen, transition?: 'push' | 'push_back' | 'none') => void;
}

export default function ScreenLegacy({ onNavigate }: ScreenLegacyProps) {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section: The Surveillance Feed */}
      <section className="relative w-full aspect-[4/5] md:aspect-video bg-surface-container-lowest overflow-hidden">
        <img 
          className="w-full h-full object-cover mix-blend-lighten opacity-80 grayscale contrast-150" 
          src="https://picsum.photos/seed/apartment/1200/800"
          alt="Surveillance footage"
          referrerPolicy="no-referrer"
        />
        
        {/* Surveillance UI Overlays */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="bg-error/20 border-l-2 border-error px-3 py-1 backdrop-blur-md">
              <p className="font-label text-error text-[10px] uppercase tracking-widest font-bold">DEEPFAKE DETECTED</p>
              <p className="font-label text-on-surface text-[12px]">SYNC_ERROR: 0.042ms</p>
            </div>
            <div className="flex flex-col items-end text-primary font-label text-[10px] tracking-widest">
              <p>CAM_LUMEN_04</p>
              <p>2024-11-21 // 23:42:01</p>
              <p className="text-error">LIVE REPLAY</p>
            </div>
          </div>
          
          <div className="flex justify-between items-end">
            <div className="w-16 h-16 border-l border-b border-primary/40 opacity-50" />
            <div className="flex-1 px-8 flex flex-col items-center">
              <div className="w-full h-[1px] bg-primary/20 mb-1" />
              <p className="font-label text-[10px] text-primary/60 tracking-[0.4em]">SCANNING TEMPORAL VECTORS</p>
            </div>
            <div className="w-16 h-16 border-r border-b border-primary/40 opacity-50" />
          </div>
        </div>

        {/* Floating Data Tag */}
        <div className="absolute top-1/2 left-6 -translate-y-1/2">
          <div className="bg-surface/80 border-l-2 border-primary p-3 backdrop-blur-lg">
            <p className="font-label text-[10px] text-primary uppercase">Subject ID</p>
            <p className="font-headline text-lg text-on-surface">CASSIDY_V</p>
            <p className="font-label text-[10px] text-on-surface-variant mt-1">STATUS: POST-MORTEM EVENT</p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="px-6 -mt-12 relative z-10">
        <div className="glass-panel p-6 border-t border-primary/10">
          <p className="font-label text-primary text-xs tracking-[0.3em] mb-2">SCENE_SEQUENCE_RECOVERY</p>
          <h1 className="font-headline text-4xl leading-tight text-on-surface font-bold tracking-tight mb-1">06 // THE LEGACY</h1>
          <p className="font-label text-secondary text-sm tracking-widest mb-6">FIRST DEEPFAKE REVEAL</p>
          
          <div className="space-y-6">
            <div className="bg-surface-container-low p-4 border-l border-primary/30">
              <p className="font-body text-on-surface-variant leading-relaxed italic">
                "LUMEN, Cassidy's AI smart home system, auto-releases a 72-hour security log. The footage shows Cassidy alive and laughing two hours AFTER she was declared dead."
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container-high border-t-2 border-tertiary">
                <p className="font-label text-[10px] text-tertiary uppercase mb-1">Atmospheric Reading</p>
                <p className="font-body text-sm text-on-surface">Disorienting, urgent.</p>
              </div>
              <div className="p-4 bg-surface-container-high border-t-2 border-secondary">
                <p className="font-label text-[10px] text-secondary uppercase mb-1">Temporal Status</p>
                <p className="font-body text-sm text-on-surface">Timeline Broken.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forensic Log Section */}
      <section className="px-6 mt-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-sm">analytics</span>
          <h2 className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant">SCENE_LOG_DUMP</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-4 items-start bg-surface-container-low p-4">
            <span className="font-label text-primary text-xs pt-1">01</span>
            <div>
              <p className="font-body text-on-surface text-sm">The timeline is broken. The case reopens. Everything is now in question.</p>
              <div className="mt-3 flex gap-2">
                <span className="px-2 py-0.5 bg-surface-container-highest text-[10px] font-label text-primary border-l-2 border-primary">ENCRYPTED</span>
                <span className="px-2 py-0.5 bg-surface-container-highest text-[10px] font-label text-secondary border-l-2 border-secondary">SYNTHETIC</span>
              </div>
            </div>
          </div>

          {/* Technical Readouts Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <div className="bg-error/10 p-4 border border-error/20">
              <p className="font-label text-[10px] text-error mb-1">CONFLICT_ALERT</p>
              <p className="font-headline text-lg">LOGS != REALITY</p>
            </div>
            <div className="bg-surface-container-highest p-4 border border-outline-variant">
              <p className="font-label text-[10px] text-primary mb-1">LUMEN_CORE</p>
              <p className="font-body text-xs text-on-surface-variant">Auth-Protocol Bypass: Detect: 23:14:02</p>
            </div>
            <div className="bg-surface-container-highest p-4 border border-outline-variant">
              <p className="font-label text-[10px] text-secondary mb-1">BITRATE_ANOMALY</p>
              <p className="font-body text-xs text-on-surface-variant">Ghosting present in frame 4402-4512</p>
            </div>
          </div>
        </div>
      </section>

      {/* Characters Involved */}
      <section className="px-6 mt-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-secondary text-sm">group</span>
          <h2 className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant">ACTIVE_PERSONNEL</h2>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { name: 'MARI', role: 'Lead Analyst', img: 'https://picsum.photos/seed/mari/200/200', color: 'text-primary' },
            { name: 'NOAH', role: 'Field Agent', img: 'https://picsum.photos/seed/noah/200/200', color: 'text-primary' },
            { name: 'CASSIDY', role: 'The Deceased?', img: 'https://picsum.photos/seed/cassidy/200/200', color: 'text-error', border: 'border-2 border-error' }
          ].map((person, idx) => (
            <div key={idx} className="flex-shrink-0 w-32">
              <div className={`aspect-square bg-surface-container-high border border-outline-variant mb-2 overflow-hidden ${person.border || ''}`}>
                <img 
                  className="w-full h-full object-cover grayscale brightness-75 contrast-125" 
                  src={person.img} 
                  alt={person.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className={`font-label text-[10px] ${person.color} uppercase`}>{person.role}</p>
              <p className="font-headline text-sm">{person.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
