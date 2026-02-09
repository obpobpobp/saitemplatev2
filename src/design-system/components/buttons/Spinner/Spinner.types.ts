/**
 * Spinner component types for loading states
 */

export interface SpinnerProps {
  /**
   * Spinner size variant matching button sizes
   * @default 'medium'
   */
  size?: 'micro' | 'small' | 'medium' | 'large';

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Accessible label for screen readers
   * @default 'Loading'
   */
  ariaLabel?: string;
}

export type SpinnerSize = SpinnerProps['size'];









