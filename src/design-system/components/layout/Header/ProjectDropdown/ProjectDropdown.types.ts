/**
 * Project item for dropdown
 */
export interface ProjectItem {
  id: string;
  title: string;
  emoji?: string;
  isViewing?: boolean;
  lastAccessed?: string;
}

/**
 * ProjectDropdown component props
 */
export interface ProjectDropdownProps {
  /**
   * List of recent projects
   */
  projects: ProjectItem[];
  
  /**
   * Whether dropdown is open
   */
  isOpen?: boolean;
  
  /**
   * Handler for close button
   */
  onClose?: () => void;
  
  /**
   * Handler for project selection
   */
  onProjectSelect?: (projectId: string) => void;
  
  /**
   * Handler for project menu actions
   */
  onProjectMenu?: (projectId: string, action: string) => void;
  
  /**
   * Handler for "View all" button
   */
  onViewAll?: () => void;
  
  /**
   * Handler for "New Project" button
   */
  onNewProject?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}




