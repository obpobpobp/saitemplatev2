'use client';

import React from 'react';
import classNames from 'classnames';
import { Button } from '@design-system/components/buttons/Button';
import type { SourcesPanelProps } from './SourcesPanel.types';
import styles from './SourcesPanel.module.css';

/**
 * SourcesPanel - Container for source documents with sections
 * 
 * Organized panel with three sections:
 * - Studocu Recommendations (suggested documents)
 * - Added from Studocu (user's library docs)
 * - Your Uploads (user uploaded files)
 * 
 * Features:
 * - Collapsible sections
 * - Section headers with counts
 * - Scrollable content area
 * - Fixed footer with action buttons
 * 
 * @example
 * ```tsx
 * <SourcesPanel
 *   studocuRecommendations={[...]}
 *   studocuLibrary={[...]}
 *   userUploads={[...]}
 *   onAddFromStudocu={() => {}}
 *   onUploadFile={() => {}}
 * />
 * ```
 */
export const SourcesPanel: React.FC<SourcesPanelProps> = ({
  studocuRecommendations = [],
  studocuLibrary = [],
  userUploads = [],
  onAddFromStudocu,
  onUploadFile,
  onSourceClick,
  className,
  // Legacy props support
  children,
  onAddClick,
}) => {
  const [expandedSections, setExpandedSections] = React.useState({
    recommendations: true,
    library: true,
    uploads: true,
  });

  const toggleSection = (section: 'recommendations' | 'library' | 'uploads') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderSection = (
    title: string,
    count: number,
    items: React.ReactNode,
    sectionKey: 'recommendations' | 'library' | 'uploads',
    emptyMessage: string
  ) => {
    const isExpanded = expandedSections[sectionKey];
    const isEmpty = count === 0;

    return (
      <div className={styles.section}>
        <button
          className={styles.sectionHeader}
          onClick={() => toggleSection(sectionKey)}
          aria-expanded={isExpanded}
        >
          <div className={styles.sectionTitle}>
            <span className={styles.sectionName}>{title}</span>
            <span className={styles.sectionCount}>{count}</span>
          </div>
          <i className={classNames('fa-solid', isExpanded ? 'fa-chevron-up' : 'fa-chevron-down', styles.chevron)} />
        </button>
        
        {isExpanded && (
          <div className={styles.sectionContent}>
            {isEmpty ? (
              <div className={styles.emptyState}>
                <p>{emptyMessage}</p>
              </div>
            ) : (
              items
            )}
          </div>
        )}
      </div>
    );
  };

  // Count items
  const recommendationsCount = React.Children.count(studocuRecommendations);
  const libraryCount = React.Children.count(studocuLibrary);
  const uploadsCount = React.Children.count(userUploads);

  // Support legacy children prop
  const hasNewProps = recommendationsCount > 0 || libraryCount > 0 || uploadsCount > 0;

  return (
    <div 
      className={classNames(styles.panel, className)}
      role="tabpanel"
      id="sources-panel"
      aria-labelledby="sources-tab"
    >
      {/* Scrollable content with sections */}
      <div className={styles.content}>
        {hasNewProps ? (
          <>
            {/* Your Uploads - First */}
            {renderSection(
              'Your Uploads',
              uploadsCount,
              userUploads,
              'uploads',
              'No files uploaded yet'
            )}

            {/* Added from Studocu - Second, with recommendations inside */}
            <div className={styles.section}>
              <button
                className={styles.sectionHeader}
                onClick={() => toggleSection('library')}
                aria-expanded={expandedSections.library}
              >
                <div className={styles.sectionTitle}>
                  <span className={styles.sectionName}>Added from Studocu</span>
                  <span className={styles.sectionCount}>{libraryCount}</span>
                </div>
                <i className={classNames('fa-solid', expandedSections.library ? 'fa-chevron-up' : 'fa-chevron-down', styles.chevron)} />
              </button>
              
              {expandedSections.library && (
                <div className={styles.sectionContent}>
                  {libraryCount === 0 && recommendationsCount === 0 ? (
                    <div className={styles.emptyState}>
                      <p>No documents added from Studocu yet</p>
                    </div>
                  ) : (
                    <>
                      {/* Added documents first */}
                      {studocuLibrary}
                      
                      {/* Recommendations as ghosted items */}
                      {recommendationsCount > 0 && (
                        <div className={styles.recommendationsGroup}>
                          {studocuRecommendations}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          // Legacy support - render children as before
          children
        )}
      </div>
      
      {/* Footer with action buttons */}
      <div className={styles.footer}>
        {(onAddFromStudocu || onAddClick) && (
          <Button
            variant="primary"
            color="black"
            size="medium"
            leftIcon={<i className="fa-solid fa-plus" aria-hidden="true" />}
            onClick={onAddFromStudocu || onAddClick}
            isFullWidth
          >
            Add from Studocu
          </Button>
        )}
        {onUploadFile && (
          <Button
            variant="secondary"
            color="black"
            size="medium"
            leftIcon={<i className="fa-solid fa-upload" aria-hidden="true" />}
            onClick={onUploadFile}
            isFullWidth
          >
            Upload File
          </Button>
        )}
      </div>
    </div>
  );
};
