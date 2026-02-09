/**
 * CreationCard Type Definitions
 */

import type { Creation, Exam, CreationsViewMode } from '@/types/course';

export interface CreationCardProps {
  /**
   * Creation data to display
   */
  creation: Creation;
  
  /**
   * Associated exam (for resolving examId)
   */
  exam?: Exam;
  
  /**
   * All available exams (for looking up linked exams)
   */
  exams?: Exam[];
  
  /**
   * Current view mode (affects display)
   */
  view: CreationsViewMode;
  
  /**
   * Whether this creation is currently active
   */
  isActive?: boolean;
  
  /**
   * Click handler
   */
  onClick: () => void;
  
  /**
   * Delete handler
   */
  onDelete?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
