/**
 * EmptyCreationsState - Per-view empty state
 */

'use client';

import classNames from 'classnames';
import type { EmptyCreationsStateProps } from './EmptyCreationsState.types';
import styles from './EmptyCreationsState.module.css';

const EMPTY_STATES = {
  recent: {
    icon: '✨',
    title: 'No creations yet',
    description: 'Create a mock exam or flashcards to start practicing',
  },
  exam: {
    icon: '📅',
    title: 'No exams scheduled',
    description: 'Add an exam date to organize your prep by milestone',
  },
  type: {
    icon: '📚',
    title: 'Nothing created yet',
    description: 'Start with a mock exam to test yourself, or flashcards to memorize key concepts',
  },
};

export const EmptyCreationsState: React.FC<EmptyCreationsStateProps> = ({
  view,
  onAddExam,
  className,
}) => {
  const state = EMPTY_STATES[view];
  
  return (
    <div className={classNames(styles.empty, className)}>
      <div className={styles.icon}>{state.icon}</div>
      <div className={styles.title}>{state.title}</div>
      <div className={styles.description}>{state.description}</div>
      
      {view === 'exam' && onAddExam && (
        <button 
          className={styles.button}
          onClick={onAddExam}
          type="button"
        >
          + Add Exam
        </button>
      )}
    </div>
  );
};

EmptyCreationsState.displayName = 'EmptyCreationsState';
