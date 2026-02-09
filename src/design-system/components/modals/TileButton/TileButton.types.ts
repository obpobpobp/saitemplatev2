import { ReactNode } from 'react';

/**
 * Tile button orientation
 */
export type TileButtonOrientation = 'vertical' | 'horizontal';

/**
 * Tile button interaction state
 */
export type TileButtonState = 'default' | 'hover' | 'pressed' | 'selected' | 'loading' | 'disabled';

/**
 * Tile button color variant
 */
export type TileButtonColor = 'neutral' | 'pink' | 'blue';

/**
 * TileButton component props
 */
export interface TileButtonProps {
  /**
   * Title text
   */
  title: string;

  /**
   * Optional subtitle/secondary text
   */
  subtitle?: string;

  /**
   * Font Awesome icon class or custom icon element
   * @example 'fa-solid fa-file', 'fa-solid fa-microphone'
   */
  icon?: ReactNode | string;

  /**
   * Optional chip label (e.g., "New", "3")
   */
  chipLabel?: string;

  /**
   * Show right arrow icon
   * @default false
   */
  showArrow?: boolean;

  /**
   * Orientation of the tile button
   * @default 'vertical'
   */
  orientation?: TileButtonOrientation;

  /**
   * Color variant
   * @default 'neutral'
   */
  color?: TileButtonColor;

  /**
   * Current state
   * @default 'default'
   */
  state?: TileButtonState;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Whether the tile is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Loading text to show in loading state
   * @default 'Loading...'
   */
  loadingText?: string;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
}






