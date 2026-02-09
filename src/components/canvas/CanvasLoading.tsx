/**
 * CanvasLoading Component
 * 
 * Enhanced loading state applying psychological principles:
 * - Labor illusion: Shows AI "work" to increase perceived value
 * - Goal gradient effect: Progress bar increases motivation
 * - Progress perception: Multiple steps create sense of thoroughness
 */

'use client';

import { useEffect, useState } from 'react';
import { Spinner } from '@/design-system/components/buttons/Spinner';
import styles from './CanvasLoading.module.css';

interface CanvasLoadingProps {
  message: string;
}

interface LoadingStep {
  label: string;
  duration: number;
  status: 'pending' | 'active' | 'completed';
}

export function CanvasLoading({ message }: CanvasLoadingProps) {
  const [steps, setSteps] = useState<LoadingStep[]>([
    { label: 'Analyzing your documents', duration: 1200, status: 'active' },
    { label: 'Identifying key concepts', duration: 1500, status: 'pending' },
    { label: 'Generating questions', duration: 1800, status: 'pending' },
    { label: 'Finalizing your quiz', duration: 1000, status: 'pending' },
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (currentStepIndex >= steps.length) return;

    const currentStep = steps[currentStepIndex];
    const timer = setTimeout(() => {
      // Mark current step as completed
      setSteps(prevSteps => 
        prevSteps.map((step, idx) => {
          if (idx === currentStepIndex) {
            return { ...step, status: 'completed' as const };
          }
          if (idx === currentStepIndex + 1) {
            return { ...step, status: 'active' as const };
          }
          return step;
        })
      );

      // Move to next step
      setCurrentStepIndex(prev => prev + 1);
    }, currentStep.duration);

    return () => clearTimeout(timer);
  }, [currentStepIndex, steps]);

  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" />
        </div>

        <h2 className={styles.title}>Creating Your Quiz</h2>
        <p className={styles.subtitle}>AI is analyzing your materials</p>

        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        <div className={styles.steps}>
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`${styles.step} ${styles[`step-${step.status}`]}`}
            >
              <div className={styles.stepIcon}>
                {step.status === 'completed' && (
                  <i className="fa-solid fa-circle-check" aria-hidden="true" />
                )}
                {step.status === 'active' && (
                  <Spinner size="small" />
                )}
                {step.status === 'pending' && (
                  <i className="fa-regular fa-circle" aria-hidden="true" />
                )}
              </div>
              <span className={styles.stepLabel}>{step.label}</span>
            </div>
          ))}
        </div>

        <p className={styles.encouragement}>
          <i className="fa-solid fa-sparkles" aria-hidden="true" />
          This will be worth the wait
        </p>
      </div>
    </div>
  );
}
