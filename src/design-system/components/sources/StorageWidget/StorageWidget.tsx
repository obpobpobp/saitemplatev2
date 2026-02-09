/**
 * StorageWidget - Storage stats and progress bar
 * 
 * Displays library statistics and storage usage at bottom of Sources panel.
 * Shows source count, question count, and visual storage progress bar.
 * 
 * Features:
 * - Adaptive progress bar color (blue → amber → red as storage fills)
 * - Formatted file sizes
 * - Compact, informative layout
 * 
 * @example
 * ```tsx
 * <StorageWidget 
 *   sourceCount={6}
 *   questionCount={72}
 *   usedMB={18}
 *   maxMB={100}
 * />
 * ```
 */

'use client';

import classNames from 'classnames';
import type { StorageWidgetProps } from './StorageWidget.types';
import styles from './StorageWidget.module.css';

/**
 * Get progress bar color based on usage percentage
 */
function getProgressColor(percent: number): string {
  if (percent < 70) return styles.progressBlue;
  if (percent < 90) return styles.progressAmber;
  return styles.progressRed;
}

export const StorageWidget: React.FC<StorageWidgetProps> = ({
  sourceCount,
  questionCount,
  usedMB,
  maxMB = 100,
  className,
}) => {
  const percent = Math.min((usedMB / maxMB) * 100, 100);
  const progressColorClass = getProgressColor(percent);
  
  return (
    <div 
      className={classNames(styles.widget, className)}
      role="region"
      aria-label="Storage statistics"
    >
      {/* Stats row */}
      <div className={styles.stats}>
        <span className={styles.icon} aria-hidden="true">📦</span>
        <span className={styles.text}>
          {sourceCount} {sourceCount === 1 ? 'source' : 'sources'} · {questionCount} questions
        </span>
      </div>
      
      {/* Progress bar */}
      <div 
        className={styles.progressContainer}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Storage used: ${usedMB} MB of ${maxMB} MB`}
      >
        <div 
          className={classNames(styles.progressFill, progressColorClass)}
          style={{ width: `${percent}%` }}
        />
      </div>
      
      {/* Size text */}
      <div className={styles.size}>
        {usedMB.toFixed(1)} MB
      </div>
    </div>
  );
};

StorageWidget.displayName = 'StorageWidget';
