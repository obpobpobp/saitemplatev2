'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type PersonaType = 'many-projects' | 'few-projects' | 'new-user';

interface PersonaContextType {
  persona: PersonaType;
  setPersona: (persona: PersonaType) => void;
  isPanelOpen: boolean;
  togglePanel: () => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<PersonaType>('many-projects');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Load persona from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dev-persona');
    if (saved && (saved === 'many-projects' || saved === 'few-projects' || saved === 'new-user')) {
      setPersonaState(saved);
    }
  }, []);

  const setPersona = (newPersona: PersonaType) => {
    setPersonaState(newPersona);
    localStorage.setItem('dev-persona', newPersona);
  };

  const togglePanel = useCallback(() => {
    setIsPanelOpen(prev => !prev);
  }, []);

  // Keyboard shortcut: Ctrl+Option+T
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 't') {
        e.preventDefault();
        togglePanel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePanel]);

  return (
    <PersonaContext.Provider value={{ persona, setPersona, isPanelOpen, togglePanel }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}







