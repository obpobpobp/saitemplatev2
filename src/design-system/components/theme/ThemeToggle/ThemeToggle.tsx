'use client';

import { useTheme } from '@design-system/theme/useTheme';
import styles from './ThemeToggle.module.css';
import { ThemeToggleProps } from './ThemeToggle.types';

/**
 * ThemeToggle - Button component for switching between light and dark themes
 * 
 * Provides a visual toggle button with sun/moon icons that switches
 * between light and dark modes. Accessible with proper ARIA labels.
 * 
 * @example
 * ```tsx
 * <ThemeToggle />
 * <ThemeToggle showLabel size="large" />
 * ```
 */
export function ThemeToggle({
  className,
  size = 'medium',
  showLabel = false,
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const buttonClasses = [
    styles.button,
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      onClick={toggleTheme}
      className={buttonClasses}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      type="button"
    >
      <span className={styles.iconWrapper} aria-hidden="true">
        <i className={`${styles.icon} fa-solid ${isDark ? 'fa-moon' : 'fa-sun'}`} />
      </span>
      {showLabel && (
        <span className={styles.label}>{isDark ? 'Dark' : 'Light'}</span>
      )}
    </button>
  );
}


