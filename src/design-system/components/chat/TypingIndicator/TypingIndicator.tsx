'use client';

import type { TypingIndicatorProps } from './TypingIndicator.types';
import styles from './TypingIndicator.module.css';

/**
 * TypingIndicator - Displays a thinking state with animated assistant avatar
 * 
 * Shows the assistant avatar with a subtle pulse animation to indicate
 * that the AI is processing a response. Respects reduced motion preferences
 * and provides proper accessibility labels.
 * 
 * Features:
 * - Subtle pulse animation on avatar
 * - Monochromatic styling
 * - Screen reader accessible
 * - Reduced motion support
 * - Fade-in appearance animation
 * 
 * @example
 * ```tsx
 * <TypingIndicator />
 * ```
 * 
 * @example
 * ```tsx
 * <TypingIndicator 
 *   avatarSrc="/custom-avatar.png"
 *   ariaLabel="AI is processing"
 * />
 * ```
 */
export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  className = '',
  ariaLabel = 'Assistant is thinking',
  avatarSrc = '/Assistant avatar.png',
}) => {
  const classNames = [styles.container, className].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <div className={styles.avatar}>
        <img
          src={avatarSrc}
          alt=""
          className={styles.avatarImage}
          aria-hidden="true"
        />
      </div>
      <span className={styles.text}>Thinking...</span>
      <span className={styles.srOnly}>{ariaLabel}</span>
    </div>
  );
};

TypingIndicator.displayName = 'TypingIndicator';
