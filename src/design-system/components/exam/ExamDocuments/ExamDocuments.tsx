'use client';

import React from 'react';
import { ExamDocumentsProps } from './ExamDocuments.types';
import styles from './ExamDocuments.module.css';

/**
 * ExamDocuments - Display recommended study documents
 */
export const ExamDocuments: React.FC<ExamDocumentsProps> = ({
  documents,
  totalCount,
  onSeeAll,
  onSaveDocument,
  className,
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logoContainer}>
            <svg className={styles.logo} viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6h2V5zm0 8h-2v2h2v-2z" />
            </svg>
          </div>
          <div className={styles.title}>Recommended documents</div>
        </div>
        {onSeeAll && (
          <button className={styles.seeAllButton} onClick={onSeeAll}>
            <span>See all {totalCount}</span>
            <div className={styles.seeAllIcon}>
              <i className="fa-solid fa-arrow-right" />
            </div>
          </button>
        )}
      </div>

      {/* Documents List */}
      <div className={styles.documentsList}>
        {documents.map((doc) => (
          <div key={doc.id} className={styles.documentCard}>
            <div className={styles.thumbnail}>
              <div className={styles.thumbnailImage} />
              <div className={styles.thumbnailPages}>{doc.pages}</div>
            </div>

            <div className={styles.documentContent}>
              <div className={styles.documentInfo}>
                <div className={styles.documentLeft}>
                  <div className={styles.documentTitle}>{doc.title}</div>
                  <div className={styles.badges}>
                    <div className={styles.badge}>{doc.category}</div>
                    {doc.isPremium && (
                      <div className={styles.premiumBadge}>★</div>
                    )}
                    {doc.isNew && (
                      <div className={`${styles.badge} ${styles.newBadge}`}>New</div>
                    )}
                  </div>
                </div>

                <div className={styles.documentRight}>
                  <div className={styles.rating}>
                    <i className={`fa-solid fa-thumbs-up ${styles.ratingIcon}`} />
                    <span className={styles.ratingText}>
                      {doc.rating}% <span className={styles.ratingCount}>({doc.ratingCount})</span>
                    </span>
                  </div>
                  {onSaveDocument && (
                    <button
                      className={styles.saveButton}
                      onClick={() => onSaveDocument(doc.id)}
                    >
                      <div className={styles.saveIcon}>
                        <i className="fa-regular fa-bookmark" />
                      </div>
                      <span>Save</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

