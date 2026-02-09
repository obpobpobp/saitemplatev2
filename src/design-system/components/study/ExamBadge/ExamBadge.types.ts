/**
 * ExamBadge Type Definitions
 */

import type { Exam } from '@/types/course';

export interface ExamBadgeProps {
  /**
   * The exam to display
   */
  exam: Exam;
  
  /**
   * Show days until exam
   * @default true
   */
  showDays?: boolean;
  
  /**
   * Show weight badge
   * @default false
   */
  showWeight?: boolean;
  
  /**
   * Size variant
   * @default 'small'
   */
  size?: 'small' | 'medium';
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
