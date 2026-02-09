import { ReactNode } from 'react';

/**
 * Message position for styling different border radius
 */
export type MessagePosition = 'first' | 'middle' | 'last' | 'single';

/**
 * AssistantMessage component props for onboarding
 */
export interface AssistantMessageProps {
  /**
   * Message content
   */
  children: ReactNode;
  
  /**
   * Position in message sequence for border radius styling
   */
  position?: MessagePosition;
  
  /**
   * Whether to highlight specific text (bold)
   */
  highlightText?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}







