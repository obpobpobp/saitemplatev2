/**
 * EmptySourcesState - Empty state for sources list
 */

'use client';

import classNames from 'classnames';
import type { EmptySourcesStateProps } from './EmptySourcesState.types';
import styles from './EmptySourcesState.module.css';

export const EmptySourcesState: React.FC<EmptySourcesStateProps> = ({
  className,
}) => {
  return (
    <div className={classNames(styles.empty, className)}>
      <div className={styles.icon}>📚</div>
      <div className={styles.title}>No sources yet</div>
      <div className={styles.description}>
        Add your notes, slides, or find materials on Studocu to start generating practice questions.
      </div>
    </div>
  );
};

EmptySourcesState.displayName = 'EmptySourcesState';
