/**
 * Props for the TypingIndicator component
 * 
 * Used for displaying a thinking state when the AI assistant is processing a response.
 */
export interface TypingIndicatorProps {
  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Custom accessibility label
   * @default 'Assistant is thinking'
   */
  ariaLabel?: string;

  /**
   * Avatar image source
   * @default '/Assistant avatar.png'
   */
  avatarSrc?: string;
}
