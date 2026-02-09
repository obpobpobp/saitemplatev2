import React, { useState } from 'react';
import classNames from 'classnames';
import { ProjectDropdownProps } from './ProjectDropdown.types';
import { ProjectMenu } from '../ProjectMenu';
import { ProjectMenuAction } from '../ProjectMenu/ProjectMenu.types';
import styles from './ProjectDropdown.module.css';

/**
 * ProjectDropdown - Dropdown for project selection
 * Shows recent projects with emoji icons, viewing status, and actions
 * 
 * @example
 * <ProjectDropdown
 *   isOpen={isOpen}
 *   projects={recentProjects}
 *   onClose={handleClose}
 *   onProjectSelect={handleProjectSelect}
 *   onNewProject={handleNewProject}
 * />
 */
export const ProjectDropdown: React.FC<ProjectDropdownProps> = ({
  projects = [],
  isOpen,
  onClose,
  onProjectSelect,
  onProjectMenu,
  onViewAll,
  onNewProject,
  className,
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  if (!isOpen) return null;
  
  const handleProjectClick = (projectId: string): void => {
    onProjectSelect?.(projectId);
  };
  
  const handleMenuClick = (e: React.MouseEvent, projectId: string): void => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === projectId ? null : projectId);
  };

  const handleMenuAction = (projectId: string, action: ProjectMenuAction): void => {
    onProjectMenu?.(projectId, action);
    setOpenMenuId(null);
  };
  
  return (
    <div className={classNames(styles.dropdown, className)}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>Recent Projects</h3>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
      </div>
      
      {/* Projects list */}
      <div className={styles.projectsList}>
        {projects.map((project, index) => (
          <React.Fragment key={project.id}>
            <button
              type="button"
              className={styles.projectItem}
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Project emoji icon */}
              <div className={styles.projectIcon}>
                {project.emoji || '📔'}
              </div>
              
              {/* Project content */}
              <div className={styles.projectContent}>
                <div className={styles.projectTitleRow}>
                  <span className={styles.projectTitle}>{project.title}</span>
                </div>
                
                {/* Meta info (viewing status or time) */}
                <div className={styles.projectMeta}>
                  {project.isViewing ? (
                    <div className={styles.viewingChip}>
                      <i className="fa-duotone fa-solid fa-eye" aria-hidden="true" />
                      <span className={styles.viewingChipText}>Viewing</span>
                    </div>
                  ) : project.lastAccessed ? (
                    <span className={styles.projectTime}>{project.lastAccessed}</span>
                  ) : null}
                </div>
              </div>
              
              {/* Menu button */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  className={styles.projectMenuButton}
                  onClick={(e) => handleMenuClick(e, project.id)}
                  aria-label="Project options"
                >
                  <i className="fa-solid fa-ellipsis-vertical" aria-hidden="true" />
                </button>
                
                {/* Project menu */}
                <ProjectMenu
                  isOpen={openMenuId === project.id}
                  onSelect={(action) => handleMenuAction(project.id, action)}
                  onClose={() => setOpenMenuId(null)}
                />
              </div>
            </button>
            
            {/* Separator (not after last item) */}
            {index < projects.length - 1 && (
              <div className={styles.separator} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Footer with buttons */}
      <div className={styles.footer}>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.viewAllButton}
            onClick={onViewAll}
          >
            View all
          </button>
          <button
            type="button"
            className={styles.newProjectButton}
            onClick={onNewProject}
          >
            New Project
          </button>
        </div>
      </div>
    </div>
  );
};


