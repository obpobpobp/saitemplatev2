import React from 'react';
import classNames from 'classnames';
import { SidebarProps, TabbedSidebarProps } from './Sidebar.types';
import { SidebarContext } from './SidebarContext';
import { TabNavigation } from './TabNavigation';
import styles from './Sidebar.module.css';

/**
 * Sidebar - Main sidebar container with collapsible functionality
 * Contains sidebar panels and manages open/closed states
 * 
 * @deprecated Use TabbedSidebar instead for new implementations
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
  side = 'left',
  width = 400,
  collapsedWidth = 72,
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

/**
 * TabbedSidebar - Sidebar with tabbed navigation
 * 
 * Provides navigation between Assistant, Creations, and Sources panels
 * with smart contextual tab switching and keyboard accessibility.
 * 
 * Features:
 * - Three tabs: Assistant, Creations, Sources
 * - Collapse/expand functionality (400px → 72px)
 * - Badge support for Sources count
 * - Keyboard accessible
 * - Mobile responsive with bottom tab bar
 * 
 * @example
 * ```tsx
 * <TabbedSidebar
 *   isOpen={!sidebarCollapsed}
 *   activeTab={activeTab}
 *   onTabChange={handleTabChange}
 *   assistantContent={<AssistantPanel messages={messages} />}
 *   creationsContent={<CreationsPanel creations={creations} />}
 *   sourcesContent={<SourcesPanel sources={sources} />}
 *   sourceCount={sources.length}
 * />
 * ```
 */
export const TabbedSidebar: React.FC<TabbedSidebarProps> = ({
  isOpen = true,
  activeTab,
  onTabChange,
  assistantContent,
  creationsContent,
  sourcesContent,
  sourceCount = 0,
  side = 'left',
  width = 400,
  collapsedWidth = 72,
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
        <div className={styles.panelContainer}>
          <TabNavigation
            activeTab={activeTab}
            onTabChange={onTabChange}
            sourceCount={sourceCount}
            isCollapsed={!isOpen}
          />
          
          <div className={styles.tabContent}>
            {activeTab === 'assistant' && (
              <div role="tabpanel" id="assistant-panel" aria-labelledby="assistant-tab" className={styles.tabPanel}>
                {assistantContent}
              </div>
            )}
            {activeTab === 'creations' && (
              <div role="tabpanel" id="creations-panel" aria-labelledby="creations-tab" className={styles.tabPanel}>
                {creationsContent}
              </div>
            )}
            {activeTab === 'sources' && (
              <div role="tabpanel" id="sources-panel" aria-labelledby="sources-tab" className={styles.tabPanel}>
                {sourcesContent}
              </div>
            )}
          </div>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};
