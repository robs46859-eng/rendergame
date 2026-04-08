import React from 'react';
import { Screen } from '../types';
import { useMultiplayer } from '../contexts/MultiplayerContext';

interface ScreenPodcastProps {
  onNavigate: (screen: Screen, transition?: 'push' | 'push_back' | 'none') => void;
}

export default function ScreenPodcast({ onNavigate }: ScreenPodcastProps) {
  const { session, unlockStep } = useMultiplayer();
  const isMultiplayer = session && Object.keys(session.activeUsers).length > 1;
  const isBombshellUnlocked = session?.unlockedSteps.includes('BOMBSHELL') || !session;

  const handleExtraction = async () => {
    if (session && !isBombshellUnlocked) {
      await unlockStep('BOMBSHELL');
    }
    onNavigate('CIRCLE', 'push');
  };
  return (
    <div className="animate-in slide-in-from-bottom duration-700">
      <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Media & Technical Metadata */}
        <div className="md:col-span-7 flex flex-col gap-6">
          {/* Hero Surveillance Asset */}
          <div className="relative group aspect-video overflow-hidden border-t-2 border-l-2 border-primary/20 bg-surface-container-low">
            <img 
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:opacity-100 transition-opacity duration-700" 
              src="https://picsum.photos/seed/theory/1200/800"
              alt="Surveillance room"
              referrerPolicy="no-referrer"
            />
            {/* Viewfinder Accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-primary/60" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-primary/60" />
            
            {/* Playback Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-panel p-6 border border-primary/20 group-hover:border-primary/40 transition-all cursor-crosshair">
                <span className="material-symbols-outlined text-primary text-5xl">play_circle</span>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 border-r-2 border-secondary">
              <span className="font-label text-[10px] text-secondary uppercase tracking-[0.2em]">Live Feed // Encrypted</span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Latitude', value: '37.7749° N', color: 'border-primary/40', text: 'text-primary/60' },
              { label: 'Longitude', value: '122.4194° W', color: 'border-primary/40', text: 'text-primary/60' },
              { label: 'Encryption', value: 'AES-256-X', color: 'border-secondary/40', text: 'text-secondary/60' },
              { label: 'Status', value: 'INVESTIGATING', color: 'border-tertiary/40', text: 'text-tertiary/60' }
            ].map((item, idx) => (
              <div key={idx} className={`bg-surface-container-low p-4 border-l-2 ${item.color}`}>
                <p className={`font-label text-[10px] ${item.text} uppercase`}>{item.label}</p>
                <p className="font-label text-sm text-on-surface">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Scene Log */}
          <div className="bg-surface-container-low p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <span className="material-symbols-outlined text-8xl">waves</span>
            </div>
            <h3 className="font-label text-xs text-primary mb-4 tracking-[0.3em] uppercase">SCENE_LOG_ENTRY_84</h3>
            <p className="font-body text-lg text-on-surface leading-relaxed italic opacity-90">
              "Mari builds her theory wall; something is hidden. The room is quiet except for the steady, haunting rhythm of Cassidy's voice."
            </p>
          </div>
        </div>

        {/* Right Column: Narrative Detail */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container font-label text-[10px] tracking-widest uppercase border-l-2 border-tertiary">FIRST RED FLAG</span>
              <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Subject: Mari Vega</span>
            </div>
            <h2 className="font-headline text-5xl md:text-6xl text-on-surface font-bold leading-none">04 // THE PODCAST</h2>
            <div className="h-1 w-24 bg-primary mt-4" />
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <p className="font-body text-xl text-on-surface-variant leading-relaxed">
              Mari listens to Cassidy's podcast 'Unfiltered' back catalog and catches a teased episode that never aired: a <span className="text-secondary font-semibold">'season finale bombshell.'</span>
            </p>

            <div className="space-y-4">
              {[
                { id: '01', title: 'Episode 12: The Quiet Part', icon: 'lock_open', unlocked: true },
                { id: '02', title: 'Episode 13: Signal Loss', icon: 'lock_open', unlocked: true },
                { 
                  id: '03', 
                  title: isBombshellUnlocked ? 'The Bombshell [DECRYPTED]' : 'The Bombshell [LOCKED]', 
                  icon: isBombshellUnlocked ? 'lock_open' : 'lock', 
                  active: true,
                  unlocked: isBombshellUnlocked
                }
              ].map((ep, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-4 border-b border-outline-variant/30 group transition-colors cursor-pointer ${ep.active ? 'bg-primary/5 border-l-2 border-primary' : 'hover:bg-surface-container'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-label ${ep.active ? 'text-primary' : 'text-primary/40'}`}>{ep.id}</span>
                    <span className={`font-label text-sm tracking-wide uppercase ${ep.active ? 'font-bold text-primary' : ''}`}>{ep.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!ep.unlocked && (
                      <span className="font-label text-[8px] text-tertiary uppercase tracking-widest">CO-OP REQ</span>
                    )}
                    <span className={`material-symbols-outlined ${ep.active ? 'text-primary' : 'text-primary/40 group-hover:text-primary'}`}>
                      {ep.icon}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-4 text-primary/60 font-label text-xs uppercase tracking-widest">
                <span>Atmosphere:</span>
                <div className="flex gap-2">
                  <span className="text-on-surface">Curiosity</span>
                  <span className="text-primary/20">/</span>
                  <span className="text-on-surface">Unease</span>
                </div>
              </div>
              
              {session && !isMultiplayer && !isBombshellUnlocked && (
                <div className="bg-tertiary/10 p-4 border-l-2 border-tertiary">
                  <p className="font-label text-[10px] text-tertiary uppercase tracking-widest mb-1">CO-OP PROTOCOL REQUIRED</p>
                  <p className="font-body text-xs text-on-surface-variant italic">
                    "This data log is dual-encrypted. Invite another investigator to your session ({session.id}) to unlock the final extraction."
                  </p>
                </div>
              )}

              <button 
                onClick={handleExtraction}
                disabled={session && !isMultiplayer && !isBombshellUnlocked}
                className="bg-primary text-on-primary py-4 px-8 font-label text-sm tracking-[0.2em] uppercase font-bold hover:bg-primary/80 active:scale-95 transition-all w-full flex justify-between items-center group disabled:opacity-50 disabled:grayscale"
              >
                {isBombshellUnlocked ? 'Proceed with Extraction' : 'Awaiting Second Investigator'}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  {isBombshellUnlocked ? 'arrow_forward' : 'hourglass_empty'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
