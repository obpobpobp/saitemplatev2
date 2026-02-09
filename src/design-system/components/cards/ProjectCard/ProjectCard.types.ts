/**
 * Project card variant
 */
export type ProjectCardVariant = 'project' | 'new-project';

/**
 * ProjectCard component props
 */
export interface ProjectCardProps {
  /**
   * Card variant
   */
  variant?: ProjectCardVariant;
  
  /**
   * Project emoji icon
   */
  emoji?: string;
  
  /**
   * Project title
   */
  title?: string;
  
  /**
   * Project subtitle (for new project)
   */
  subtitle?: string;
  
  /**
   * Course name
   */
  course?: string;
  
  /**
   * Last updated date
   */
  updatedDate?: string;
  
  /**
   * Whether project is locked/private
   */
  isLocked?: boolean;
  
  /**
   * Show "Add a course" link instead of course name
   */
  showAddCourse?: boolean;
  
  /**
   * Add course link click handler
   */
  onAddCourse?: (e: React.MouseEvent) => void;
  
  /**
   * Card click handler
   */
  onClick?: () => void;
  
  /**
   * Menu button click handler
   */
  onMenuClick?: (e: React.MouseEvent) => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}


