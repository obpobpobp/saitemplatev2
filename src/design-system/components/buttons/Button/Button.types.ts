/**
 * Button component types based on Figma specifications
 */

import type { ButtonHTMLAttributes, ReactNode, ElementType } from 'react';

/**
 * Button variants from Figma design system
 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'plain';

/**
 * Button color options from Figma design system
 */
export type ButtonColor = 'black' | 'white' | 'gray' | 'blue';

/**
 * Button size variants from Figma design system
 */
export type ButtonSize = 'micro' | 'small' | 'medium' | 'large';

/**
 * Button component props
 */
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * Button style variant
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Button color scheme
   * @default 'blue'
   */
  color?: ButtonColor;

  /**
   * Button size
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * Button content
   */
  children?: ReactNode;

  /**
   * Icon to display on the left side
   */
  leftIcon?: ReactNode;

  /**
   * Icon to display on the right side
   */
  rightIcon?: ReactNode;

  /**
   * Icon for icon-only button (renders circular button)
   */
  iconOnly?: ReactNode;

  /**
   * Whether the button is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the button is in loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Whether the button should take full width of its container
   * @default false
   */
  isFullWidth?: boolean;

  /**
   * Button type attribute
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Polymorphic prop to render button as different element
   * @default 'button'
   */
  as?: ElementType;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}







