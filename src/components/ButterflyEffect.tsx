import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../contexts/GameContext';

export default function ButterflyEffect() {
  const { gameState } = useGame();

  return (
    <AnimatePresence>
      {gameState.lastButterflyEffect && (
        <motion.div
          className="fixed top-12 left-12 z-[100] flex items-center gap-4 bg-black/80 backdrop-blur-xl border border-primary/30 p-6 shadow-2xl"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-primary text-4xl animate-pulse">🦋</span>
            <div className="absolute inset-0 bg-primary blur-xl opacity-20" />
          </div>
          <div>
            <p className="font-label text-[10px] text-primary tracking-[0.3em] uppercase mb-1">CONSEQUENCE_TRIGGERED</p>
            <p className="font-serif text-lg text-white italic">{gameState.lastButterflyEffect}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
