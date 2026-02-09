/**
 * SourcesPanel Type Definitions
 */

import type { Source, SourceRecommendation } from '@/types/course';

export interface SourcesPanelProps {
  /**
   * Array of sources to display
   */
  sources: Source[];
  
  /**
   * Array of recommendations
   */
  recommendations?: SourceRecommendation[];
  
  /**
   * Currently active source ID
   */
  activeSourceId?: string;
  
  /**
   * Handler when files are selected for upload
   */
  onFilesSelected: (files: File[]) => void;
  
  /**
   * Handler when "Browse Studocu" is clicked
   */
  onBrowseStudocu: () => void;
  
  /**
   * Handler when source is clicked
   */
  onSourceClick: (source: Source) => void;
  
  /**
   * Handler when source is removed
   */
  onSourceRemove: (sourceId: string) => void;
  
  /**
   * Handler when recommendation is added
   */
  onAddRecommendation?: (rec: SourceRecommendation) => void;
  
  /**
   * Whether upload is in progress
   */
  isUploading?: boolean;
  
  /**
   * Upload progress (0-100)
   */
  uploadProgress?: number;
  
  /**
   * Total storage used in MB
   */
  storageUsedMB?: number;
  
  /**
   * Maximum storage allowed in MB
   */
  storageMaxMB?: number;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
