import React from 'react';
import { Screen } from '../types';

interface ScreenRefugeProps {
  onNavigate: (screen: Screen, transition?: 'push' | 'push_back' | 'none') => void;
}

export default function ScreenRefuge({ onNavigate }: ScreenRefugeProps) {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Cinematic Header */}
      <section className="relative h-[530px] w-full overflow-hidden">
        <img 
          alt="Cinematic beach cottage" 
          className="w-full h-full object-cover grayscale contrast-125 brightness-75" 
          src="https://picsum.photos/seed/cottage/1200/800"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full md:w-2/3 lg:w-1/2">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="font-label text-primary text-xs tracking-[0.3em] uppercase">STORY BEAT // DETAILED VIEW</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-on-background leading-tight mb-2">01 // THE REFUGE</h1>
          <p className="font-label text-secondary text-sm tracking-widest uppercase">CHARACTER INTRODUCTION</p>
        </div>
      </section>

      <section className="px-8 mt-12 grid grid-cols-1 md:grid-cols-12 gap-12 max-w-7xl mx-auto">
        {/* Left Column: Summary & Scene */}
        <div className="md:col-span-7 space-y-12">
          <div>
            <h2 className="font-label text-primary text-xs tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary" /> NARRATIVE SUMMARY
            </h2>
            <p className="font-headline text-2xl md:text-3xl text-on-surface leading-relaxed italic">
              "Mari arrives in Carmel to escape her burned-out life. We establish her sharp, skeptical voice and her desperate need for quiet."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Scene Detail Card */}
            <div className="bg-surface-container-low p-6 relative border-l-2 border-secondary">
              <h3 className="font-label text-secondary text-[10px] tracking-widest uppercase mb-4">SCENE_LOG_01</h3>
              <p className="text-on-surface-variant font-body leading-relaxed">
                Beach cottage rental, morning coffee, avoidance of the real world. The air is thick with salt and unspoken regret.
              </p>
              <div className="absolute top-0 right-0 p-2 opacity-20">
                <span className="material-symbols-outlined text-xs">location_on</span>
              </div>
            </div>

            {/* Mood Card */}
            <div className="bg-surface-container-low p-6 relative border-l-2 border-primary">
              <h3 className="font-label text-primary text-[10px] tracking-widest uppercase mb-4">ATMOSPHERIC_READING</h3>
              <div className="flex items-center gap-3">
                <span className="font-headline text-xl text-on-surface">Sun-drenched melancholy</span>
              </div>
              <div className="mt-4 h-1 w-full bg-surface-variant overflow-hidden">
                <div className="h-full bg-primary w-2/3" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Character */}
        <div className="md:col-span-5 space-y-8">
          {/* Character Profile */}
          <div className="bg-surface-container-highest p-8 relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/40" />
            <h3 className="font-label text-primary text-xs tracking-[0.2em] uppercase mb-8">SUBJECT_IDENTIFICATION</h3>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-surface-variant flex items-center justify-center relative overflow-hidden">
                <img 
                  alt="Mari Vega profile portrait" 
                  className="w-full h-full object-cover filter grayscale contrast-125" 
                  src="https://picsum.photos/seed/mari/300/300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border border-primary/20" />
              </div>
              <div>
                <h4 className="font-headline text-2xl text-on-background">Mari Vega</h4>
                <span className="font-label text-secondary text-[10px] tracking-widest uppercase">PROTAGONIST // ANALYST</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                <span className="font-label text-xs text-on-surface-variant uppercase">STATUS</span>
                <span className="font-label text-xs text-primary uppercase">INCOGNITO</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                <span className="font-label text-xs text-on-surface-variant uppercase">VULNERABILITY</span>
                <span className="font-label text-xs text-secondary uppercase">HIGH_PRIORITY</span>
              </div>
            </div>
          </div>

          {/* Forensic Evidence Chips */}
          <div className="flex flex-wrap gap-2">
            {['DEEP_REPOSE', 'CARMEL_BY_THE_SEA', 'SKEPTICAL_VOICE'].map(tag => (
              <div key={tag} className="flex items-center bg-surface-container-high px-3 py-1.5 border-l-2 border-primary">
                <span className="font-label text-[10px] text-on-surface uppercase tracking-tighter">{tag}</span>
              </div>
            ))}
          </div>

          {/* Digital Log Metadata */}
          <div className="font-label text-[10px] text-outline space-y-1 opacity-50">
            <p>LAT: 36.5552° N</p>
            <p>LONG: 121.9233° W</p>
            <p>TS: 2024.10.12 // 06:14:22</p>
            <p>ENC: AES-256_OFF_GRID</p>
          </div>
        </div>
      </section>
    </div>
  );
}
