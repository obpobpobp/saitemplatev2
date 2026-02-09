'use client';

import React from 'react';
import classNames from 'classnames';
import { ChatMessageProps } from './ChatMessage.types';
import styles from './ChatMessage.module.css';

/**
 * ChatMessage - Individual message in chat
 * Supports both user and assistant messages
 * 
 * @example
 * <ChatMessage sender="assistant">
 *   I will prepare a mock exam for you...
 * </ChatMessage>
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({
  children,
  sender = 'assistant',
  timestamp,
  showAvatar = false,
  avatar,
  className,
}) => {
  const formatTimestamp = (ts: Date | string): string => {
    const date = typeof ts === 'string' ? new Date(ts) : ts;
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={classNames(
        styles.message,
        styles[sender],
        className
      )}
    >
      {showAvatar && sender === 'assistant' && (
        <div className={styles.avatarWrapper}>
          {typeof avatar === 'string' ? (
            <img src={avatar} alt="Assistant avatar" className={styles.avatar} />
          ) : (
            avatar || <div className={styles.defaultAvatar} />
          )}
        </div>
      )}
      
      <div className={styles.content}>
        <div className={styles.bubble}>
          {children}
        </div>
        
        {timestamp && (
          <span className={styles.timestamp}>
            {formatTimestamp(timestamp)}
          </span>
        )}
      </div>
    </div>
  );
};







