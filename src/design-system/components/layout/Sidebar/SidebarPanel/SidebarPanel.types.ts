import { ReactNode } from 'react';

/**
 * SidebarPanel component props
 */
export interface SidebarPanelProps {
  /**
   * Panel title
   */
  title: string;
  
  /**
   * Icon for the panel (shown when sidebar is fully collapsed)
   */
  icon?: ReactNode;
  
  /**
   * Panel content (tiles, items, etc.)
   */
  children?: ReactNode;
  
  /**
   * Footer content (buttons, actions, etc.)
   */
  footer?: ReactNode;
  
  /**
   * Whether the panel is expanded (showing content)
   * @default false
   */
  isExpanded?: boolean;
  
  /**
   * Whether the entire sidebar is collapsed (icon-only mode)
   * When true, only shows the icon button
   * @default false
   */
  isSidebarCollapsed?: boolean;
  
  /**
   * Toggle expansion handler
   */
  onToggle?: () => void;
  
  /**
   * Action buttons to show in the header (right side)
   * Only shown when panel is not expanded (collapsed state)
   */
  headerActions?: ReactNode;
  
  /**
   * Whether to show the chevron toggle button
   * @default true
   */
  showChevron?: boolean;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}




