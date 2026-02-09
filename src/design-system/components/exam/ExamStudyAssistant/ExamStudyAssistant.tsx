'use client';

import React from 'react';
import { ExamStudyAssistantProps } from './ExamStudyAssistant.types';
import styles from './ExamStudyAssistant.module.css';

/**
 * ExamStudyAssistant - Study assistant block with action suggestions
 */
export const ExamStudyAssistant: React.FC<ExamStudyAssistantProps> = ({
  message,
  onPracticeWeakTopics,
  onAnalyzeMistakes,
  onThumbsUp,
  onThumbsDown,
  className,
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.content}>
        <img
          src="/Assistant avatar.png"
          alt="Study Assistant"
          className={styles.avatar}
        />
        <div className={styles.messageContainer}>
          <div className={styles.title}>Study assistant</div>
          <div className={styles.message}>{message}</div>
        </div>
      </div>

      {/* Action Buttons */}
      {(onPracticeWeakTopics || onAnalyzeMistakes) && (
        <div className={styles.actions}>
          {onPracticeWeakTopics && (
            <button className={styles.actionButton} onClick={onPracticeWeakTopics}>
              <div className={styles.actionIcon}>
                <i className="fa-solid fa-dumbbell" />
              </div>
              <span>Practice weak topics</span>
            </button>
          )}
          {onAnalyzeMistakes && (
            <button className={styles.actionButton} onClick={onAnalyzeMistakes}>
              <div className={styles.actionIcon}>
                <i className="fa-solid fa-magnifying-glass-chart" />
              </div>
              <span>Analyze my mistakes</span>
            </button>
          )}
        </div>
      )}

      {/* Feedback Section */}
      {(onThumbsUp || onThumbsDown) && (
        <div className={styles.feedbackSection}>
          <div className={styles.feedbackText}>Was this exam useful?</div>
          <div className={styles.feedbackButtons}>
            {onThumbsUp && (
              <button
                className={styles.feedbackButton}
                onClick={onThumbsUp}
                aria-label="Thumbs up"
              >
                <div className={styles.feedbackIcon}>
                  <i className="fa-solid fa-thumbs-up" />
                </div>
              </button>
            )}
            {onThumbsDown && (
              <button
                className={styles.feedbackButton}
                onClick={onThumbsDown}
                aria-label="Thumbs down"
              >
                <div className={styles.feedbackIcon}>
                  <i className="fa-solid fa-thumbs-down" />
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

