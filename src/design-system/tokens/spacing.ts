/**
 * Spacing Tokens
 * 
 * Based on a 4px base unit with a comprehensive scale.
 * Use these tokens for consistent spacing throughout the application.
 */

export const spacing = {
  /** 4px */
  1: '4px',
  /** 8px */
  2: '8px',
  /** 12px */
  3: '12px',
  /** 16px */
  4: '16px',
  /** 20px */
  5: '20px',
  /** 24px */
  6: '24px',
  /** 28px */
  7: '28px',
  /** 32px */
  8: '32px',
  /** 36px */
  9: '36px',
  /** 40px */
  10: '40px',
  /** 44px */
  11: '44px',
  /** 48px */
  12: '48px',
  /** 52px */
  13: '52px',
  /** 56px */
  14: '56px',
  /** 60px */
  15: '60px',
  /** 64px */
  16: '64px',
  /** 80px */
  20: '80px',
  /** 96px */
  24: '96px',
  /** 128px */
  32: '128px',
} as const;

/**
 * Semantic spacing names for common use cases
 */
export const semanticSpacing = {
  /** Extra small: 4px */
  xs: spacing[1],
  /** Small: 8px */
  sm: spacing[2],
  /** Medium: 16px */
  md: spacing[4],
  /** Large: 24px */
  lg: spacing[6],
  /** Extra large: 32px */
  xl: spacing[8],
  /** 2x extra large: 48px */
  '2xl': spacing[12],
  /** 3x extra large: 64px */
  '3xl': spacing[16],
} as const;

export type SpacingScale = keyof typeof spacing;
export type SemanticSpacing = keyof typeof semanticSpacing;

/**
 * Helper function to get spacing value
 * @param size - Spacing scale or semantic name
 * @returns Spacing value in pixels
 */
export function getSpacing(size: SpacingScale | SemanticSpacing): string {
  if (size in semanticSpacing) {
    return semanticSpacing[size as SemanticSpacing];
  }
  return spacing[size as SpacingScale];
}









