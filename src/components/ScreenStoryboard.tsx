import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, UserPresence } from '../types';
import { useMultiplayer } from '../contexts/MultiplayerContext';

interface ScreenStoryboardProps {
  onNavigate: (screen: Screen, transition?: 'push' | 'push_back' | 'none') => void;
}

export default function ScreenStoryboard({ onNavigate }: ScreenStoryboardProps) {
  const { user, session, login, createSession, joinSession, unlockStep } = useMultiplayer();
  const [expandedAct, setExpandedAct] = useState<number | null>(1);
  const [selectedPersonnel, setSelectedPersonnel] = useState<string | null>(null);
  const [joinId, setJoinId] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleCreateSession = async () => {
    try {
      await createSession('RENDER-01');
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoinSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinId) return;
    setIsJoining(true);
    try {
      await joinSession(joinId);
    } catch (err) {
      alert('Session not found');
    } finally {
      setIsJoining(false);
    }
  };

  const isStepUnlocked = (stepId: string) => {
    if (!session) return true; // Default to unlocked if no session for now, or we could hide them
    return session.unlockedSteps.includes(stepId);
  };

  const personnel = [
    { 
      id: '01', 
      name: 'Elias Thorne', 
      role: 'THE ARCHITECT', 
      img: 'https://picsum.photos/seed/man1/300/400', 
      color: 'bg-primary',
      status: 'MISSING',
      clearance: 'LEVEL 5',
      lastSeen: 'Sector 7, 04:00',
      bio: 'A visionary in neural rendering, Thorne disappeared shortly after the first deepfake breach. His legacy is a labyrinth of encrypted memories. Intelligence suggests he may have uploaded his consciousness to the Render core before the system purge.'
    },
    { 
      id: '02', 
      name: 'Dr. Sarah Vane', 
      role: 'FORENSIC ANALYST', 
      img: 'https://picsum.photos/seed/woman1/300/400', 
      color: 'bg-secondary',
      status: 'ACTIVE',
      clearance: 'LEVEL 4',
      lastSeen: 'Forensics Lab, 09:15',
      bio: 'Specializing in synthetic artifacting, Vane can spot a deepfake by the rhythm of its pixels. She is the only one who can decrypt the truth behind the corrupted data logs. Her loyalty to the project is unquestioned, but her methods are increasingly erratic.'
    },
    { 
      id: '03', 
      name: 'Noah Reed', 
      role: 'FIELD AGENT', 
      img: 'https://picsum.photos/seed/man2/300/400', 
      color: 'bg-tertiary',
      status: 'UNDER SURVEILLANCE',
      clearance: 'LEVEL 3',
      lastSeen: 'The Refuge, 22:30',
      bio: 'A former detective with a knack for finding physical evidence in a digital world. Reed is the boots on the ground for the Render project. He has a history of insubordination but his results are undeniable. Currently being monitored for unauthorized contact with external entities.'
    }
  ];

  const acts = [
    {
      id: 1,
      title: "The Body",
      subtitle: "DISCOVERY PHASE",
      color: "border-tertiary",
      steps: [
        {
          id: "1.1",
          tag: "INCITING INCIDENT",
          title: "The Cold Storage Room",
          description: "The server farm cooling system fails, revealing more than just corrupted data—a physical remains found within the hardware racks.",
          psychology: "Shock transition into analytical detachment.",
          mood: "Sterile, fluorescent flickers, high contrast blue tones.",
          target: 'REFUGE' as Screen
        },
        {
          id: "1.2",
          tag: "DEEPFAKE REVEAL",
          title: "Digital Ghost",
          description: "The victim's personal AI continues to send meeting invites, but the biometrics don't match the body found.",
          target: 'REFUGE' as Screen
        }
      ]
    },
    {
      id: 2,
      title: "The Investigation",
      subtitle: "LOGIC DECRYPTION",
      color: "border-primary",
      steps: [
        {
          id: "2.1",
          tag: "VITAL NARRATIVE CLUE",
          title: "The Podcast Trail",
          description: "A hidden audio file in a popular tech podcast reveals a connection to the victim.",
          target: 'PODCAST' as Screen
        }
      ]
    },
    {
      id: 3,
      title: "The Reckoning",
      subtitle: "SYSTEM PURGE",
      color: "border-secondary",
      steps: [
        {
          id: "3.1",
          tag: "SYSTEM LOG / DATA",
          title: "The Legacy Protocol",
          description: "The final decryption reveals the true architect of the renderings.",
          target: 'LEGACY' as Screen
        }
      ]
    }
  ];

  return (
    <div className="px-6 space-y-12 max-w-4xl mx-auto">
      {/* Hero Header */}
      <section className="relative h-[400px] w-full overflow-hidden border border-outline-variant/20">
        <img 
          src="https://picsum.photos/seed/surveillance/1200/800" 
          alt="Surveillance Room" 
          className="w-full h-full object-cover opacity-60 grayscale contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-8 left-8">
          <p className="font-label text-primary text-xs tracking-[0.3em] uppercase mb-2">PROJECT // CODE: RED</p>
          <h1 className="font-headline text-6xl font-bold tracking-tighter italic">RENDER</h1>
          <div className="w-24 h-1 bg-primary mt-2" />
          <p className="font-label text-outline text-[10px] tracking-widest mt-4 uppercase">SYSTEM INITIALIZATION COMPLETE</p>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="bg-surface-container-low p-8 border border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <span className="material-symbols-outlined text-9xl">help_outline</span>
        </div>
        <h2 className="font-headline text-3xl italic mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">info</span>
          System_Briefing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-4">
            <h3 className="font-label text-xs text-primary tracking-widest uppercase">Objective</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Navigate through the narrative sequence to uncover the truth behind the "Render" project. Collect evidence, analyze suspect profiles, and decrypt hidden logs to solve the mystery.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-label text-xs text-primary tracking-widest uppercase">Controls</h3>
            <ul className="space-y-2 font-body text-sm text-on-surface-variant">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Use the <span className="text-on-surface font-semibold">TIMELINE</span> to track your progress through the acts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Access <span className="text-on-surface font-semibold">DATA LOGS</span> within each act to view detailed evidence.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Monitor <span className="text-on-surface font-semibold">SENSORS</span> and <span className="text-on-surface font-semibold">EVIDENCE</span> tabs for real-time updates.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Personnel Files */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="font-headline text-3xl italic">Personnel_Files</h2>
          <span className="font-label text-[10px] text-outline uppercase tracking-widest">CLICK TO VIEW BIO</span>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {personnel.map(person => (
            <div 
              key={person.id} 
              onClick={() => setSelectedPersonnel(selectedPersonnel === person.id ? null : person.id)}
              className={`flex-shrink-0 w-64 bg-surface-container-low p-4 border transition-all duration-300 relative group cursor-pointer ${selectedPersonnel === person.id ? 'border-primary ring-1 ring-primary' : 'border-outline-variant/10'}`}
            >
              <div className={`absolute top-6 left-6 px-2 py-0.5 ${person.color} text-on-primary font-label text-[8px] font-bold z-10`}>
                SUBJECT {person.id}
              </div>
              <div className="aspect-[3/4] overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src={person.img} alt={person.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="font-headline text-xl">{person.name}</h3>
              <p className="font-label text-[10px] text-primary tracking-widest uppercase mb-4">{person.role}</p>
              
              <AnimatePresence>
                {selectedPersonnel === person.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-outline-variant/20 pt-4 mt-2 space-y-4">
                      <div className="grid grid-cols-2 gap-2 font-label text-[8px] tracking-widest uppercase">
                        <div>
                          <p className="text-outline mb-1">STATUS</p>
                          <p className={`font-bold ${person.status === 'MISSING' ? 'text-error' : person.status === 'ACTIVE' ? 'text-primary' : 'text-tertiary'}`}>
                            {person.status}
                          </p>
                        </div>
                        <div>
                          <p className="text-outline mb-1">CLEARANCE</p>
                          <p className="text-on-surface font-bold">{person.clearance}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-outline mb-1">LAST_SEEN</p>
                          <p className="text-on-surface font-bold">{person.lastSeen}</p>
                        </div>
                      </div>
                      <p className="font-body text-xs text-on-surface-variant leading-relaxed italic">
                        {person.bio}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Multiplayer Hub */}
      <section className="bg-surface-container-high p-8 border-t-2 border-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <span className="material-symbols-outlined text-9xl">group</span>
        </div>
        <h2 className="font-headline text-3xl italic mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary">hub</span>
          Multiplayer_Hub
        </h2>

        {!user ? (
          <div className="text-center py-6">
            <p className="font-body text-on-surface-variant mb-6">Login to start a collaborative investigation.</p>
            <button 
              onClick={login}
              className="bg-secondary text-on-secondary py-3 px-8 font-label text-sm tracking-widest uppercase font-bold hover:bg-secondary/80 transition-all"
            >
              Initialize Neural Link (Login)
            </button>
          </div>
        ) : !session ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-label text-xs text-secondary tracking-widest uppercase">Start New Session</h3>
              <p className="font-body text-sm text-on-surface-variant mb-4">Create a private room to investigate with friends.</p>
              <button 
                onClick={handleCreateSession}
                className="w-full bg-surface-container-highest border border-secondary/40 text-secondary py-3 px-6 font-label text-xs tracking-widest uppercase hover:bg-secondary hover:text-on-secondary transition-all"
              >
                Generate Session ID
              </button>
            </div>
            <div className="space-y-4">
              <h3 className="font-label text-xs text-secondary tracking-widest uppercase">Join Existing</h3>
              <form onSubmit={handleJoinSession} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="ENTER ID" 
                  value={joinId}
                  onChange={(e) => setJoinId(e.target.value.toUpperCase())}
                  className="flex-1 bg-background border border-outline-variant/30 px-4 py-2 font-mono text-sm focus:border-secondary outline-none"
                />
                <button 
                  disabled={isJoining}
                  className="bg-secondary text-on-secondary px-6 py-2 font-label text-xs tracking-widest uppercase font-bold hover:bg-secondary/80 disabled:opacity-50"
                >
                  {isJoining ? 'LINKING...' : 'JOIN'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-label text-[10px] text-secondary tracking-widest uppercase">ACTIVE SESSION</p>
                <h3 className="font-headline text-2xl text-primary">{session.id}</h3>
              </div>
              <div className="text-right">
                <p className="font-label text-[10px] text-outline tracking-widest uppercase">INVESTIGATORS</p>
                <div className="flex -space-x-2 mt-2">
                  {(Object.values(session.activeUsers) as UserPresence[]).map((u) => (
                    <div key={u.uid} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-surface-container-highest" title={u.displayName}>
                      {u.photoURL ? (
                        <img src={u.photoURL} alt={u.displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-secondary">
                          {u.displayName ? u.displayName[0] : '?'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-background/50 p-4 border-l-2 border-primary">
              <p className="font-body text-xs text-on-surface-variant italic">
                "Neural link stable. Shared progress enabled. Unlocked data will be visible to all investigators."
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Narrative Sequence */}
      <section className="space-y-6">
        <div className="flex justify-between items-end mb-4">
          <h2 className="font-headline text-4xl italic">Narrative_Sequence</h2>
          <div className="text-right hidden md:block">
            <p className="font-label text-[10px] text-outline tracking-widest uppercase mb-1">TIMELINE_GUIDE</p>
            <p className="font-body text-[10px] text-on-surface-variant italic">Expand acts to decrypt data logs and proceed.</p>
          </div>
        </div>

        {/* Timeline Instructions */}
        <div className="bg-surface-container-highest/30 p-4 border-l-2 border-outline-variant/50 mb-8">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary">terminal</span>
            <div className="space-y-1">
              <p className="font-label text-xs text-primary uppercase tracking-widest">Initialization Protocol</p>
              <p className="font-body text-xs text-on-surface-variant">
                Select an <span className="text-on-surface font-semibold">ACT</span> to view its narrative steps. Each step contains a <span className="text-on-surface font-semibold">DATA LOG</span>. Accessing these logs will transport you to the relevant evidence sector. Some logs may require <span className="text-secondary font-semibold">CO-OP DECRYPTION</span>.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {acts.map(act => (
            <div key={act.id} className="bg-surface-container-low border border-outline-variant/10 overflow-hidden">
              <button 
                onClick={() => setExpandedAct(expandedAct === act.id ? null : act.id)}
                className={`w-full p-6 flex items-center justify-between group transition-colors ${expandedAct === act.id ? 'bg-surface-container-high' : 'hover:bg-surface-container'}`}
              >
                <div className="flex items-center gap-6">
                  <span className="font-headline text-3xl italic text-outline/30">{act.id.toString().padStart(2, '0')}</span>
                  <div className="text-left">
                    <h4 className="font-headline text-2xl group-hover:text-primary transition-colors">{act.title}</h4>
                    <p className="font-label text-[10px] text-primary tracking-widest uppercase">{act.subtitle}</p>
                  </div>
                </div>
                <span className={`material-symbols-outlined transition-transform duration-300 ${expandedAct === act.id ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              <AnimatePresence>
                {expandedAct === act.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-6 space-y-8 border-l-4 ${act.color}`}>
                      {act.steps.map((step, idx) => (
                        <div key={idx} className="space-y-4 relative">
                          <div className="flex justify-between items-start">
                            <span className="px-2 py-1 bg-surface-container-highest text-on-surface font-label text-[10px] tracking-widest uppercase">
                              {step.tag}
                            </span>
                            <span className="font-label text-xs text-outline/40 italic">{step.id}</span>
                          </div>
                          <h5 className="font-headline text-2xl">{step.title}</h5>
                          <p className="font-body text-on-surface-variant leading-relaxed">
                            {step.description}
                          </p>
                          
                          {step.psychology && (
                            <div className="bg-surface-container-highest/50 p-4 space-y-3">
                              <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-tertiary text-sm">psychology</span>
                                <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">PSYCHOLOGY</p>
                              </div>
                              <p className="text-sm italic pl-7">{step.psychology}</p>
                              
                              <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-sm">videocam</span>
                                <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">MOOD</p>
                              </div>
                              <p className="text-sm italic pl-7">{step.mood}</p>
                            </div>
                          )}

                          <button 
                            onClick={() => {
                              if (isStepUnlocked(step.id)) {
                                onNavigate(step.target, 'push');
                              } else {
                                unlockStep(step.id);
                              }
                            }}
                            className={`flex items-center gap-2 font-label text-xs tracking-widest uppercase group transition-all ${isStepUnlocked(step.id) ? 'text-primary hover:text-primary/80' : 'text-outline hover:text-secondary'}`}
                          >
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                              {isStepUnlocked(step.id) ? 'fingerprint' : 'lock'}
                            </span>
                            {isStepUnlocked(step.id) ? 'ACCESS DATA LOG' : 'DECRYPT DATA LOG'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* System Legend */}
      <section className="p-8 border border-outline-variant/20 bg-surface-container-low/50">
        <p className="font-label text-[10px] text-outline tracking-[0.4em] uppercase mb-6">SYSTEM_LEGEND // MECHANICS</p>
        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
          {[
            { label: 'INCITING INCIDENT', color: 'bg-tertiary' },
            { label: 'DEEPFAKE / SYNTHETIC', color: 'bg-secondary' },
            { label: 'VITAL NARRATIVE CLUE', color: 'bg-primary' },
            { label: 'SYSTEM LOG / DATA', color: 'bg-outline' }
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`w-3 h-3 ${item.color}`} />
              <span className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center space-y-4 opacity-40">
        <p className="font-label text-[10px] tracking-widest uppercase">SYSTEM STATUS: OPERATIONAL // RENDER ENGINE V.2.4</p>
        <div className="flex justify-center gap-8 font-label text-[10px] tracking-widest uppercase">
          <span className="cursor-pointer hover:text-primary">STORY_LOGS</span>
          <span className="cursor-pointer hover:text-primary">ENCRYPTION_KEY</span>
          <span className="cursor-pointer hover:text-primary">TERMINATE_SESSION</span>
        </div>
        <p className="font-label text-[10px] text-primary tracking-widest uppercase">©2024 NEURAL NOIR INDUSTRIES</p>
      </footer>
    </div>
  );
}
