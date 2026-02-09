import { ReactNode } from 'react';

/**
 * Sidebar component props
 */
export interface SidebarProps {
  /**
   * Sidebar content (typically SidebarPanel components)
   */
  children: ReactNode;
  
  /**
   * Whether the sidebar is open (expanded)
   * @default true
   */
  isOpen?: boolean;
  
  /**
   * Toggle sidebar open/closed handler
   */
  onToggle?: () => void;
  
  /**
   * Side of the screen where sidebar appears
   * @default 'left'
   */
  side?: 'left' | 'right';
  
  /**
   * Width of the sidebar when open (in pixels)
   * @default 400
   */
  width?: number;
  
  /**
   * Width of the sidebar when closed (in pixels)
   * @default 72
   */
  collapsedWidth?: number;
  
  /**
   * Whether to show footer action buttons
   * @default true
   */
  showFooterButtons?: boolean;
  
  /**
   * Add button click handler
   */
  onAddClick?: () => void;
  
  /**
   * Record button click handler
   */
  onRecordClick?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
