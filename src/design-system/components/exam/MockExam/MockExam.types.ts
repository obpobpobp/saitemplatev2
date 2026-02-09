import { Question, Answer, ExamFeedback } from '../exam.types';

export interface MockExamProps {
  examId: string;
  questions: Question[];
  onSubmit: (answers: Record<string, Answer>) => Promise<ExamFeedback>;
  onMoreFeedback?: (questionId: string) => Promise<string>;
  className?: string;
}

