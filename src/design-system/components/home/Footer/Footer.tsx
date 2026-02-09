'use client';

import React from 'react';
import classNames from 'classnames';
import { Logo } from '@design-system/components/branding';
import { FooterProps } from './Footer.types';
import styles from './Footer.module.css';

/**
 * Footer - Home page footer with Studocu branding
 */
export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={classNames(styles.footer, className)}>
      <div className={styles.poweredBy}>
        <span className={styles.text}>Powered by</span>
        <Logo variant="logotype" color="auto" height={22} />
        <span className={styles.text}>
          , the largest database of student-generated study notes in the world ♥︎
        </span>
      </div>

      <div className={styles.feedback}>
        <div className={styles.feedbackRow}>
          <i className="fa-solid fa-wand-magic-sparkles" />
          <p className={styles.feedbackText}>
            We're constantly polishing things for you.{' '}
            <button className={styles.feedbackLink}>
              Give feedback →
            </button>
          </p>
        </div>

        <p className={styles.disclaimer}>
          The documents that you upload and your AI study materials will be made available on the Studocu platform. By uploading them, you represent that you own the copyrights or have express permission from the owners to use and upload them.
        </p>
      </div>
    </footer>
  );
};



