/**
 * Border Tokens
 * 
 * Border widths, radius, and styles for consistent component design.
 */

/**
 * Border width scale
 */
export const borderWidths = {
  none: '0',
  thin: '1px',
  medium: '2px',
  thick: '4px',
} as const;

/**
 * Border radius scale
 */
export const borderRadius = {
  /** No radius */
  none: '0',
  /** Small: 4px */
  sm: '4px',
  /** Medium: 8px */
  md: '8px',
  /** Large: 12px */
  lg: '12px',
  /** Extra large: 16px */
  xl: '16px',
  /** 2xl: 24px */
  '2xl': '24px',
  /** Full: 9999px (pill shape) */
  full: '9999px',
} as const;

/**
 * Border styles
 */
export const borderStyles = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
} as const;

export type BorderWidth = keyof typeof borderWidths;
export type BorderRadius = keyof typeof borderRadius;
export type BorderStyle = keyof typeof borderStyles;









