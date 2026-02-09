import React from 'react';
import classNames from 'classnames';
import { HeaderProps } from './Header.types';
import { LogoBox } from './LogoBox';
import { HeaderTitle } from './HeaderTitle';
import { HeaderBreadcrumb } from './HeaderBreadcrumb';
import { HeaderActions } from './HeaderActions';
import { AvatarControl } from './AvatarControl';
import { AvatarSet } from './AvatarSet';
import styles from './Header.module.css';

/**
 * Header - Main application header component
 * Matches Figma designs with variants: project, home, shared, guest, home-guest
 * 
 * @example
 * // Project variant
 * <Header 
 *   variant="project"
 *   logo={<Logo size="small" />}
 *   title="Untitled Project"
 *   hasTitleDropdown
 *   breadcrumbLabel="Pharmacology"
 *   onPrivacyClick={handlePrivacy}
 *   onShareClick={handleShare}
 *   avatarUrl="/avatar.jpg"
 * />
 * 
 * @example
 * // Shared variant with collaborators
 * <Header 
 *   variant="shared"
 *   logo={<Logo size="small" />}
 *   title="Untitled Project"
 *   collaborators={[...]}
 *   onCollaboratorsClick={handleCollabs}
 * />
 */
export const Header: React.FC<HeaderProps> = ({
  variant = 'project',
  logo,
  onLogoClick,
  title,
  hasTitleDropdown = false,
  onTitleDropdownClick,
  breadcrumbLabel,
  onBreadcrumbClick,
  privacy = 'public',
  onPrivacyClick,
  onShareClick,
  onSignInClick,
  avatarUrl,
  avatarInitials,
  onAvatarClick,
  collabCount,
  collaborators,
  onCollaboratorsClick,
  recentProjects,
  onProjectSelect,
  onProjectMenu,
  onViewAllProjects,
  onNewProject,
  className,
}) => {
  // Determine what to show based on variant
  const showBreadcrumb = (variant === 'project' || variant === 'shared' || variant === 'guest') && breadcrumbLabel;
  const showActions = variant === 'project' || variant === 'shared' || variant === 'guest';
  const showSignIn = variant === 'guest' || variant === 'home-guest';
  const showAvatar = (variant === 'home' || variant === 'project') && !showSignIn;
  const showAvatarSet = variant === 'shared' && collaborators && collaborators.length > 0;

  return (
    <header className={classNames(styles.header, styles[`variant-${variant}`], className)}>
      <div className={styles.container}>
        {/* Left section - Logo, Title, Breadcrumb */}
        <div className={styles.left}>
          <div className={styles.logoTitleGroup}>
            {logo && <LogoBox onClick={onLogoClick}>{logo}</LogoBox>}
            {title && (
              <HeaderTitle
                title={title}
                hasDropdown={hasTitleDropdown && variant !== 'home' && variant !== 'home-guest'}
                onDropdownClick={onTitleDropdownClick}
                recentProjects={recentProjects}
                onProjectSelect={onProjectSelect}
                onProjectMenuAction={onProjectMenu}
                onViewAll={onViewAllProjects}
                onNewProject={onNewProject}
              />
            )}
          </div>
          
          {showBreadcrumb && (
            <HeaderBreadcrumb
              label={breadcrumbLabel!}
              onClick={onBreadcrumbClick}
            />
          )}
        </div>

        {/* Right section - Actions, Avatar */}
        <div className={styles.right}>
          {showActions && (
            <HeaderActions
              privacy={privacy}
              onPrivacyClick={onPrivacyClick}
              onShareClick={onShareClick}
              showSignIn={showSignIn}
              onSignInClick={onSignInClick}
            />
          )}
          
          {variant === 'home-guest' && (
            <HeaderActions
              showSignIn
              onSignInClick={onSignInClick}
            />
          )}
          
          {showAvatar && (
            <AvatarControl
              avatarUrl={avatarUrl}
              initials={avatarInitials}
              collabCount={collabCount}
              onClick={onAvatarClick}
            />
          )}
          
          {showAvatarSet && (
            <AvatarSet
              avatars={collaborators}
              onOverflowClick={onCollaboratorsClick}
            />
          )}
        </div>
      </div>
    </header>
  );
};
