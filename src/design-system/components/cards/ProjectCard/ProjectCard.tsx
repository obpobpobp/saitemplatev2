'use client';

import React from 'react';
import classNames from 'classnames';
import { ProjectCardProps } from './ProjectCard.types';
import styles from './ProjectCard.module.css';

/**
 * ProjectCard - Card component for displaying projects
 * Supports both regular project cards and "new project" variant
 * 
 * @example
 * <ProjectCard 
 *   emoji="🩺"
 *   title="Week 1: Topic 1"
 *   course="Course 1"
 *   updatedDate="Jan 20, 2025"
 *   isLocked={true}
 *   onClick={handleClick}
 *   onMenuClick={handleMenu}
 * />
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  variant = 'project',
  emoji = '📚',
  title = 'New Project',
  subtitle,
  course,
  updatedDate,
  isLocked = false,
  showAddCourse = false,
  onAddCourse,
  onClick,
  onMenuClick,
  className,
}) => {
  if (variant === 'new-project') {
    return (
      <div
        className={classNames(styles.card, styles.newProject, className)}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        <div className={styles.newProjectContent}>
          <button
            type="button"
            className={styles.newProjectButton}
            aria-label="Create new project"
          >
            <span className={styles.plusIcon} aria-hidden="true" />
          </button>
          <div className={styles.newProjectText}>
            <h3 className={styles.newProjectTitle}>{title}</h3>
            <p className={styles.newProjectSubtitle}>
              {subtitle || 'Start a new study topic'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.card, className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.emojiIcon}>
          <span className={styles.emoji}>{emoji}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <button
          type="button"
          className={styles.menuButton}
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick?.(e);
          }}
          aria-label="More options"
        >
          <span className={styles.chevronIcon} aria-hidden="true" />
        </button>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.metadata}>
          {showAddCourse ? (
            <div className={styles.course}>
              <span className={styles.pencilIcon} aria-hidden="true" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddCourse?.(e);
                }}
                className={styles.addCourseLink}
              >
                Add a course
              </button>
            </div>
          ) : course ? (
            <div className={styles.course}>
              <span className={styles.folderIcon} aria-hidden="true" />
              <span className={styles.courseName}>{course}</span>
            </div>
          ) : null}
          {updatedDate && (
            <p className={styles.updatedDate}>Updated {updatedDate}</p>
          )}
        </div>
        {isLocked && (
          <div className={styles.lockWrapper}>
            <span className={styles.lockIcon} aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
};


