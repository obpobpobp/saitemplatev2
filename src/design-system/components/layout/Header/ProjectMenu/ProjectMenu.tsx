import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { ProjectMenuProps, ProjectMenuAction } from './ProjectMenu.types';
import styles from './ProjectMenu.module.css';

/**
 * ProjectMenu - Dropdown menu for project actions
 * Shows Share, Rename, Make it private, and Delete options
 * 
 * @example
 * <ProjectMenu
 *   isOpen={isOpen}
 *   onSelect={handleMenuSelect}
 *   onClose={handleClose}
 * />
 */
export const ProjectMenu: React.FC<ProjectMenuProps> = ({
  isOpen,
  onSelect,
  onClose,
  className,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  const handleSelect = (action: ProjectMenuAction): void => {
    onSelect?.(action);
    onClose?.();
  };
  
  return (
    <div ref={menuRef} className={classNames(styles.menu, className)}>
      <button
        type="button"
        className={styles.menuItem}
        onClick={() => handleSelect('share')}
      >
        <div className={styles.menuIcon}>
          <i className="fa-duotone fa-solid fa-share" aria-hidden="true" />
        </div>
        <span className={styles.menuText}>Share</span>
      </button>
      
      <button
        type="button"
        className={styles.menuItem}
        onClick={() => handleSelect('rename')}
      >
        <div className={styles.menuIcon}>
          <i className="fa-duotone fa-solid fa-pencil" aria-hidden="true" />
        </div>
        <span className={styles.menuText}>Rename</span>
      </button>
      
      <button
        type="button"
        className={styles.menuItem}
        onClick={() => handleSelect('privacy')}
      >
        <div className={styles.menuIcon}>
          <i className="fa-duotone fa-solid fa-lock" aria-hidden="true" />
        </div>
        <span className={styles.menuText}>Make it private</span>
      </button>
      
      <button
        type="button"
        className={classNames(styles.menuItem, styles.danger)}
        onClick={() => handleSelect('delete')}
      >
        <div className={styles.menuIcon}>
          <i className="fa-duotone fa-solid fa-trash-can" aria-hidden="true" />
        </div>
        <span className={styles.menuText}>Delete</span>
      </button>
    </div>
  );
};


