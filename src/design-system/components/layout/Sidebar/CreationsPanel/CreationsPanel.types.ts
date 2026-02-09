import { ReactNode } from 'react';

/**
 * CreationsPanel component props (for tabbed sidebar)
 */
export interface CreationsPanelProps {
  /**
   * Panel content (creation tiles)
   */
  children?: ReactNode;
  
  /**
   * Generate new creation handler
   */
  onGenerateClick?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * @deprecated Legacy prop - no longer used in tabbed sidebar
   */
  isExpanded?: boolean;
  
  /**
   * @deprecated Legacy prop - no longer used in tabbed sidebar
   */
  onToggle?: () => void;
}
