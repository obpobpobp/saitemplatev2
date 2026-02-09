import React from 'react';
import { CreationsPanelProps } from './CreationsPanel.types';
import { SidebarPanel } from '../SidebarPanel';
import { Button } from '../../../buttons/Button';
import { useSidebarContext } from '../SidebarContext';
import styles from './CreationsPanel.module.css';

/**
 * CreationsPanel - Creations section panel with generate new action
 * Built on top of SidebarPanel with specific Creations functionality
 *
 * @example
 * <CreationsPanel
 *   isExpanded={isExpanded}
 *   onToggle={handleToggle}
 *   onGenerateClick={handleGenerate}
 * >
 *   <CreationTile title="Note 1" type="note" />
 * </CreationsPanel>
 */
export const CreationsPanel: React.FC<CreationsPanelProps> = ({
  children,
  isExpanded = false,
  onToggle,
  onGenerateClick,
  className,
}) => {
  // Get sidebar state from context
  const { isOpen } = useSidebarContext();
  
  // Footer with Generate new button
  const footer = (
    <div className={styles.footerButtons}>
      <Button
        variant="secondary"
        color="black"
        size="medium"
        leftIcon={<i className="fa-solid fa-sparkle" aria-hidden="true" />}
        onClick={onGenerateClick}
        isFullWidth
      >
        Generate new
      </Button>
    </div>
  );

  return (
    <SidebarPanel
      title="Creations"
      icon={<i className="fa-solid fa-sparkle" aria-hidden="true" />}
      isExpanded={isExpanded}
      isSidebarCollapsed={!isOpen}
      onToggle={onToggle}
      footer={footer}
      showChevron={true}
      className={className}
    >
      {children}
    </SidebarPanel>
  );
};
