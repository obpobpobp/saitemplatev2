/**
 * CreationsPanel Type Definitions
 */

import type { Creation, Exam, CreationsViewMode } from '@/types/course';

export interface CreationsPanelProps {
  /**
   * Array of creations to display
   */
  creations: Creation[];
  
  /**
   * Array of exams
   */
  exams: Exam[];
  
  /**
   * Current view mode
   */
  viewMode: CreationsViewMode;
  
  /**
   * Handler when view mode changes
   */
  onViewModeChange: (mode: CreationsViewMode) => void;
  
  /**
   * Handler for "Create New" button
   */
  onCreateNew: () => void;
  
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
   * Additional CSS class name
   */
  className?: string;
}
