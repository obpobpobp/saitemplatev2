/**
 * StudyGoals - Comprehensive example integrating ExamCountdown with ExamDatePicker
 * 
 * This component demonstrates how to combine the exam countdown
 * and date picker for a complete study goals experience.
 */

'use client';

import { useState } from 'react';
import { ExamCountdown } from '@/design-system/components/study';
import { ExamDatePicker } from './ExamDatePicker';
import styles from './StudyGoals.module.css';

interface StudyGoalsProps {
  /**
   * Initial exam date if already set
   */
  initialExamDate?: string;
  
  /**
   * Called when exam date changes
   */
  onDateChange?: (date: string) => void;
}

/**
 * StudyGoals - Complete study goals management
 * 
 * Shows exam countdown when date is set, date picker when configuring.
 * Demonstrates proper integration of countdown and picker components.
 * 
 * @example
 * ```tsx
 * <StudyGoals 
 *   initialExamDate="2026-03-15"
 *   onDateChange={(date) => console.log('Date changed:', date)}
 * />
 * ```
 */
export function StudyGoals({
  initialExamDate = '',
  onDateChange,
}: StudyGoalsProps): JSX.Element {
  const [examDate, setExamDate] = useState(initialExamDate);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (date: string) => {
    setExamDate(date);
    onDateChange?.(date);
    
    // Hide picker when date is cleared
    if (!date) {
      setShowPicker(false);
    }
  };

  const handleRemoveDate = () => {
    setExamDate('');
    setShowPicker(false);
    onDateChange?.('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Study Goals</h2>
        <p className={styles.description}>
          Set your exam date to track your study progress
        </p>
      </div>

      <div className={styles.content}>
        {/* Exam Countdown */}
        <ExamCountdown
          examDate={examDate}
          onDateChange={handleDateChange}
          onRemoveDate={handleRemoveDate}
          studyProgress={examDate ? 50 : 0}
          hoursStudied={examDate ? 10 : undefined}
        />

        {/* Date Picker - shown when user wants to set/change date */}
        {showPicker && (
          <div className={styles.pickerWrapper}>
            <ExamDatePicker
              value={examDate}
              onChange={handleDateChange}
            />
            
            {examDate && (
              <button
                className={styles.doneButton}
                onClick={() => setShowPicker(false)}
              >
                <i className="fa-solid fa-check" aria-hidden="true" />
                Done
              </button>
            )}
          </div>
        )}
      </div>

      {/* Study tips when exam is approaching */}
      {examDate && (
        <div className={styles.tips}>
          <div className={styles.tipIcon}>
            <i className="fa-solid fa-lightbulb" aria-hidden="true" />
          </div>
          <div className={styles.tipContent}>
            <p className={styles.tipTitle}>Study tip</p>
            <p className={styles.tipText}>
              Create a study schedule and break down your materials into daily goals
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
