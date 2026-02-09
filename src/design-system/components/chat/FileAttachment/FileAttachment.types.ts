/**
 * File attachment types
 */
export type FileType = 'pdf' | 'ppt' | 'doc' | 'image' | 'text' | 'other';

/**
 * FileAttachment component props
 */
export interface FileAttachmentProps {
  /**
   * File name
   */
  fileName: string;
  
  /**
   * File type for icon display
   */
  fileType?: FileType;
  
  /**
   * File size (optional, e.g., "2.4 MB")
   */
  fileSize?: string;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Rotation angle (in degrees) for stacked appearance
   */
  rotation?: number;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}







