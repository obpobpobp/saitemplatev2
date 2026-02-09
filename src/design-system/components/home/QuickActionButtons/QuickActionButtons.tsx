'use client';

import React from 'react';
import classNames from 'classnames';
import { QuickActionButtonsProps, QuickAction } from './QuickActionButtons.types';
import styles from './QuickActionButtons.module.css';

/**
 * QuickActionButtons - Toggle buttons for quick actions (Mock exam, Summary, Quiz)
 * Single-select behavior with active state showing close icon
 */
export const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({
  activeAction = null,
  onActionChange,
  className,
}) => {
  const handleActionClick = (action: QuickAction): void => {
    // Toggle off if clicking active button
    if (activeAction === action) {
      onActionChange?.(null);
    } else {
      onActionChange?.(action);
    }
  };

  const renderButton = (
    action: QuickAction,
    icon: string,
    label: string
  ): JSX.Element => {
    const isActive = activeAction === action;

    return (
      <button
        key={action}
        type="button"
        onClick={() => handleActionClick(action)}
        className={classNames(styles.button, {
          [styles.active]: isActive,
        })}
        aria-pressed={isActive}
      >
        <i className={classNames('fa-solid', icon, styles.icon)} />
        <span className={styles.label}>{label}</span>
        {isActive && <i className={classNames('fa-solid', 'fa-xmark', styles.closeIcon)} />}
      </button>
    );
  };

  return (
    <div className={classNames(styles.container, className)}>
      {renderButton('mock-exam', 'fa-pen-to-square', 'Mock exam')}
      {renderButton('summary', 'fa-pen-nib', 'Summary')}
      {renderButton('quiz', 'fa-list-check', 'Quiz')}
    </div>
  );
};





