import React from 'react';
import { SourcesPanelProps } from './SourcesPanel.types';
import { SidebarPanel } from '../SidebarPanel';
import { Button } from '../../../buttons/Button';
import { useSidebarContext } from '../SidebarContext';
import styles from './SourcesPanel.module.css';

/**
 * SourcesPanel - Sources section panel with search/filter actions and footer buttons
 * Built on top of SidebarPanel with specific Sources functionality
 * 
 * Per Figma: Header has search + filter buttons, Footer has Add + Record buttons
 * 
 * @example
 * <SourcesPanel 
 *   isExpanded={isExpanded}
 *   onToggle={handleToggle}
 *   onSearchClick={handleSearch}
 *   onFilterClick={handleFilter}
 *   onAddClick={handleAdd}
 *   onRecordClick={handleRecord}
 * >
 *   <SourceTile title="Document.pdf" type="pdf" />
 * </SourcesPanel>
 */
export const SourcesPanel: React.FC<SourcesPanelProps> = ({
  children,
  isExpanded = false,
  onToggle,
  onSearchClick,
  onFilterClick,
  onAddClick,
  onRecordClick,
  className,
}) => {
  // Get sidebar state from context
  const { isOpen } = useSidebarContext();
  
  // Header actions (search and filter buttons) - only shown when not expanded
  const headerActions = (
    <>
      <Button
        variant="tertiary"
        color="gray"
        size="small"
        iconOnly={<i className="fa-solid fa-magnifying-glass" aria-hidden="true" />}
        onClick={onSearchClick}
        aria-label="Search sources"
      />
      <div className={styles.filterButtonGroup}>
        <Button
          variant="tertiary"
          color="gray"
          size="small"
          iconOnly={<i className="fa-solid fa-chevron-down" aria-hidden="true" />}
          onClick={onFilterClick}
          aria-label="Filter sources"
        />
      </div>
    </>
  );

  // Footer with Add and Record buttons
  const footer = (
    <div className={styles.footerButtons}>
      <Button
        variant="primary"
        color="black"
        size="medium"
        leftIcon={<i className="fa-solid fa-plus" aria-hidden="true" />}
        onClick={onAddClick}
        isFullWidth
      >
        Add
      </Button>
      <Button
        variant="secondary"
        color="black"
        size="medium"
        leftIcon={<i className="fa-solid fa-microphone" aria-hidden="true" />}
        onClick={onRecordClick}
        isFullWidth
        className={styles.recordButton}
      >
        Record
      </Button>
    </div>
  );

  return (
    <SidebarPanel
      title="Sources"
      icon={<i className="fa-solid fa-books" aria-hidden="true" />}
      isExpanded={isExpanded}
      isSidebarCollapsed={!isOpen}
      onToggle={onToggle}
      headerActions={headerActions}
      footer={footer}
      className={className}
    >
      {children}
    </SidebarPanel>
  );
};
