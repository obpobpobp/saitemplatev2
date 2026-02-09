/**
 * SourcesPanel - Main sources panel container
 * 
 * Timeline-based panel for managing study materials.
 * Shows dropzone at top, scrollable source list, and storage widget at bottom.
 * 
 * Features:
 * - Drag-and-drop file upload
 * - Timeline grouping (This Week / Earlier)
 * - Source recommendations
 * - Storage visualization
 * - Browse Studocu integration
 * 
 * @example
 * ```tsx
 * <SourcesPanel
 *   sources={sources}
 *   recommendations={recommendations}
 *   onFilesSelected={handleUpload}
 *   onBrowseStudocu={handleBrowse}
 *   onSourceClick={handleClick}
 *   onSourceRemove={handleRemove}
 *   storageUsedMB={18}
 * />
 * ```
 */

'use client';

import classNames from 'classnames';
import type { SourcesPanelProps } from './SourcesPanel.types';
import { SourceDropZone } from '../SourceDropZone';
import { SourceList } from '../SourceList';
import { StorageWidget } from '../StorageWidget';
import { EmptySourcesState } from '../EmptySourcesState';
import styles from './SourcesPanel.module.css';

export const SourcesPanel: React.FC<SourcesPanelProps> = ({
  sources,
  recommendations = [],
  activeSourceId,
  onFilesSelected,
  onBrowseStudocu,
  onSourceClick,
  onSourceRemove,
  onAddRecommendation,
  isUploading = false,
  uploadProgress = 0,
  storageUsedMB = 0,
  storageMaxMB = 100,
  className,
}) => {
  // Calculate stats
  const sourceCount = sources.length;
  const questionCount = sources.reduce((sum, s) => sum + s.questionCount, 0);
  
  return (
    <div className={classNames(styles.panel, className)}>
      {/* Fixed header with drop zone */}
      <div className={styles.header}>
        <SourceDropZone
          onFilesSelected={onFilesSelected}
          onBrowseStudocu={onBrowseStudocu}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        />
      </div>
      
      {/* Scrollable content */}
      <div className={styles.content}>
        {sourceCount === 0 ? (
          <EmptySourcesState />
        ) : (
          <SourceList
            sources={sources}
            recommendations={recommendations}
            activeSourceId={activeSourceId}
            onSourceClick={onSourceClick}
            onSourceRemove={onSourceRemove}
            onAddRecommendation={onAddRecommendation}
          />
        )}
      </div>
      
      {/* Fixed footer with storage widget */}
      <div className={styles.footer}>
        <StorageWidget
          sourceCount={sourceCount}
          questionCount={questionCount}
          usedMB={storageUsedMB}
          maxMB={storageMaxMB}
        />
      </div>
    </div>
  );
};

SourcesPanel.displayName = 'SourcesPanel';
