import { ReactNode } from 'react';
import { AvatarData } from './AvatarSet/AvatarSet.types';
import { PrivacySetting } from './HeaderActions/HeaderActions.types';
import { ProjectItem } from './ProjectDropdown/ProjectDropdown.types';

/**
 * Header variant matching Figma designs
 */
export type HeaderVariant = 'project' | 'home' | 'shared' | 'guest' | 'home-guest';

/**
 * Header component props
 */
export interface HeaderProps {
  /**
   * Header variant determining layout and content
   * @default 'project'
   */
  variant?: HeaderVariant;
  
  /**
   * Logo element (typically Logo component)
   */
  logo?: ReactNode;
  
  /**
   * Logo click handler (typically navigates to home)
   */
  onLogoClick?: () => void;
  
  /**
   * Project/page title
   */
  title?: string;
  
  /**
   * Whether title has dropdown functionality
   * @default false
   */
  hasTitleDropdown?: boolean;
  
  /**
   * Title dropdown click handler
   */
  onTitleDropdownClick?: () => void;
  
  /**
   * Breadcrumb label (e.g., course/folder name)
   */
  breadcrumbLabel?: string;
  
  /**
   * Breadcrumb click handler
   */
  onBreadcrumbClick?: () => void;
  
  /**
   * Current privacy setting
   * @default 'public'
   */
  privacy?: PrivacySetting;
  
  /**
   * Privacy button click handler
   */
  onPrivacyClick?: () => void;
  
  /**
   * Share button click handler
   */
  onShareClick?: () => void;
  
  /**
   * Sign in button click handler (for guest variants)
   */
  onSignInClick?: () => void;
  
  /**
   * User avatar image URL
   */
  avatarUrl?: string;
  
  /**
   * User initials for avatar
   */
  avatarInitials?: string;
  
  /**
   * Avatar click handler
   */
  onAvatarClick?: () => void;
  
  /**
   * Collaborator count (for single avatar)
   */
  collabCount?: number;
  
  /**
   * Collaborator avatars (for shared variant)
   */
  collaborators?: AvatarData[];
  
  /**
   * Collaborator overflow click handler
   */
  onCollaboratorsClick?: () => void;
  
  /**
   * Recent projects for dropdown (when hasTitleDropdown is true)
   */
  recentProjects?: ProjectItem[];

  /**
   * Project selection handler
   */
  onProjectSelect?: (projectId: string) => void;

  /**
   * Project menu action handler (share, rename, privacy, delete)
   */
  onProjectMenu?: (projectId: string, action: string) => void;

  /**
   * View all projects handler
   */
  onViewAllProjects?: () => void;

  /**
   * New project handler
   */
  onNewProject?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
