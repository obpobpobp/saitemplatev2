'use client';

import React from 'react';
import { ExamMultipleChoiceProps, OptionState } from './ExamMultipleChoice.types';
import styles from './ExamMultipleChoice.module.css';

/**
 * ExamMultipleChoice - Multiple choice question component for exams
 */
export const ExamMultipleChoice: React.FC<ExamMultipleChoiceProps> = ({
  questionNumber,
  marks,
  stem,
  questionText,
  options,
  selectedOption,
  correctOption,
  showFeedback = false,
  onSelectOption,
  className,
}) => {
  const getOptionState = (index: number): OptionState => {
    if (!showFeedback) {
      return selectedOption === index ? 'selected' : 'default';
    }

    // Show feedback
    if (index === correctOption) return 'correct';
    if (index === selectedOption && index !== correctOption) return 'incorrect';
    return 'disabled';
  };

  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

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

      {/* Options */}
      <div className={styles.options}>
        {options.map((option, index) => {
          const optionState = getOptionState(index);
          const isDisabled = showFeedback;

          return (
            <button
              key={index}
              className={`${styles.option} ${styles[optionState]}`}
              onClick={() => !isDisabled && onSelectOption(index)}
              disabled={isDisabled}
            >
              <div className={styles.optionContent}>
                {optionState === 'correct' || optionState === 'incorrect' ? (
                  <div className={styles.optionIcon}>
                    {optionState === 'correct' ? (
                      <i className={`fa-solid fa-circle-check ${styles.correctIcon}`} />
                    ) : (
                      <i className={`fa-solid fa-circle-xmark ${styles.incorrectIcon}`} />
                    )}
                  </div>
                ) : (
                  <div className={styles.optionLabel}>{optionLabels[index]}</div>
                )}
                <span className={styles.optionText}>{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

