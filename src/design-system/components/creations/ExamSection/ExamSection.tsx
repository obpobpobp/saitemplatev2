/**
 * ExamSection - Collapsible exam group for Exam view
 */

'use client';

import classNames from 'classnames';
import type { ExamSectionProps } from './ExamSection.types';
import { CreationCard } from '../CreationCard';
import { formatDaysUntil } from '@/lib/utils/dateHelpers';
import styles from './ExamSection.module.css';

export const ExamSection: React.FC<ExamSectionProps> = ({
  exam,
  creations,
  isCollapsed = false,
  onToggleCollapse,
  onCreationClick,
  onCreationDelete,
  activeCreationId,
  className,
}) => {
  const statusText = exam.isCompleted 
    ? 'Completed' 
    : exam.date 
    ? formatDaysUntil(exam.date) 
    : 'Date not set';
    
  const showToggle = exam.isCompleted;
  
  return (
    <div className={classNames(styles.section, className)}>
      {/* Header */}
      <button
        className={styles.header}
        onClick={onToggleCollapse}
        disabled={!showToggle}
        aria-expanded={!isCollapsed}
        type="button"
      >
        <div className={styles.headerContent}>
          <span className={styles.name}>{exam.name}</span>
          {exam.date && (
            <span className={styles.date}>
              {exam.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}
          {exam.isCompleted && <span className={styles.checkmark}>✓</span>}
        </div>
        <div className={styles.dividerLine} />
        {showToggle && (
          <button className={styles.toggleButton} type="button">
            <i className={classNames('fa-solid', isCollapsed ? 'fa-chevron-down' : 'fa-chevron-up')} />
          </button>
        )}
      </button>
      
      {/* Subtitle */}
      <div className={styles.subtitle}>
        {statusText} · {creations.length} {creations.length === 1 ? 'item' : 'items'}
      </div>
      
      {/* Content */}
      {!isCollapsed && (
        <div className={styles.content}>
          {creations.map(creation => (
            <CreationCard
              key={creation.id}
              creation={creation}
              exam={exam}
              view="exam"
              isActive={activeCreationId === creation.id}
              onClick={() => onCreationClick(creation)}
              onDelete={onCreationDelete ? () => onCreationDelete(creation) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

ExamSection.displayName = 'ExamSection';
