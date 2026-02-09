/**
 * CreateArtifactModal Type Definitions
 */

import type { Source, Creation, Exam } from '@/types/course';

export interface CreateArtifactModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  
  /**
   * Close handler
   */
  onClose: () => void;
  
  /**
   * Available sources to select from
   */
  sources: Source[];
  
  /**
   * Available exams to link to (optional)
   */
  exams?: Exam[];
  
  /**
   * Callback when artifact is created
   */
  onCreateArtifact: (artifact: Creation) => void;
}

/**
 * Source selection mode
 */
export type SourceSelectionMode = 'this-week' | 'all-references' | 'custom';

/**
 * Modal step
 */
export type ModalStep = 'source-selection' | 'artifact-selection' | 'exam-linking';
