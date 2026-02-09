/**
 * Button Component
 *
 * Primary interaction component with multiple variants, colors, and sizes.
 * Built from Figma specifications with exact design fidelity.
 *
 * Features:
 * - 4 variants: Primary, Secondary, Tertiary, Plain
 * - 4 colors: Black, White, Gray, Blue
 * - 4 sizes: Micro, Small, Medium, Large
 * - Icon support: Left, Right, Icon-only
 * - States: Default, Hover, Active, Disabled, Loading
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <Button variant="primary" color="blue">Click me</Button>
 * <Button variant="secondary" leftIcon={<Icon name="check" />}>Save</Button>
 * <Button iconOnly={<Icon name="close" />} variant="tertiary" />
 * <Button isLoading>Loading...</Button>
 * ```
 */

'use client';

import { forwardRef } from 'react';
import type { ButtonProps } from './Button.types';
import { Spinner } from '../Spinner';
import styles from './Button.module.css';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      color = 'blue',
      size = 'medium',
      children,
      leftIcon,
      rightIcon,
      iconOnly,
      isDisabled = false,
      isLoading = false,
      isFullWidth = false,
      type = 'button',
      className = '',
      as: Component = 'button',
      onClick,
      ...restProps
    },
    ref
  ) => {
    // Determine if this is an icon-only button
    const isIconOnlyButton = Boolean(iconOnly && !children);

    // Build class names
    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[`${variant}${color.charAt(0).toUpperCase()}${color.slice(1)}`],
      styles[size],
      isIconOnlyButton && styles.iconOnly,
      isFullWidth && styles.fullWidth,
      isLoading && styles.loading,
      isDisabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Determine if button should be disabled
    const isButtonDisabled = isDisabled || isLoading;

    // Handle click events
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
      if (isButtonDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    // Render icon-only button
    if (isIconOnlyButton) {
      return (
        <Component
          ref={ref}
          type={type}
          className={buttonClasses}
          disabled={isButtonDisabled}
          aria-disabled={isButtonDisabled}
          onClick={handleClick}
          {...restProps}
        >
          {isLoading ? <Spinner size={size} /> : iconOnly}
        </Component>
      );
    }

    // Render regular button with optional icons
    return (
      <Component
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={isButtonDisabled}
        aria-disabled={isButtonDisabled}
        onClick={handleClick}
        {...restProps}
      >
        {isLoading ? (
          <>
            <Spinner size={size} />
            <span className={styles.loadingText}>{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
            {children && <span className={styles.text}>{children}</span>}
            {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
          </>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';







