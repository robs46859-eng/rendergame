import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth, db, signIn, signOut } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  serverTimestamp, 
  getDoc,
  Timestamp
} from 'firebase/firestore';
import { SessionData, UserPresence } from '../types';

interface MultiplayerContextType {
  user: User | null;
  session: SessionData | null;
  loading: boolean;
  error: string | null;
  createSession: (caseId: string) => Promise<string>;
  joinSession: (sessionId: string) => Promise<void>;
  unlockStep: (stepId: string) => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const MultiplayerContext = createContext<MultiplayerContextType | undefined>(undefined);

export const MultiplayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Presence update
  useEffect(() => {
    if (!user || !session) return;

    const presenceRef = doc(db, 'sessions', session.id);
    const updatePresence = async () => {
      try {
        const presence: UserPresence = {
          uid: user.uid,
          displayName: user.displayName || 'Anonymous Investigator',
          photoURL: user.photoURL || '',
          lastActive: Date.now()
        };
        await updateDoc(presenceRef, {
          [`activeUsers.${user.uid}`]: presence,
          lastActivity: serverTimestamp()
        });
      } catch (err) {
        console.error('Failed to update presence:', err);
      }
    };

    const interval = setInterval(updatePresence, 30000); // Every 30s
    updatePresence();

    return () => clearInterval(interval);
  }, [user, session?.id]);

  const createSession = async (caseId: string) => {
    if (!user) throw new Error('Must be logged in to create a session');
    const sessionId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const sessionRef = doc(db, 'sessions', sessionId);
    
    const initialData = {
      id: sessionId,
      caseId,
      unlockedSteps: [],
      activeUsers: {
        [user.uid]: {
          uid: user.uid,
          displayName: user.displayName || 'Anonymous Investigator',
          photoURL: user.photoURL || '',
          lastActive: Date.now()
        }
      },
      createdAt: serverTimestamp(),
      lastActivity: serverTimestamp()
    };

    await setDoc(sessionRef, initialData);
    await joinSession(sessionId);
    return sessionId;
  };

  const joinSession = async (sessionId: string) => {
    if (!user) throw new Error('Must be logged in to join a session');
    const sessionRef = doc(db, 'sessions', sessionId);
    const snap = await getDoc(sessionRef);
    
    if (!snap.exists()) {
      throw new Error('Session not found');
    }

    // Subscribe to session updates
    const unsubscribe = onSnapshot(sessionRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSession({
          ...data,
          id: docSnap.id,
          createdAt: (data.createdAt as Timestamp)?.toMillis() || Date.now(),
          lastActivity: (data.lastActivity as Timestamp)?.toMillis() || Date.now()
        } as SessionData);
      }
    }, (err) => {
      setError(err.message);
    });

    return () => unsubscribe();
  };

  const unlockStep = async (stepId: string) => {
    if (!session || !user) return;
    const sessionRef = doc(db, 'sessions', session.id);
    await updateDoc(sessionRef, {
      unlockedSteps: arrayUnion(stepId),
      lastActivity: serverTimestamp()
    });
  };

  const login = async () => {
    try {
      await signIn();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const logout = async () => {
    await signOut();
    setSession(null);
  };

  return (
    <MultiplayerContext.Provider value={{ 
      user, 
      session, 
      loading, 
      error, 
      createSession, 
      joinSession, 
      unlockStep,
      login,
      logout
    }}>
      {children}
    </MultiplayerContext.Provider>
  );
};

export const useMultiplayer = () => {
  const context = useContext(MultiplayerContext);
  if (context === undefined) {
    throw new Error('useMultiplayer must be used within a MultiplayerProvider');
  }
  return context;
};
