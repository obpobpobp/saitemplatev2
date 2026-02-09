'use client';

import React from 'react';
import { ExamShortAnswerProps } from './ExamShortAnswer.types';
import styles from './ExamShortAnswer.module.css';

/**
 * ExamShortAnswer - Short answer question component for exams
 */
export const ExamShortAnswer: React.FC<ExamShortAnswerProps> = ({
  questionNumber,
  marks,
  stem,
  questionText,
  value,
  placeholder = 'Type your answer here...',
  maxLength = 500,
  showFeedback = false,
  onChange,
  className,
}) => {
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

      {/* Input or Display */}
      {showFeedback ? (
        <div className={styles.userAnswer}>{value || '(No answer provided)'}</div>
      ) : (
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
          />
          <div className={styles.characterCount}>
            {value.length}/{maxLength}
          </div>
        </div>
      )}
    </div>
  );
};

