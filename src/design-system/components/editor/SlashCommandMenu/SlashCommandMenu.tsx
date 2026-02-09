'use client';

import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { SlashCommandMenuProps } from './SlashCommandMenu.types';
import styles from './SlashCommandMenu.module.css';

/**
 * SlashCommandMenu - Dropdown menu for slash commands (Notion-like)
 * Appears when user types "/" in the editor
 * 
 * @example
 * <SlashCommandMenu 
 *   items={commands}
 *   selectedIndex={0}
 *   position={{ top: 100, left: 50 }}
 *   isVisible={true}
 *   onSelect={handleSelect}
 * />
 */
export const SlashCommandMenu: React.FC<SlashCommandMenuProps> = ({
  items,
  selectedIndex = 0,
  query = '',
  position,
  isVisible = false,
  onSelect,
  onSelectionChange,
  className,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Filter items based on query
  const filteredItems = query
    ? items.filter((item) => {
        const searchText = `${item.title} ${item.keywords?.join(' ') || ''}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      })
    : items;

  // Scroll selected item into view
  useEffect(() => {
    if (menuRef.current && isVisible) {
      const selectedElement = menuRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      ) as HTMLElement;
      
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex, isVisible]);

  if (!isVisible || filteredItems.length === 0) {
    return null;
  }

  const handleItemClick = (item: SlashCommandMenuProps['items'][0]): void => {
    onSelect?.(item);
  };

  const handleMouseEnter = (index: number): void => {
    onSelectionChange?.(index);
  };

  return (
    <div
      ref={menuRef}
      className={classNames(styles.menu, className)}
      style={position ? { top: position.top, left: position.left } : undefined}
      role="listbox"
      aria-label="Slash commands"
    >
      {filteredItems.map((item, index) => (
        <div
          key={item.id}
          data-index={index}
          className={classNames(
            styles.item,
            selectedIndex === index && styles.selected
          )}
          role="option"
          aria-selected={selectedIndex === index}
          onClick={() => handleItemClick(item)}
          onMouseEnter={() => handleMouseEnter(index)}
        >
          {item.icon && (
            <div className={styles.icon}>
              <span className={styles.iconGlyph} data-icon={item.icon} aria-hidden="true" />
            </div>
          )}
          <span className={styles.title}>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

