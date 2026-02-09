/**
 * QuizConfigModal - Progressive disclosure for quiz configuration
 * 
 * Applies choice architecture principles:
 * - Intelligent defaults to reduce decision burden
 * - Two-step flow: primary decision first, customization optional
 * - Clear visual hierarchy with recommended option
 * 
 * @example
 * ```tsx
 * <QuizConfigModal
 *   isOpen={isOpen}
 *   availableQuestions={24}
 *   topics={['Drug Interactions', 'Dosing']}
 *   sourceCount={3}
 *   onConfirm={handleConfirm}
 *   onClose={handleClose}
 *   recommendedCount={15}
 * />
 * ```
 */

'use client';

import { useState, useEffect } from 'react';
import type { QuizConfigModalProps, QuestionCountOption } from './QuizConfigModal.types';
import styles from './QuizConfigModal.module.css';

export function QuizConfigModal({
  isOpen,
  availableQuestions,
  topics,
  sourceCount,
  onConfirm,
  onClose,
  recommendedCount = 15,
}: QuizConfigModalProps) {
  const [selectedCount, setSelectedCount] = useState<QuestionCountOption>(
    recommendedCount as QuestionCountOption
  );

  useEffect(() => {
    if (isOpen) {
      setSelectedCount(recommendedCount as QuestionCountOption);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, recommendedCount]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedCount);
    onClose();
  };

  const estimatedTime = (count: QuestionCountOption): string => {
    return count === 15 ? '15-20' : '30-40';
  };

  return (
    <div 
      className={styles.backdrop} 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>

        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
          </div>
          <h2 id="quiz-modal-title" className={styles.title}>
            Start Your Quiz
          </h2>
          <p className={styles.subtitle}>
            Choose your study session length
          </p>
        </div>

        <div className={styles.statusInfo}>
          <div className={styles.statusItem}>
            <i className="fa-solid fa-check-circle" aria-hidden="true" />
            <span>{sourceCount} {sourceCount === 1 ? 'document' : 'documents'} analyzed</span>
          </div>
          <div className={styles.statusItem}>
            <i className="fa-solid fa-check-circle" aria-hidden="true" />
            <span>Up to {availableQuestions} questions ready</span>
          </div>
          {topics.length > 0 && (
            <div className={styles.statusItem}>
              <i className="fa-solid fa-check-circle" aria-hidden="true" />
              <span>Covers: {topics.slice(0, 2).join(', ')}{topics.length > 2 ? '...' : ''}</span>
            </div>
          )}
        </div>

        <div className={styles.options}>
          <button
            className={`${styles.option} ${selectedCount === 15 ? styles.selected : ''}`}
            onClick={() => setSelectedCount(15)}
            aria-pressed={selectedCount === 15}
          >
            <div className={styles.optionHeader}>
              <span className={styles.optionTitle}>Quick Session</span>
              {recommendedCount === 15 && (
                <span className={styles.recommendedBadge}>
                  <i className="fa-solid fa-star" aria-hidden="true" />
                  Recommended
                </span>
              )}
            </div>
            <div className={styles.optionContent}>
              <div className={styles.questionCount}>15 Questions</div>
              <div className={styles.timeEstimate}>
                <i className="fa-regular fa-clock" aria-hidden="true" />
                {estimatedTime(15)} minutes
              </div>
            </div>
            <div className={styles.optionDescription}>
              Perfect for focused review or first-time practice
            </div>
            {selectedCount === 15 && (
              <div className={styles.selectionIndicator}>
                <i className="fa-solid fa-circle-check" aria-hidden="true" />
              </div>
            )}
          </button>

          <button
            className={`${styles.option} ${selectedCount === 30 ? styles.selected : ''}`}
            onClick={() => setSelectedCount(30)}
            aria-pressed={selectedCount === 30}
          >
            <div className={styles.optionHeader}>
              <span className={styles.optionTitle}>Deep Dive</span>
              {recommendedCount === 30 && (
                <span className={styles.recommendedBadge}>
                  <i className="fa-solid fa-star" aria-hidden="true" />
                  Recommended
                </span>
              )}
            </div>
            <div className={styles.optionContent}>
              <div className={styles.questionCount}>30 Questions</div>
              <div className={styles.timeEstimate}>
                <i className="fa-regular fa-clock" aria-hidden="true" />
                {estimatedTime(30)} minutes
              </div>
            </div>
            <div className={styles.optionDescription}>
              Comprehensive practice with broader topic coverage
            </div>
            {selectedCount === 30 && (
              <div className={styles.selectionIndicator}>
                <i className="fa-solid fa-circle-check" aria-hidden="true" />
              </div>
            )}
          </button>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={styles.confirmButton}
            onClick={handleConfirm}
          >
            Start Quiz
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
