'use client';

import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { ChatInputProps } from './ChatInput.types';
import { Spinner } from '@design-system/components/buttons/Spinner';
import styles from './ChatInput.module.css';

/**
 * ChatInput - Redesigned input field for chat messages
 * Follows Figma design with support for quiz, summary, and source context
 * 
 * @example
 * <ChatInput 
 *   placeholder="Ask about this project"
 *   onSubmit={handleSend}
 *   aiTool="quiz"
 *   sources={sources}
 * />
 */
export const ChatInput: React.FC<ChatInputProps> = ({
  value: controlledValue,
  placeholder = 'Ask about this project',
  onChange,
  onSubmit,
  onAddClick,
  onContextClick,
  onCreateClick,
  onSourceToggle,
  isDisabled = false,
  isProcessing = false,
  maxLength,
  aiTool = 'ask-ai',
  sources = [],
  showContextMenu = false,
  attachments = [],
  className,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const canSend = value.trim().length > 0 && !isProcessing;
  const hasContent = value.length > 0 || attachments.length > 0;
  const isInputDisabled = isDisabled || isProcessing;
  
  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      const newHeight = Math.min(inputRef.current.scrollHeight, 250);
      inputRef.current.style.height = `${newHeight}px`;
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
    if (canSend && !isInputDisabled) {
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

  // Get placeholder content based on AI tool
  const getPlaceholderContent = (): React.ReactNode => {
    if (aiTool === 'quiz') {
      return (
        <>
          <span className={styles.placeholderRegular}>Generate a </span>
          <span className={styles.placeholderBold}>Quiz</span>
          <span className={styles.placeholderRegular}> about this content</span>
        </>
      );
    }
    if (aiTool === 'summary') {
      return (
        <>
          <span className={styles.placeholderRegular}>Generate a </span>
          <span className={styles.placeholderBold}>Summary</span>
          <span className={styles.placeholderRegular}> of this content</span>
        </>
      );
    }
    if (aiTool === 'create') {
      return (
        <>
          <span className={styles.placeholderBold}>/Quiz</span>
          <span className={styles.placeholderRegular}> about </span>
          <span className={styles.placeholderBold}>@2 sources</span>
        </>
      );
    }
    return placeholder;
  };

  const showCustomPlaceholder = value.length === 0 && aiTool !== 'ask-ai';
  const isActive = isFocused || hasContent;

  return (
    <div 
      className={classNames(
        styles.wrapper, 
        isActive && styles.active,
        hasContent && styles.hasContent,
        attachments.length > 0 && styles.hasAttachments,
        isProcessing && styles.processing,
        className
      )}
    >
      {/* Attachments */}
      {attachments.length > 0 && (
        <div className={styles.attachments}>
          {attachments.map((attachment) => (
            <div key={attachment.id} className={styles.attachment}>
              <div className={styles.attachmentPreview}>
                {attachment.isLoading && (
                  <div className={styles.loadingCircular}>
                    <div className={styles.loadingRing} />
                  </div>
                )}
              </div>
              <button
                className={styles.removeAttachment}
                onClick={attachment.onRemove}
                aria-label="Remove attachment"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Chat Section */}
      <div className={styles.chatSection}>
        {/* Custom Placeholder */}
        {showCustomPlaceholder && (
          <div 
            className={styles.customPlaceholder} 
            onClick={() => inputRef.current?.focus()}
          >
            {getPlaceholderContent()}
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
          disabled={isInputDisabled}
          maxLength={maxLength}
          rows={1}
          aria-label="Chat message input"
        />

        {/* Scrollbar for long text */}
        {value.length > 150 && (
          <div className={styles.scrollbar}>
            <div className={styles.scrollbarThumb} />
          </div>
        )}
      </div>
      
      {/* Button Group */}
      <div className={styles.buttonGroup}>
        {/* Add button (always visible) */}
        <button
          type="button"
          className={styles.addButton}
          onClick={onAddClick}
          disabled={isInputDisabled}
          aria-label="Add attachments"
        >
          <i className="fa-solid fa-plus" aria-hidden="true" />
        </button>

        {/* Context and Create buttons (show when focused or has content) */}
        {isActive && (
          <>
            {onContextClick && (
              <button
                type="button"
                className={classNames(
                  styles.actionButton,
                  showContextMenu && styles.active
                )}
                onClick={onContextClick}
                disabled={isInputDisabled}
                aria-label="Context"
              >
                <i className="fa-solid fa-sparkles" aria-hidden="true" />
                <span>Context</span>
              </button>
            )}
            
            {onCreateClick && (
              <button
                type="button"
                className={styles.actionButton}
                onClick={onCreateClick}
                disabled={isInputDisabled || !hasContent}
                aria-label="Create"
              >
                <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" />
                <span>Create</span>
              </button>
            )}
          </>
        )}
        
        <div className={styles.spacer} />
        
        {/* Send button */}
        <button
          type="button"
          className={classNames(
            styles.sendButton,
            canSend && styles.active,
            isProcessing && styles.processing
          )}
          onClick={handleSubmit}
          disabled={!canSend || isInputDisabled}
          aria-label={isProcessing ? 'Processing message' : 'Send message'}
        >
          {isProcessing ? (
            <Spinner size="small" ariaLabel="Processing" />
          ) : (
            <i className="fa-solid fa-arrow-up" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Context Menu (Sources Dropdown) */}
      {showContextMenu && sources.length > 0 && (
        <div className={styles.contextDropdown}>
          <div className={styles.sourcesList}>
            <div className={styles.sourceItem}>
              <input
                type="checkbox"
                id="source-all"
                checked={sources.every((s) => s.selected)}
                onChange={() => {
                  sources.forEach((s) => onSourceToggle?.(s.id));
                }}
              />
              <label htmlFor="source-all" className={styles.sourceLabel}>
                <span className={styles.sourceName}>All sources</span>
              </label>
            </div>
            
            {sources.map((source) => (
              <div key={source.id} className={styles.sourceItem}>
                <input
                  type="checkbox"
                  id={`source-${source.id}`}
                  checked={source.selected}
                  onChange={() => onSourceToggle?.(source.id)}
                />
                <label htmlFor={`source-${source.id}`} className={styles.sourceLabel}>
                  <i className={classNames(
                    'fa-duotone',
                    source.type === 'pdf' && 'fa-file-pdf',
                    source.type === 'text' && 'fa-file-lines',
                    source.type === 'slides' && 'fa-presentation',
                    source.type === 'audio' && 'fa-microphone',
                    source.type === 'video' && 'fa-video'
                  )} />
                  <span className={styles.sourceName}>{source.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


