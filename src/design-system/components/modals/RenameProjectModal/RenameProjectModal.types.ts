export interface RenameProjectModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Current project title
   */
  currentTitle: string;

  /**
   * Current project emoji
   */
  currentEmoji: string;

  /**
   * Callback when the rename is confirmed
   */
  onRename: (newTitle: string, newEmoji: string) => void;

  /**
   * Callback when the modal is closed
   */
  onClose: () => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}


