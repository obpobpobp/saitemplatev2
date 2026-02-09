import { ReactNode } from 'react';

/**
 * Toolbar button configuration
 */
export interface ToolbarButton {
  /**
   * Unique identifier
   */
  id: string;
  
  /**
   * Icon name or ReactNode
   */
  icon: string | ReactNode;
  
  /**
   * Button label for accessibility
   */
  label: string;
  
  /**
   * Click handler
   */
  onClick: () => void;
  
  /**
   * Whether button is active/pressed
   */
  isActive?: boolean;
  
  /**
   * Whether button is disabled
   */
  isDisabled?: boolean;
  
  /**
   * Button variant
   */
  variant?: 'default' | 'primary' | 'text';
}

/**
 * SelectionToolbar component props
 */
export interface SelectionToolbarProps {
  /**
   * Toolbar buttons configuration
   */
  buttons: ToolbarButton[];
  
  /**
   * Position coordinates for the toolbar
   */
  position?: {
    top: number;
    left: number;
  };
  
  /**
   * Whether the toolbar is visible
   */
  isVisible?: boolean;
  
  /**
   * Whether to show separator after certain buttons
   */
  separatorAfter?: string[];
  
  /**
   * Additional CSS class name
   */
  className?: string;
}







