import { ReactNode } from 'react';

/**
 * StatusChip component props
 */
export interface StatusChipProps {
  /**
   * Chip content/label
   */
  children: ReactNode;
  
  /**
   * Icon to display on the left
   */
  icon?: ReactNode;
  
  /**
   * Visual variant of the chip
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  
  /**
   * Additional CSS class name
   */
  className?: string;
}









