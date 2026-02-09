/**
 * Avatar component props
 */
export interface AvatarProps {
  /**
   * Avatar variant type
   * @default 'initials'
   */
  variant?: 'image' | 'initials' | 'guest';
  
  /**
   * User image URL (for variant='image')
   */
  imageUrl?: string;
  
  /**
   * User initials (for variant='initials')
   */
  initials?: string;
  
  /**
   * Size of avatar
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Additional CSS class name
   */
  className?: string;
}





