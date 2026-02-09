import React from 'react';
import classNames from 'classnames';
import { AvatarSetProps } from './AvatarSet.types';
import styles from './AvatarSet.module.css';

/**
 * AvatarSet - Multiple avatars for collaboration
 * Shows array of user avatars with overflow control
 */
export const AvatarSet: React.FC<AvatarSetProps> = ({
  avatars,
  maxDisplay = 4,
  onOverflowClick,
  className,
}) => {
  const displayAvatars = avatars.slice(0, maxDisplay - 1);
  const overflowCount = avatars.length - displayAvatars.length;
  const lastAvatar = avatars[displayAvatars.length];

  return (
    <div className={classNames(styles.avatarSet, className)}>
      {/* Regular avatars */}
      {displayAvatars.map((avatar, index) => (
        <div key={index} className={styles.avatar} title={avatar.name}>
          {avatar.avatarUrl ? (
            <img src={avatar.avatarUrl} alt="" className={styles.avatarImage} />
          ) : (
            <div 
              className={styles.initials}
              style={avatar.bgColor ? { backgroundColor: avatar.bgColor } : undefined}
            >
              {avatar.initials || avatar.name.substring(0, 2)}
            </div>
          )}
        </div>
      ))}
      
      {/* Overflow control with last avatar and count */}
      {overflowCount > 0 && (
        <button
          type="button"
          className={styles.overflowControl}
          onClick={onOverflowClick}
          aria-label={`Show ${overflowCount + 1} more collaborators`}
        >
          <div className={classNames(styles.avatar, styles.overflowAvatar)} title={lastAvatar.name}>
            {lastAvatar.avatarUrl ? (
              <img src={lastAvatar.avatarUrl} alt="" className={styles.avatarImage} />
            ) : (
              <div 
                className={styles.initials}
                style={lastAvatar.bgColor ? { backgroundColor: lastAvatar.bgColor } : undefined}
              >
                {lastAvatar.initials || lastAvatar.name.substring(0, 2)}
              </div>
            )}
          </div>
          <span className={styles.overflowCount}>{overflowCount + 1}</span>
          <span className={styles.chevron} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};






