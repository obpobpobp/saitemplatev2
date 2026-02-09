import { QuestionFeedback } from '../exam.types';

export interface ExamMultipleChoiceProps {
  questionNumber: number;
  marks: number;
  stem?: string;
  questionText: string;
  options: string[];
  selectedOption?: number;
  correctOption?: number;
  feedback?: QuestionFeedback;
  showFeedback?: boolean;
  onSelectOption: (index: number) => void;
  className?: string;
}

export type OptionState = 'default' | 'selected' | 'correct' | 'incorrect' | 'disabled';

