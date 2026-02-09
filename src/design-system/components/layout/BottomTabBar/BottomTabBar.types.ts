export type TabType = 'assistant' | 'creations' | 'sources';

/**
 * Props for the BottomTabBar component
 * 
 * Mobile-only tab bar for navigation between panels.
 */
export interface BottomTabBarProps {
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
   * Additional CSS class name
   */
  className?: string;
}
