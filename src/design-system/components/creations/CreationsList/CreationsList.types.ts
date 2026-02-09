/**
 * CreationsList Type Definitions
 */

import type { Creation, Exam, CreationsViewMode } from '@/types/course';

export interface CreationsListProps {
  /**
   * Array of creations to display
   */
  creations: Creation[];
  
  /**
   * Array of exams (for organizing in exam view)
   */
  exams: Exam[];
  
  /**
   * Current view mode
   */
  viewMode: CreationsViewMode;
  
  /**
   * Currently active creation ID
   */
  activeCreationId?: string;
  
  /**
   * Handler when creation is clicked
   */
  onCreationClick: (creation: Creation) => void;
  
  /**
   * Handler when creation is deleted
   */
  onCreationDelete?: (creation: Creation) => void;
  
  /**
   * Handler to add new exam
   */
  onAddExam?: () => void;
  
  /**
   * Handler for "Create New" button
   */
  onCreateNew?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
