import React from 'react';
import classNames from 'classnames';
import { AvatarProps } from './Avatar.types';
import styles from './Avatar.module.css';

/**
 * Avatar - User avatar component with multiple variants
 * Matches Figma design system exactly
 * 
 * @example
 * // Image variant
 * <Avatar variant="image" imageUrl="/avatar.jpg" size="medium" />
 * 
 * @example
 * // Initials variant
 * <Avatar variant="initials" initials="MT" size="medium" />
 * 
 * @example
 * // Guest variant
 * <Avatar variant="guest" size="medium" />
 */
export const Avatar: React.FC<AvatarProps> = ({
  variant = 'initials',
  imageUrl,
  initials = 'U',
  size = 'medium',
  className,
}) => {
  const renderContent = (): JSX.Element => {
    switch (variant) {
      case 'image':
        return (
          <div className={styles.imageContainer}>
            <img 
              src={imageUrl || '/useravatar.jpg'} 
              alt="" 
              className={styles.image}
            />
          </div>
        );
      
      case 'initials':
        return (
          <div className={styles.initialsContainer}>
            <span className={styles.initials}>
              {initials.slice(0, 2).toUpperCase()}
            </span>
          </div>
        );
      
      case 'guest':
        return (
          <div className={styles.guestContainer}>
            <i className={classNames('fa-solid fa-user', styles.guestIcon)} aria-hidden="true" />
          </div>
        );
      
      default:
        return (
          <div className={styles.initialsContainer}>
            <span className={styles.initials}>{initials.slice(0, 2)}</span>
          </div>
        );
    }
  };

  return (
    <div className={classNames(styles.avatar, styles[size], className)}>
      {renderContent()}
    </div>
  );
};





