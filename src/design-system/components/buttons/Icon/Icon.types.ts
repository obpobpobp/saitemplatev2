/**
 * Icon component types for button system
 * Supports Font Awesome icon integration
 */

export interface IconProps {
  /**
   * Font Awesome icon name (e.g., 'chevron-down', 'check', 'spinner')
   */
  name: string;

  /**
   * Icon size variant
   * @default 'medium'
   */
  size?: 'micro' | 'small' | 'medium' | 'large';

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Accessible label for icon-only contexts
   */
  ariaLabel?: string;

  /**
   * Whether to hide icon from screen readers
   * @default false
   */
  ariaHidden?: boolean;
}

export type IconSize = IconProps['size'];







