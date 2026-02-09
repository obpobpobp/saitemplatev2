import { ReactNode } from 'react';

/**
 * Message sender type
 */
export type MessageSender = 'user' | 'assistant';

/**
 * ChatMessage component props
 */
export interface ChatMessageProps {
  /**
   * Message content
   */
  children: ReactNode;
  
  /**
   * Message sender (user or AI assistant)
   */
  sender?: MessageSender;
  
  /**
   * Timestamp of the message
   */
  timestamp?: Date | string;
  
  /**
   * Whether to show avatar
   */
  showAvatar?: boolean;
  
  /**
   * Avatar URL or element
   */
  avatar?: string | ReactNode;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}







