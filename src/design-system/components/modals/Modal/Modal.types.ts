import { ReactNode } from 'react';

/**
 * Modal size variants
 */
export type ModalSize = 'small' | 'medium' | 'large' | 'full';

/**
 * Modal component props
 */
export interface ModalProps {
  /**
   * Whether modal is open
   */
  isOpen: boolean;
  
  /**
   * Close handler
   */
  onClose?: () => void;
  
  /**
   * Modal content
   */
  children: ReactNode;
  
  /**
   * Modal size
   */
  size?: ModalSize;
  
  /**
   * Whether clicking backdrop closes modal
   */
  closeOnBackdropClick?: boolean;
  
  /**
   * Whether pressing Escape closes modal
   */
  closeOnEscape?: boolean;
  
  /**
   * Additional CSS class for modal container
   */
  className?: string;
  
  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
}







