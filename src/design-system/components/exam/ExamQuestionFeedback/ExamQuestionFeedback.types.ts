import { QuestionFeedback } from '../exam.types';

export interface ExamQuestionFeedbackProps {
  feedback: QuestionFeedback;
  onMoreFeedback?: () => void;
  className?: string;
}

