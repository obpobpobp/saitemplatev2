'use client';

import React from 'react';
import classNames from 'classnames';
import { ActionChipsProps } from './ActionChips.types';
import styles from './ActionChips.module.css';

/**
 * ActionChips - Quick action buttons for AI tools
 * Displays above the input for quick tool switching
 */
export const ActionChips: React.FC<ActionChipsProps> = ({
  chips,
  onSelect,
  className,
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      {chips.map((chip) => (
        <button
          key={chip.id}
          className={styles.chip}
          onClick={() => onSelect(chip.id)}
          type="button"
        >
          {chip.icon && <i className={chip.icon} aria-hidden="true" />}
          <span>{chip.label}</span>
        </button>
      ))}
    </div>
  );
};

