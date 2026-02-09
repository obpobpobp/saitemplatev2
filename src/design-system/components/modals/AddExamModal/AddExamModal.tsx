/**
 * AddExamModal - Modal for adding new exams
 * 
 * Form for creating exams with:
 * - Smart name suggestions
 * - Optional date and weight
 * - Exam type selection
 * 
 * Features:
 * - Auto-suggests exam names based on existing exams
 * - Validates required fields
 * - Supports keyboard shortcuts (Escape to close)
 * 
 * @example
 * ```tsx
 * <AddExamModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   existingExams={exams}
 *   onAddExam={handleAddExam}
 * />
 * ```
 */

'use client';

import { useState, useEffect } from 'react';
import { Modal } from '../Modal';
import { Button } from '@/design-system/components/buttons/Button';
import { suggestExamName } from '@/lib/utils/examHelpers';
import type { AddExamModalProps, ExamType } from './AddExamModal.types';
import styles from './AddExamModal.module.css';

export const AddExamModal: React.FC<AddExamModalProps> = ({
  isOpen,
  onClose,
  existingExams,
  onAddExam,
}) => {
  // Form state
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examWeight, setExamWeight] = useState('');
  const [examType, setExamType] = useState<ExamType>('midterm');
  
  // Initialize with smart suggestion when modal opens
  useEffect(() => {
    if (isOpen) {
      const suggestedName = suggestExamName(existingExams);
      setExamName(suggestedName);
      
      // Default date to 30 days from now
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 30);
      setExamDate(defaultDate.toISOString().split('T')[0]);
    }
  }, [isOpen, existingExams]);
  
  // Reset form on close
  const handleClose = () => {
    setExamName('');
    setExamDate('');
    setExamWeight('');
    setExamType('midterm');
    onClose();
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!examName.trim()) {
      return;
    }
    
    onAddExam({
      name: examName.trim(),
      date: examDate ? new Date(examDate) : undefined,
      weight: examWeight ? parseInt(examWeight, 10) : undefined,
      isCompleted: false,
    });
    
    handleClose();
  };
  
  // Check if form is valid
  const isValid = examName.trim().length > 0;
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="medium"
      ariaLabel="Add exam"
    >
      <form onSubmit={handleSubmit} className={styles.modalContent}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add Exam</h2>
          <p className={styles.subtitle}>Schedule a new exam or assessment</p>
        </div>
        
        <div className={styles.form}>
          {/* Exam Name */}
          <div className={styles.formGroup}>
            <label htmlFor="exam-name" className={styles.label}>
              Exam Name
              <span className={styles.required}>*</span>
            </label>
            <input
              id="exam-name"
              type="text"
              className={styles.input}
              placeholder="e.g., Midterm I, Final Exam"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              autoFocus
              required
            />
          </div>
          
          {/* Exam Date */}
          <div className={styles.formGroup}>
            <label htmlFor="exam-date" className={styles.label}>
              Exam Date
              <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="exam-date"
              type="date"
              className={styles.input}
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
            <span className={styles.hint}>
              Leave empty if you don't know the date yet
            </span>
          </div>
          
          {/* Exam Weight */}
          <div className={styles.formGroup}>
            <label htmlFor="exam-weight" className={styles.label}>
              Weight
              <span className={styles.optional}>(optional)</span>
            </label>
            <div className={styles.inputGroup}>
              <input
                id="exam-weight"
                type="number"
                className={`${styles.input} ${styles.inputWithSuffix}`}
                placeholder="e.g., 40"
                min="0"
                max="100"
                value={examWeight}
                onChange={(e) => setExamWeight(e.target.value)}
              />
              <span className={styles.suffix}>% of final grade</span>
            </div>
          </div>
          
          {/* Exam Type */}
          <div className={styles.formGroup}>
            <label htmlFor="exam-type" className={styles.label}>
              Type
              <span className={styles.optional}>(optional)</span>
            </label>
            <select
              id="exam-type"
              className={styles.select}
              value={examType}
              onChange={(e) => setExamType(e.target.value as ExamType)}
            >
              <option value="midterm">Midterm</option>
              <option value="final">Final</option>
              <option value="quiz">Quiz</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div className={styles.footer}>
          <Button
            variant="secondary"
            onClick={handleClose}
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            color="black"
            type="submit"
            isDisabled={!isValid}
          >
            Add Exam
          </Button>
        </div>
      </form>
    </Modal>
  );
};

AddExamModal.displayName = 'AddExamModal';
