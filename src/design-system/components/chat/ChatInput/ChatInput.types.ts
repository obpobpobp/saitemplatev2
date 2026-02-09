/**
 * AI Tool variants
 */
export type AITool = 'ask-ai' | 'quiz' | 'summary' | 'flashcards';

/**
 * Context tag
 */
export interface ContextTag {
  id: string;
  label: string;
  icon?: string;
  onRemove?: () => void;
}

/**
 * Action chip for quick actions
 */
export interface ActionChip {
  id: string;
  label: string;
  icon?: string;
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
   * Attachment button click handler
   */
  onAttach?: () => void;
  
  /**
   * Context button click handler
   */
  onContext?: () => void;
  
  /**
   * Create button click handler
   */
  onCreate?: () => void;
  
  /**
   * Whether input is disabled
   */
  isDisabled?: boolean;
  
  /**
   * Whether send button is disabled (e.g., empty input)
   */
  canSend?: boolean;
  
  /**
   * Maximum length of input
   */
  maxLength?: number;
  
  /**
   * AI tool variant
   */
  aiTool?: AITool;
  
  /**
   * Context tags to display
   */
  contextTags?: ContextTag[];
  
  /**
   * Whether attachments are loading
   */
  isLoadingAttachments?: boolean;
  
  /**
   * Action chips to display
   */
  actionChips?: ActionChip[];
  
  /**
   * Action chip click handler
   */
  onActionChipClick?: (chipId: string) => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}







