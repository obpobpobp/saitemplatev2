/**
 * User data for dropdown menu
 */
export interface User {
  id: string;
  name: string;
  initials?: string;
  avatarUrl?: string;
  isActive?: boolean;
}

/**
 * AvatarControl component props
 */
export interface AvatarControlProps {
  /**
   * Avatar variant type
   * @default 'image'
   */
  variant?: 'image' | 'initials' | 'guest';
  
  /**
   * Avatar image URL
   */
  avatarUrl?: string;
  
  /**
   * User initials (shown if no image)
   */
  initials?: string;
  
  /**
   * Whether to show dropdown chevron
   * @default true
   */
  hasDropdown?: boolean;
  
  /**
   * Number of collaborators (if any)
   */
  collabCount?: number;
  
  /**
   * Users list for dropdown menu (active and inactive)
   */
  users?: User[];
  
  /**
   * Current user data
   */
  currentUser?: User;
  
  /**
   * Whether dropdown is open
   */
  isOpen?: boolean;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Handler for user selection in dropdown
   */
  onUserClick?: (userId: string) => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}


