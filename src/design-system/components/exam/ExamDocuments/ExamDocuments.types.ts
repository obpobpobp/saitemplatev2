export interface Document {
  id: string;
  title: string;
  category: string;
  thumbnail?: string;
  pages: number;
  rating: number;
  ratingCount: number;
  isPremium?: boolean;
  isNew?: boolean;
}

export interface ExamDocumentsProps {
  documents: Document[];
  totalCount: number;
  onSeeAll?: () => void;
  onSaveDocument?: (documentId: string) => void;
  className?: string;
}

