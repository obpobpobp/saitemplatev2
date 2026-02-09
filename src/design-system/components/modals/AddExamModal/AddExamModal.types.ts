/**
 * AddExamModal Type Definitions
 */

import type { Exam } from '@/types/course';

export interface AddExamModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  
  /**
   * Close handler
   */
  onClose: () => void;
  
  /**
   * Existing exams (for smart name suggestions)
   */
  existingExams: Exam[];
  
  /**
   * Callback when exam is added
   */
  onAddExam: (exam: Omit<Exam, 'id' | 'createdAt'>) => void;
}

/**
 * Exam type options
 */
export type ExamType = 'midterm' | 'final' | 'quiz' | 'other';
