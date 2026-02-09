import { ReactNode } from 'react';

/**
 * CreationsPanel component props
 */
export interface CreationsPanelProps {
  /**
   * Panel content (creation tiles)
   */
  children?: ReactNode;
  
  /**
   * Whether the panel is expanded (showing content)
   * @default false
   */
  isExpanded?: boolean;
  
  /**
   * Whether the entire sidebar is collapsed (icon-only mode)
   * Now automatically detected via context - no need to pass
   * @deprecated Use context instead
   * @default false
   */
  isSidebarCollapsed?: boolean;
  
  /**
   * Toggle expansion handler
   */
  onToggle?: () => void;
  
  /**
   * Generate new creation handler
   */
  onGenerateClick?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
