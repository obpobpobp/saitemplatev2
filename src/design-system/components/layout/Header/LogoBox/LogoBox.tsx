import React from 'react';
import classNames from 'classnames';
import { LogoBoxProps } from './LogoBox.types';
import styles from './LogoBox.module.css';

/**
 * LogoBox - Container for logo with background
 * Used in header to display the Studocu AI logo
 */
export const LogoBox: React.FC<LogoBoxProps> = ({ children, onClick, className }) => {
  const handleClick = (): void => {
    onClick?.();
  };

  return (
    <div 
      className={classNames(styles.logoBox, onClick && styles.clickable, className)}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
};






