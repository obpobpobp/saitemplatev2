export interface ExamResultsProps {
  earnedMarks: number;
  totalMarks: number;
  timeElapsed: number;
  onFeedback?: () => void;
  onRetry?: () => void;
  className?: string;
}

