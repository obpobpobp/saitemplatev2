'use client';

import React from 'react';
import classNames from 'classnames';
import type { CourseInfoCardProps } from './CourseInfoCard.types';
import styles from './CourseInfoCard.module.css';

/**
 * CourseInfoCard - Displays current course context
 * 
 * Shows the course information in a compact card format
 * within the chat interface.
 * 
 * @example
 * ```tsx
 * <CourseInfoCard 
 *   courseCode="Bio141-2273"
 *   courseName="Human Physiology"
 *   university="UVA"
 * />
 * ```
 */
export const CourseInfoCard: React.FC<CourseInfoCardProps> = ({
  courseCode,
  courseName,
  university,
  className,
}) => {
  return (
    <div className={classNames(styles.card, className)}>
      <p className={styles.text}>
        I study{' '}
        <span className={styles.courseCode}>{courseCode}</span>{' '}
        <span className={styles.courseName}>{courseName}</span>{' '}
        at {university}
      </p>
    </div>
  );
};
