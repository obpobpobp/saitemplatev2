import { forwardRef } from 'react';
import styles from './Text.module.css';
import { TextProps } from './Text.types';

/**
 * Text - Body text component with multiple variants
 *
 * Flexible text component for paragraphs, captions, and labels.
 * Supports polymorphic rendering and text alignment.
 *
 * @example
 * ```tsx
 * // Default body text
 * <Text>This is body text content</Text>
 *
 * // Large body text
 * <Text variant="body-lg">Larger body text</Text>
 *
 * // Caption with center alignment
 * <Text variant="caption" align="center">Image caption</Text>
 *
 * // Render as span instead of p
 * <Text as="span" variant="label">Inline label</Text>
 * ```
 */
export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    { variant = 'body-md', children, className, as = 'p', align = 'left' },
    ref
  ) => {
    const Component = as;

    // Build class names
    const classNames = [
      styles.text,
      styles[variant],
      styles[`align${align.charAt(0).toUpperCase()}${align.slice(1)}`],
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

Text.displayName = 'Text';







