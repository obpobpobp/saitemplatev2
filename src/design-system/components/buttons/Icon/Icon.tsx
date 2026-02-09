/**
 * Icon Component
 *
 * Wrapper for Font Awesome icons with size variants matching button sizes.
 * Provides consistent icon rendering across the button system.
 *
 * @example
 * ```tsx
 * <Icon name="chevron-down" size="medium" />
 * <Icon name="check" size="small" ariaLabel="Success" />
 * ```
 */

'use client';

import { forwardRef } from 'react';
import type { IconProps } from './Icon.types';
import styles from './Icon.module.css';

export const Icon = forwardRef<HTMLElement, IconProps>(
  ({ name, size = 'medium', className = '', ariaLabel, ariaHidden = false }, ref) => {
    const iconClasses = [
      'fa-solid',
      `fa-${name}`,
      styles.icon,
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <i
        ref={ref}
        className={iconClasses}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        role={ariaLabel ? 'img' : undefined}
      />
    );
  }
);

Icon.displayName = 'Icon';







