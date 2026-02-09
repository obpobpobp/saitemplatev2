'use client';

import React from 'react';
import { ExamMultiSelectProps, MultiSelectOptionState } from './ExamMultiSelect.types';
import styles from './ExamMultiSelect.module.css';

/**
 * ExamMultiSelect - Multi-select question component for exams
 */
export const ExamMultiSelect: React.FC<ExamMultiSelectProps> = ({
  questionNumber,
  marks,
  stem,
  questionText,
  options,
  selectedOptions,
  correctOptions = [],
  showFeedback = false,
  onToggleOption,
  className,
}) => {
  const getOptionState = (index: number): MultiSelectOptionState => {
    if (!showFeedback) {
      return selectedOptions.includes(index) ? 'selected' : 'default';
    }

    // Show feedback
    const isCorrect = correctOptions.includes(index);
    const isSelected = selectedOptions.includes(index);

    if (isCorrect && isSelected) return 'correct';
    if (!isCorrect && isSelected) return 'incorrect';
    if (isCorrect && !isSelected) return 'correct'; // Show what should have been selected
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
          const isSelected = selectedOptions.includes(index);

          return (
            <button
              key={index}
              className={`${styles.option} ${styles[optionState]}`}
              onClick={() => !isDisabled && onToggleOption(index)}
              disabled={isDisabled}
            >
              <div className={styles.optionContent}>
                {showFeedback ? (
                  <>
                    {optionState === 'correct' ? (
                      <div className={styles.optionIcon}>
                        <i className={`fa-solid fa-circle-check ${styles.correctIcon}`} />
                      </div>
                    ) : optionState === 'incorrect' ? (
                      <div className={styles.optionIcon}>
                        <i className={`fa-solid fa-circle-xmark ${styles.incorrectIcon}`} />
                      </div>
                    ) : (
                      <div className={styles.optionLabel}>{optionLabels[index]}</div>
                    )}
                  </>
                ) : (
                  <>
                    <div className={styles.checkbox}>
                      <i className={`fa-solid fa-check ${styles.checkIcon}`} />
                    </div>
                    <div className={styles.optionLabel}>{optionLabels[index]}</div>
                  </>
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

