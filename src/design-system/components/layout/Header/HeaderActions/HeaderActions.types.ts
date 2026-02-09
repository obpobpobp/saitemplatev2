/**
 * Privacy setting
 */
export type PrivacySetting = 'public' | 'private';

/**
 * HeaderActions component props
 */
export interface HeaderActionsProps {
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
   * Whether to show sign in button (for guest mode)
   * @default false
   */
  showSignIn?: boolean;
  
  /**
   * Sign in button click handler
   */
  onSignInClick?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}






