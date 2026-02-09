/**
 * Slash command item definition
 */
export interface SlashCommandItem {
  /**
   * Unique identifier for the command
   */
  id: string;
  
  /**
   * Display title of the command
   */
  title: string;
  
  /**
   * Icon to display (Font Awesome icon name or ReactNode)
   */
  icon?: string;
  
  /**
   * Command execution handler
   */
  command: () => void;
  
  /**
   * Search keywords for filtering
   */
  keywords?: string[];
}

/**
 * SlashCommandMenu component props
 */
export interface SlashCommandMenuProps {
  /**
   * Array of available commands
   */
  items: SlashCommandItem[];
  
  /**
   * Currently selected/highlighted command index
   */
  selectedIndex?: number;
  
  /**
   * Search query for filtering commands
   */
  query?: string;
  
  /**
   * Position coordinates for the menu
   */
  position?: {
    top: number;
    left: number;
  };
  
  /**
   * Whether the menu is visible
   */
  isVisible?: boolean;
  
  /**
   * Callback when a command is selected
   */
  onSelect?: (item: SlashCommandItem) => void;
  
  /**
   * Callback when selection changes (arrow keys)
   */
  onSelectionChange?: (index: number) => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}







