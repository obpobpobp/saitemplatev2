import { QuestionFeedback, BlankDefinition } from '../exam.types';

export interface ExamFillBlanksProps {
  questionNumber: number;
  marks: number;
  stem?: string;
  questionText: string;
  blanks: BlankDefinition[];
  values: Record<string, string>;
  feedback?: QuestionFeedback;
  showFeedback?: boolean;
  onChange: (blankId: string, value: string) => void;
  className?: string;
}

