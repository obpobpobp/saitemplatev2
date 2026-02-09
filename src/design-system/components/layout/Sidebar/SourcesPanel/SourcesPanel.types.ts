import type { ReactNode } from 'react';

/**
 * Props for SourcesPanel component
 * Organized with sections for recommendations, library, and uploads
 */
export interface SourcesPanelProps {
  /**
   * Studocu recommended documents (not yet added)
   */
  studocuRecommendations?: ReactNode;
  
  /**
   * Documents added from Studocu library
   */
  studocuLibrary?: ReactNode;
  
  /**
   * User uploaded files
   */
  userUploads?: ReactNode;
  
  /**
   * Handler for "Add from Studocu" button
   */
  onAddFromStudocu?: () => void;
  
  /**
   * Handler for "Upload File" button
   */
  onUploadFile?: () => void;
  
  /**
   * Handler for clicking on a source
   */
  onSourceClick?: (sourceId: string) => void;
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  // Legacy props for backward compatibility
  /** @deprecated Use studocuLibrary and userUploads instead */
  children?: ReactNode;
  /** @deprecated Use onAddFromStudocu instead */
  onAddClick?: () => void;
  /** @deprecated No longer used */
  onRecordClick?: () => void;
  /** @deprecated No longer used */
  onSearchClick?: () => void;
  /** @deprecated No longer used */
  onFilterClick?: () => void;
  /** @deprecated No longer used in tabbed sidebar */
  isExpanded?: boolean;
  /** @deprecated No longer used in tabbed sidebar */
  onToggle?: () => void;
}
