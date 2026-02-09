export interface FileUploadItemProps {
  file: UploadedFile;
  onRemove?: (fileId: string) => void;
  className?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type?: string;
  url?: string;
}

export type FileIconType = 'file' | 'slides' | 'link' | 'video' | 'microphone' | 'studocu-logo';





