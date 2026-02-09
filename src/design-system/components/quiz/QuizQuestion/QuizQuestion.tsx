'use client';

import React from 'react';
import { QuizQuestionProps } from './QuizQuestion.types';
import styles from './QuizQuestion.module.css';

/**
 * QuizQuestion - Display a quiz question with multiple choice options
 * Supports different states: not answered, correct, incorrect, skipped
 */
export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedOption,
  correctOption,
  explanation,
  state = 'unanswered',
  onSelectOption,
  onNext,
  onSkip,
  isLoading = false,
  className,
}) => {
  const showExplanation = state === 'correct' || state === 'incorrect';
  const isAnswered = state !== 'unanswered';

  const getOptionState = (index: number) => {
    if (!isAnswered) return 'default';
    if (index === correctOption) return 'correct';
    if (index === selectedOption && index !== correctOption) return 'incorrect';
    return 'disabled';
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* Question Header */}
      <div className={styles.header}>
        <div className={styles.questionNumber}>
          Question {questionNumber}
        </div>
        {state === 'skipped' && (
          <div className={styles.skippedBadge}>
            <i className="fa-solid fa-forward" />
            Skipped
          </div>
        )}
        {state === 'incorrect' && (
          <div className={styles.incorrectBadge}>
            <i className="fa-solid fa-times" />
            Incorrect
          </div>
        )}
        {state === 'correct' && (
          <div className={styles.correctBadge}>
            <i className="fa-solid fa-check" />
            Correct
          </div>
        )}
      </div>

      {/* Question Text */}
      <div className={styles.questionText}>
        {question}
      </div>

      {/* Options */}
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingText}>
            <i className="fa-solid fa-sparkles fa-fade" />
            <span>Generating your personalized quiz questions...</span>
          </div>
          <div className={styles.skeleton}>
            <div className={styles.skeletonOption} />
            <div className={styles.skeletonOption} />
            <div className={styles.skeletonOption} />
            <div className={styles.skeletonOption} />
          </div>
        </div>
      ) : (
        <div className={styles.options}>
          {options.map((option, index) => {
            const optionState = getOptionState(index);
            const isSelected = selectedOption === index;
            
            return (
              <button
                key={index}
                className={`${styles.option} ${styles[optionState]} ${
                  isSelected ? styles.selected : ''
                }`}
                onClick={() => !isAnswered && onSelectOption(index)}
                disabled={isAnswered}
              >
                <span className={styles.optionLabel}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={styles.optionText}>{option}</span>
                {optionState === 'correct' && (
                  <i className={`fa-solid fa-check ${styles.optionIcon}`} />
                )}
                {optionState === 'incorrect' && (
                  <i className={`fa-solid fa-times ${styles.optionIcon}`} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Explanation */}
      {showExplanation && explanation && (
        <div className={styles.explanation}>
          <div className={styles.explanationHeader}>
            <i className="fa-solid fa-lightbulb" />
            <span>Explanation</span>
          </div>
          <p className={styles.explanationText}>{explanation}</p>
          <button className={styles.explanationToggle}>
            Explain with simpler terms
          </button>
          <button className={styles.explanationToggle}>
            Ask about this...
          </button>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        {!isAnswered ? (
          <>
            <button
              className={styles.skipButton}
              onClick={onSkip}
              disabled={isLoading}
            >
              Skip
            </button>
            <button
              className={styles.submitButton}
              onClick={() => selectedOption !== undefined && onSelectOption(selectedOption)}
              disabled={selectedOption === undefined || isLoading}
            >
              {questionNumber === totalQuestions ? 'Submit' : 'Next'}
              <i className="fa-solid fa-arrow-right" />
            </button>
          </>
        ) : (
          <button className={styles.nextButton} onClick={onNext}>
            {questionNumber === totalQuestions ? 'See Results' : 'Next Question'}
            <i className="fa-solid fa-arrow-right" />
          </button>
        )}
      </div>
    </div>
  );
};







