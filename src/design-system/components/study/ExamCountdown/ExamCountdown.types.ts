import type { Exam } from '@/types/course';

/**
 * Props for the ExamCountdown component
 * 
 * Sophisticated exam countdown with progress tracking and date slider.
 */
export interface ExamCountdownProps {
  /**
   * Array of exams (NEW: supports multiple exams)
   * If empty, shows empty state
   */
  exams?: Exam[];
  
  /**
   * Callback to open AddExamModal (NEW)
   */
  onAddExam?: () => void;
  
  /**
   * The exam date in ISO format (YYYY-MM-DD)
   * @deprecated Use exams prop instead
   * If undefined or empty, shows empty state
   */
  examDate?: string;
  
  /**
   * Called when user changes exam date via slider or picker
   */
  onDateChange?: (date: string) => void;
  
  /**
   * Called when user removes the exam date
   */
  onRemoveDate?: () => void;
  
  /**
   * Study progress (0-100)
   * @default 0
   */
  studyProgress?: number;
  
  /**
   * Total hours studied (optional)
   */
  hoursStudied?: number;
  
  /**
   * Whether to show the date adjustment slider
   * @default true
   */
  showSlider?: boolean;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Internal state for urgency levels
 */
export type UrgencyLevel = 'distant' | 'comfortable' | 'approaching' | 'urgent' | 'critical';

/**
 * View mode for the component
 */
export type ViewMode = 'compact' | 'expanded';
