/**
 * SourceList - Timeline renderer with grouping
 * 
 * Groups sources by "This Week" and "Earlier" based on addedAt date.
 * Shows dividers only when appropriate and includes recommendations.
 */

'use client';

import classNames from 'classnames';
import type { SourceListProps } from './SourceList.types';
import { SourceCard } from '../SourceCard';
import { SourceRecommendation } from '../SourceRecommendation';
import { isThisWeek } from '@/lib/utils/dateHelpers';
import styles from './SourceList.module.css';

/**
 * Section divider component
 */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className={styles.divider}>
      <span className={styles.dividerLabel}>{label}</span>
      <div className={styles.dividerLine} />
    </div>
  );
}

export const SourceList: React.FC<SourceListProps> = ({
  sources,
  recommendations = [],
  activeSourceId,
  onSourceClick,
  onSourceRemove,
  onAddRecommendation,
  className,
}) => {
  // Sort by addedAt descending (newest first)
  const sorted = [...sources].sort((a, b) => 
    new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );
  
  // Group by recency
  const thisWeek = sorted.filter(s => isThisWeek(s.addedAt));
  const earlier = sorted.filter(s => !isThisWeek(s.addedAt));
  
  return (
    <div className={classNames(styles.list, className)}>
      {/* This Week Section */}
      {thisWeek.length > 0 && (
        <>
          <SectionDivider label="THIS WEEK" />
          {thisWeek.map(source => (
            <SourceCard
              key={source.id}
              source={source}
              isNew={true}
              isActive={activeSourceId === source.id}
              onClick={() => onSourceClick(source)}
              onRemove={() => onSourceRemove(source.id)}
            />
          ))}
        </>
      )}
      
      {/* Earlier Section */}
      {earlier.length > 0 && (
        <>
          {thisWeek.length > 0 && <SectionDivider label="EARLIER" />}
          {earlier.map(source => (
            <SourceCard
              key={source.id}
              source={source}
              isNew={false}
              isActive={activeSourceId === source.id}
              onClick={() => onSourceClick(source)}
              onRemove={() => onSourceRemove(source.id)}
            />
          ))}
        </>
      )}
      
      {/* Recommendations (max 1) */}
      {recommendations.slice(0, 1).map(rec => (
        <SourceRecommendation
          key={rec.id}
          recommendation={rec}
          onAdd={() => onAddRecommendation?.(rec)}
        />
      ))}
    </div>
  );
};

SourceList.displayName = 'SourceList';
