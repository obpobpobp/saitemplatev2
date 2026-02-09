/**
 * CreationsViewToggle Type Definitions
 */

import type { CreationsViewMode } from '@/types/course';

export interface CreationsViewToggleProps {
  /**
   * Current view mode
   */
  value: CreationsViewMode;
  
  /**
   * Handler when view mode changes
   */
  onChange: (mode: CreationsViewMode) => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
