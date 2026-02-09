/**
 * TypeSection - Type group header for Type view
 */

'use client';

import classNames from 'classnames';
import type { TypeSectionProps } from './TypeSection.types';
import type { CreationType } from '@/types/course';
import styles from './TypeSection.module.css';

const TYPE_LABELS: Record<CreationType, string> = {
  'mock-exam': 'Mock Exams',
  'flashcards': 'Flashcards',
  'summary': 'Summaries',
  'quiz': 'Quizzes',
  'gap-analysis': 'Gap Analyses',
};

export const TypeSection: React.FC<TypeSectionProps> = ({
  type,
  count,
  children,
  className,
}) => {
  const label = TYPE_LABELS[type] || type;
  
  return (
    <div className={classNames(styles.section, className)}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.count}>· {count}</span>
        <div className={styles.dividerLine} />
      </div>
      
      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

TypeSection.displayName = 'TypeSection';
