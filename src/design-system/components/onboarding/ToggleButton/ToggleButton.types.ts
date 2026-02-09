import { ReactNode } from 'react';

/**
 * ToggleButton component props
 */
export interface ToggleButtonProps {
  /**
   * Button label text
   */
  children: ReactNode;
  
  /**
   * Left icon (Font Awesome icon name)
   */
  leftIcon?: string;
  
  /**
   * Right icon (Font Awesome icon name)
   */
  rightIcon?: string;
  
  /**
   * Whether button is selected/active
   */
  isSelected?: boolean;
  
  /**
   * Whether button is disabled
   */
  isDisabled?: boolean;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}







