import React from 'react';
import classNames from 'classnames';
import { HeaderBreadcrumbProps } from './HeaderBreadcrumb.types';
import styles from './HeaderBreadcrumb.module.css';

/**
 * HeaderBreadcrumb - Navigation breadcrumb with folder icon
 * Shows current course/folder context in the header
 */
export const HeaderBreadcrumb: React.FC<HeaderBreadcrumbProps> = ({
  label,
  onClick,
  className,
}) => {
  return (
    <div className={classNames(styles.breadcrumb, className)}>
      <span className={styles.icon} aria-hidden="true" />
      {onClick ? (
        <button type="button" className={styles.link} onClick={onClick}>
          <span className={styles.label}>{label}</span>
        </button>
      ) : (
        <span className={styles.label}>{label}</span>
      )}
    </div>
  );
};






