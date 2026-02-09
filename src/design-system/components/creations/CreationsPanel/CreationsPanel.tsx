/**
 * CreationsPanel - Main creations panel container
 * 
 * Flexible 3-view system for AI-generated artifacts.
 * Shows create button, view toggle, and view-specific content.
 * 
 * Features:
 * - Three view modes (Recent / Exam / Type)
 * - Persistent view preference
 * - Create new button
 * - Scrollable content area
 * 
 * @example
 * ```tsx
 * <CreationsPanel
 *   creations={creations}
 *   exams={exams}
 *   viewMode="exam"
 *   onViewModeChange={handleViewChange}
 *   onCreateNew={handleCreate}
 *   onCreationClick={handleClick}
 * />
 * ```
 */

'use client';

import classNames from 'classnames';
import type { CreationsPanelProps } from './CreationsPanel.types';
import { CreationsViewToggle } from '../CreationsViewToggle';
import { CreationsList } from '../CreationsList';
import styles from './CreationsPanel.module.css';

export const CreationsPanel: React.FC<CreationsPanelProps> = ({
  creations,
  exams,
  viewMode,
  onViewModeChange,
  onCreateNew,
  activeCreationId,
  onCreationClick,
  onCreationDelete,
  onAddExam,
  className,
}) => {
  return (
    <div className={classNames(styles.panel, className)}>
      {/* Fixed header */}
      <div className={styles.header}>
        {/* View toggle */}
        <CreationsViewToggle
          value={viewMode}
          onChange={onViewModeChange}
        />
      </div>
      
      {/* Scrollable content */}
      <div className={styles.content}>
        <CreationsList
          creations={creations}
          exams={exams}
          viewMode={viewMode}
          activeCreationId={activeCreationId}
          onCreationClick={onCreationClick}
          onCreationDelete={onCreationDelete}
          onAddExam={onAddExam}
          onCreateNew={onCreateNew}
        />
      </div>
    </div>
  );
};

CreationsPanel.displayName = 'CreationsPanel';
