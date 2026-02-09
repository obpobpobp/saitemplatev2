'use client';

import React from 'react';
import { ExamFillBlanksProps } from './ExamFillBlanks.types';
import { BlankDefinition } from '../exam.types';
import styles from './ExamFillBlanks.module.css';

// Segment types for rendering
type TextSegment = {
  type: 'text';
  content: string;
  key: string;
};

type BlankSegment = {
  type: 'blank';
  blank: BlankDefinition;
  key: string;
};

type Segment = TextSegment | BlankSegment;

/**
 * ExamFillBlanks - Fill in the blanks question component for exams
 */
export const ExamFillBlanks: React.FC<ExamFillBlanksProps> = ({
  questionNumber,
  marks,
  stem,
  questionText,
  blanks,
  values,
  showFeedback = false,
  onChange,
  className,
}) => {
  // Parse question text and insert blank inputs
  const renderQuestionWithBlanks = () => {
    const sortedBlanks = [...blanks].sort((a, b) => a.position - b.position);
    const segments: Segment[] = [];
    let currentPosition = 0;

    sortedBlanks.forEach((blank, index) => {
      // Add text before blank
      if (blank.position > currentPosition) {
        segments.push({
          type: 'text',
          content: questionText.substring(currentPosition, blank.position),
          key: `text-${index}`,
        });
      }

      // Add blank
      segments.push({
        type: 'blank',
        blank: blank,
        key: `blank-${blank.id}`,
      });

      currentPosition = blank.position;
    });

    // Add remaining text
    if (currentPosition < questionText.length) {
      segments.push({
        type: 'text',
        content: questionText.substring(currentPosition),
        key: 'text-end',
      });
    }

    return segments.map((segment) => {
      if (segment.type === 'text') {
        return (
          <span key={segment.key} className={styles.textSegment}>
            {segment.content}
          </span>
        );
      } else {
        const blank = segment.blank;
        const value = values[blank.id] || '';
        const isCorrect = showFeedback && value.trim().toLowerCase() === blank.correctAnswer.toLowerCase();
        const isIncorrect = showFeedback && value && !isCorrect;

        if (showFeedback) {
          return (
            <span
              key={segment.key}
              className={`${styles.blankDisplay} ${
                isCorrect ? styles.correct : isIncorrect ? styles.incorrect : ''
              }`}
            >
              <span className={`${styles.blankText} ${isCorrect ? styles.correct : isIncorrect ? styles.incorrect : ''}`}>
                {value || '(empty)'}
              </span>
              {isCorrect && (
                <i className={`fa-solid fa-check ${styles.blankIcon} ${styles.correctIcon}`} />
              )}
              {isIncorrect && (
                <i className={`fa-solid fa-times ${styles.blankIcon} ${styles.incorrectIcon}`} />
              )}
            </span>
          );
        } else {
          return (
            <input
              key={segment.key}
              type="text"
              className={styles.blankInput}
              value={value}
              onChange={(e) => onChange(blank.id, e.target.value)}
              placeholder="___"
            />
          );
        }
      }
    });
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.questionNumber}>Question {questionNumber}</div>
        <div className={styles.marksChip}>{marks} marks</div>
      </div>

      {/* Stem (optional context/image) */}
      {stem && <div className={styles.stem}>{stem}</div>}

      {/* Question Text with Blanks */}
      <div className={styles.questionText}>{renderQuestionWithBlanks()}</div>

      {/* Feedback List */}
      {showFeedback && (
        <div className={styles.feedbackList}>
          {blanks.map((blank) => {
            const value = values[blank.id] || '';
            const isCorrect = value.trim().toLowerCase() === blank.correctAnswer.toLowerCase();

            return (
              <div key={blank.id} className={styles.feedbackItem}>
                <i
                  className={`fa-solid ${isCorrect ? 'fa-check' : 'fa-times'} ${
                    styles.feedbackItemIcon
                  } ${isCorrect ? styles.correctIcon : styles.incorrectIcon}`}
                />
                <div className={styles.feedbackItemText}>
                  <span className={styles.feedbackItemLabel}>Your answer:</span>{' '}
                  <span className={styles.feedbackItemValue}>{value || '(empty)'}</span>
                  {!isCorrect && (
                    <>
                      <br />
                      <span className={styles.feedbackItemLabel}>Correct answer:</span>{' '}
                      <span className={styles.feedbackItemValue}>{blank.correctAnswer}</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

