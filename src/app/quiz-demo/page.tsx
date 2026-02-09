'use client';

import React, { useState } from 'react';
import { QuizQuestion, QuizResults, QuizRules } from '@/design-system/components/quiz';
import { Logo } from '@/design-system/components/branding';
import styles from './page.module.css';

const sampleQuestions = [
  {
    question: 'What concept does Bauman use to describe the temporary and loosely bound social groups in liquid modernity?',
    options: [
      'Networked individualism',
      'Mechanical solidarity',
      'Organic solidarity',
      'Swarm theory'
    ],
    correctOption: 0,
    explanation: 'Children typically begin developing basic social skills like sharing and taking turns around 2-3 years of age. This is when they start to understand concepts of ownership, fairness, and social interaction. At 12-18 months, children are still in parallel play stages and lack the cognitive development for true sharing. By 4-5 years, these skills should be more established, making 2-3 years the critical learning period.'
  },
  {
    question: 'Which of the following best describes the structure of cardiac muscle?',
    options: [
      'Long, cylindrical, multinucleated cells',
      'Branched, striated cells with intercalated discs',
      'Spindle-shaped, non-striated cells',
      'Short, branched, non-striated cells'
    ],
    correctOption: 1,
    explanation: 'Cardiac muscle cells are branched and striated, connected by intercalated discs which allow for synchronized contraction of the heart.'
  },
  {
    question: 'In contract law, what is required for a valid offer?',
    options: [
      'Acceptance by the offeree',
      'Definite and certain terms',
      'Written documentation',
      'Consideration from both parties'
    ],
    correctOption: 1,
    explanation: 'A valid offer must have definite and certain terms that the offeree can accept. It must be clear what is being offered and under what conditions.'
  }
];

export default function QuizDemoPage() {
  const [view, setView] = useState<'rules' | 'quiz' | 'results'>('rules');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | undefined)[]>([]);
  const [questionStates, setQuestionStates] = useState<('unanswered' | 'correct' | 'incorrect' | 'skipped')[]>(
    new Array(sampleQuestions.length).fill('unanswered')
  );
  const [showLoading, setShowLoading] = useState(false);

  const handleStart = () => {
    setView('quiz');
    setSelectedAnswers(new Array(sampleQuestions.length).fill(undefined));
    setQuestionStates(new Array(sampleQuestions.length).fill('unanswered'));
    setCurrentQuestion(0);
  };

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);

    const newStates = [...questionStates];
    newStates[currentQuestion] = optionIndex === sampleQuestions[currentQuestion].correctOption ? 'correct' : 'incorrect';
    setQuestionStates(newStates);
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setView('results');
    }
  };

  const handleSkip = () => {
    const newStates = [...questionStates];
    newStates[currentQuestion] = 'skipped';
    setQuestionStates(newStates);
    handleNext();
  };

  const handleReview = () => {
    setCurrentQuestion(0);
    setView('quiz');
  };

  const handleRetake = () => {
    setView('rules');
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuestionStates(new Array(sampleQuestions.length).fill('unanswered'));
  };

  const correctAnswers = questionStates.filter(s => s === 'correct').length;
  const incorrectAnswers = questionStates.filter(s => s === 'incorrect').length;
  const skippedQuestions = questionStates.filter(s => s === 'skipped').length;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Logo variant="logotype" color="auto" height={32} />
        <div className={styles.headerActions}>
          <button 
            className={styles.demoButton}
            onClick={() => {
              if (view === 'rules') setShowLoading(!showLoading);
            }}
          >
            {showLoading ? 'Hide' : 'Show'} Loading State
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {view === 'rules' && (
          <QuizRules
            questionCount={sampleQuestions.length}
            timeLimit={15}
            onStart={handleStart}
          />
        )}

        {view === 'quiz' && (
          <>
            <div className={styles.progress}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
                />
              </div>
              <div className={styles.progressText}>
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </div>
            </div>
            
            <QuizQuestion
              questionNumber={currentQuestion + 1}
              totalQuestions={sampleQuestions.length}
              question={sampleQuestions[currentQuestion].question}
              options={sampleQuestions[currentQuestion].options}
              selectedOption={selectedAnswers[currentQuestion]}
              correctOption={sampleQuestions[currentQuestion].correctOption}
              explanation={sampleQuestions[currentQuestion].explanation}
              state={questionStates[currentQuestion]}
              onSelectOption={handleSelectOption}
              onNext={handleNext}
              onSkip={handleSkip}
              isLoading={showLoading && questionStates[currentQuestion] === 'unanswered'}
            />
          </>
        )}

        {view === 'results' && (
          <QuizResults
            score={(correctAnswers / sampleQuestions.length) * 100}
            totalQuestions={sampleQuestions.length}
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            skippedQuestions={skippedQuestions}
            onReview={handleReview}
            onRetake={handleRetake}
            onClose={() => window.location.href = '/'}
          />
        )}
      </div>
    </div>
  );
}







