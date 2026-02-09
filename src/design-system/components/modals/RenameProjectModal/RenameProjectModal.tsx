'use client';

import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { RenameProjectModalProps } from './RenameProjectModal.types';
import { EmojiPicker } from '../EmojiPicker';
import styles from './RenameProjectModal.module.css';

/**
 * RenameProjectModal - Modal for renaming projects with emoji picker
 * Matches Figma design node-id=9446-64833
 * 
 * Features:
 * - Editable project title
 * - Emoji selection button (opens emoji picker)
 * - Cancel and Done actions
 * 
 * @example
 * <RenameProjectModal
 *   isOpen={true}
 *   currentTitle="Untitled Project"
 *   currentEmoji="📔"
 *   onRename={(title, emoji) => console.log(title, emoji)}
 *   onClose={() => console.log('closed')}
 * />
 */
export const RenameProjectModal: React.FC<RenameProjectModalProps> = ({
  isOpen,
  currentTitle,
  currentEmoji,
  onRename,
  onClose,
  className,
}) => {
  const [title, setTitle] = useState(currentTitle);
  const [emoji, setEmoji] = useState(currentEmoji);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  // Update local state when props change
  useEffect(() => {
    setTitle(currentTitle);
    setEmoji(currentEmoji);
  }, [currentTitle, currentEmoji]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = (): void => {
    if (title.trim()) {
      onRename(title.trim(), emoji);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={classNames(styles.modal, className)}>
        <div className={styles.body}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>Change Project Title</h2>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close modal"
            >
              <i className="fa-solid fa-close" aria-hidden="true" />
            </button>
          </div>

          {/* Input row */}
          <div className={styles.inputRow}>
            {/* Emoji button */}
            <button
              ref={emojiButtonRef}
              type="button"
              className={styles.emojiButton}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              aria-label="Change icon"
              title="Change icon"
            >
              <div className={styles.emoji}>{emoji}</div>
            </button>

            {/* Emoji picker */}
            <EmojiPicker
              isOpen={showEmojiPicker}
              onSelect={(selectedEmoji) => {
                setEmoji(selectedEmoji);
                setShowEmojiPicker(false);
              }}
              onClose={() => setShowEmojiPicker(false)}
              anchorEl={emojiButtonRef.current}
            />

            {/* Title input */}
            <div className={styles.inputContainer}>
              <input
                ref={inputRef}
                type="text"
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Untitled Project"
              />
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.doneButton}
              onClick={handleSubmit}
              disabled={!title.trim()}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

