import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { AvatarControlProps } from './AvatarControl.types';
import { Avatar } from '../Avatar';
import styles from './AvatarControl.module.css';

/**
 * AvatarControl - User avatar with optional dropdown
 * Shows user avatar/initials with dropdown chevron and optional collab count
 */
export const AvatarControl: React.FC<AvatarControlProps> = ({
  variant = 'image',
  avatarUrl,
  initials = 'U',
  hasDropdown = true,
  collabCount,
  users = [],
  currentUser,
  isOpen: controlledIsOpen,
  onClick,
  onUserClick,
  className,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setInternalIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  const activeUsers = users.filter(u => u.isActive);
  const inactiveUsers = users.filter(u => !u.isActive);
  
  return (
    <div className={styles.avatarControlWrapper} ref={dropdownRef}>
      <button
        type="button"
        className={classNames(
          styles.avatarControl,
          isOpen && styles.open,
          className
        )}
        onClick={handleClick}
        aria-label="User menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Avatar
          variant={variant}
          imageUrl={avatarUrl}
          initials={initials}
          size="medium"
        />
        {hasDropdown && (
          <div className={styles.dropdownSection}>
            {collabCount !== undefined && collabCount > 0 && (
              <span className={styles.collabCount}>{collabCount}</span>
            )}
            <i className="fa-solid fa-chevron-down" aria-hidden="true" />
          </div>
        )}
      </button>
      
      {isOpen && users.length > 0 && (
        <div className={styles.dropdown}>
          {/* Current user */}
          {currentUser && (
            <div className={styles.currentUser}>
              <Avatar
                variant={currentUser.avatarUrl ? 'image' : 'initials'}
                imageUrl={currentUser.avatarUrl}
                initials={currentUser.initials || currentUser.name.slice(0, 2)}
                size="large"
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{currentUser.name}</span>
              </div>
              <button
                type="button"
                className={styles.userMenuButton}
                aria-label="User options"
              >
                <i className="fa-solid fa-ellipsis" aria-hidden="true" />
              </button>
            </div>
          )}
          
          {/* Active users section */}
          {activeUsers.length > 0 && (
            <div className={styles.userSection}>
              <div className={styles.sectionHeader}>Currently viewing</div>
              <div className={styles.userList}>
                {activeUsers.map(user => (
                  <button
                    key={user.id}
                    type="button"
                    className={styles.userItem}
                    onClick={() => onUserClick?.(user.id)}
                  >
                    <Avatar
                      variant={user.avatarUrl ? 'image' : 'initials'}
                      imageUrl={user.avatarUrl}
                      initials={user.initials || user.name.slice(0, 2)}
                      size="large"
                    />
                    <span className={styles.userItemName}>{user.name}</span>
                    <button
                      type="button"
                      className={styles.userMenuButton}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      aria-label="User options"
                    >
                      <i className="fa-solid fa-ellipsis" aria-hidden="true" />
                    </button>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Inactive users section */}
          {inactiveUsers.length > 0 && (
            <div className={styles.userSection}>
              <div className={styles.sectionHeader}>Inactive</div>
              <div className={styles.userList}>
                {inactiveUsers.map(user => (
                  <button
                    key={user.id}
                    type="button"
                    className={styles.userItem}
                    onClick={() => onUserClick?.(user.id)}
                  >
                    <Avatar
                      variant={user.avatarUrl ? 'image' : 'initials'}
                      imageUrl={user.avatarUrl}
                      initials={user.initials || user.name.slice(0, 2)}
                      size="large"
                    />
                    <span className={styles.userItemName}>{user.name}</span>
                    <button
                      type="button"
                      className={styles.userMenuButton}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      aria-label="User options"
                    >
                      <i className="fa-solid fa-ellipsis" aria-hidden="true" />
                    </button>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


