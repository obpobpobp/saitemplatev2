'use client';

import React from 'react';
import classNames from 'classnames';
import { AssistantAvatarProps } from './AssistantAvatar.types';
import styles from './AssistantAvatar.module.css';

/**
 * AssistantAvatar - Displays assistant avatar with message bubbles
 * Used on the hero section to guide users
 */
export const AssistantAvatar: React.FC<AssistantAvatarProps> = ({
  className,
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.avatar}>
        <img
          src="/Assistant avatar.png"
          alt="AI Assistant"
          className={styles.avatarImage}
        />
      </div>
      
      <div className={styles.messages}>
        <div className={classNames(styles.message, styles.firstMessage)}>
          <p className={styles.messageText}>
            To generate a mock exam, why don't you <strong>upload something</strong>?
          </p>
        </div>
        
        <div className={classNames(styles.message, styles.secondMessage)}>
          <p className={styles.messageText}>
            I need a little bit more context to create the best study material
          </p>
        </div>
      </div>
    </div>
  );
};





