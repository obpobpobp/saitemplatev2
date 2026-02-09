'use client';

import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { TypingAreaProps } from './TypingArea.types';
import { ContextTag } from '../ContextTag';
import styles from './TypingArea.module.css';

/**
 * TypingArea - Input area with animated cursor, context tags, and action buttons
 * Connects to drag & drop area above
 */
export const TypingArea: React.FC<TypingAreaProps> = ({
  value = '',
  onChange,
  onSubmit,
  onClear,
  onAddContext,
  placeholder = 'Type your question',
  isMobile = false,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530); // Blink every 530ms

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.whiteSpace = 'pre';
      span.style.font = window.getComputedStyle(input).font;
      span.textContent = value || placeholder;
      document.body.appendChild(span);
      const width = span.getBoundingClientRect().width;
      document.body.removeChild(span);
      setCursorPosition(value ? width + 13 : 13); // 13px is the left padding
    }
  }, [value, placeholder]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit?.();
    }
  };

  const handleClear = (): void => {
    onClear?.();
  };

  const handleSubmit = (): void => {
    onSubmit?.();
  };

  return (
    <div className={classNames(styles.container, { [styles.mobile]: isMobile }, className)}>
      <div className={styles.inputSection}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={styles.input}
        />
        <div
          className={classNames(styles.cursor, { [styles.visible]: showCursor })}
          style={{ left: `${cursorPosition}px` }}
        />
      </div>

      <div className={classNames(styles.actionRow, { [styles.mobileActions]: isMobile })}>
        <button
          type="button"
          onClick={handleClear}
          className={styles.closeButton}
          aria-label="Clear input"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <div className={styles.contextTags}>
          <ContextTag type="course" onClick={() => onAddContext?.('course')} />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className={styles.submitButton}
          aria-label="Submit question"
        >
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </div>
  );
};





