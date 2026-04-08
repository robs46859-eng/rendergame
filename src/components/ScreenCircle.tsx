import React from 'react';
import { Screen } from '../types';

interface ScreenCircleProps {
  onNavigate: (screen: Screen, transition?: 'push' | 'push_back' | 'none') => void;
}

export default function ScreenCircle({ onNavigate }: ScreenCircleProps) {
  const suspects = [
    { name: 'Mari', role: 'Investigator / Intruder', status: 'PRIMARY', color: 'border-primary', icon: 'person_search' },
    { name: 'Petra Solis', role: 'The Grieving Partner?', status: 'ENCRYPTED', color: 'border-secondary/40', icon: 'fingerprint', badge: true },
    { name: 'Desmond Rhys', role: 'The Business Associate', status: 'WATCHING', color: 'border-secondary/40', icon: 'visibility' },
    { name: 'Vivienne Cho', role: 'The Estranged Friend', status: 'HIGH RISK', color: 'border-tertiary/40', icon: 'warning', badge: true, badgeColor: 'bg-tertiary-container text-tertiary' },
    { name: 'Theo Hale', role: 'The Architect', status: 'NEUTRAL', color: 'border-secondary/40', icon: 'memory' }
  ];

  return (
    <div className="animate-in slide-in-from-right duration-500">
      {/* Hero Section */}
      <section className="relative h-[530px] w-full">
        <div className="absolute inset-0 grayscale contrast-125 opacity-40">
          <img 
            alt="Brutalist estate" 
            className="w-full h-full object-cover" 
            src="https://picsum.photos/seed/estate/1200/800"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        {/* Hero Data Overlays */}
        <div className="absolute top-8 left-6 right-6 flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary" />
              <span className="font-label text-xs tracking-widest text-primary uppercase">SIGNAL ACQUIRED</span>
            </div>
            <div className="font-label text-[10px] text-outline">LOC: 34.0522° N, 118.2437° W</div>
          </div>
          <div className="p-2 border-t border-l border-primary/20 backdrop-blur-md bg-surface/30">
            <span className="font-label text-xs text-primary">ENCRYPTION: LEVEL 4</span>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 right-6">
          <span className="font-label text-sm text-secondary tracking-[0.3em] uppercase mb-2 block">SUSPECT INTRODUCTIONS</span>
          <h2 className="font-headline text-5xl font-bold leading-tight tracking-tighter text-on-surface">05 // THE CIRCLE</h2>
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest/80 backdrop-blur border-l-2 border-primary">
              <span className="font-label text-[10px] uppercase text-on-surface-variant">ATMOSPHERIC:</span>
              <span className="font-label text-[10px] uppercase text-primary">PERFORMED MOURNING</span>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Content */}
      <div className="px-6 space-y-12 -mt-4 relative z-10">
        {/* Summary Card */}
        <section className="bg-surface-container-low p-6 relative">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-primary/40" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-primary/40" />
          <h3 className="font-label text-xs uppercase tracking-widest text-outline mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">description</span>
            Narrative Summary
          </h3>
          <p className="font-body text-lg leading-relaxed text-on-surface/90 italic">
            "Mari crashes Cassidy's memorial at her rented estate. She meets Petra, Desmond, Vivienne, and Theo—all performing grief slightly wrong."
          </p>
          <div className="mt-8 pt-6 border-t border-outline-variant/30">
            <h4 className="font-label text-[10px] uppercase tracking-widest text-primary mb-3">SCENE LOG</h4>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Each suspect reveals something suspicious through their behavior. The air is thick with hidden motives and synthetic sorrow.
            </p>
          </div>
        </section>

        {/* Suspect Grid */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="font-headline text-2xl">Subject Profiles</h3>
            <span className="font-label text-[10px] text-outline">IDENTIFIED: 05</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {suspects.map((suspect, idx) => (
              <div key={idx} className={`group bg-surface-container border-l-2 ${suspect.color} p-4 flex gap-4 items-center hover:bg-surface-container-high transition-colors`}>
                <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center">
                  <span className={`material-symbols-outlined ${suspect.color.includes('primary') ? 'text-primary' : suspect.color.includes('tertiary') ? 'text-tertiary' : 'text-secondary'}`}>
                    {suspect.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-label text-sm uppercase font-bold text-on-surface">{suspect.name}</span>
                    {suspect.badge ? (
                      <div className={`px-2 py-0.5 ${suspect.badgeColor || 'bg-secondary-container/20 border border-secondary/20 text-secondary'} font-label text-[8px]`}>
                        {suspect.status}
                      </div>
                    ) : (
                      <span className={`font-label text-[10px] ${suspect.status === 'PRIMARY' ? 'text-primary' : 'text-outline'}`}>{suspect.status}</span>
                    )}
                  </div>
                  <div className="font-label text-[10px] text-outline uppercase tracking-wider">{suspect.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical readouts */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-4">
            <div className="font-label text-[10px] text-primary mb-2 uppercase tracking-tighter">Case File Status</div>
            <div className="flex items-end gap-2">
              <span className="font-label text-2xl text-on-surface">74%</span>
              <span className="font-label text-[10px] text-outline pb-1">COMPILED</span>
            </div>
            <div className="w-full h-1 bg-surface-container-highest mt-2">
              <div className="w-3/4 h-full bg-primary" />
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-4">
            <div className="font-label text-[10px] text-secondary mb-2 uppercase tracking-tighter">Voice Decryption</div>
            <div className="flex items-center gap-1">
              {[3, 5, 2, 4, 3].map((h, i) => (
                <div key={i} className={`w-1 h-${h} bg-secondary${i % 2 === 0 ? '' : '/60'}`} />
              ))}
            </div>
            <div className="font-label text-[10px] text-on-surface-variant mt-2 uppercase">Analyzing...</div>
          </div>
        </section>
      </div>
    </div>
  );
}
