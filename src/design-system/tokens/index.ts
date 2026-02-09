/**
 * Design System Tokens
 * 
 * Centralized export of all design tokens.
 * Import from this file to access any token category.
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
export * from './borders';
export * from './breakpoints';

import { colors } from './colors';
import { 
  fontFamilies, 
  fontSizes, 
  fontWeights, 
  lineHeights, 
  letterSpacing,
  typographyPresets,
} from './typography';
import { spacing, semanticSpacing } from './spacing';
import { shadows, innerShadows, focusRings } from './shadows';
import { borderWidths, borderRadius, borderStyles } from './borders';
import { breakpoints } from './breakpoints';

/**
 * Complete theme object with all tokens
 */
export const theme = {
  colors,
  typography: {
    families: fontFamilies,
    sizes: fontSizes,
    weights: fontWeights,
    lineHeights,
    letterSpacing,
    presets: typographyPresets,
  },
  spacing: {
    scale: spacing,
    semantic: semanticSpacing,
  },
  shadows: {
    outer: shadows,
    inner: innerShadows,
    focus: focusRings,
  },
  borders: {
    widths: borderWidths,
    radius: borderRadius,
    styles: borderStyles,
  },
  breakpoints,
} as const;

export type Theme = typeof theme;









