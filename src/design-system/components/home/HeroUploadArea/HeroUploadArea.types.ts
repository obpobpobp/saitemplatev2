import { UploadedFile } from '../../uploads/FileUploadItem/FileUploadItem.types';

export interface HeroUploadAreaProps {
  files?: UploadedFile[];
  question?: string;
  onUpload?: (files: File[]) => void;
  onRemoveFile?: (fileId: string) => void;
  onSubmit?: () => void;
  onQuestionChange?: (question: string) => void;
  onAddContext?: (type: 'course' | 'topic') => void;
  isMobile?: boolean;
  className?: string;
}
