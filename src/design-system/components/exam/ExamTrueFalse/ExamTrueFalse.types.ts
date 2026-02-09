import { QuestionFeedback } from '../exam.types';

export interface ExamTrueFalseProps {
  questionNumber: number;
  marks: number;
  stem?: string;
  questionText: string;
  selectedValue?: boolean;
  correctValue?: boolean;
  feedback?: QuestionFeedback;
  showFeedback?: boolean;
  onSelect: (value: boolean) => void;
  className?: string;
}

