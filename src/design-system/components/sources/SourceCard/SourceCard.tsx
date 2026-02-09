/**
 * SourceCard - Individual source item display
 * 
 * Displays a single source (upload or Studocu doc) in the timeline.
 * Shows icon, name, date, and contextual metadata based on origin and recency.
 * 
 * Features:
 * - Origin-based icons (📄 PDF, 📘 Studocu, etc.)
 * - Adaptive secondary text (recent: +X questions, older: downloads/size)
 * - Active state highlighting
 * - Hover remove button
 * 
 * @example
 * ```tsx
 * <SourceCard 
 *   source={source}
 *   isNew={isThisWeek(source.addedAt)}
 *   isActive={activeId === source.id}
 *   onClick={() => handleClick(source)}
 *   onRemove={() => handleRemove(source.id)}
 * />
 * ```
 */

'use client';

import { useCallback } from 'react';
import classNames from 'classnames';
import type { SourceCardProps } from './SourceCard.types';
import type { Source } from '@/types/course';
import { formatRelativeDate, formatFileSize, formatNumber } from '@/lib/utils/dateHelpers';
import styles from './SourceCard.module.css';

/**
 * Get icon for source based on type and origin
 */
function getSourceIcon(source: Source): string {
  if (source.isExam) return '📝';
  if (source.origin === 'studocu') return '📘';
  
  switch (source.fileType) {
    case 'pdf': return '📄';
    case 'doc': return '📝';
    case 'image': return '🖼️';
    case 'txt': return '📄';
    default: return '📄';
  }
}

/**
 * Get secondary text for source card
 */
function getSourceSecondary(source: Source, isNew: boolean): string {
  const parts: string[] = [];
  
  // Origin label
  if (source.origin === 'studocu') {
    parts.push('from Studocu');
  }
  
  // Recent items show question count
  if (isNew && source.questionCount > 0) {
    parts.push(`+${source.questionCount} questions`);
  } 
  // Older Studocu items show downloads
  else if (source.origin === 'studocu' && source.downloads) {
    parts.push(`${formatNumber(source.downloads)} downloads`);
  } 
  // Uploads show file size
  else if (source.fileSize) {
    parts.push(formatFileSize(source.fileSize));
  }
  
  return parts.join(' · ');
}

export const SourceCard: React.FC<SourceCardProps> = ({
  source,
  isActive = false,
  isNew = false,
  onClick,
  onRemove,
  className,
}) => {
  const icon = getSourceIcon(source);
  const secondary = getSourceSecondary(source, isNew);
  const dateText = formatRelativeDate(source.addedAt);
  
  const handleRemoveClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  }, [onRemove]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
    if (e.key === 'Delete') {
      e.preventDefault();
      onRemove();
    }
  }, [onClick, onRemove]);
  
  return (
    <div
      className={classNames(
        styles.card,
        isActive && styles.isActive,
        className
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${source.name}, ${source.origin === 'studocu' ? 'from Studocu' : 'uploaded'}, added ${dateText}`}
    >
      {/* Icon */}
      <div className={styles.icon} aria-hidden="true">
        {icon}
      </div>
      
      {/* Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.name}>{source.name}</span>
          <span className={styles.date}>{dateText}</span>
        </div>
        
        {secondary && (
          <div className={classNames(
            styles.secondary,
            isNew && source.questionCount > 0 && styles.highlight
          )}>
            {secondary}
          </div>
        )}
      </div>
      
      {/* Remove button */}
      <button
        className={styles.removeButton}
        onClick={handleRemoveClick}
        aria-label={`Remove ${source.name}`}
        type="button"
      >
        <i className="fa-solid fa-xmark" aria-hidden="true" />
      </button>
    </div>
  );
};

SourceCard.displayName = 'SourceCard';
