import React, { useState } from 'react';
import classNames from 'classnames';
import { TileButtonProps } from './TileButton.types';
import { Spinner } from '../../buttons/Spinner';
import styles from './TileButton.module.css';

/**
 * TileButton component for selection and action tiles
 * Supports vertical and horizontal orientations with multiple states
 * 
 * @example
 * <TileButton
 *   title="AI Notes"
 *   subtitle="Create from documents"
 *   icon="fa-solid fa-file"
 *   chipLabel="New"
 *   onClick={handleClick}
 * />
 */
export const TileButton: React.FC<TileButtonProps> = ({
  title,
  subtitle,
  icon,
  chipLabel,
  showArrow = false,
  orientation = 'vertical',
  color = 'neutral',
  state: controlledState,
  onClick,
  className,
  disabled = false,
  loadingText = 'Loading...',
  ariaLabel,
}) => {
  const [internalState, setInternalState] = useState<'default' | 'hover' | 'pressed'>('default');

  // Use controlled state if provided, otherwise use internal state
  const effectiveState = controlledState || (disabled ? 'disabled' : internalState);

  const handleMouseEnter = (): void => {
    if (!controlledState && !disabled && effectiveState !== 'loading') {
      setInternalState('hover');
    }
  };

  const handleMouseLeave = (): void => {
    if (!controlledState && !disabled) {
      setInternalState('default');
    }
  };

  const handleMouseDown = (): void => {
    if (!controlledState && !disabled && effectiveState !== 'loading') {
      setInternalState('pressed');
    }
  };

  const handleMouseUp = (): void => {
    if (!controlledState && !disabled) {
      setInternalState('hover');
    }
  };

  const handleClick = (): void => {
    if (disabled || effectiveState === 'loading') {
      return;
    }
    onClick?.();
  };

  const renderIcon = (): JSX.Element | null => {
    if (effectiveState === 'loading') {
      return <Spinner size="small" />;
    }

    if (!icon) {
      return null;
    }

    if (typeof icon === 'string') {
      // Font Awesome icon string
      return (
        <div className={styles.iconWrapper}>
          <i className={`${icon} ${styles.icon}`} aria-hidden="true" />
        </div>
      );
    }

    // Custom React element
    return <div className={styles.iconWrapper}>{icon}</div>;
  };

  return (
    <button
      type="button"
      className={classNames(
        styles.tile,
        styles[`orientation-${orientation}`],
        styles[`color-${color}`],
        styles[`state-${effectiveState}`],
        {
          [styles.clickable]: onClick && !disabled && effectiveState !== 'loading',
          [styles.disabled]: disabled || effectiveState === 'disabled',
        },
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      disabled={disabled || effectiveState === 'loading'}
      aria-label={ariaLabel || title}
      aria-busy={effectiveState === 'loading'}
    >
      <div className={styles.content}>
        <div className={styles.main}>
          {renderIcon()}
          
          <div className={styles.textWrapper}>
            <p className={styles.title}>
              {effectiveState === 'loading' ? loadingText : title}
            </p>
            {subtitle && effectiveState !== 'loading' && (
              <p className={styles.subtitle}>{subtitle}</p>
            )}
          </div>
        </div>

        {chipLabel && effectiveState !== 'loading' && (
          <div className={styles.chip}>
            <span className={styles.chipLabel}>{chipLabel}</span>
          </div>
        )}
      </div>

      {showArrow && effectiveState !== 'loading' && (
        <div className={styles.arrow}>
          <i className="fa-solid fa-chevron-right" aria-hidden="true" />
        </div>
      )}
    </button>
  );
};






