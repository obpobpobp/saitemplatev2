'use client';

import React from 'react';
import { ExamResultsProps } from './ExamResults.types';
import styles from './ExamResults.module.css';

/**
 * ExamResults - Display exam results with circular gauge
 */
export const ExamResults: React.FC<ExamResultsProps> = ({
  earnedMarks,
  totalMarks,
  timeElapsed,
  onFeedback,
  onRetry,
  className,
}) => {
  const percentage = (earnedMarks / totalMarks) * 100;

  // Calculate gauge rotation (0-360 degrees)
  const circumference = 2 * Math.PI * 58; // radius = 58
  const progress = (percentage / 100) * circumference;

  // Get performance level
  const getPerformanceLevel = () => {
    if (percentage >= 80) return { level: 'perfect', title: 'Excellent!', class: 'perfect' };
    if (percentage >= 65) return { level: 'high', title: 'Good job!', class: 'high' };
    if (percentage >= 50) return { level: 'medium', title: 'Good effort!', class: 'medium' };
    return { level: 'low', title: 'Keep practicing!', class: 'low' };
  };

  const performance = getPerformanceLevel();

  // Format time as HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.gaugeSection}>
        {/* Circular Gauge */}
        <div className={styles.gaugeContainer}>
          <svg className={styles.gaugeSvg} viewBox="0 0 132 132">
            {/* Background circle */}
            <circle
              cx="66"
              cy="66"
              r="58"
              className={styles.gaugeTrack}
            />
            {/* Progress circle */}
            <circle
              cx="66"
              cy="66"
              r="58"
              className={`${styles.gaugeFill} ${styles[performance.class]}`}
              strokeDasharray={`${progress} ${circumference}`}
              strokeDashoffset="0"
            />
          </svg>
          <div className={styles.gaugeContent}>
            <div className={styles.gaugeValue}>{earnedMarks}</div>
            <div className={styles.gaugeLabel}>
              <span>marks</span>
              <span>out of {totalMarks}</span>
            </div>
          </div>
        </div>

        {/* Performance Title */}
        <div className={styles.performanceTitle}>{performance.title}</div>

        {/* Time Info */}
        <div className={styles.timeInfo}>
          <div className={styles.timeIcon}>
            <i className="fa-solid fa-clock" />
          </div>
          <div className={styles.timeText}>{formatTime(timeElapsed)}</div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          {onFeedback && (
            <button className={styles.actionButton} onClick={onFeedback}>
              <div className={styles.actionIcon}>
                <i className="fa-solid fa-arrow-up" />
              </div>
              <span>Feedback</span>
            </button>
          )}
          {onRetry && (
            <button className={`${styles.actionButton} ${styles.retryButton}`} onClick={onRetry}>
              <div className={styles.actionIcon}>
                <i className="fa-solid fa-rotate-left" />
              </div>
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

