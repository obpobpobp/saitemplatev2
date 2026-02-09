/**
 * FileUploadArea component props
 */
export interface FileUploadAreaProps {
  /**
   * Input placeholder text
   */
  placeholder?: string;
  
  /**
   * Input value
   */
  value?: string;
  
  /**
   * Input change handler
   */
  onChange?: (value: string) => void;
  
  /**
   * Submit handler
   */
  onSubmit?: () => void;
  
  /**
   * File drop/select handler
   */
  onFileSelect?: (files: File[]) => void;
  
  /**
   * Context tag text (e.g., "Add your course")
   */
  contextTag?: string;
  
  /**
   * Whether to show the input section
   */
  showInput?: boolean;
  
  /**
   * Whether input is disabled
   */
  isDisabled?: boolean;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}







