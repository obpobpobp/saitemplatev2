'use client';

import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { ContextMenuProps } from './ContextMenu.types';
import styles from './ContextMenu.module.css';

/**
 * ContextMenu - Dropdown menu for chat input actions
 * Shows file upload options and context actions
 */
export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  onClose,
  onSelect,
  position = 'bottom-left',
  className,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleItemClick = (itemId: string, onClick?: () => void) => {
    if (onClick) {
      onClick();
    }
    onSelect(itemId);
    onClose();
  };

  return (
    <div 
      ref={menuRef}
      className={classNames(
        styles.menu,
        styles[position],
        className
      )}
      role="menu"
    >
      {items.map((item) => (
        <button
          key={item.id}
          className={styles.menuItem}
          onClick={() => handleItemClick(item.id, item.onClick)}
          role="menuitem"
        >
          <i className={item.icon} aria-hidden="true" />
          <span className={styles.label}>{item.label}</span>
          {item.hasSubmenu && (
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          )}
        </button>
      ))}
    </div>
  );
};

