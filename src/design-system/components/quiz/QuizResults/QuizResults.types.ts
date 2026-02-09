export interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedQuestions: number;
  onReview: () => void;
  onRetake: () => void;
  onClose: () => void;
  className?: string;
}







