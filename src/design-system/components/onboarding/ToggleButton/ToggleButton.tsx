'use client';

import React from 'react';
import classNames from 'classnames';
import { ToggleButtonProps } from './ToggleButton.types';
import styles from './ToggleButton.module.css';

/**
 * ToggleButton - Toggleable button for tool selection
 * Used in onboarding to select tools like Mock exam, Summary, Quiz
 * 
 * @example
 * <ToggleButton 
 *   leftIcon="pen-to-square"
 *   rightIcon="close"
 *   isSelected={true}
 *   onClick={handleClick}
 * >
 *   Mock exam
 * </ToggleButton>
 */
export const ToggleButton: React.FC<ToggleButtonProps> = ({
  children,
  leftIcon,
  rightIcon,
  isSelected = false,
  isDisabled = false,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      className={classNames(
        styles.button,
        isSelected && styles.selected,
        isDisabled && styles.disabled,
        className
      )}
      onClick={onClick}
      disabled={isDisabled}
      aria-pressed={isSelected}
    >
      {leftIcon && (
        <i className={`fa-solid fa-${leftIcon}`} aria-hidden="true" />
      )}
      <span className={styles.label}>{children}</span>
      {rightIcon && (
        <i className={`fa-solid fa-${rightIcon}`} aria-hidden="true" />
      )}
    </button>
  );
};


