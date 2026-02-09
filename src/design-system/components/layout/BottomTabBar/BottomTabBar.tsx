'use client';

import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import type { BottomTabBarProps, TabType } from './BottomTabBar.types';
import styles from './BottomTabBar.module.css';

/**
 * BottomTabBar - Mobile-only bottom navigation
 * 
 * Provides tab navigation at the bottom of the screen on mobile devices.
 * Shows only on viewports < 768px wide.
 * 
 * Features:
 * - Three tabs: Assistant, Creations, Sources
 * - Active state with top indicator bar
 * - Badge support for Sources count
 * - Touch-optimized sizing
 * - Keyboard accessible
 * - WCAG 2.1 AA compliant
 * 
 * @example
 * ```tsx
 * <BottomTabBar 
 *   activeTab="assistant" 
 *   onTabChange={handleTabChange}
 *   sourceCount={5}
 * />
 * ```
 */
export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  sourceCount = 0,
  className,
}) => {
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
        id={`${tab}-tab-mobile`}
        onClick={() => onTabChange(tab)}
        className={styles.tab}
      >
        {icon}
        <span className={styles.label}>{label}</span>
        {badge !== undefined && badge > 0 && (
          <span className={styles.badge} aria-label={`${badge} items`}>
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <nav 
      className={classNames(styles.container, className)}
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className={styles.tablist} role="tablist">
        {renderTab(
          'assistant',
          <Image
            src="/Assistant avatar.png"
            alt=""
            width={24}
            height={24}
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
    </nav>
  );
};
