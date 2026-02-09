/**
 * LibraryDocCard Component
 * 
 * Card component for displaying Studocu library documents with selection checkbox.
 */

'use client';

import type { StudocuDocument } from '@/types/course';
import styles from './LibraryDocCard.module.css';

interface LibraryDocCardProps {
  doc: StudocuDocument;
  isSelected: boolean;
  onToggle: (docId: string) => void;
}

export function LibraryDocCard({ doc, isSelected, onToggle }: LibraryDocCardProps) {
  const getDocIcon = (type: StudocuDocument['type']) => {
    switch (type) {
      case 'lecture':
        return '📚';
      case 'textbook':
        return '📖';
      case 'exam':
        return '📝';
      case 'notes':
        return '📄';
      default:
        return '📋';
    }
  };

  const getDocTypeLabel = (type: StudocuDocument['type']) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <label className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isSelected}
        onChange={() => onToggle(doc.id)}
      />
      
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.icon} aria-hidden="true">
            {getDocIcon(doc.type)}
          </span>
          <div className={styles.info}>
            <h3 className={styles.name}>{doc.name}</h3>
            <div className={styles.meta}>
              <span className={styles.type}>{getDocTypeLabel(doc.type)}</span>
              <span className={styles.separator}>·</span>
              <span className={styles.downloads}>
                <i className="fa-solid fa-download" aria-hidden="true" />
                {doc.downloads.toLocaleString()} downloads
              </span>
            </div>
          </div>
        </div>
        
        {(doc.covers || doc.enables) && (
          <div className={styles.tags}>
            {doc.covers && doc.covers.map((topic, idx) => (
              <span key={idx} className={styles.tag}>
                {topic}
              </span>
            ))}
            {doc.enables && (
              <span className={`${styles.tag} ${styles.tagSpecial}`}>
                <i className="fa-solid fa-unlock" aria-hidden="true" />
                Unlocks {doc.enables}
              </span>
            )}
          </div>
        )}
      </div>
    </label>
  );
}
