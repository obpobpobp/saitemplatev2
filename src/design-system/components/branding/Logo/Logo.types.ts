import { SVGProps } from 'react';

/**
 * Logo variant
 */
export type LogoVariant = 'icon' | 'logotype';

/**
 * Logo color scheme
 */
export type LogoColor = 'dark' | 'light' | 'auto';

/**
 * Logo component props
 */
export interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'color'> {
  /**
   * Logo variant - icon only or full logotype
   * @default 'logotype'
   */
  variant?: LogoVariant;
  
  /**
   * Color scheme for the logo
   * @default 'auto'
   */
  color?: LogoColor;
  
  /**
   * Height of the logo in pixels
   * Width will be calculated to maintain aspect ratio
   * @default 24
   */
  height?: number;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
