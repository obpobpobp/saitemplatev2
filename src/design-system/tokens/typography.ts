/**
 * Typography Tokens
 * 
 * Font families, sizes, weights, line heights, and letter spacing.
 * Based on design system tokens from Figma.
 */

/**
 * Font family definitions
 */
export const fontFamilies = {
  /** Primary font: DM Sans */
  primary: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  /** Display font: Lazzer */
  display: '"Lazzer", "DM Sans", sans-serif',
  /** Monospace font */
  mono: '"Fira Code", "Courier New", monospace',
} as const;

/**
 * Font size scale
 */
export const fontSizes = {
  /** 10px */
  0: '0.625rem',
  /** 12px */
  1: '0.75rem',
  /** 14px */
  2: '0.875rem',
  /** 16px */
  3: '1rem',
  /** 18px */
  4: '1.125rem',
  /** 22px */
  5: '1.375rem',
  /** 26px */
  6: '1.625rem',
  /** 32px */
  7: '2rem',
  /** 40px */
  8: '2.5rem',
  /** 48px */
  9: '3rem',
  /** 64px */
  10: '4rem',
} as const;

/**
 * Semantic font sizes
 */
export const semanticFontSizes = {
  xs: fontSizes[1],    // 12px
  sm: fontSizes[2],    // 14px
  md: fontSizes[3],    // 16px
  lg: fontSizes[4],    // 18px
  xl: fontSizes[5],    // 22px
  '2xl': fontSizes[6], // 26px
  '3xl': fontSizes[7], // 32px
  '4xl': fontSizes[8], // 40px
  '5xl': fontSizes[9], // 48px
} as const;

/**
 * Font weight definitions
 */
export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Line height scale
 */
export const lineHeights = {
  /** Tight: 1.3 (130%) */
  tight: 1.3,
  /** Normal: 1.4 (140%) */
  normal: 1.4,
  /** Relaxed: 1.5 (150%) */
  relaxed: 1.5,
  /** Loose: 1.6 (160%) */
  loose: 1.6,
} as const;

/**
 * Letter spacing scale
 */
export const letterSpacing = {
  /** Tighter: -0.02em */
  tighter: '-0.02em',
  /** Tight: -0.01em */
  tight: '-0.01em',
  /** Normal: 0 */
  normal: '0',
  /** Wide: 0.01em */
  wide: '0.01em',
  /** Wider: 0.02em */
  wider: '0.02em',
} as const;

/**
 * Typography presets matching Figma design system
 */
export const typographyPresets = {
  /** Title: Large display text */
  title: {
    fontFamily: fontFamilies.display,
    fontSize: fontSizes[9], // 48px
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tighter,
  },
  /** Heading 26: Section headings */
  heading26: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes[6], // 26px
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  },
  /** Subtitle 22: Subsection headings */
  subtitle22: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes[5], // 22px
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  /** Subtitle 18: Small headings */
  subtitle18: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes[4], // 18px
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  /** Body 16: Default body text */
  body16: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes[3], // 16px
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  /** Body 14: Secondary body text */
  body14: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes[2], // 14px
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  /** Body 12: Small text and captions */
  body12: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes[1], // 12px
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },
} as const;

export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeights;
export type LineHeight = keyof typeof lineHeights;
export type TypographyPreset = keyof typeof typographyPresets;









