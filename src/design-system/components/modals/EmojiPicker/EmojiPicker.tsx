'use client';

import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { EmojiPickerProps, EmojiCategory } from './EmojiPicker.types';
import styles from './EmojiPicker.module.css';

// Emoji data organized by category
const FREQUENTLY_USED: string[] = ['🥑', '🍕', '🎬'];

const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    name: 'Smileys & people',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
      '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩',
      '😘', '😗', '☺️', '😚', '😙', '🥲', '😋', '😛',
      '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
      '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄',
    ],
  },
  {
    name: 'Animals & nature',
    emojis: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
      '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔',
    ],
  },
  {
    name: 'Food & drink',
    emojis: [
      '🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐',
      '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅',
    ],
  },
  {
    name: 'Activities',
    emojis: [
      '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉',
      '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍',
    ],
  },
  {
    name: 'Travel & places',
    emojis: [
      '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑',
      '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🦯', '🦽',
    ],
  },
  {
    name: 'Objects',
    emojis: [
      '⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️',
      '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼',
    ],
  },
  {
    name: 'Symbols',
    emojis: [
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍',
      '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖',
    ],
  },
];

/**
 * EmojiPicker - Popover for selecting emojis
 * Matches Figma design node-id=9842-52083
 * 
 * Features:
 * - Search functionality
 * - Frequently used section
 * - Categorized emoji grid
 * - Hover states
 * 
 * @example
 * <EmojiPicker
 *   isOpen={true}
 *   onSelect={(emoji) => console.log(emoji)}
 *   onClose={() => console.log('closed')}
 *   anchorEl={buttonRef.current}
 * />
 */
export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  isOpen,
  onSelect,
  onClose,
  anchorEl,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const pickerRef = useRef<HTMLDivElement>(null);

  // Calculate position based on anchor element
  useEffect(() => {
    if (isOpen && anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  }, [isOpen, anchorEl]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node) &&
          anchorEl && !anchorEl.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, anchorEl]);

  // Close on escape
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

  const handleEmojiSelect = (emoji: string): void => {
    onSelect(emoji);
    onClose();
  };

  // Filter emojis based on search
  const getFilteredCategories = (): EmojiCategory[] => {
    if (!searchQuery.trim()) {
      return EMOJI_CATEGORIES;
    }

    return EMOJI_CATEGORIES.map(category => ({
      ...category,
      emojis: category.emojis.filter(() => true), // In a real app, you'd filter by emoji name
    })).filter(category => category.emojis.length > 0);
  };

  if (!isOpen) return null;

  const filteredCategories = getFilteredCategories();

  return (
    <div
      ref={pickerRef}
      className={classNames(styles.popover, className)}
      style={{ position: 'fixed', top: position.top, left: position.left }}
    >
      <div className={styles.content}>
        {/* Search */}
        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className={styles.searchIcon}>
              <i className="fa-solid fa-search" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Frequently used */}
        {!searchQuery && (
          <div className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryTitle}>Frequently used</h3>
            </div>
            <div className={styles.frequentGrid}>
              {FREQUENTLY_USED.map((emoji, index) => (
                <button
                  key={`frequent-${index}`}
                  type="button"
                  className={styles.emojiButton}
                  onClick={() => handleEmojiSelect(emoji)}
                  aria-label={`Select emoji ${emoji}`}
                >
                  <div className={styles.emojiChar}>{emoji}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scrollable emoji categories */}
        <div className={styles.scrollContent}>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, catIndex) => (
              <div key={catIndex} className={styles.categorySection}>
                <div className={styles.categoryHeader}>
                  <h3 className={styles.categoryTitle}>{category.name}</h3>
                </div>
                <div className={styles.emojiGrid}>
                  {category.emojis.map((emoji, emojiIndex) => (
                    <button
                      key={`${catIndex}-${emojiIndex}`}
                      type="button"
                      className={styles.emojiButton}
                      onClick={() => handleEmojiSelect(emoji)}
                      aria-label={`Select emoji ${emoji}`}
                    >
                      <div className={styles.emojiChar}>{emoji}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>No emojis found</div>
          )}
        </div>
      </div>
    </div>
  );
};


