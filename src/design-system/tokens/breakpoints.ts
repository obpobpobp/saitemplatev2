/**
 * Breakpoint Tokens
 * 
 * Responsive design breakpoints for different screen sizes.
 */

/**
 * Breakpoint pixel values
 */
export const breakpoints = {
  /** Mobile: 0-639px */
  sm: 640,
  /** Tablet: 640-1023px */
  md: 768,
  /** Desktop: 1024-1279px */
  lg: 1024,
  /** Large desktop: 1280-1535px */
  xl: 1280,
  /** Extra large desktop: 1536px+ */
  '2xl': 1536,
} as const;

/**
 * Generate media query string for a breakpoint
 * @param breakpoint - Breakpoint name
 * @returns Media query string
 * @example
 * ```css
 * @media ${mediaQuery('md')} {
 *   // Styles for tablet and up
 * }
 * ```
 */
export function mediaQuery(breakpoint: keyof typeof breakpoints): string {
  return `(min-width: ${breakpoints[breakpoint]}px)`;
}

/**
 * Generate max-width media query string
 * @param breakpoint - Breakpoint name
 * @returns Media query string
 */
export function mediaQueryMax(breakpoint: keyof typeof breakpoints): string {
  return `(max-width: ${breakpoints[breakpoint] - 1}px)`;
}

/**
 * Generate media query string for a range
 * @param min - Minimum breakpoint
 * @param max - Maximum breakpoint
 * @returns Media query string
 */
export function mediaQueryBetween(
  min: keyof typeof breakpoints,
  max: keyof typeof breakpoints
): string {
  return `(min-width: ${breakpoints[min]}px) and (max-width: ${
    breakpoints[max] - 1
  }px)`;
}

export type Breakpoint = keyof typeof breakpoints;









