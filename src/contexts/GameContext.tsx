import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { GameState, DialogueNode, GameLocation, DialogueChoice } from '../types';

interface GameContextType {
  gameState: GameState;
  currentLocation: GameLocation | null;
  currentDialogueNode: DialogueNode | null;
  setFlag: (key: string, value: any) => void;
  addToInventory: (item: string) => void;
  navigateLocation: (locationId: string) => void;
  startDialogue: (nodeId: string) => void;
  makeChoice: (choice: DialogueChoice) => void;
  closeDialogue: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Sample Data
const LOCATIONS: Record<string, GameLocation> = {
  'dorm_room': {
    id: 'dorm_room',
    name: 'Max\'s Dorm Room',
    backgroundImg: 'https://picsum.photos/seed/dorm/1920/1080?blur=2',
    objects: [
      {
        id: 'photo_album',
        name: 'Photo Album',
        description: 'A collection of memories. Some are better left buried.',
        icon: 'photo_library',
        position: { x: 30, y: 60 },
        onInteract: (flags) => {
          console.log('Interacted with photo album');
        }
      },
      {
        id: 'diary',
        name: 'Diary',
        description: 'My private thoughts. I should keep this safe.',
        icon: 'menu_book',
        position: { x: 70, y: 40 },
        onInteract: (flags) => {
          flags.readDiary = true;
        }
      }
    ]
  },
  'hallway': {
    id: 'hallway',
    name: 'Blackwell Hallway',
    backgroundImg: 'https://picsum.photos/seed/hallway/1920/1080?blur=2',
    objects: [
      {
        id: 'chloe',
        name: 'Chloe Price',
        description: 'My best friend. She looks upset.',
        icon: 'person',
        position: { x: 50, y: 70 },
        onInteract: (flags) => {
          // Trigger dialogue
        }
      }
    ]
  }
};

const DIALOGUE_GRAPH: Record<string, DialogueNode> = {
  'chloe_intro': {
    id: 'chloe_intro',
    speaker: 'Chloe',
    text: 'Max, where have you been? I\'ve been waiting for hours.',
    choices: [
      {
        id: 'c1',
        text: 'I was studying, I\'m sorry.',
        targetNodeId: 'chloe_study',
        onSelect: (flags) => { flags.chloeTrust = (flags.chloeTrust || 0) - 1; }
      },
      {
        id: 'c2',
        text: 'I lost track of time. I was thinking about us.',
        targetNodeId: 'chloe_thinking',
        isButterflyEffect: true,
        butterflyMessage: 'Chloe will remember your honesty.',
        onSelect: (flags) => { flags.chloeTrust = (flags.chloeTrust || 0) + 1; }
      }
    ]
  },
  'chloe_study': {
    id: 'chloe_study',
    speaker: 'Chloe',
    text: 'Typical Max. Always the "good student". Whatever.',
    choices: [
      { id: 'c3', text: 'Let\'s just go.', targetNodeId: 'end' }
    ]
  },
  'chloe_thinking': {
    id: 'chloe_thinking',
    speaker: 'Chloe',
    text: 'Oh... I didn\'t know you still thought about that. Thanks for being real with me.',
    choices: [
      { id: 'c4', text: 'Of course. Let\'s go.', targetNodeId: 'end' }
    ]
  }
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    flags: {},
    inventory: [],
    currentLocationId: 'dorm_room',
    currentDialogueNodeId: null,
    lastButterflyEffect: null
  });

  const setFlag = useCallback((key: string, value: any) => {
    setGameState(prev => ({
      ...prev,
      flags: { ...prev.flags, [key]: value }
    }));
  }, []);

  const addToInventory = useCallback((item: string) => {
    setGameState(prev => ({
      ...prev,
      inventory: [...prev.inventory, item]
    }));
  }, []);

  const navigateLocation = useCallback((locationId: string) => {
    setGameState(prev => ({
      ...prev,
      currentLocationId: locationId
    }));
  }, []);

  const startDialogue = useCallback((nodeId: string) => {
    setGameState(prev => ({
      ...prev,
      currentDialogueNodeId: nodeId
    }));
  }, []);

  const makeChoice = useCallback((choice: DialogueChoice) => {
    if (choice.onSelect) {
      choice.onSelect(gameState.flags);
    }

    setGameState(prev => ({
      ...prev,
      currentDialogueNodeId: choice.targetNodeId === 'end' ? null : choice.targetNodeId,
      lastButterflyEffect: choice.isButterflyEffect ? choice.butterflyMessage || 'This action will have consequences.' : null
    }));

    // Clear butterfly effect message after a delay
    if (choice.isButterflyEffect) {
      setTimeout(() => {
        setGameState(prev => ({ ...prev, lastButterflyEffect: null }));
      }, 5000);
    }
  }, [gameState.flags]);

  const closeDialogue = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentDialogueNodeId: null
    }));
  }, []);

  const currentLocation = LOCATIONS[gameState.currentLocationId] || null;
  const currentDialogueNode = gameState.currentDialogueNodeId ? DIALOGUE_GRAPH[gameState.currentDialogueNodeId] : null;

  return (
    <GameContext.Provider value={{
      gameState,
      currentLocation,
      currentDialogueNode,
      setFlag,
      addToInventory,
      navigateLocation,
      startDialogue,
      makeChoice,
      closeDialogue
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
