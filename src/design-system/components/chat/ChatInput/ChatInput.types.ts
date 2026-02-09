/**
 * AI Tool variants
 */
export type AITool = 'ask-ai' | 'quiz' | 'summary' | 'create';

/**
 * Source item for context selection
 */
export interface SourceItem {
  id: string;
  name: string;
  type: 'pdf' | 'text' | 'slides' | 'audio' | 'video';
  selected?: boolean;
}

/**
 * Attachment item
 */
export interface AttachmentItem {
  id: string;
  name?: string;
  isLoading?: boolean;
  onRemove?: () => void;
}

/**
 * ChatInput component props
 */
export interface ChatInputProps {
  /**
   * Current input value
   */
  value?: string;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Change handler
   */
  onChange?: (value: string) => void;
  
  /**
   * Submit handler (Enter key or send button)
   */
  onSubmit?: () => void;
  
  /**
   * Add button click handler (attachments menu)
   */
  onAddClick?: () => void;
  
  /**
   * Context button click handler
   */
  onContextClick?: () => void;
  
  /**
   * Create button click handler
   */
  onCreateClick?: () => void;
  
  /**
   * Source selection handler
   */
  onSourceToggle?: (sourceId: string) => void;
  
  /**
   * Whether input is disabled
   */
  isDisabled?: boolean;
  
  /**
   * Whether the assistant is processing/thinking
   * Shows loading spinner on send button and disables input
   * @default false
   */
  isProcessing?: boolean;
  
  /**
   * Maximum length of input
   */
  maxLength?: number;
  
  /**
   * AI tool variant
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
   * Additional CSS class name
   */
  className?: string;
}







