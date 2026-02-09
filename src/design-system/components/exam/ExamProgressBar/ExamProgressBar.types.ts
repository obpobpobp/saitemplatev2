export interface ExamProgressBarProps {
  totalQuestions: number;
  answeredCount: number;
  elapsedTime: number;
  totalMarks?: number;
  earnedMarks?: number;
  isCompleted: boolean;
  isSaved?: boolean;
  onExpand?: () => void;
  className?: string;
}

