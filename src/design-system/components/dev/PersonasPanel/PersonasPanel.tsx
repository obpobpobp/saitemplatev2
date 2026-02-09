'use client';

import React from 'react';
import { usePersona, PersonaType } from '@/contexts/PersonaContext';
import styles from './PersonasPanel.module.css';

/**
 * PersonasPanel - Developer tool for testing different user personas
 * Opens with Ctrl+Option+T
 */
export const PersonasPanel: React.FC = () => {
  const { persona, setPersona, isPanelOpen, togglePanel } = usePersona();

  if (!isPanelOpen) return null;

  const personas: { value: PersonaType; label: string; description: string }[] = [
    {
      value: 'many-projects',
      label: 'Many Projects User',
      description: 'User with a lot of projects on the home page'
    },
    {
      value: 'few-projects',
      label: 'Few Projects User',
      description: 'User with only a few projects'
    },
    {
      value: 'new-user',
      label: 'New User',
      description: 'First-time user seeing onboarding flow'
    }
  ];

  return (
    <>
      <div className={styles.overlay} onClick={togglePanel} />
      <div className={styles.panel}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Developer Settings</h2>
            <p className={styles.subtitle}>Test different user personas</p>
          </div>
          <button
            className={styles.closeButton}
            onClick={togglePanel}
            aria-label="Close panel"
          >
            <i className="fa-solid fa-times" />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>User Persona</h3>
            <div className={styles.personaList}>
              {personas.map((p) => (
                <button
                  key={p.value}
                  className={`${styles.personaCard} ${
                    persona === p.value ? styles.active : ''
                  }`}
                  onClick={() => setPersona(p.value)}
                >
                  <div className={styles.personaInfo}>
                    <div className={styles.personaLabel}>
                      {persona === p.value && (
                        <i className={`fa-solid fa-check ${styles.checkIcon}`} />
                      )}
                      {p.label}
                    </div>
                    <div className={styles.personaDescription}>{p.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.shortcut}>
              <kbd>Ctrl</kbd> + <kbd>Option</kbd> + <kbd>T</kbd> to toggle
            </div>
          </div>
        </div>
      </div>
    </>
  );
};







