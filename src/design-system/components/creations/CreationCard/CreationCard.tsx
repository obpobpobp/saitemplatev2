/**
 * CreationCard - Individual creation display
 * 
 * Adapts display based on view context (Recent/Exam/Type).
 * Shows type icon, name, date, stats, and optional exam tag.
 */

'use client';

import { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import type { CreationCardProps } from './CreationCard.types';
import type { Creation, CreationType } from '@/types/course';
import { formatRelativeDate } from '@/lib/utils/dateHelpers';
import { ExamBadge } from '@/design-system/components/study/ExamBadge';
import styles from './CreationCard.module.css';

// Icon mapping for creation types
const CREATION_ICONS: Record<CreationType, string> = {
  'mock-exam': '📝',
  'flashcards': '🎴',
  'summary': '📋',
  'quiz': '❓',
  'gap-analysis': '📊',
};

/**
 * Get stats text for creation based on type
 */
function getCreationStats(creation: Creation): string {
  // Mock exam with score
  if (creation.type === 'mock-exam' && (creation as any).bestScore !== undefined) {
    const score = (creation as any).bestScore;
    const attempts = (creation as any).attempts || 1;
    return `${score}%${attempts > 1 ? ` · ${attempts} attempts` : ''}`;
  }
  
  // Mock exam not started
  if (creation.type === 'mock-exam' && (creation as any).questionCount) {
    return `${(creation as any).questionCount} questions · Not started`;
  }
  
  // Flashcards
  if (creation.type === 'flashcards') {
    const cardCount = (creation as any).cardCount || 0;
    const mastered = (creation as any).masteredCount || 0;
    return `${cardCount} cards${mastered > 0 ? ` · ${mastered} mastered` : ''}`;
  }
  
  // Summary
  if (creation.type === 'summary' && (creation as any).wordCount) {
    return `${(creation as any).wordCount} words`;
  }
  
  // Quiz (similar to mock-exam)
  if (creation.type === 'quiz') {
    const data = creation.data as any;
    if (data.score !== undefined) {
      return `${data.score}%`;
    }
    if (data.questions?.length) {
      return `${data.questions.length} questions`;
    }
  }
  
  // Gap analysis
  if (creation.type === 'gap-analysis') {
    return 'Analysis complete';
  }
  
  return 'Draft';
}

/**
 * Get secondary text (adapts based on view)
 */
function getSecondaryText(
  creation: Creation,
  examName: string | undefined,
  view: string
): string {
  const stats = getCreationStats(creation);
  
  // In exam view, context is clear from section - no exam tag needed
  if (view === 'exam') {
    return stats;
  }
  
  // In recent/type views, include exam context
  const examLabel = examName || 'Ongoing';
  return `${examLabel} · ${stats}`;
}

export const CreationCard: React.FC<CreationCardProps> = ({
  creation,
  exam,
  exams,
  view,
  isActive = false,
  onClick,
  onDelete,
  className,
}) => {
  const icon = CREATION_ICONS[creation.type as CreationType] || '📄';
  const dateText = formatRelativeDate(creation.createdAt);
  const secondary = getSecondaryText(creation, exam?.name, view);
  
  // Find linked exam if examId is present
  const linkedExam = useMemo(() => {
    if (!creation.examId || !exams) return null;
    return exams.find(e => e.id === creation.examId);
  }, [creation.examId, exams]);
  
  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  }, [onDelete]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
    if (e.key === 'Delete' && onDelete) {
      e.preventDefault();
      onDelete();
    }
  }, [onClick, onDelete]);
  
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
      aria-label={`${creation.title}, created ${dateText}`}
    >
      {/* Icon */}
      <div className={styles.icon} aria-hidden="true">
        {icon}
      </div>
      
      {/* Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.name}>{creation.title}</span>
          <span className={styles.date}>{dateText}</span>
        </div>
        
        {secondary && (
          <div className={styles.secondary}>{secondary}</div>
        )}
        
        {/* Show linked exam badge if not in exam view */}
        {linkedExam && view !== 'exam' && (
          <div className={styles.examBadge}>
            <ExamBadge exam={linkedExam} showDays size="small" />
          </div>
        )}
      </div>
      
      {/* Delete button */}
      {onDelete && (
        <button
          className={styles.deleteButton}
          onClick={handleDeleteClick}
          aria-label={`Delete ${creation.title}`}
          type="button"
        >
          <i className="fa-solid fa-trash" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

CreationCard.displayName = 'CreationCard';
