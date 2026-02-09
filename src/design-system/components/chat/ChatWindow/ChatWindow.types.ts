import type { AITool, ContextTag, ActionChip } from '../ChatInput/ChatInput.types';

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
  onAttach?: () => void;
  onContext?: () => void;
  onCreate?: () => void;
  onActionChipClick?: (chipId: string) => void;
  aiTool?: AITool;
  contextTags?: ContextTag[];
  actionChips?: ActionChip[];
  isLoadingAttachments?: boolean;
  className?: string;
  inline?: boolean;
}
