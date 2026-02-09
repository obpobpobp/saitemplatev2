'use client';

import React from 'react';
import classNames from 'classnames';
import { AddFileButtonProps } from './AddFileButton.types';
import styles from './AddFileButton.module.css';

/**
 * AddFileButton - Button to add more files to the upload
 * Displays as a dashed border card with a plus icon
 */
export const AddFileButton: React.FC<AddFileButtonProps> = ({
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(styles.button, className)}
      aria-label="Add more files"
    >
      <i className="fa-solid fa-plus" />
    </button>
  );
};


