export interface ExamFeedbackHeaderProps {
  type: 'progressive' | 'binary';
  earnedMarks: number;
  totalMarks: number;
  className?: string;
}

export type FeedbackLevel = 'low' | 'medium' | 'high' | 'perfect' | 'correct' | 'incorrect';

