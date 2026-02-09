import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { HeaderTitleProps } from './HeaderTitle.types';
import { ProjectDropdown } from '../ProjectDropdown';
import { ProjectMenuAction } from '../ProjectMenu/ProjectMenu.types';
import styles from './HeaderTitle.module.css';

/**
 * HeaderTitle - Project/page title with optional dropdown
 * Displays title text and chevron-down button when dropdown is enabled
 */
export const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  hasDropdown = false,
  recentProjects = [],
  onDropdownClick,
  onProjectSelect,
  onProjectMenuAction,
  onViewAll,
  onNewProject,
  className,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const handleTitleClick = (): void => {
    if (onDropdownClick) {
      onDropdownClick();
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };
  
  const handleProjectMenu = (projectId: string, action: string): void => {
    onProjectMenuAction?.(projectId, action as ProjectMenuAction);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdownOpen) return;
    
    const handleClickOutside = (event: MouseEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);
  
  return (
    <div ref={wrapperRef} className={classNames(styles.titleWrapper, className)}>
      <h1 className={styles.title}>{title}</h1>
      {hasDropdown && (
        <button
          type="button"
          className={classNames(
            styles.dropdownButton,
            isDropdownOpen && styles.dropdownButtonActive
          )}
          onClick={handleTitleClick}
          aria-label="Project menu"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <i className="fa-solid fa-chevron-down" aria-hidden="true" />
        </button>
      )}
      
      {/* Project dropdown */}
      {hasDropdown && recentProjects.length > 0 && (
        <ProjectDropdown
          isOpen={isDropdownOpen}
          projects={recentProjects}
          onClose={() => setIsDropdownOpen(false)}
          onProjectSelect={(id) => {
            onProjectSelect?.(id);
            setIsDropdownOpen(false);
          }}
          onProjectMenu={handleProjectMenu}
          onViewAll={() => {
            onViewAll?.();
            setIsDropdownOpen(false);
          }}
          onNewProject={() => {
            onNewProject?.();
            setIsDropdownOpen(false);
          }}
        />
      )}
    </div>
  );
};
