'use client';

import React from 'react';
import classNames from 'classnames';
import { Logo } from '@design-system/components/branding';
import { HomeHeaderProps } from './HomeHeader.types';
import styles from './HomeHeader.module.css';

/**
 * HomeHeader - Simplified header for home page
 * Left: Studocu AI logo in gray container + text
 * Right: Sign in button
 * 
 * @example
 * <HomeHeader onSignIn={handleSignIn} />
 */
export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onSignIn,
  onLogoClick,
  className,
}) => {
  return (
    <header className={classNames(styles.header, className)}>
      <div className={styles.leftSection}>
        <button 
          type="button"
          onClick={onLogoClick}
          className={styles.logoContainer}
          aria-label="Go to home"
        >
          <Logo variant="icon" color="dark" height={16} />
        </button>
        <span className={styles.brandText}>Studocu AI</span>
      </div>
      
      <button 
        type="button"
        onClick={onSignIn}
        className={styles.signInButton}
      >
        Sign in
      </button>
    </header>
  );
};


