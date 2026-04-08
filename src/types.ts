export type Screen = 
  | 'STORYBOARD' 
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
