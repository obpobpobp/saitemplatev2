export type QuickAction = 'mock-exam' | 'summary' | 'quiz' | null;

export interface QuickActionButtonsProps {
  activeAction?: QuickAction;
  onActionChange?: (action: QuickAction) => void;
  className?: string;
}





