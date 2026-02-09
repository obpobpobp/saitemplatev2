/**
 * ExamSection Type Definitions
 */

import type { Exam, Creation } from '@/types/course';

export interface ExamSectionProps {
  /**
   * Exam data
   */
  exam: Exam;
  
  /**
   * Creations for this exam
   */
  creations: Creation[];
  
  /**
   * Whether section is collapsed
   */
  isCollapsed?: boolean;
  
  /**
   * Toggle collapse handler
   */
  onToggleCollapse?: () => void;
  
  /**
   * Handler when creation is clicked
   */
  onCreationClick: (creation: Creation) => void;
  
  /**
   * Handler when creation is deleted
   */
  onCreationDelete?: (creation: Creation) => void;
  
  /**
   * Currently active creation ID
   */
  activeCreationId?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
