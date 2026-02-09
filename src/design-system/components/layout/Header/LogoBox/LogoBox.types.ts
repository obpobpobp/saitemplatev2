import { ReactNode } from 'react';

/**
 * LogoBox component props
 */
export interface LogoBoxProps {
  /**
   * Logo content (SVG, Image, or Logo component)
   */
  children: ReactNode;
  
  /**
   * Click handler for logo
   */
  onClick?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}






