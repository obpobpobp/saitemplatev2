'use client';

import React from 'react';
import classNames from 'classnames';
import { ActionButtonProps } from './ActionButton.types';
import styles from './ActionButton.module.css';

/**
 * ActionButton - Suggested action button in chat
 * Used for quick replies and suggested next actions
 * 
 * @example
 * <ActionButton onClick={handleUpload}>
 *   Upload my materials
 * </ActionButton>
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  isDisabled = false,
  className,
}) => {
  return (
    <button
      type="button"
      className={classNames(styles.button, isDisabled && styles.disabled, className)}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};







