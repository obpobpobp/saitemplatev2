'use client';

import React from 'react';
import classNames from 'classnames';
import { FloatingAssistantButtonProps } from './FloatingAssistantButton.types';
import styles from './FloatingAssistantButton.module.css';

// Assistant avatar - local image
const ASSISTANT_AVATAR = '/Assistant avatar.png';

/**
 * FloatingAssistantButton - Fixed bottom-right assistant button
 * Opens the chat window when clicked
 * Hidden when chat is open
 * @example
 * <FloatingAssistantButton onClick={() => toggleChat()} isOpen={isChatOpen} />
 */
export const FloatingAssistantButton: React.FC<FloatingAssistantButtonProps> = ({
  onClick,
  className,
  isOpen = false,
  label = 'Study Assistant',
}) => {
  // Don't render button when chat is open
  if (isOpen) {
    return null;
  }

  return (
    <button
      type="button"
      className={classNames(styles.button, className)}
      onClick={onClick}
      aria-label="Open Study Assistant"
      aria-expanded={false}
    >
      <div className={styles.avatar}>
        <img src={ASSISTANT_AVATAR} alt="Study Assistant" className={styles.avatarImage} />
      </div>
      <span className={styles.label}>{label}</span>
    </button>
  );
};
