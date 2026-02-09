import { ReactNode, ElementType } from 'react';

/**
 * Heading component props
 */
export interface HeadingProps {
  /**
   * Semantic heading level (h1-h6)
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Visual style variant (independent of semantic level)
   * @default undefined (uses level-based default styling)
   */
  variant?: 'display' | 'headline' | 'title' | 'subtitle';

  /**
   * Heading content
   */
  children: ReactNode;

  /**
   * Optional additional CSS class
   */
  className?: string;

  /**
   * Polymorphic element type override
   * Allows rendering as a different element while maintaining heading styles
   * @example as="div"
   */
  as?: ElementType;
}









