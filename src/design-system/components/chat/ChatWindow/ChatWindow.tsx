'use client';

import React, { useEffect, useRef } from 'react';
import { ChatWindowProps } from './ChatWindow.types';
import { ChatInput } from '../ChatInput';
import { TypingIndicator } from '../TypingIndicator';
import styles from './ChatWindow.module.css';

const ASSISTANT_AVATAR = '/Assistant avatar.png';

/**
 * ChatWindow - Sliding chat panel for AI assistant
 * Slides in from the right with smooth animation
 */
export const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  onClose,
  messages = [],
  suggestedActions = [],
  onSendMessage,
  onActionClick,
  onAddClick,
  onContextClick,
  onCreateClick,
  onSourceToggle,
  aiTool = 'ask-ai',
  sources = [],
  showContextMenu = false,
  attachments = [],
  className,
  inline = false,
  isThinking = false,
  onTypingComplete,
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when chat is open (only for non-inline mode)
  useEffect(() => {
    if (!inline && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, inline]);

  // Auto-scroll to bottom when messages change or thinking state changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isThinking]);

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <>
      {/* Overlay - Only for non-inline mode */}
      {!inline && isOpen && (
        <div 
          className={styles.overlay} 
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Chat Window */}
      <div 
        className={`${styles.window} ${isOpen ? styles.open : ''} ${inline ? styles.inline : ''} ${className || ''}`}
        role="dialog"
        aria-label="Study Assistant Chat"
        aria-hidden={!isOpen}
      >
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar}>
                <img src={ASSISTANT_AVATAR} alt="Study Assistant" />
              </div>
              <h2 className={styles.title}>Study Assistant</h2>
            </div>
            <button 
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close chat"
            >
              <i className="fa-solid fa-times" />
            </button>
          </div>

          {/* Content */}
          <div className={styles.content}>
            <div className={styles.messagesArea}>
              {messages.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <i className="fa-solid fa-sparkles" />
                  </div>
                  <p className={styles.emptyText}>
                    Hi! I'm your Study Assistant. How can I help you today?
                  </p>
                </div>
              ) : (
                <div className={styles.messages}>
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`${styles.message} ${
                        message.role === 'user' ? styles.userMessage : styles.assistantMessage
                      }`}
                    >
                      {message.role === 'assistant' && message.attachments && message.attachments.length > 0 && (
                        <div className={styles.attachmentsStack}>
                          {message.attachments.map((attachment, idx) => {
                            // Define rotation angles for each file
                            const rotations = [10, 5, 0];
                            const rotation = rotations[idx] || 0;
                            
                            return (
                              <div 
                                key={idx} 
                                className={styles.attachmentWrapper}
                                style={{
                                  transform: `rotate(${rotation}deg)`,
                                  zIndex: message.attachments!.length - idx
                                }}
                              >
                                <div className={styles.attachment}>
                                  <div className={styles.attachmentIcon}>
                                    <div className={styles.iconBackground} />
                                    <i className={`fa-solid ${
                                      attachment.type === 'pdf' ? 'fa-file' :
                                      attachment.type === 'image' ? 'fa-file-image' :
                                      attachment.type === 'text' ? 'fa-text' :
                                      attachment.type === 'ppt' ? 'fa-presentation-screen' :
                                      'fa-file'
                                    }`} />
                                  </div>
                                  <span className={styles.attachmentName}>{attachment.name}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <div className={styles.messageContent}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                  
                  {/* Thinking Indicator */}
                  {isThinking && (
                    <div className={styles.thinkingContainer}>
                      <TypingIndicator />
                    </div>
                  )}
                  
                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* User Area - Actions + Input */}
            <div className={styles.userArea}>
              {/* Suggested Actions */}
              {suggestedActions.length > 0 && (
                <div className={styles.suggestedActions}>
                  <h3 className={styles.suggestedActionsTitle}>Next actions:</h3>
                  <div className={styles.actionButtons}>
                    {suggestedActions.map((action, index) => (
                      <button
                        key={index}
                        className={styles.actionButton}
                        onClick={() => onActionClick?.(action.action)}
                      >
                        {action.icon && <i className={action.icon} />}
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area - Using ChatInput component */}
              <ChatInput
                value={inputValue}
                onChange={setInputValue}
                onSubmit={handleSend}
                onAddClick={onAddClick}
                onContextClick={onContextClick}
                onCreateClick={onCreateClick}
                onSourceToggle={onSourceToggle}
                aiTool={aiTool}
                sources={sources}
                showContextMenu={showContextMenu}
                attachments={attachments}
                placeholder="Ask about this project"
                className={styles.chatInput}
                isProcessing={isThinking}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
