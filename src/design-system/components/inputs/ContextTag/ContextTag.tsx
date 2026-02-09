'use client';

import React from 'react';
import classNames from 'classnames';
import { ContextTagProps } from './ContextTag.types';
import styles from './ContextTag.module.css';

/**
 * ContextTag - Displays a context tag for course or topic selection
 * Used in typing area to add context to user queries
 */
export const ContextTag: React.FC<ContextTagProps> = ({
  type = 'course',
  onClick,
  className,
}) => {
  const isCourse = type === 'course';
  const iconClass = isCourse ? 'fa-folder' : 'fa-plus';
  const label = isCourse ? 'Add your course' : 'New project';

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        styles.tag,
        {
          [styles.course]: isCourse,
          [styles.topic]: !isCourse,
        },
        className
      )}
      aria-label={label}
    >
      <i className={classNames('fa-solid', iconClass, styles.icon)} />
      <span className={styles.label}>{label}</span>
    </button>
  );
};





