'use client';

import React from 'react';
import classNames from 'classnames';
import { Icon } from '@design-system/components/buttons';
import { CourseSectionHeaderProps } from './CourseSectionHeader.types';
import styles from './CourseSectionHeader.module.css';

/**
 * CourseSectionHeader - Header for course sections in project list
 * 
 * @example
 * <CourseSectionHeader icon="folder" title="Course 1" />
 */
export const CourseSectionHeader: React.FC<CourseSectionHeaderProps> = ({
  icon = 'folder',
  title,
  className,
}) => {
  return (
    <div className={classNames(styles.header, className)}>
      <Icon 
        name={icon} 
        size="medium"
        ariaLabel={title}
      />
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};






