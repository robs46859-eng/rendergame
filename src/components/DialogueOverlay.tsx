import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../contexts/GameContext';

export default function DialogueOverlay() {
  const { currentDialogueNode, makeChoice, gameState } = useGame();

  if (!currentDialogueNode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-12 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      
      <motion.div 
        className="relative w-full max-w-4xl space-y-8 pointer-events-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        {/* Speaker Name */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-primary" />
          <p className="font-label text-xs text-primary tracking-[0.3em] uppercase">{currentDialogueNode.speaker}</p>
        </div>

        {/* Dialogue Text */}
        <div className="bg-black/40 backdrop-blur-xl border-l-4 border-primary p-8 shadow-2xl">
          <p className="font-serif text-3xl text-white leading-relaxed italic">
            "{currentDialogueNode.text}"
          </p>
        </div>

        {/* Choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentDialogueNode.choices.map((choice) => {
            if (choice.condition && !choice.condition(gameState.flags)) return null;

            return (
              <motion.button
                key={choice.id}
                className="group relative bg-white/5 hover:bg-white/10 border border-white/10 p-6 text-left transition-all overflow-hidden"
                whileHover={{ x: 10 }}
                onClick={() => makeChoice(choice)}
              >
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                <div className="relative flex items-center gap-4">
                  <span className="font-label text-[10px] text-primary/40 group-hover:text-primary transition-colors">
                    {choice.isButterflyEffect ? '★' : '○'}
                  </span>
                  <p className="font-label text-sm text-white/80 group-hover:text-white tracking-wide uppercase">
                    {choice.text}
                  </p>
                </div>
                {choice.isButterflyEffect && (
                  <div className="absolute top-0 right-0 p-2">
                    <span className="material-symbols-outlined text-primary text-xs opacity-40">🦋</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
