'use client';

import React from 'react';
import classNames from 'classnames';
import { ChatMessageProps } from './ChatMessage.types';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import styles from './ChatMessage.module.css';

/**
 * ChatMessage - Individual message in chat
 * Supports both user and assistant messages with optional typing effect
 * 
 * Features:
 * - Character-by-character typing animation for assistant messages
 * - Blinking cursor during typing
 * - Avatar display support
 * - Timestamp display
 * - Reduced motion support
 * 
 * @example
 * <ChatMessage sender="assistant">
 *   I will prepare a mock exam for you...
 * </ChatMessage>
 * 
 * @example
 * <ChatMessage 
 *   sender="assistant" 
 *   enableTyping={true}
 *   typingSpeed={30}
 *   onTypingComplete={() => console.log('Done!')}
 * >
 *   This text will appear character by character.
 * </ChatMessage>
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({
  children,
  sender = 'assistant',
  timestamp,
  showAvatar = false,
  avatar,
  className,
  enableTyping = false,
  typingSpeed = 30,
  onTypingComplete,
}) => {
  const formatTimestamp = (ts: Date | string): string => {
    const date = typeof ts === 'string' ? new Date(ts) : ts;
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // Get the text content for typing effect
  const textContent = typeof children === 'string' ? children : '';
  
  // Use typing effect only for assistant messages when enabled
  const shouldUseTyping = Boolean(enableTyping && sender === 'assistant' && textContent);
  
  const { displayedText, isTyping } = useTypingEffect({
    text: textContent,
    speed: typingSpeed,
    enabled: shouldUseTyping,
    onComplete: onTypingComplete,
  });

  // Determine what to display
  const displayContent = shouldUseTyping ? displayedText : children;

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
          {displayContent}
          {isTyping && <span className={styles.typingCursor}>|</span>}
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







