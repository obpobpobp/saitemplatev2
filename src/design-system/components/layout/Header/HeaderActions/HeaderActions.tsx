import React from 'react';
import classNames from 'classnames';
import { HeaderActionsProps } from './HeaderActions.types';
import styles from './HeaderActions.module.css';

/**
 * HeaderActions - Action buttons in the header
 * Displays Privacy, Share, and optionally Sign In buttons
 */
export const HeaderActions: React.FC<HeaderActionsProps> = ({
  privacy = 'public',
  onPrivacyClick,
  onShareClick,
  showSignIn = false,
  onSignInClick,
  className,
}) => {
  return (
    <div className={classNames(styles.actions, className)}>
      {!showSignIn && (
        <>
          <button
            type="button"
            className={styles.button}
            onClick={onPrivacyClick}
            aria-label={`Privacy: ${privacy}`}
          >
            <i className="fa-solid fa-globe" aria-hidden="true" />
            <span>{privacy === 'public' ? 'Public' : 'Private'}</span>
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={onShareClick}
            aria-label="Share"
          >
            <i className="fa-solid fa-share" aria-hidden="true" />
            <span>Share</span>
          </button>
        </>
      )}
      {showSignIn && (
        <button
          type="button"
          className={classNames(styles.button, styles.signInButton)}
          onClick={onSignInClick}
          aria-label="Sign in"
        >
          <span>Sign in</span>
        </button>
      )}
    </div>
  );
};


