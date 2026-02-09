/**
 * Spinner Component
 *
 * Loading indicator for button loading states.
 * Animated spinner with size variants matching button sizes.
 *
 * @example
 * ```tsx
 * <Spinner size="medium" />
 * <Spinner size="small" ariaLabel="Processing" />
 * ```
 */

'use client';

import { forwardRef } from 'react';
import type { SpinnerProps } from './Spinner.types';
import styles from './Spinner.module.css';

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'medium', className = '', ariaLabel = 'Loading' }, ref) => {
    const spinnerClasses = [styles.spinner, styles[size], className]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        className={spinnerClasses}
        role="status"
        aria-label={ariaLabel}
        aria-live="polite"
      >
        <span className={styles.visuallyHidden}>{ariaLabel}</span>
      </span>
    );
  }
);

Spinner.displayName = 'Spinner';







