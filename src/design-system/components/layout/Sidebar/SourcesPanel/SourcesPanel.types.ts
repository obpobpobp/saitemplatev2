import { ReactNode } from 'react';

/**
 * SourcesPanel component props
 */
export interface SourcesPanelProps {
  /**
   * Panel content (source tiles)
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
   * Handler for search button click
   */
  onSearchClick?: () => void;
  
  /**
   * Handler for dropdown/filter button click
   */
  onFilterClick?: () => void;
  
  /**
   * Handler for Add button click in footer
   */
  onAddClick?: () => void;
  
  /**
   * Handler for Record button click in footer
   */
  onRecordClick?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
