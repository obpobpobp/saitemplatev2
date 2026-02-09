export interface EmojiPickerProps {
  /**
   * Whether the picker is open
   */
  isOpen: boolean;

  /**
   * Callback when an emoji is selected
   */
  onSelect: (emoji: string) => void;

  /**
   * Callback when the picker is closed
   */
  onClose: () => void;

  /**
   * Position relative to the trigger button
   */
  anchorEl?: HTMLElement | null;

  /**
   * Additional CSS class name
   */
  className?: string;
}

export interface EmojiCategory {
  name: string;
  emojis: string[];
}


