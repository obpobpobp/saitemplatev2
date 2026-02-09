'use client';

import React from 'react';
import { ExamLongAnswerProps } from './ExamLongAnswer.types';
import styles from './ExamLongAnswer.module.css';

/**
 * ExamLongAnswer - Long answer question component for exams
 */
export const ExamLongAnswer: React.FC<ExamLongAnswerProps> = ({
  questionNumber,
  marks,
  stem,
  questionText,
  value,
  placeholder = 'Type your detailed answer here...',
  maxLength = 5000,
  minRows = 6,
  showFeedback = false,
  onChange,
  className,
}) => {
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.questionNumber}>Question {questionNumber}</div>
        <div className={styles.marksChip}>{marks} marks</div>
      </div>

      {/* Stem (optional context/image) */}
      {stem && <div className={styles.stem}>{stem}</div>}

      {/* Question Text */}
      <div className={styles.questionText}>{questionText}</div>

      {/* Textarea or Display */}
      {showFeedback ? (
        <div className={styles.userAnswer}>{value || '(No answer provided)'}</div>
      ) : (
        <div className={styles.inputContainer}>
          <textarea
            className={styles.textarea}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={minRows}
          />
          <div className={styles.characterCount}>
            <span className={styles.wordCount}>{wordCount} words</span>
            <span className={styles.charCount}>
              {value.length}/{maxLength} characters
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

