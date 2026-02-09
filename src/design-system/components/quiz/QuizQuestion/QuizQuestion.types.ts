export type QuizState = 'unanswered' | 'correct' | 'incorrect' | 'skipped';

export interface QuizQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  selectedOption?: number;
  correctOption: number;
  explanation?: string;
  state?: QuizState;
  onSelectOption: (optionIndex: number) => void;
  onNext?: () => void;
  onSkip?: () => void;
  isLoading?: boolean;
  className?: string;
}







