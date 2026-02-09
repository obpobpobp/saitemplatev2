import React from 'react';
import classNames from 'classnames';
import { SidebarPanelProps } from './SidebarPanel.types';
import styles from './SidebarPanel.module.css';

/**
 * SidebarPanel - Collapsible panel container for sidebar sections
 * Supports expanded, collapsed, and sidebar-collapsed (icon-only) states
 * 
 * @example
 * <SidebarPanel 
 *   title="Creations"
 *   icon={<i className="fa-solid fa-sparkle" />}
 *   isExpanded={isExpanded}
 *   onToggle={handleToggle}
 *   footer={<Button>Generate new</Button>}
 * >
 *   <SourceTile title="Note 1" type="pdf" subtitle="Note" />
 * </SidebarPanel>
 */
export const SidebarPanel: React.FC<SidebarPanelProps> = ({
  title,
  icon,
  children,
  footer,
  isExpanded = false,
  isSidebarCollapsed = false,
  onToggle,
  headerActions,
  showChevron = true,
  className,
}) => {
  // Sidebar collapsed state - show only icon
  if (isSidebarCollapsed) {
    return (
      <div
        className={classNames(
          styles.panel,
          styles.sidebarCollapsed,
          className
        )}
      >
        <div className={styles.inner}>
          <div className={styles.sidebarCollapsedContent}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={onToggle}
              aria-label={title}
            >
              {icon}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Panel collapsed state - show header and footer only
  if (!isExpanded) {
    return (
      <div
        className={classNames(
          styles.panel,
          styles.collapsed,
          className
        )}
      >
        <div className={styles.inner}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <h2 className={styles.title}>{title}</h2>
              {showChevron && onToggle && (
                <button
                  type="button"
                  className={styles.chevronButton}
                  onClick={onToggle}
                  aria-expanded={false}
                  aria-label={`Expand ${title}`}
                >
                  <span className={styles.chevronIcon}>
                    <i className="fa-solid fa-chevron-down" aria-hidden="true" />
                  </span>
                </button>
              )}
            </div>
            
            {headerActions && (
              <div className={styles.headerRight}>
                <div className={styles.headerActions}>
                  {headerActions}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {footer && (
            <div className={styles.footer}>
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Panel expanded state - show everything
  return (
    <div
      className={classNames(
        styles.panel,
        styles.expanded,
        className
      )}
    >
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>{title}</h2>
            {showChevron && onToggle && (
              <button
                type="button"
                className={styles.chevronButton}
                onClick={onToggle}
                aria-expanded={true}
                aria-label={`Collapse ${title}`}
              >
                <span className={styles.chevronIcon}>
                  <i className="fa-solid fa-chevron-up" aria-hidden="true" />
                </span>
              </button>
            )}
          </div>
          
          {/* Note: headerActions not shown in expanded state per Figma */}
        </div>

        {/* Content area with scrolling */}
        <div className={styles.content}>
          <div className={styles.scrollArea}>
            {children && (
              <div className={styles.list}>
                {children}
              </div>
            )}
          </div>
          
          {footer && (
            <div className={styles.footer}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


