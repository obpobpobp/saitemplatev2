/**
 * StorageWidget Type Definitions
 * 
 * Props and interfaces for the StorageWidget component.
 */

/**
 * Props for the StorageWidget component
 * 
 * Displays storage stats and usage bar at bottom of Sources panel.
 */
export interface StorageWidgetProps {
  /**
   * Number of sources in library
   */
  sourceCount: number;
  
  /**
   * Total estimated questions from all sources
   */
  questionCount: number;
  
  /**
   * Storage used in megabytes
   */
  usedMB: number;
  
  /**
   * Maximum storage allowed in megabytes
   * @default 100
   */
  maxMB?: number;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
