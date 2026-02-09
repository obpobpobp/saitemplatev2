'use client';

import React from 'react';
import { QuizRulesProps } from './QuizRules.types';
import styles from './QuizRules.module.css';

/**
 * QuizRules - Display quiz rules before starting
 */
export const QuizRules: React.FC<QuizRulesProps> = ({
  title = 'Quiz Rules',
  questionCount,
  timeLimit,
  rules = [
    'Read each question carefully before answering',
    'You can skip questions and come back to them later',
    'Once submitted, you cannot change your answers',
    'Review your answers before submitting'
  ],
  onStart,
  onCancel,
  className,
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <i className="fa-solid fa-clipboard-list" />
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>
          {questionCount} questions
          {timeLimit && ` • ${timeLimit} minutes`}
        </p>
      </div>

      <div className={styles.content}>
        <h3 className={styles.sectionTitle}>Before you start:</h3>
        <ul className={styles.rulesList}>
          {rules.map((rule, index) => (
            <li key={index} className={styles.ruleItem}>
              <i className="fa-solid fa-check-circle" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>

        {timeLimit && (
          <div className={styles.warningBox}>
            <i className="fa-solid fa-clock" />
            <div>
              <strong>Time Limit:</strong> You have {timeLimit} minutes to complete this quiz.
              The timer will start when you click "Start Quiz".
            </div>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {onCancel && (
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className={styles.startButton} onClick={onStart}>
          <i className="fa-solid fa-play" />
          Start Quiz
        </button>
      </div>
    </div>
  );
};







