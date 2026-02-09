import { createContext, useContext } from 'react';

/**
 * Sidebar context to share sidebar state with child panels
 * Allows panels to automatically adapt to sidebar open/closed state
 */
interface SidebarContextValue {
  /**
   * Whether the sidebar is open (expanded) or closed (icon-only)
   */
  isOpen: boolean;
}

const SidebarContext = createContext<SidebarContextValue>({ 
  isOpen: true 
});

/**
 * Hook to access sidebar context
 * Used by panels to determine if sidebar is collapsed
 */
export const useSidebarContext = (): SidebarContextValue => {
  return useContext(SidebarContext);
};

export { SidebarContext };

