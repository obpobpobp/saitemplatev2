import type { AITool, SourceItem, AttachmentItem } from '../ChatInput/ChatInput.types';

export interface Attachment {
  name: string;
  type: 'pdf' | 'ppt' | 'doc' | 'image' | 'text' | 'other';
  url?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  attachments?: Attachment[];
  timestamp?: Date;
}

export interface SuggestedAction {
  label: string;
  action: string;
  icon?: string;
}

export interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages?: Message[];
  suggestedActions?: SuggestedAction[];
  onSendMessage?: (message: string) => void;
  onActionClick?: (action: string) => void;
  onAddClick?: () => void;
  onContextClick?: () => void;
  onCreateClick?: () => void;
  onSourceToggle?: (sourceId: string) => void;
  aiTool?: AITool;
  sources?: SourceItem[];
  showContextMenu?: boolean;
  attachments?: AttachmentItem[];
  className?: string;
  inline?: boolean;
  /**
   * Whether the assistant is thinking/processing
   * @default false
   */
  isThinking?: boolean;
  /**
   * Callback when typing animation completes
   */
  onTypingComplete?: () => void;
}
