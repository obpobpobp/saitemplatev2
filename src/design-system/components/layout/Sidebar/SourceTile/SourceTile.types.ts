import { ReactNode } from 'react';

/**
 * Source file types
 */
export type SourceType = 'pdf' | 'text' | 'video' | 'audio' | 'image' | 'slides' | 'link' | 'studocu';

/**
 * Source tile state
 */
export type SourceTileState = 'default' | 'hover' | 'clicked' | 'selected' | 'loading' | 'error';

/**
 * SourceTile component props
 */
export interface SourceTileProps {
  /**
   * Title/name of the source
   */
  title: string;
  
  /**
   * Type of source file
   */
  type: SourceType;
  
  /**
   * Current state of the tile
   * @default 'default'
   */
  state?: SourceTileState;
  
  /**
   * Subtitle or metadata (e.g., file type, duration)
   */
  subtitle?: string;
  
  /**
   * Custom icon for the source
   * If not provided, default icon for type will be used
   */
  icon?: ReactNode;
  
  /**
   * Error message to display in error state
   */
  errorMessage?: string;
  
  /**
   * Click handler for the tile
   */
  onClick?: () => void;
  
  /**
   * Click handler for the more menu button
   */
  onMoreClick?: (event: React.MouseEvent) => void;
  
  /**
   * Click handler for retry button (shown in error state)
   */
  onRetryClick?: () => void;
  
  /**
   * Click handler for close button (shown in error state)
   */
  onCloseClick?: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}


