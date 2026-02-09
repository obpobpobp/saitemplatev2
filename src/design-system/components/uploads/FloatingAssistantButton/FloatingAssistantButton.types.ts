export interface FloatingAssistantButtonProps {
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Whether the chat window is open
   */
  isOpen?: boolean;
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Button text
   */
  label?: string;
}
