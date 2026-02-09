import { Editor } from '@tiptap/react';

/**
 * ContentEditor component props
 */
export interface ContentEditorProps {
  /**
   * Initial editor content (HTML or JSON)
   */
  content?: string;
  
  /**
   * Placeholder text when editor is empty
   */
  placeholder?: string;
  
  /**
   * Whether the editor is editable
   */
  editable?: boolean;
  
  /**
   * Callback when content changes
   */
  onChange?: (content: string) => void;
  
  /**
   * Callback when editor is ready
   */
  onReady?: (editor: Editor) => void;
  
  /**
   * Whether to show the selection toolbar
   */
  showSelectionToolbar?: boolean;
  
  /**
   * Whether to show the slash command menu
   */
  showSlashCommands?: boolean;
  
  /**
   * Custom slash command handlers
   */
  onSlashCommand?: (command: string) => void;
  
  /**
   * Callback when "Ask AI" is clicked on selected text
   */
  onAskAI?: (selectedText: string) => void;
  
  /**
   * Callback when "Explain" is clicked on selected text
   */
  onExplain?: (selectedText: string) => void;
  
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
  
  /**
   * Editor wrapper styles
   */
  style?: React.CSSProperties;
}

/**
 * Editor state for tracking menus
 */
export interface EditorState {
  showSlashMenu: boolean;
  slashMenuPosition?: { top: number; left: number };
  slashQuery: string;
  selectedSlashIndex: number;
  
  showSelectionToolbar: boolean;
  selectionToolbarPosition?: { top: number; left: number };
}




