'use client';

import React from 'react';
import { ExamQuestionFeedbackProps } from './ExamQuestionFeedback.types';
import { ExamFeedbackHeader } from '../ExamFeedbackHeader';
import styles from './ExamQuestionFeedback.module.css';

/**
 * ExamQuestionFeedback - Displays detailed feedback for a question
 */
export const ExamQuestionFeedback: React.FC<ExamQuestionFeedbackProps> = ({
  feedback,
  onMoreFeedback,
  className,
}) => {
  const type = feedback.percentage === 100 || feedback.percentage === 0 ? 'binary' : 'progressive';

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* Feedback Header */}
      <ExamFeedbackHeader
        type={type}
        earnedMarks={feedback.earnedMarks}
        totalMarks={feedback.totalMarks}
      />

      {/* Explanation */}
      <div className={styles.explanation}>{feedback.explanation}</div>

      {/* More Feedback Button */}
      {onMoreFeedback && (
        <button className={styles.moreFeedbackButton} onClick={onMoreFeedback}>
          <img
            src="/Assistant avatar.png"
            alt="Assistant"
            className={styles.moreFeedbackAvatar}
          />
          <div className={styles.moreFeedbackContent}>
            <span className={styles.moreFeedbackText}>More feedback</span>
            <div className={styles.moreFeedbackIcon}>
              <i className="fa-solid fa-chevron-right" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

