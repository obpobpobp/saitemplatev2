import type { Message, SuggestedAction } from '@design-system/components/chat/ChatWindow/ChatWindow.types';
import type { AITool, SourceItem, AttachmentItem } from '@design-system/components/chat/ChatInput/ChatInput.types';

/**
 * Props for the AssistantPanel component
 * 
 * Wraps ChatWindow for display in the sidebar tab panel.
 */
export interface AssistantPanelProps {
  /**
   * Array of chat messages
   */
  messages?: Message[];
  
  /**
   * Suggested action buttons
   */
  suggestedActions?: SuggestedAction[];
  
  /**
   * Callback when user sends a message
   */
  onSendMessage?: (message: string) => void;
  
  /**
   * Callback when user clicks a suggested action
   */
  onActionClick?: (action: string) => void;
  
  /**
   * Callback for add button
   */
  onAddClick?: () => void;
  
  /**
   * Callback for context button
   */
  onContextClick?: () => void;
  
  /**
   * Callback for create button
   */
  onCreateClick?: () => void;
  
  /**
   * Callback for source toggle
   */
  onSourceToggle?: (sourceId: string) => void;
  
  /**
   * Selected AI tool
   */
  aiTool?: AITool;
  
  /**
   * Available sources for context
   */
  sources?: SourceItem[];
  
  /**
   * Whether context menu is open
   */
  showContextMenu?: boolean;
  
  /**
   * Attachments to display
   */
  attachments?: AttachmentItem[];
  
  /**
   * Course information for context display
   */
  courseInfo?: {
    courseCode: string;
    courseName: string;
    university: string;
  };
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
