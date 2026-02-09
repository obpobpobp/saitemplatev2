'use client';

import React from 'react';
import { ExamProgressBarProps } from './ExamProgressBar.types';
import styles from './ExamProgressBar.module.css';

/**
 * ExamProgressBar - Fixed header showing exam progress and timer
 */
export const ExamProgressBar: React.FC<ExamProgressBarProps> = ({
  totalQuestions,
  answeredCount,
  elapsedTime,
  totalMarks,
  earnedMarks,
  isCompleted,
  isSaved = true,
  onExpand,
  className,
}) => {
  // Format time as HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercentage = (answeredCount / totalQuestions) * 100;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* Left: Saved indicator */}
      {!isCompleted && (
        <div className={styles.savedChip}>
          <span>Saved</span>
          {isSaved && <i className={`fa-solid fa-check ${styles.checkIcon}`} />}
        </div>
      )}

      {/* Center: Progress or Result */}
      {isCompleted ? (
        <div className={styles.resultBadge}>
          <div className={styles.resultIcon}>
            <i className={`fa-solid fa-arrow-down ${styles.resultIconGlyph}`} />
          </div>
          <span className={styles.resultText}>
            Result: <span className={styles.resultScore}>{earnedMarks}</span>/{totalMarks}
          </span>
        </div>
      ) : (
        <div className={styles.centerContent}>
          <div className={styles.counterRow}>
            <div className={styles.progressInfo}>
              <div className={styles.progressIcon}>
                <i className={`fa-solid fa-bars-progress ${styles.progressIconGlyph}`} />
              </div>
              <div className={styles.progressText}>
                <span className={styles.progressTextNumber}>{answeredCount}</span>
                <span className={styles.progressTextSeparator}>/</span>
                <span className={styles.progressTextNumber}>{totalQuestions} answered</span>
              </div>
            </div>
            <div className={styles.timerInfo}>
              <div className={styles.timerIcon}>
                <i className={`fa-solid fa-clock ${styles.timerIconGlyph}`} />
              </div>
              <div className={styles.timerText}>{formatTime(elapsedTime)}</div>
            </div>
          </div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Right: Expand button */}
      {!isCompleted && onExpand && (
        <button
          className={styles.expandButton}
          onClick={onExpand}
          aria-label="Expand"
        >
          <i className={`fa-solid fa-up-right-and-down-left-from-center ${styles.expandIcon}`} />
        </button>
      )}

      {/* Spacer for completed state */}
      {isCompleted && <div style={{ width: '32px' }} />}
    </div>
  );
};

