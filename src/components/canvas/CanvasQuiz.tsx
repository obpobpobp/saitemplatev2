/**
 * CanvasQuiz Component
 * 
 * Interactive quiz interface for answering questions.
 * Shows questions one at a time with immediate feedback.
 */

'use client';

import { useState } from 'react';
import { useCourse } from '@/contexts/CourseContext';
import type { QuizData } from '@/types/course';
import styles from './CanvasQuiz.module.css';

interface CanvasQuizProps {
  quiz: QuizData;
}

export function CanvasQuiz({ quiz }: CanvasQuizProps) {
  const { setCanvasContent, addCreation, course } = useCourse();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>(
    new Array(quiz.questions.length).fill(undefined)
  );
  const [showResults, setShowResults] = useState(false);
  
  const currentQuestion = quiz.questions[currentIndex];
  const hasAnswered = answers[currentIndex] !== undefined;
  const selectedAnswer = answers[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;
  
  const handleAnswer = (optionIndex: number) => {
    if (hasAnswered) return;
    
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
    
    // Auto-advance after a delay
    setTimeout(() => {
      if (currentIndex < quiz.questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Show results
        setShowResults(true);
        
        // Calculate score
        const correctCount = newAnswers.filter((ans, idx) => ans === quiz.questions[idx].correctIndex).length;
        const score = Math.round((correctCount / quiz.questions.length) * 100);
        
        // Find weak topics
        const weakTopics = Array.from(new Set(
          quiz.questions
            .filter((q, idx) => newAnswers[idx] !== q.correctIndex)
            .map(q => q.topic)
        ));
        
        // Save as creation
        if (course) {
          addCreation({
            id: `quiz-${Date.now()}`,
            type: 'quiz',
            title: `Quiz: ${course.name}`,
            createdAt: new Date(),
            data: {
              questions: quiz.questions.map((q, idx) => ({
                ...q,
                userAnswer: newAnswers[idx],
              })),
              score,
              completedAt: new Date(),
              weakTopics,
            },
          });
        }
      }
    }, 1500);
  };
  
  const handleRetry = () => {
    setCurrentIndex(0);
    setAnswers(new Array(quiz.questions.length).fill(undefined));
    setShowResults(false);
  };
  
  const handleBackToSuggestions = () => {
    setCanvasContent({ type: 'suggestions' });
  };
  
  // Results view
  if (showResults) {
    const correctCount = answers.filter((ans, idx) => ans === quiz.questions[idx].correctIndex).length;
    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const incorrectCount = quiz.questions.length - correctCount;
    
    return (
      <div className={styles.results}>
        <div className={styles.resultsContent}>
          <div className={styles.scoreGauge}>
            <svg viewBox="0 0 132 132" className={styles.gaugesvg}>
              <circle 
                cx="66" 
                cy="66" 
                r="56" 
                fill="none" 
                stroke="var(--color-neutral-200)" 
                strokeWidth="20"
              />
              <circle 
                cx="66" 
                cy="66" 
                r="56" 
                fill="none" 
                stroke="var(--color-success)" 
                strokeWidth="20"
                strokeDasharray={`${(score / 100) * 351.86} 351.86`}
                strokeLinecap="round"
                transform="rotate(-90 66 66)"
                style={{ transition: 'stroke-dasharray 1s ease' }}
              />
            </svg>
            <div className={styles.scorePercentage}>{score}%</div>
          </div>
          
          <h2 className={styles.resultsTitle}>Well done!</h2>
          
          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <i className="fa-solid fa-check" />
              <span><strong>{correctCount}</strong> correct</span>
            </div>
            <div className={styles.stat}>
              <i className="fa-solid fa-xmark" />
              <span><strong>{incorrectCount}</strong> incorrect</span>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button className={styles.secondaryButton} onClick={handleRetry}>
              <i className="fa-solid fa-rotate-left" />
              Retry
            </button>
            <button className={styles.primaryButton} onClick={handleBackToSuggestions}>
              Back to Suggestions
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Quiz view
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.progress}>
          Question {currentIndex + 1} of {quiz.questions.length}
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>
      
      <div className={styles.questionCard}>
        <div className={styles.questionHeader}>
          <span className={styles.questionNumber}>Q{currentIndex + 1}</span>
          {currentQuestion.topic && (
            <span className={styles.topic}>{currentQuestion.topic}</span>
          )}
        </div>
        
        <h3 className={styles.question}>{currentQuestion.question}</h3>
        
        <div className={styles.options}>
          {currentQuestion.options.map((option, idx) => {
            const isThisCorrect = idx === currentQuestion.correctIndex;
            const isSelected = selectedAnswer === idx;
            
            let optionClass = styles.option;
            if (hasAnswered) {
              if (isSelected && isCorrect) {
                optionClass = `${styles.option} ${styles.correct}`;
              } else if (isSelected && !isCorrect) {
                optionClass = `${styles.option} ${styles.incorrect}`;
              } else if (isThisCorrect) {
                optionClass = `${styles.option} ${styles.correct}`;
              } else {
                optionClass = `${styles.option} ${styles.disabled}`;
              }
            }
            
            const optionLabel = String.fromCharCode(65 + idx); // A, B, C, D
            
            return (
              <button
                key={idx}
                className={optionClass}
                onClick={() => handleAnswer(idx)}
                disabled={hasAnswered}
              >
                <div className={styles.optionBadge}>{optionLabel}</div>
                <div className={styles.optionText}>{option}</div>
                {hasAnswered && isThisCorrect && (
                  <div className={styles.correctIcon}>
                    <i className="fa-solid fa-check-circle" />
                  </div>
                )}
                {hasAnswered && isSelected && !isCorrect && (
                  <div className={styles.incorrectIcon}>
                    <i className="fa-solid fa-xmark-circle" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {hasAnswered && currentQuestion.explanation && (
          <div className={styles.explanation}>
            <div className={styles.explanationIcon}>
              <i className="fa-solid fa-lightbulb" />
            </div>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
