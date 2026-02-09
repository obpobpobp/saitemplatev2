import React from 'react';
import classNames from 'classnames';
import { SidebarProps } from './Sidebar.types';
import { SidebarContext } from './SidebarContext';
import styles from './Sidebar.module.css';

/**
 * Sidebar - Main sidebar container with collapsible functionality
 * Contains sidebar panels and manages open/closed states
 * 
 * @example
 * <Sidebar isOpen={isOpen} onToggle={handleToggle}>
 *   <SourcesPanel />
 *   <CreationsPanel />
 * </Sidebar>
 */
export const Sidebar: React.FC<SidebarProps> = ({
  children,
  isOpen = true,
  onToggle,
  side = 'left',
  width = 400,
  collapsedWidth = 72,
  showFooterButtons = true,
  onAddClick,
  onRecordClick,
  className,
}) => {
  const sidebarStyle = {
    '--sidebar-width': `${width}px`,
    '--sidebar-collapsed-width': `${collapsedWidth}px`,
  } as React.CSSProperties;

  return (
    <SidebarContext.Provider value={{ isOpen }}>
      <aside
        className={classNames(
          styles.sidebar,
          isOpen ? styles.open : styles.closed,
          styles[side],
          className
        )}
        style={sidebarStyle}
        aria-label="Sidebar"
      >
        {/* Sidebar content */}
        <div className={styles.content}>
          {children}
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};
