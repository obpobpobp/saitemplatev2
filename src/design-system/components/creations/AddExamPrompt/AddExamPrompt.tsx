/**
 * AddExamPrompt - Prompt to add exam dates (future use)
 */

'use client';

import classNames from 'classnames';
import type { AddExamPromptProps } from './AddExamPrompt.types';
import styles from './AddExamPrompt.module.css';

export const AddExamPrompt: React.FC<AddExamPromptProps> = ({
  onAddExam,
  className,
}) => {
  return (
    <button 
      className={classNames(styles.prompt, className)}
      onClick={onAddExam}
      type="button"
    >
      <span className={styles.icon}>📅</span>
      <div className={styles.content}>
        <div className={styles.title}>Add exam dates</div>
        <div className={styles.description}>Organize your prep by milestones</div>
      </div>
      <i className="fa-solid fa-plus" aria-hidden="true" />
    </button>
  );
};

AddExamPrompt.displayName = 'AddExamPrompt';
