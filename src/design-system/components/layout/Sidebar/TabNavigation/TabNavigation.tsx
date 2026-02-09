'use client';

import React, { useRef } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import type { TabNavigationProps, TabType } from './TabNavigation.types';
import styles from './TabNavigation.module.css';

/**
 * TabNavigation - Tabbed navigation for sidebar
 * 
 * Provides navigation between Assistant, Creations, and Sources panels
 * with keyboard accessibility and badge support.
 * 
 * Features:
 * - Three tabs: Assistant (avatar), Creations (sparkle), Sources (books)
 * - Active state styling
 * - Badge support for Sources count
 * - Keyboard accessible (arrow keys, Enter/Space)
 * - Collapsed mode (icon-only)
 * - WCAG 2.1 AA compliant
 * 
 * @example
 * ```tsx
 * <TabNavigation 
 *   activeTab="assistant" 
 *   onTabChange={handleTabChange}
 *   sourceCount={5}
 *   isCollapsed={false}
 * />
 * ```
 */
export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  sourceCount = 0,
  isCollapsed = false,
  className,
}) => {
  const tablistRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, tab: TabType): void => {
    const tabs: TabType[] = ['assistant', 'creations', 'sources'];
    const currentIndex = tabs.indexOf(tab);
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    if (newIndex !== currentIndex) {
      onTabChange(tabs[newIndex]);
      // Focus the new tab
      const buttons = tablistRef.current?.querySelectorAll('button');
      if (buttons && buttons[newIndex]) {
        (buttons[newIndex] as HTMLButtonElement).focus();
      }
    }
  };

  const renderTab = (
    tab: TabType,
    icon: React.ReactNode,
    label: string,
    badge?: number
  ): JSX.Element => {
    const isActive = activeTab === tab;

    return (
      <button
        key={tab}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`${tab}-panel`}
        id={`${tab}-tab`}
        tabIndex={isActive ? 0 : -1}
        onClick={() => onTabChange(tab)}
        onKeyDown={(e) => handleKeyDown(e, tab)}
        className={styles.tab}
      >
        {icon}
        {!isCollapsed && <span className={styles.label}>{label}</span>}
        {badge !== undefined && badge > 0 && (
          <span className={styles.badge} aria-label={`${badge} items`}>
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div 
      className={classNames(styles.container, className, {
        [styles.collapsed]: isCollapsed,
      })}
      ref={tablistRef}
      role="tablist"
      aria-label="Sidebar navigation"
    >
      <div className={styles.tablist}>
        {renderTab(
          'assistant',
          <Image
            src="/Assistant avatar.png"
            alt=""
            width={20}
            height={20}
            className={styles.avatarIcon}
          />,
          'Assistant'
        )}
        {renderTab(
          'creations',
          <i className={classNames('fa-solid', 'fa-wand-magic-sparkles', styles.icon)} />,
          'Creations'
        )}
        {renderTab(
          'sources',
          <i className={classNames('fa-solid', 'fa-folder-open', styles.icon)} />,
          'Sources',
          sourceCount
        )}
      </div>
    </div>
  );
};
