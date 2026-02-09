/**
 * Project menu action type
 */
export type ProjectMenuAction = 'share' | 'rename' | 'privacy' | 'delete';

/**
 * ProjectMenu component props
 */
export interface ProjectMenuProps {
  /**
   * Whether menu is open
   */
  isOpen?: boolean;
  
  /**
   * Handler for menu item selection
   */
  onSelect?: (action: ProjectMenuAction) => void;
  
  /**
   * Handler for menu close
   */
  onClose?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}





