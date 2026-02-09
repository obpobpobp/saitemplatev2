export type TabType = 'assistant' | 'creations' | 'sources';

/**
 * Props for the TabNavigation component
 * 
 * Used for rendering tabbed navigation in the sidebar.
 */
export interface TabNavigationProps {
  /**
   * Currently active tab
   * @default 'assistant'
   */
  activeTab: TabType;
  
  /**
   * Callback when tab is changed
   */
  onTabChange: (tab: TabType) => void;
  
  /**
   * Badge count to display on Sources tab
   */
  sourceCount?: number;
  
  /**
   * Whether the sidebar is collapsed (icon-only mode)
   * @default false
   */
  isCollapsed?: boolean;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
