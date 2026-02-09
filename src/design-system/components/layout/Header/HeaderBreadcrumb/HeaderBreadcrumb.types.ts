/**
 * HeaderBreadcrumb component props
 */
export interface HeaderBreadcrumbProps {
  /**
   * Course or folder name
   */
  label: string;
  
  /**
   * Click handler for breadcrumb link
   */
  onClick?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}






