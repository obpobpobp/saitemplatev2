import { QuestionFeedback } from '../exam.types';

export interface ExamMultiSelectProps {
  questionNumber: number;
  marks: number;
  stem?: string;
  questionText: string;
  options: string[];
  selectedOptions: number[];
  correctOptions?: number[];
  feedback?: QuestionFeedback;
  showFeedback?: boolean;
  onToggleOption: (index: number) => void;
  className?: string;
}

export type MultiSelectOptionState = 'default' | 'selected' | 'correct' | 'incorrect' | 'disabled';

