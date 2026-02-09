'use client';

import React from 'react';
import classNames from 'classnames';
import { InlineActionButtonsProps, ActionButton } from './InlineActionButtons.types';
import styles from './InlineActionButtons.module.css';

/**
 * InlineActionButtons - Action buttons that appear at cursor position
 * Shows options like "Generate a summary", "Create a quiz", etc.
 * 
 * @example
 * <InlineActionButtons 
 *   position={{ top: 100, left: 50 }}
 *   isVisible={true}
 *   onGenerateSummary={handleSummary}
 *   onCreateQuiz={handleQuiz}
 * />
 */
export const InlineActionButtons: React.FC<InlineActionButtonsProps> = ({
  position,
  isVisible = false,
  onGenerateSummary,
  onCreateQuiz,
  onAskQuestion,
  onRecordClass,
  className,
}) => {
  if (!isVisible) {
    return null;
  }

  const buttons: ActionButton[] = [
    {
      id: 'summary',
      label: 'Generate a summary',
      icon: 'pen-nib',
      onClick: () => onGenerateSummary?.(),
    },
    {
      id: 'quiz',
      label: 'Create a quiz',
      icon: 'circle-question',
      onClick: () => onCreateQuiz?.(),
    },
    {
      id: 'question',
      label: 'Ask a question',
      icon: 'comment',
      onClick: () => onAskQuestion?.(),
    },
    {
      id: 'record',
      label: 'Record my class',
      icon: 'microphone',
      onClick: () => onRecordClass?.(),
    },
  ];

  return (
    <div
      className={classNames(styles.container, className)}
      style={position ? { top: position.top, left: position.left } : undefined}
      role="toolbar"
      aria-label="Content actions"
    >
      {buttons.map((button) => (
        <button
          key={button.id}
          type="button"
          className={styles.button}
          onClick={button.onClick}
          aria-label={button.label}
        >
          <span className={styles.icon}>
            <i className={`fa-solid fa-${button.icon}`} aria-hidden="true" />
          </span>
          <span className={styles.label}>{button.label}</span>
        </button>
      ))}
    </div>
  );
};




