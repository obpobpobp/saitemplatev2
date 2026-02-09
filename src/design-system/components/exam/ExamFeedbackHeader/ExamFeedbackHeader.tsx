'use client';

import React from 'react';
import { ExamFeedbackHeaderProps, FeedbackLevel } from './ExamFeedbackHeader.types';
import styles from './ExamFeedbackHeader.module.css';

/**
 * ExamFeedbackHeader - Header showing performance emoji and score
 */
export const ExamFeedbackHeader: React.FC<ExamFeedbackHeaderProps> = ({
  type,
  earnedMarks,
  totalMarks,
  className,
}) => {
  const percentage = (earnedMarks / totalMarks) * 100;

  const getFeedbackLevel = (): FeedbackLevel => {
    if (type === 'binary') {
      return percentage === 100 ? 'correct' : 'incorrect';
    }

    // Progressive
    if (percentage >= 100) return 'perfect';
    if (percentage >= 75) return 'high';
    if (percentage >= 50) return 'medium';
    return 'low';
  };

  const level = getFeedbackLevel();

  const feedbackConfig = {
    perfect: { emoji: '😊', title: 'Perfect!', subtitle: 'Excellent work' },
    high: { emoji: '😊', title: `${earnedMarks} marks out of ${totalMarks}`, subtitle: 'Great job' },
    medium: { emoji: '😐', title: `${earnedMarks} marks out of ${totalMarks}`, subtitle: 'Good effort' },
    low: { emoji: '🫤', title: `${earnedMarks} marks out of ${totalMarks}`, subtitle: 'Needs improvement' },
    correct: { emoji: '✅', title: 'Correct', subtitle: '' },
    incorrect: { emoji: '❌', title: 'Incorrect', subtitle: '' },
  };

  const config = feedbackConfig[level];

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.emojiContainer}>
        <span className={styles.emoji}>{config.emoji}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{config.title}</div>
        {config.subtitle && <div className={styles.subtitle}>{config.subtitle}</div>}
      </div>
    </div>
  );
};

