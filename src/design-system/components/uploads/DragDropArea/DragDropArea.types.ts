import { UploadedFile } from '../FileUploadItem/FileUploadItem.types';

export interface DragDropAreaProps {
  files?: UploadedFile[];
  onUpload?: (files: File[]) => void;
  onRemoveFile?: (fileId: string) => void;
  onAddMore?: () => void;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  isMobile?: boolean;
  className?: string;
}





