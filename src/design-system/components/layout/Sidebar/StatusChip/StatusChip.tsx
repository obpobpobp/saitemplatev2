import React from 'react';
import classNames from 'classnames';
import { StatusChipProps } from './StatusChip.types';
import styles from './StatusChip.module.css';

/**
 * StatusChip - Small status indicator with optional icon
 * Used for displaying status like "Viewing", "Processing", etc.
 * Exact Figma specs for "Viewing" badge
 * 
 * @example
 * <StatusChip 
 *   icon={<i className="fa-solid fa-eye" />} 
 *   variant="info"
 * >
 *   Viewing
 * </StatusChip>
 */
export const StatusChip: React.FC<StatusChipProps> = ({
  children,
  icon,
  variant = 'info',
  className,
}) => {
  return (
    <div
      className={classNames(
        styles.chip,
        styles[`variant-${variant}`],
        className
      )}
    >
      {icon && (
        <div className={styles.iconWrapper}>
          {icon}
        </div>
      )}
      {children && (
        <div className={styles.text}>
          {children}
        </div>
      )}
      <div className={styles.spacer} />
    </div>
  );
};
