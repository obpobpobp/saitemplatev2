/**
 * ActionButton component props for suggested actions in chat
 */
export interface ActionButtonProps {
  /**
   * Button label text
   */
  children: React.ReactNode;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Whether button is disabled
   */
  isDisabled?: boolean;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}









