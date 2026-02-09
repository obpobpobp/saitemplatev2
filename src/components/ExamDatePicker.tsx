/**
 * ExamDatePicker Component
 * 
 * Simple date input wrapper for selecting exam date.
 */

'use client';

import styles from './ExamDatePicker.module.css';

interface ExamDatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

export function ExamDatePicker({ value, onChange }: ExamDatePickerProps) {
  const today = new Date().toISOString().split('T')[0];
  
  const handleClear = () => {
    onChange('');
  };
  
  return (
    <div className={styles.container}>
      <label htmlFor="examDate" className={styles.label}>
        <i className="fa-solid fa-calendar" aria-hidden="true" />
        When is your exam?
        <span className={styles.optional}>(optional)</span>
      </label>
      
      <div className={styles.inputWrapper}>
        <input
          id="examDate"
          type="date"
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={today}
        />
        
        {value && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear date"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        )}
      </div>
    </div>
  );
}
