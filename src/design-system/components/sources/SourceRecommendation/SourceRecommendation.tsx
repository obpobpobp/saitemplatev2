/**
 * SourceRecommendation - Ghost card for suggested sources
 * 
 * Displays a recommended source that user hasn't added yet.
 * Shows unlock benefits and has an add button.
 */

'use client';

import classNames from 'classnames';
import type { SourceRecommendationProps } from './SourceRecommendation.types';
import { formatNumber } from '@/lib/utils/dateHelpers';
import styles from './SourceRecommendation.module.css';

export const SourceRecommendation: React.FC<SourceRecommendationProps> = ({
  recommendation,
  onAdd,
  className,
}) => {
  return (
    <div 
      className={classNames(styles.card, className)}
      role="article"
      aria-label={`Recommended: ${recommendation.name}`}
    >
      {/* Icon */}
      <div className={styles.icon} aria-hidden="true">
        💡
      </div>
      
      {/* Content */}
      <div className={styles.content}>
        <div className={styles.name}>{recommendation.name}</div>
        {recommendation.unlocks && (
          <div className={styles.subtitle}>
            Unlocks {recommendation.unlocks}
          </div>
        )}
      </div>
      
      {/* Add button */}
      <button
        className={styles.addButton}
        onClick={onAdd}
        aria-label={`Add ${recommendation.name}`}
        type="button"
      >
        <i className="fa-solid fa-plus" aria-hidden="true" />
      </button>
    </div>
  );
};

SourceRecommendation.displayName = 'SourceRecommendation';
