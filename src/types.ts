export type Screen = 
  | 'STORYBOARD' 
  | 'EXPLORATION'
  | 'DIALOGUE'
  | 'REFUGE' 
  | 'CIRCLE' 
  | 'LEGACY' 
  | 'PODCAST';

export type TransitionType = 'push' | 'push_back' | 'none';

export interface NavigationState {
  currentScreen: Screen;
  history: Screen[];
  transition: TransitionType;
}

export interface UserPresence {
  uid: string;
  displayName: string;
  photoURL: string;
  lastActive: number;
}

export interface SessionData {
  id: string;
  caseId: string;
  unlockedSteps: string[];
  activeUsers: Record<string, UserPresence>;
  createdAt: number;
  lastActivity: number;
}

// Narrative Game Types
export interface DialogueChoice {
  id: string;
  text: string;
  targetNodeId: string;
  condition?: (flags: Record<string, any>) => boolean;
  onSelect?: (flags: Record<string, any>) => void;
  isButterflyEffect?: boolean;
  butterflyMessage?: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  choices: DialogueChoice[];
  onEnter?: (flags: Record<string, any>) => void;
  backgroundImg?: string;
}

export interface InteractiveObject {
  id: string;
  name: string;
  description: string;
  icon: string;
  position: { x: number; y: number }; // Percentage 0-100
  onInteract: (flags: Record<string, any>) => void;
  condition?: (flags: Record<string, any>) => boolean;
}

export interface GameLocation {
  id: string;
  name: string;
  backgroundImg: string;
  objects: InteractiveObject[];
  ambientAudio?: string;
}

export interface GameState {
  flags: Record<string, any>;
  inventory: string[];
  currentLocationId: string;
  currentDialogueNodeId: string | null;
  lastButterflyEffect: string | null;
}
