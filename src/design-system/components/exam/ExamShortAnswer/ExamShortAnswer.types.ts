import { QuestionFeedback } from '../exam.types';

export interface ExamShortAnswerProps {
  questionNumber: number;
  marks: number;
  stem?: string;
  questionText: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  feedback?: QuestionFeedback;
  showFeedback?: boolean;
  onChange: (value: string) => void;
  className?: string;
}

