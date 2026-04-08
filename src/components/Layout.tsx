import React from 'react';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen, transition?: 'push' | 'push_back' | 'none') => void;
  caseFile?: string;
}

export default function Layout({ children, currentScreen, onNavigate, caseFile = "882-04" }: LayoutProps) {
  const getTimelineIcon = () => {
    if (currentScreen === 'PODCAST') return 'history';
    if (currentScreen === 'LEGACY' || currentScreen === 'CIRCLE') return 'history_toggle_off';
    return 'timeline';
  };

  const getEvidenceTarget = (): Screen => {
    if (currentScreen === 'LEGACY') return 'REFUGE';
    return 'LEGACY';
  };

  const getSensorsIcon = () => {
    if (currentScreen === 'REFUGE') return 'fingerprint';
    if (currentScreen === 'LEGACY' || currentScreen === 'CIRCLE') return 'sensors';
    return 'query_stats';
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body relative overflow-x-hidden">
      <div className="fixed inset-0 grain-overlay z-[100]" />
      
      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          {currentScreen === 'REFUGE' ? (
            <button 
              onClick={() => onNavigate('STORYBOARD', 'push_back')}
              className="text-primary hover:text-primary/80 transition-transform hover:scale-105 glitch-effect-hover flex items-center gap-2"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="font-label text-xs tracking-widest uppercase">BACK TO TIMELINE</span>
            </button>
          ) : (
            <button 
              onClick={() => onNavigate('STORYBOARD', 'push_back')}
              className="text-primary hover:text-primary/80 transition-transform hover:scale-105 glitch-effect-hover flex items-center gap-2"
            >
              <span className="material-symbols-outlined">terminal</span>
              <span className="font-label text-xs tracking-widest uppercase hidden sm:inline">RENDER ENGINE</span>
            </button>
          )}
        </div>
        
        <div className="font-label font-bold text-primary uppercase tracking-widest">
          {currentScreen === 'REFUGE' ? 'CASE_FILE_042' : `CASE_FILE: ${caseFile}`}
        </div>
        
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary cursor-pointer hover:text-primary/80">query_stats</span>
        </div>
      </header>

      <main className="pt-16 pb-24">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 bg-background/90 backdrop-blur-md border-t border-outline-variant/10">
        <button 
          onClick={() => onNavigate('STORYBOARD', 'none')}
          className={`flex flex-col items-center justify-center transition-all group ${currentScreen === 'STORYBOARD' ? 'text-primary border-t-2 border-primary pt-1' : 'text-outline pt-2 hover:text-secondary'}`}
        >
          <span className="material-symbols-outlined mb-1 group-active:scale-95 transition-transform">{getTimelineIcon()}</span>
          <span className="font-label text-[10px] uppercase tracking-tighter">TIMELINE</span>
        </button>
        
        <button 
          onClick={() => onNavigate(getEvidenceTarget(), 'none')}
          className={`flex flex-col items-center justify-center transition-all group ${currentScreen === 'LEGACY' ? 'text-primary border-t-2 border-primary pt-1' : 'text-outline pt-2 hover:text-secondary'}`}
        >
          <span className="material-symbols-outlined mb-1 group-active:scale-95 transition-transform">folder_open</span>
          <span className="font-label text-[10px] uppercase tracking-tighter">EVIDENCE</span>
        </button>
        
        <button 
          onClick={() => onNavigate('CIRCLE', 'none')}
          className={`flex flex-col items-center justify-center transition-all group ${currentScreen === 'CIRCLE' ? 'text-primary border-t-2 border-primary pt-1' : 'text-outline pt-2 hover:text-secondary'}`}
        >
          <span className="material-symbols-outlined mb-1 group-active:scale-95 transition-transform">{getSensorsIcon()}</span>
          <span className="font-label text-[10px] uppercase tracking-tighter">SENSORS</span>
        </button>

        <button 
          onClick={() => onNavigate('PODCAST', 'none')}
          className={`flex flex-col items-center justify-center transition-all group ${currentScreen === 'PODCAST' ? 'text-primary border-t-2 border-primary pt-1' : 'text-outline pt-2 hover:text-secondary'}`}
        >
          <span className="material-symbols-outlined mb-1 group-active:scale-95 transition-transform">podcasts</span>
          <span className="font-label text-[10px] uppercase tracking-tighter">LOGS</span>
        </button>
      </nav>
    </div>
  );
}
