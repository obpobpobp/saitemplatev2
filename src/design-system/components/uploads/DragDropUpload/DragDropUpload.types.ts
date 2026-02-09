export interface DragDropUploadProps {
  /**
   * File accept types (e.g., ".pdf,.doc,.txt")
   */
  accept?: string;
  
  /**
   * Maximum file size in bytes
   */
  maxSize?: number;
  
  /**
   * Allow multiple file uploads
   */
  multiple?: boolean;
  
  /**
   * Upload handler
   */
  onUpload?: (files: File[]) => void;
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
}







