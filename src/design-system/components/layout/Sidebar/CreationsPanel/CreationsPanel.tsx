import React from 'react';
import classNames from 'classnames';
import { CreationsPanelProps } from './CreationsPanel.types';
import { Button } from '../../../buttons/Button';
import styles from './CreationsPanel.module.css';

/**
 * CreationsPanel - Creations list panel for tabbed sidebar
 * 
 * Displays creations list with "Generate new" action button.
 * No header (title is in tab), just content and footer.
 *
 * @example
 * ```tsx
 * <CreationsPanel onGenerateClick={handleGenerate}>
 *   <CreationTile title="Note 1" type="note" />
 *   <CreationTile title="Quiz 1" type="quiz" />
 * </CreationsPanel>
 * ```
 */
export const CreationsPanel: React.FC<CreationsPanelProps> = ({
  children,
  onGenerateClick,
  className,
}) => {
  return (
    <div 
      className={classNames(styles.panel, className)}
      role="tabpanel"
      id="creations-panel"
      aria-labelledby="creations-tab"
    >
      {/* Content area */}
      <div className={styles.content}>
        {children}
      </div>
      
      {/* Footer with Generate new button */}
      <div className={styles.footer}>
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
    </div>
  );
};
