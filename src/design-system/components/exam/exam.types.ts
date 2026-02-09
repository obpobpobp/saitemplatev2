/**
 * Shared types for Mock Exam components
 */

export type QuestionType =
  | 'multiple-choice'
  | 'short-answer'
  | 'long-answer'
  | 'multi-select'
  | 'true-false'
  | 'fill-blanks';

export type FeedbackType = 'progressive' | 'binary';

export type PerformanceLevel = 'low' | 'medium' | 'high' | 'perfect';

export interface BlankDefinition {
  id: string;
  correctAnswer: string;
  position: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  questionNumber: number;
  marks: number;
  stem?: string;
  text: string;
  options?: string[];
  correctAnswer?: string | string[] | number | number[] | boolean;
  blanks?: BlankDefinition[];
}

export interface Answer {
  questionId: string;
  value: string | string[] | number | number[] | boolean | Record<string, string>;
  timestamp: number;
}

export interface QuestionFeedback {
  questionId: string;
  isCorrect: boolean;
  earnedMarks: number;
  totalMarks: number;
  percentage: number;
  explanation: string;
  detailedFeedback?: string;
  correctAnswer?: string | string[] | number | number[] | boolean;
}

export interface ExamFeedback {
  totalMarks: number;
  earnedMarks: number;
  percentage: number;
  timeElapsed: number;
  questionFeedback: Record<string, QuestionFeedback>;
  recommendedDocs?: any[];
  studyAssistantMessage?: string;
}

export interface ExamState {
  examId: string;
  questions: Question[];
  answers: Record<string, Answer>;
  startTime: number;
  endTime?: number;
  isSubmitted: boolean;
  feedback?: ExamFeedback;
}

