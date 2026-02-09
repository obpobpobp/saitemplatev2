import { ReactNode } from 'react';

/**
 * Icon sticker background color variant
 */
export type IconStickerVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'error';

/**
 * Icon sticker size
 */
export type IconStickerSize = 'small' | 'medium' | 'large';

/**
 * IconSticker component props
 */
export interface IconStickerProps {
  /**
   * Font Awesome icon class or custom icon element
   * @example 'fa-solid fa-file', 'fa-solid fa-check'
   */
  icon: string | ReactNode;

  /**
   * Color variant
   * @default 'neutral'
   */
  variant?: IconStickerVariant;

  /**
   * Size variant
   * @default 'medium'
   */
  size?: IconStickerSize;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
}






