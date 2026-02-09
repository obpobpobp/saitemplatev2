'use client';

import { useState, useEffect, useCallback } from 'react';

export type TabType = 'assistant' | 'creations' | 'sources';

interface UseTabContextReturn {
  /**
   * Currently active tab
   */
  activeTab: TabType;
  
  /**
   * Handle tab change (user or programmatic)
   */
  handleTabChange: (tab: TabType, isUserAction?: boolean) => void;
  
  /**
   * Programmatically switch to Creations tab (if no user preference)
   * @param force - If true, switch regardless of user preference
   */
  switchToCreations: (force?: boolean) => void;
  
  /**
   * Programmatically switch to Sources tab (if no user preference)
   * @param force - If true, switch regardless of user preference
   */
  switchToSources: (force?: boolean) => void;
  
  /**
   * Reset user preference (for testing/dev)
   */
  resetUserPreference: () => void;
}

/**
 * useTabContext - Smart contextual tab switching hook
 * 
 * Manages tab state with intelligent context-aware switching:
 * 1. User explicitly clicks tab → remember preference
 * 2. Creation added → switch to 'creations' (if no user preference)
 * 3. Source uploaded → switch to 'sources' (if no user preference)
 * 4. Default → 'assistant'
 * 
 * Persists last user-selected tab to localStorage.
 * 
 * @example
 * ```tsx
 * const { activeTab, handleTabChange, switchToCreations } = useTabContext();
 * 
 * // User clicks tab
 * <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
 * 
 * // Programmatic switch after creating content
 * const handleCreateNew = () => {
 *   createContent();
 *   switchToCreations(); // Only switches if user hasn't set preference
 * };
 * ```
 */
export function useTabContext(): UseTabContextReturn {
  const [activeTab, setActiveTab] = useState<TabType>('assistant');
  const [lastUserSelectedTab, setLastUserSelectedTab] = useState<TabType | null>(null);

  // Load last user preference from localStorage on mount
  useEffect(() => {
    try {
      const savedTab = localStorage.getItem('last-active-tab') as TabType | null;
      if (savedTab && ['assistant', 'creations', 'sources'].includes(savedTab)) {
        setActiveTab(savedTab);
        setLastUserSelectedTab(savedTab);
      }
    } catch (error) {
      console.warn('Failed to load tab preference from localStorage:', error);
    }
  }, []);

  /**
   * Handle tab change
   * @param tab - Tab to switch to
   * @param isUserAction - Whether this was triggered by user (click) vs programmatic
   */
  const handleTabChange = useCallback((tab: TabType, isUserAction = true): void => {
    setActiveTab(tab);
    
    if (isUserAction) {
      // User explicitly selected this tab - remember their preference
      setLastUserSelectedTab(tab);
      try {
        localStorage.setItem('last-active-tab', tab);
      } catch (error) {
        console.warn('Failed to save tab preference to localStorage:', error);
      }
    }
  }, []);

  /**
   * Switch to Creations tab (only if no user preference)
   * Called after creating new content
   * @param force - If true, switch regardless of user preference
   */
  const switchToCreations = useCallback((force = false): void => {
    if (force || !lastUserSelectedTab) {
      handleTabChange('creations', false);
    }
  }, [lastUserSelectedTab, handleTabChange]);

  /**
   * Switch to Sources tab (only if no user preference)
   * Called after uploading/adding sources
   * @param force - If true, switch regardless of user preference
   */
  const switchToSources = useCallback((force = false): void => {
    if (force || !lastUserSelectedTab) {
      handleTabChange('sources', false);
    }
  }, [lastUserSelectedTab, handleTabChange]);

  /**
   * Reset user preference (useful for testing/dev)
   */
  const resetUserPreference = useCallback((): void => {
    setLastUserSelectedTab(null);
    try {
      localStorage.removeItem('last-active-tab');
    } catch (error) {
      console.warn('Failed to remove tab preference from localStorage:', error);
    }
  }, []);

  return {
    activeTab,
    handleTabChange,
    switchToCreations,
    switchToSources,
    resetUserPreference,
  };
}
