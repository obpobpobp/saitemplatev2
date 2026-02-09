'use client';

import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { ChatInputProps, AITool } from './ChatInput.types';
import { ContextMenu } from './ContextMenu';
import type { MenuItem } from './ContextMenu.types';
import { ActionChips } from './ActionChips';
import styles from './ChatInput.module.css';

/**
 * ChatInput - Input field for chat messages
 * Supports multiple AI tool variants and states
 * 
 * @example
 * <ChatInput 
 *   placeholder="Ask about this project"
 *   onSubmit={handleSend}
 *   onAttach={handleAttach}
 *   aiTool="quiz"
 * />
 */
export const ChatInput: React.FC<ChatInputProps> = ({
  value: controlledValue,
  placeholder = 'Ask about this project',
  onChange,
  onSubmit,
  onAttach,
  onContext,
  onCreate,
  onActionChipClick,
  isDisabled = false,
  canSend: controlledCanSend,
  maxLength,
  aiTool = 'ask-ai',
  contextTags = [],
  actionChips = [],
  isLoadingAttachments = false,
  className,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const canSend = controlledCanSend !== undefined ? controlledCanSend : value.trim().length > 0;

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleSubmit = (): void => {
    if (canSend && !isDisabled) {
      onSubmit?.();
      if (controlledValue === undefined) {
        setInternalValue('');
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Get rich placeholder parts for formatted display
  const getPlaceholderParts = (): { before?: string; tool?: string; after?: string } | null => {
    if (aiTool === 'quiz') {
      return { before: 'Generate a ', tool: 'Quiz', after: ' about this content' };
    }
    if (aiTool === 'summary') {
      return { before: 'Generate a ', tool: 'Summary', after: ' of this content' };
    }
    if (aiTool === 'flashcards') {
      return { tool: 'flashcards', after: ' about this content' };
    }
    return null;
  };

  // Show context/create buttons when focused or has content
  const showActionButtons = isFocused || value.length > 0 || contextTags.length > 0;
  
  // Show custom placeholder when empty and not focused on typing
  const showCustomPlaceholder = value.length === 0 && getPlaceholderParts() !== null;

  // Menu items for attach button
  const attachMenuItems: MenuItem[] = [
    { id: 'recent', label: 'Recent materials', icon: 'fa-solid fa-clock-rotate-left', hasSubmenu: true },
    { id: 'screen', label: 'Screen Capture', icon: 'fa-solid fa-camera' },
    { id: 'upload', label: 'Upload file from computer', icon: 'fa-solid fa-arrow-up-from-bracket' },
    { id: 'audio', label: 'Audio/Voice recording', icon: 'fa-solid fa-microphone' },
  ];

  // Menu items for context button
  const contextMenuItems: MenuItem[] = [
    { id: 'recent', label: 'Recent materials', icon: 'fa-solid fa-clock-rotate-left', hasSubmenu: true },
    { id: 'screen', label: 'Screen Capture', icon: 'fa-solid fa-camera' },
    { id: 'upload', label: 'Upload file from computer', icon: 'fa-solid fa-arrow-up-from-bracket' },
    { id: 'audio', label: 'Audio/Voice recording', icon: 'fa-solid fa-microphone' },
  ];

  const handleMenuSelect = (itemId: string) => {
    console.log('Menu item selected:', itemId);
    // Handle menu selection
    if (itemId === 'upload' && onAttach) {
      onAttach();
    }
  };

  return (
    <div 
      className={classNames(
        styles.wrapper, 
        isFocused && styles.focused,
        aiTool !== 'ask-ai' && styles[`tool-${aiTool}`],
        className
      )}
    >
      {/* Action chips for quick tool switching */}
      {actionChips.length > 0 && (
        <ActionChips chips={actionChips} onSelect={onActionChipClick || (() => {})} />
      )}

      <div className={styles.inputSection}>
        {/* Context Tags */}
        {contextTags.length > 0 && (
          <div className={styles.contextTags}>
            {contextTags.map((tag) => (
              <div key={tag.id} className={styles.contextTag}>
                {tag.icon && <i className={tag.icon} />}
                <span>{tag.label}</span>
                {tag.onRemove && (
                  <button 
                    className={styles.removeTag}
                    onClick={tag.onRemove}
                    aria-label={`Remove ${tag.label}`}
                  >
                    <i className="fa-solid fa-times" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Text Input Container with Custom Placeholder */}
        <div className={styles.inputWrapper}>
          {/* Custom Rich Placeholder */}
          {showCustomPlaceholder && (
            <div className={styles.customPlaceholder} onClick={() => inputRef.current?.focus()}>
              {(() => {
                const parts = getPlaceholderParts();
                if (!parts) return null;
                return (
                  <>
                    {parts.before && <span className={styles.placeholderRegular}>{parts.before}</span>}
                    {parts.tool && <span className={styles.placeholderBold}>{parts.tool}</span>}
                    {parts.after && <span className={styles.placeholderRegular}>{parts.after}</span>}
                  </>
                );
              })()}
            </div>
          )}
          
          {/* Text Input */}
          <textarea
            ref={inputRef}
            className={styles.input}
            value={value}
            placeholder={aiTool === 'ask-ai' ? placeholder : ''}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isDisabled}
            maxLength={maxLength}
            rows={1}
            aria-label="Chat message input"
          />
        </div>
      </div>
      
      <div className={styles.buttonGroup}>
        {/* Left buttons */}
        <div className={styles.leftButtons}>
          <div className={styles.buttonWrapper}>
            <button
              type="button"
              className={classNames(
                styles.button, 
                styles.attachButton,
                showAttachMenu && styles.active
              )}
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              disabled={isDisabled}
              aria-label="Attach file"
              aria-expanded={showAttachMenu}
            >
              <i className="fa-solid fa-plus" aria-hidden="true" />
            </button>
            {showAttachMenu && (
              <ContextMenu
                items={attachMenuItems}
                onClose={() => setShowAttachMenu(false)}
                onSelect={handleMenuSelect}
                position="bottom-left"
              />
            )}
          </div>

          {/* Context and Create buttons */}
          {showActionButtons && (
            <>
              {onContext && (
                <div className={styles.buttonWrapper}>
                  <button
                    type="button"
                    className={classNames(
                      styles.button, 
                      styles.actionButton,
                      showContextMenu && styles.active
                    )}
                    onClick={() => setShowContextMenu(!showContextMenu)}
                    disabled={isDisabled}
                    aria-label="Context"
                    aria-expanded={showContextMenu}
                  >
                    <i className="fa-solid fa-sparkles" aria-hidden="true" />
                    <span>Context</span>
                  </button>
                  {showContextMenu && (
                    <ContextMenu
                      items={contextMenuItems}
                      onClose={() => setShowContextMenu(false)}
                      onSelect={handleMenuSelect}
                      position="bottom-left"
                    />
                  )}
                </div>
              )}
              {onCreate && (
                <button
                  type="button"
                  className={classNames(styles.button, styles.actionButton)}
                  onClick={onCreate}
                  disabled={isDisabled}
                  aria-label="Create"
                >
                  <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" />
                  <span>Create</span>
                </button>
              )}
            </>
          )}
        </div>

        {/* Loading state */}
        {isLoadingAttachments && (
          <div className={styles.loadingDots}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        )}
        
        <div className={styles.spacer} />
        
        {/* Send button */}
        <button
          type="button"
          className={classNames(
            styles.button,
            styles.sendButton,
            !canSend && styles.disabled
          )}
          onClick={handleSubmit}
          disabled={!canSend || isDisabled}
          aria-label="Send message"
        >
          <i className="fa-solid fa-arrow-up" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};


