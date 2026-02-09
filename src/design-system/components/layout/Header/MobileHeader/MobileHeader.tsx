import React from 'react';
import classNames from 'classnames';
import { MobileHeaderProps } from './MobileHeader.types';
import styles from './MobileHeader.module.css';

/**
 * MobileHeader - Mobile version of the header (48px height)
 * Matches Figma mobile designs with 4 variants
 * 
 * @example
 * <MobileHeader
 *   variant="project"
 *   logo={<Logo variant="icon" height={16} />}
 *   title="Untitled Project"
 *   hasTitleDropdown
 *   onShareClick={handleShare}
 *   avatarUrl="/avatar.jpg"
 * />
 */
export const MobileHeader: React.FC<MobileHeaderProps> = ({
  variant = 'project',
  logo,
  title,
  hasTitleDropdown = false,
  onTitleDropdownClick,
  onSignInClick,
  onShareClick,
  onMenuClick,
  avatarUrl,
  avatarInitials,
  onAvatarClick,
  collaborators,
  collabCount,
  onCollaboratorsClick,
  className,
}) => {
  const showTitle = variant === 'project' || variant === 'shared';
  const showMenu = variant === 'project' || variant === 'shared';
  const showShare = variant === 'project' || variant === 'shared';
  const showSignIn = variant === 'home-guest';
  const showAvatar = (variant === 'home' || variant === 'project') && avatarUrl;
  const showCollaborators = variant === 'shared' && collaborators && collaborators.length > 0;

  return (
    <header className={classNames(styles.mobileHeader, className)}>
      {/* Left section */}
      <div className={styles.left}>
        {logo && (
          <div className={styles.logoBox}>
            {logo}
          </div>
        )}
        
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>{title || 'Studocu AI'}</h1>
          {showTitle && hasTitleDropdown && (
            <button
              className={styles.dropdownButton}
              onClick={onTitleDropdownClick}
              aria-label="Project options"
            >
              <i className="fa-solid fa-chevron-down" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Right section */}
      <div className={styles.right}>
        {showMenu && (
          <button
            className={styles.iconButton}
            onClick={onMenuClick}
            aria-label="Menu"
          >
            <i className="fa-solid fa-ellipsis-vertical" aria-hidden="true" />
          </button>
        )}
        
        {showShare && (
          <button
            className={styles.iconButton}
            onClick={onShareClick}
            aria-label="Share"
          >
            <i className="fa-solid fa-share" aria-hidden="true" />
          </button>
        )}
        
        {showSignIn && (
          <button
            className={styles.signInButton}
            onClick={onSignInClick}
          >
            Sign in
          </button>
        )}
        
        {showAvatar && (
          <button
            className={styles.avatarControlMobile}
            onClick={onAvatarClick}
            aria-label="User menu"
          >
            {avatarUrl ? (
              <div className={styles.avatarMobile}>
                <img src={avatarUrl} alt="User avatar" />
              </div>
            ) : avatarInitials ? (
              <div className={styles.avatarInitialsMobile}>
                {avatarInitials}
              </div>
            ) : null}
          </button>
        )}
        
        {showCollaborators && (
          <div className={styles.avatarSetMobile}>
            {collaborators.slice(0, 3).map((collab) => (
              <div key={collab.id} className={styles.collabAvatarMobile}>
                {collab.avatarUrl ? (
                  <img src={collab.avatarUrl} alt={collab.name || 'Collaborator'} />
                ) : (
                  <div className={styles.avatarInitialsMobile}>
                    {collab.initials || '?'}
                  </div>
                )}
              </div>
            ))}
            <button
              className={styles.collabControl}
              onClick={onCollaboratorsClick}
              aria-label="View collaborators"
            >
              {collabCount && collabCount > 3 && (
                <span className={styles.collabCountMobile}>{collabCount}</span>
              )}
              <i className={classNames('fa-solid fa-chevron-down', styles.collabChevronMobile)} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};




