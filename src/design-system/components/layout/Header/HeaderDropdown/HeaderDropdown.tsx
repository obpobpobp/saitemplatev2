import React from 'react';
import classNames from 'classnames';
import { HeaderDropdownProps } from './HeaderDropdown.types';
import styles from './HeaderDropdown.module.css';

/**
 * HeaderDropdown - Project switcher popover
 * Displays recent projects with viewing status, timestamps, and actions
 * 
 * @example
 * <HeaderDropdown
 *   projects={recentProjects}
 *   onProjectClick={handleProjectClick}
 *   onNewProjectClick={handleNewProject}
 *   onClose={handleClose}
 * />
 */
export const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  projects = [],
  onProjectClick,
  onViewAllClick,
  onNewProjectClick,
  onClose,
  className,
}) => {
  // Show max 4 projects
  const displayProjects = projects.slice(0, 4);

  return (
    <div className={classNames(styles.dropdown, className)}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.title}>Recent Projects</p>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <i className="fa-solid fa-close" aria-hidden="true" />
          </button>
        </div>

        {/* Projects List */}
        <div className={styles.projectsList}>
          {displayProjects.map((project, index) => (
            <React.Fragment key={project.id}>
              <button
                className={styles.projectItem}
                onClick={() => onProjectClick?.(project.id)}
              >
                <div className={styles.projectEmoji}>{project.emoji}</div>
                
                <div className={styles.projectInfo}>
                  <div className={styles.projectTitleRow}>
                    <p className={styles.projectTitle}>{project.title}</p>
                  </div>
                  
                  <div className={styles.subElements}>
                    {project.isViewing && (
                      <div className={styles.viewingChip}>
                        <div className={styles.viewingIcon}>
                          <i className="fa-duotone fa-solid fa-eye" aria-hidden="true" />
                        </div>
                        <p className={styles.viewingLabel}>Viewing</p>
                      </div>
                    )}
                    {!project.isViewing && (
                      <p className={styles.projectTime}>{project.lastModified}</p>
                    )}
                  </div>
                </div>

                <button
                  className={styles.projectMenuButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Project menu:', project.id);
                  }}
                  aria-label="Project options"
                >
                  <i className="fa-solid fa-ellipsis-vertical" aria-hidden="true" />
                </button>
              </button>

              {index < displayProjects.length - 1 && (
                <div className={styles.separator} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Footer Actions */}
        <div className={styles.footer}>
          <div className={styles.buttons}>
            <button
              className={styles.viewAllButton}
              onClick={onViewAllClick}
            >
              View all
            </button>
            <button
              className={styles.newProjectButton}
              onClick={onNewProjectClick}
            >
              New Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};




