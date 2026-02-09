'use client';

import React from 'react';
import { QuizResultsProps } from './QuizResults.types';
import styles from './QuizResults.module.css';

/**
 * QuizResults - Display quiz completion results with score and breakdown
 */
export const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  skippedQuestions,
  onReview,
  onRetake,
  onClose,
  className,
}) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Calculate gauge rotation (0-360 degrees)
  const gaugeRotation = (percentage / 100) * 360;
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { title: 'Excellent!', emoji: '🎉', color: 'success' };
    if (percentage >= 75) return { title: 'Great Job!', emoji: '✨', color: 'success' };
    if (percentage >= 60) return { title: 'Good Effort!', emoji: '👍', color: 'warning' };
    return { title: 'Keep Practicing!', emoji: '💪', color: 'danger' };
  };

  const performance = getPerformanceMessage();

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Quiz Complete!</h2>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-times" />
        </button>
      </div>

      <div className={styles.scoreSection}>
        <div className={styles.gauge}>
          <svg viewBox="0 0 132 132" className={styles.gaugeSvg}>
            {/* Background circle */}
            <circle
              cx="66"
              cy="66"
              r="58"
              fill="none"
              stroke="var(--color-surface-secondary)"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="66"
              cy="66"
              r="58"
              fill="none"
              stroke={`var(--color-${performance.color})`}
              strokeWidth="12"
              strokeDasharray={`${(gaugeRotation / 360) * 364.42} 364.42`}
              strokeLinecap="round"
              transform="rotate(-90 66 66)"
              className={styles.gaugeProgress}
            />
          </svg>
          <div className={styles.gaugeContent}>
            <div className={styles.scoreValue}>{percentage}%</div>
            <div className={styles.scoreLabel}>Score</div>
          </div>
        </div>

        <div className={styles.performanceMessage}>
          <span className={styles.performanceEmoji}>{performance.emoji}</span>
          <h3 className={styles.performanceTitle}>{performance.title}</h3>
          <p className={styles.performanceText}>
            You got {correctAnswers} out of {totalQuestions} questions correct
          </p>
        </div>
      </div>

      <div className={styles.breakdown}>
        <div className={`${styles.stat} ${styles.correct}`}>
          <div className={styles.statIcon}>
            <i className="fa-solid fa-check" />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{correctAnswers}</div>
            <div className={styles.statLabel}>Correct</div>
          </div>
        </div>

        <div className={`${styles.stat} ${styles.incorrect}`}>
          <div className={styles.statIcon}>
            <i className="fa-solid fa-times" />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{incorrectAnswers}</div>
            <div className={styles.statLabel}>Incorrect</div>
          </div>
        </div>

        {skippedQuestions > 0 && (
          <div className={`${styles.stat} ${styles.skipped}`}>
            <div className={styles.statIcon}>
              <i className="fa-solid fa-forward" />
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{skippedQuestions}</div>
              <div className={styles.statLabel}>Skipped</div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.reviewButton} onClick={onReview}>
          <i className="fa-solid fa-list" />
          Review Answers
        </button>
        <button className={styles.retakeButton} onClick={onRetake}>
          <i className="fa-solid fa-rotate-right" />
          Retake Quiz
        </button>
      </div>
    </div>
  );
};







