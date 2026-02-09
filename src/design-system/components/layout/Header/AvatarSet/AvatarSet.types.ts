/**
 * Avatar data for display
 */
export interface AvatarData {
  /**
   * Avatar image URL
   */
  avatarUrl?: string;
  
  /**
   * User initials
   */
  initials?: string;
  
  /**
   * User name (for tooltip/accessible label)
   */
  name: string;
  
  /**
   * Background color for initials avatar
   */
  bgColor?: string;
}

/**
 * AvatarSet component props
 */
export interface AvatarSetProps {
  /**
   * Array of avatars to display
   */
  avatars: AvatarData[];
  
  /**
   * Maximum number of avatars to show before overflow
   * @default 4
   */
  maxDisplay?: number;
  
  /**
   * Click handler for overflow control
   */
  onOverflowClick?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}






