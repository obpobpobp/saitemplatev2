import { forwardRef } from 'react';
import styles from './Heading.module.css';
import { HeadingProps } from './Heading.types';

/**
 * Heading - Semantic heading component with flexible styling
 *
 * Renders semantic h1-h6 elements with optional visual style variants.
 * Supports polymorphic rendering and forward refs.
 *
 * @example
 * ```tsx
 * // Semantic h1 with default styling
 * <Heading level={1}>Page Title</Heading>
 *
 * // Semantic h2 with display variant styling
 * <Heading level={2} variant="display">Hero Title</Heading>
 *
 * // Render as div but style as h3
 * <Heading level={3} as="div">Styled Div</Heading>
 * ```
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, variant, children, className, as }, ref) => {
    // Determine the element type
    const Component = as || (`h${level}` as const);

    // Build class names
    const classNames = [
      styles.heading,
      styles[`level${level}`],
      variant && styles[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref} className={classNames}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';








