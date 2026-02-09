/**
 * EmptyCreationsState Type Definitions
 */

import type { CreationsViewMode } from '@/types/course';

export interface EmptyCreationsStateProps {
  /**
   * Current view mode (determines message)
   */
  view: CreationsViewMode;
  
  /**
   * Handler for "Add Exam" button (exam view only)
   */
  onAddExam?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
