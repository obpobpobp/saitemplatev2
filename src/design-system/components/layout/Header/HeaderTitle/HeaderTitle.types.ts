import { ProjectItem } from '../ProjectDropdown/ProjectDropdown.types';
import { ProjectMenuAction } from '../ProjectMenu/ProjectMenu.types';

/**
 * HeaderTitle component props
 */
export interface HeaderTitleProps {
  /**
   * Title text
   */
  title: string;
  
  /**
   * Whether to show dropdown button
   * @default false
   */
  hasDropdown?: boolean;
  
  /**
   * Recent projects for dropdown
   */
  recentProjects?: ProjectItem[];
  
  /**
   * Dropdown click handler (legacy)
   */
  onDropdownClick?: () => void;
  
  /**
   * Handler for project selection
   */
  onProjectSelect?: (projectId: string) => void;
  
  /**
   * Handler for project menu action
   */
  onProjectMenuAction?: (projectId: string, action: ProjectMenuAction) => void;
  
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


