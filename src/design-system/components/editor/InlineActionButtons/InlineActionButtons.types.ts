/**
 * InlineActionButtons component types
 */
export interface InlineActionButtonsProps {
  /**
   * Position of the action buttons
   */
  position?: { top: number; left: number };
  
  /**
   * Whether the buttons are visible
   */
  isVisible?: boolean;
  
  /**
   * Callback when "Generate a summary" is clicked
   */
  onGenerateSummary?: () => void;
  
  /**
   * Callback when "Create a quiz" is clicked
   */
  onCreateQuiz?: () => void;
  
  /**
   * Callback when "Ask a question" is clicked
   */
  onAskQuestion?: () => void;
  
  /**
   * Callback when "Record my class" is clicked
   */
  onRecordClass?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Action button definition
 */
export interface ActionButton {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
}




