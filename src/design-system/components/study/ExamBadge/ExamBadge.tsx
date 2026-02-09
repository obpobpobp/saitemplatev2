/**
 * ExamBadge - Small badge component for displaying exam info
 * 
 * Compact component showing exam name, date, and optionally weight.
 * Used in creation cards, modal selections, and exam sections.
 * 
 * Features:
 * - Exam name
 * - Days until exam or date
 * - Optional weight badge
 * - Clickable variant
 * 
 * @example
 * ```tsx
 * <ExamBadge 
 *   exam={midtermExam}
 *   showDays
 *   onClick={handleExamClick}
 * />
 * ```
 */

'use client';

import classNames from 'classnames';
import type { ExamBadgeProps } from './ExamBadge.types';
import { getDaysUntilExam, formatExamDate } from '@/lib/utils/examHelpers';
import styles from './ExamBadge.module.css';

export const ExamBadge: React.FC<ExamBadgeProps> = ({
  exam,
  showDays = true,
  showWeight = false,
  size = 'small',
  onClick,
  className,
}) => {
  const daysUntil = exam.date ? getDaysUntilExam(exam.date) : null;
  const formattedDate = exam.date ? formatExamDate(exam.date) : 'Not set';
  
  const badgeClassNames = classNames(
    styles.badge,
    styles[size],
    onClick && styles.clickable,
    className
  );
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <div 
      className={badgeClassNames}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <i className={`fa-regular fa-calendar ${styles.icon}`} aria-hidden="true" />
      
      <span className={styles.text}>
        <span>{exam.name}</span>
        
        {exam.date && showDays && daysUntil !== null && (
          <>
            <span className={styles.separator}>•</span>
            <span className={styles.days}>
              {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`}
            </span>
          </>
        )}
        
        {exam.date && !showDays && (
          <>
            <span className={styles.separator}>•</span>
            <span>{formattedDate}</span>
          </>
        )}
        
        {!exam.date && (
          <>
            <span className={styles.separator}>•</span>
            <span style={{ opacity: 0.6 }}>Not set</span>
          </>
        )}
      </span>
      
      {showWeight && exam.weight !== undefined && (
        <span className={styles.weight}>{exam.weight}%</span>
      )}
    </div>
  );
};

ExamBadge.displayName = 'ExamBadge';
