/**
 * SourceDropZone Type Definitions
 */

export interface SourceDropZoneProps {
  /**
   * Handler when files are selected (via drop or picker)
   */
  onFilesSelected: (files: File[]) => void;
  
  /**
   * Handler when "Browse Studocu" is clicked
   */
  onBrowseStudocu: () => void;
  
  /**
   * Whether upload is in progress
   * @default false
   */
  isUploading?: boolean;
  
  /**
   * Upload progress (0-100)
   */
  uploadProgress?: number;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
