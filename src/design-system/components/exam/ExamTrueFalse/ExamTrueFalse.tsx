'use client';

import React from 'react';
import { ExamTrueFalseProps } from './ExamTrueFalse.types';
import styles from './ExamTrueFalse.module.css';

/**
 * ExamTrueFalse - True/False question component for exams
 */
export const ExamTrueFalse: React.FC<ExamTrueFalseProps> = ({
  questionNumber,
  marks,
  stem,
  questionText,
  selectedValue,
  correctValue,
  showFeedback = false,
  onSelect,
  className,
}) => {
  const getOptionState = (value: boolean) => {
    if (!showFeedback) {
      return selectedValue === value ? 'selected' : 'default';
    }

    // Show feedback
    if (value === correctValue) return 'correct';
    if (selectedValue === value && value !== correctValue) return 'incorrect';
    return 'disabled';
  };

  const trueState = getOptionState(true);
  const falseState = getOptionState(false);
  const isDisabled = showFeedback;

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

      {/* True/False Options */}
      <div className={styles.options}>
        <button
          className={`${styles.option} ${styles[trueState]}`}
          onClick={() => !isDisabled && onSelect(true)}
          disabled={isDisabled}
        >
          {showFeedback && trueState === 'correct' && (
            <div className={styles.optionIcon}>
              <i className={`fa-solid fa-circle-check ${styles.correctIcon}`} />
            </div>
          )}
          {showFeedback && trueState === 'incorrect' && (
            <div className={styles.optionIcon}>
              <i className={`fa-solid fa-circle-xmark ${styles.incorrectIcon}`} />
            </div>
          )}
          True
        </button>

        <button
          className={`${styles.option} ${styles[falseState]}`}
          onClick={() => !isDisabled && onSelect(false)}
          disabled={isDisabled}
        >
          {showFeedback && falseState === 'correct' && (
            <div className={styles.optionIcon}>
              <i className={`fa-solid fa-circle-check ${styles.correctIcon}`} />
            </div>
          )}
          {showFeedback && falseState === 'incorrect' && (
            <div className={styles.optionIcon}>
              <i className={`fa-solid fa-circle-xmark ${styles.incorrectIcon}`} />
            </div>
          )}
          False
        </button>
      </div>
    </div>
  );
};

