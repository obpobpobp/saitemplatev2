'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MockExamProps } from './MockExam.types';
import { Answer, ExamFeedback } from '../exam.types';
import { ExamProgressBar } from '../ExamProgressBar';
import { ExamMultipleChoice } from '../ExamMultipleChoice';
import { ExamShortAnswer } from '../ExamShortAnswer';
import { ExamLongAnswer } from '../ExamLongAnswer';
import { ExamMultiSelect } from '../ExamMultiSelect';
import { ExamTrueFalse } from '../ExamTrueFalse';
import { ExamFillBlanks } from '../ExamFillBlanks';
import { ExamQuestionFeedback } from '../ExamQuestionFeedback';
import { ExamResults } from '../ExamResults';
import { ExamDocuments } from '../ExamDocuments';
import { ExamStudyAssistant } from '../ExamStudyAssistant';
import styles from './MockExam.module.css';

/**
 * MockExam - Main container for mock exam with state management
 */
export const MockExam: React.FC<MockExamProps> = ({
  examId,
  questions,
  onSubmit,
  onMoreFeedback,
  className,
}) => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<ExamFeedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    if (isSubmitted) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isSubmitted]);

  // Answer handlers
  const handleAnswer = useCallback((questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        questionId,
        value,
        timestamp: Date.now(),
      },
    }));
  }, []);

  const handleMultipleChoice = (questionId: string, optionIndex: number) => {
    handleAnswer(questionId, optionIndex);
  };

  const handleMultiSelect = (questionId: string, currentSelections: number[], optionIndex: number) => {
    const newSelections = currentSelections.includes(optionIndex)
      ? currentSelections.filter((i) => i !== optionIndex)
      : [...currentSelections, optionIndex];
    handleAnswer(questionId, newSelections);
  };

  const handleTrueFalse = (questionId: string, value: boolean) => {
    handleAnswer(questionId, value);
  };

  const handleTextAnswer = (questionId: string, value: string) => {
    handleAnswer(questionId, value);
  };

  const handleFillBlanks = (questionId: string, currentValues: Record<string, string>, blankId: string, value: string) => {
    const newValues = { ...currentValues, [blankId]: value };
    handleAnswer(questionId, newValues);
  };

  // Submit handler
  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await onSubmit(answers);
      setFeedback(result);
      setIsSubmitted(true);
      // Scroll to top
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting exam:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate answered count
  const answeredCount = Object.keys(answers).filter((key) => {
    const answer = answers[key];
    if (Array.isArray(answer.value)) {
      return answer.value.length > 0;
    }
    if (typeof answer.value === 'object') {
      return Object.values(answer.value).some((v) => v !== '');
    }
    return answer.value !== '' && answer.value !== undefined && answer.value !== null;
  }).length;

  // Calculate total marks
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

  // Render question based on type
  const renderQuestion = (question: any, index: number) => {
    const answer = answers[question.id];
    const questionFeedback = feedback?.questionFeedback[question.id];
    const showFeedback = isSubmitted && !!questionFeedback;

    switch (question.type) {
      case 'multiple-choice':
        return (
          <ExamMultipleChoice
            key={question.id}
            questionNumber={index + 1}
            marks={question.marks}
            stem={question.stem}
            questionText={question.text}
            options={question.options || []}
            selectedOption={answer?.value as number | undefined}
            correctOption={question.correctAnswer as number | undefined}
            showFeedback={showFeedback}
            onSelectOption={(optionIndex) => handleMultipleChoice(question.id, optionIndex)}
          />
        );

      case 'short-answer':
        return (
          <ExamShortAnswer
            key={question.id}
            questionNumber={index + 1}
            marks={question.marks}
            stem={question.stem}
            questionText={question.text}
            value={(answer?.value as string) || ''}
            showFeedback={showFeedback}
            onChange={(value) => handleTextAnswer(question.id, value)}
          />
        );

      case 'long-answer':
        return (
          <ExamLongAnswer
            key={question.id}
            questionNumber={index + 1}
            marks={question.marks}
            stem={question.stem}
            questionText={question.text}
            value={(answer?.value as string) || ''}
            showFeedback={showFeedback}
            onChange={(value) => handleTextAnswer(question.id, value)}
          />
        );

      case 'multi-select':
        return (
          <ExamMultiSelect
            key={question.id}
            questionNumber={index + 1}
            marks={question.marks}
            stem={question.stem}
            questionText={question.text}
            options={question.options || []}
            selectedOptions={(answer?.value as number[]) || []}
            correctOptions={question.correctAnswer as number[] | undefined}
            showFeedback={showFeedback}
            onToggleOption={(optionIndex) => handleMultiSelect(question.id, (answer?.value as number[]) || [], optionIndex)}
          />
        );

      case 'true-false':
        return (
          <ExamTrueFalse
            key={question.id}
            questionNumber={index + 1}
            marks={question.marks}
            stem={question.stem}
            questionText={question.text}
            selectedValue={answer?.value as boolean | undefined}
            correctValue={question.correctAnswer as boolean | undefined}
            showFeedback={showFeedback}
            onSelect={(value) => handleTrueFalse(question.id, value)}
          />
        );

      case 'fill-blanks':
        return (
          <ExamFillBlanks
            key={question.id}
            questionNumber={index + 1}
            marks={question.marks}
            stem={question.stem}
            questionText={question.text}
            blanks={question.blanks || []}
            values={(answer?.value as Record<string, string>) || {}}
            showFeedback={showFeedback}
            onChange={(blankId, value) => handleFillBlanks(question.id, (answer?.value as Record<string, string>) || {}, blankId, value)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* Progress Bar */}
      <ExamProgressBar
        totalQuestions={questions.length}
        answeredCount={answeredCount}
        elapsedTime={elapsedTime}
        totalMarks={totalMarks}
        earnedMarks={feedback?.earnedMarks}
        isCompleted={isSubmitted}
      />

      {/* Scroll Container */}
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        {!isSubmitted ? (
          /* Questions (Before Submit) */
          <div className={styles.questionsContainer}>
            {questions.map((question, index) => (
              <div key={question.id} className={styles.questionWrapper} id={`question-${question.id}`}>
                {renderQuestion(question, index)}
              </div>
            ))}
          </div>
        ) : (
          /* Results and Feedback (After Submit) */
          <div className={styles.resultsContainer}>
            {/* Exam Results Card */}
            <ExamResults
              earnedMarks={feedback!.earnedMarks}
              totalMarks={feedback!.totalMarks}
              timeElapsed={feedback!.timeElapsed}
              onFeedback={() => {
                // Scroll to first question
                const firstQuestion = document.getElementById(`question-${questions[0].id}`);
                firstQuestion?.scrollIntoView({ behavior: 'smooth' });
              }}
              onRetry={() => window.location.reload()}
            />

            <div className={styles.divider} />

            {/* Recommended Documents */}
            {feedback?.recommendedDocs && feedback.recommendedDocs.length > 0 && (
              <>
                <ExamDocuments
                  documents={feedback.recommendedDocs}
                  totalCount={7}
                  onSeeAll={() => console.log('See all documents')}
                  onSaveDocument={(docId) => console.log('Save document:', docId)}
                />
                <div className={styles.divider} />
              </>
            )}

            {/* Study Assistant */}
            {feedback?.studyAssistantMessage && (
              <>
                <ExamStudyAssistant
                  message={feedback.studyAssistantMessage}
                  onPracticeWeakTopics={() => console.log('Practice weak topics')}
                  onAnalyzeMistakes={() => console.log('Analyze mistakes')}
                  onThumbsUp={() => console.log('Thumbs up')}
                  onThumbsDown={() => console.log('Thumbs down')}
                />
                <div className={styles.divider} />
              </>
            )}

            {/* Questions with Feedback */}
            <div className={styles.questionsWithFeedback}>
              {questions.map((question, index) => {
                const questionFeedback = feedback?.questionFeedback[question.id];
                return (
                  <div key={question.id} className={styles.questionWithFeedback} id={`question-${question.id}`}>
                    {renderQuestion(question, index)}
                    {questionFeedback && (
                      <ExamQuestionFeedback
                        feedback={questionFeedback}
                        onMoreFeedback={onMoreFeedback ? () => onMoreFeedback(question.id) : undefined}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button (Only before submission) */}
      {!isSubmitted && (
        <div className={styles.submitButtonContainer}>
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={answeredCount === 0 || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Exam'}
            {!isSubmitting && <i className={`fa-solid fa-paper-plane ${styles.submitIcon}`} />}
          </button>
        </div>
      )}

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingSpinner} />
            <div className={styles.loadingText}>Grading your exam...</div>
          </div>
        </div>
      )}
    </div>
  );
};

