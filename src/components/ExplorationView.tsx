import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../contexts/GameContext';

export default function ExplorationView() {
  const { currentLocation, gameState, startDialogue } = useGame();

  if (!currentLocation) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <motion.img
        key={currentLocation.id}
        src={currentLocation.backgroundImg}
        alt={currentLocation.name}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 2 }}
        referrerPolicy="no-referrer"
      />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%) pointer-events-none" />

      {/* Interactive Objects */}
      {currentLocation.objects.map((obj) => {
        if (obj.condition && !obj.condition(gameState.flags)) return null;

        return (
          <motion.button
            key={obj.id}
            className="absolute group flex flex-col items-center gap-2"
            style={{ left: `${obj.position.x}%`, top: `${obj.position.y}%` }}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              if (obj.id === 'chloe') {
                startDialogue('chloe_intro');
              } else {
                obj.onInteract(gameState.flags);
              }
            }}
          >
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/20 transition-all shadow-lg">
              <span className="material-symbols-outlined text-white text-2xl">{obj.icon}</span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-white text-xs font-label tracking-widest uppercase border border-white/10">
              {obj.name}
            </div>
          </motion.button>
        );
      })}

      {/* Location Name */}
      <div className="absolute bottom-12 left-12">
        <p className="font-label text-[10px] text-primary tracking-[0.4em] uppercase mb-2">CURRENT LOCATION</p>
        <h2 className="font-headline text-5xl italic text-white tracking-tighter">{currentLocation.name}</h2>
      </div>
    </div>
  );
}
