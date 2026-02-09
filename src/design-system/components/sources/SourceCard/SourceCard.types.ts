/**
 * SourceCard Type Definitions
 * 
 * Props and interfaces for the SourceCard component.
 */

import type { Source } from '@/types/course';

/**
 * Props for the SourceCard component
 * 
 * Displays an individual source item in the timeline.
 */
export interface SourceCardProps {
  /**
   * Source data to display
   */
  source: Source;
  
  /**
   * Whether this source is currently active/selected
   * @default false
   */
  isActive?: boolean;
  
  /**
   * Whether this is a recently added source (shows +X questions)
   * @default false
   */
  isNew?: boolean;
  
  /**
   * Click handler when source is selected
   */
  onClick: () => void;
  
  /**
   * Remove handler for source deletion
   */
  onRemove: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
