export interface QuizRulesProps {
  title?: string;
  questionCount: number;
  timeLimit?: number;
  rules?: string[];
  onStart: () => void;
  onCancel?: () => void;
  className?: string;
}







