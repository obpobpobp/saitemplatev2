import { ReactNode } from 'react';

export type TabType = 'assistant' | 'creations' | 'sources';

/**
 * Legacy Sidebar component props (for backward compatibility)
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

/**
 * Tabbed sidebar component props
 */
export interface TabbedSidebarProps {
  /**
   * Whether the sidebar is open (expanded)
   * @default true
   */
  isOpen?: boolean;
  
  /**
   * Currently active tab
   */
  activeTab: TabType;
  
  /**
   * Callback when tab is changed
   */
  onTabChange: (tab: TabType) => void;
  
  /**
   * Content for Assistant tab (ChatWindow)
   */
  assistantContent: ReactNode;
  
  /**
   * Content for Creations tab (CreationsPanel)
   */
  creationsContent: ReactNode;
  
  /**
   * Content for Sources tab (SourcesPanel)
   */
  sourcesContent: ReactNode;
  
  /**
   * Badge count to display on Sources tab
   */
  sourceCount?: number;
  
  /**
   * Side of the screen where sidebar appears
   * @default 'left'
   */
  side?: 'left';
  
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
   * Additional CSS class name
   */
  className?: string;
}
