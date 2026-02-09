/**
 * Shadow Tokens
 * 
 * Elevation system using box shadows.
 * Based on design system shadow definitions.
 */

/**
 * Shadow definitions for different elevation levels
 */
export const shadows = {
  /** No shadow */
  none: 'none',
  
  /** Shadow 1: Subtle elevation (1px offset, 2px blur) */
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.12)',
  
  /** Shadow 2: Standard elevation (0px offset, 8px blur) */
  md: '0 0 8px 0 rgba(0, 0, 0, 0.15)',
  
  /** Shadow 3: Strong elevation (combined shadows) */
  lg: '0 4px 16px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.08)',
  
  /** Extra large elevation */
  xl: '0 8px 24px 0 rgba(0, 0, 0, 0.15), 0 0 12px 0 rgba(0, 0, 0, 0.1)',
  
  /** 2xl elevation for modals and popovers */
  '2xl': '0 16px 48px 0 rgba(0, 0, 0, 0.18), 0 0 16px 0 rgba(0, 0, 0, 0.12)',
} as const;

/**
 * Inner shadows for inset effects
 */
export const innerShadows = {
  sm: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.08)',
} as const;

/**
 * Focus ring shadows for accessibility
 */
export const focusRings = {
  /** Default focus ring */
  default: '0 0 0 3px rgba(33, 150, 243, 0.3)',
  /** Error focus ring */
  error: '0 0 0 3px rgba(244, 67, 54, 0.3)',
  /** Success focus ring */
  success: '0 0 0 3px rgba(76, 175, 80, 0.3)',
} as const;

export type Shadow = keyof typeof shadows;
export type InnerShadow = keyof typeof innerShadows;
export type FocusRing = keyof typeof focusRings;









