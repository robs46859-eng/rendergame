import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Screen, NavigationState, TransitionType } from './types';
import Layout from './components/Layout';
import ScreenStoryboard from './components/ScreenStoryboard';
import ScreenRefuge from './components/ScreenRefuge';
import ScreenCircle from './components/ScreenCircle';
import ScreenLegacy from './components/ScreenLegacy';
import ScreenPodcast from './components/ScreenPodcast';

export default function App() {
  const [navState, setNavState] = useState<NavigationState>({
    currentScreen: 'STORYBOARD',
    history: [],
    transition: 'none'
  });

  const navigate = useCallback((screen: Screen, transition: TransitionType = 'none') => {
    setNavState(prev => {
      // Don't navigate to the same screen
      if (prev.currentScreen === screen) return prev;

      const newHistory = transition === 'push' 
        ? [...prev.history, prev.currentScreen] 
        : transition === 'push_back' 
          ? prev.history.slice(0, -1) 
          : prev.history;

      return {
        currentScreen: screen,
        history: newHistory,
        transition
      };
    });
  }, []);

  const renderScreen = () => {
    switch (navState.currentScreen) {
      case 'STORYBOARD':
        return <ScreenStoryboard onNavigate={navigate} />;
      case 'REFUGE':
        return <ScreenRefuge onNavigate={navigate} />;
      case 'CIRCLE':
        return <ScreenCircle onNavigate={navigate} />;
      case 'LEGACY':
        return <ScreenLegacy onNavigate={navigate} />;
      case 'PODCAST':
        return <ScreenPodcast onNavigate={navigate} />;
      default:
        return <ScreenStoryboard onNavigate={navigate} />;
    }
  };

  const variants = {
    push: {
      initial: { x: '100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100%', opacity: 0 }
    },
    push_back: {
      initial: { x: '-100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '100%', opacity: 0 }
    },
    none: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    }
  };

  const currentVariant = variants[navState.transition] || variants.none;

  return (
    <Layout 
      currentScreen={navState.currentScreen} 
      onNavigate={navigate}
      caseFile={navState.currentScreen === 'STORYBOARD' ? "882-04" : navState.currentScreen === 'PODCAST' ? "8421-X" : "882-04"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={navState.currentScreen}
          initial={currentVariant.initial}
          animate={currentVariant.animate}
          exit={currentVariant.exit}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
