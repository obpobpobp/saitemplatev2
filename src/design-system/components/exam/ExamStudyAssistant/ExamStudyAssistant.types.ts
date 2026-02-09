export interface ExamStudyAssistantProps {
  message: string;
  onPracticeWeakTopics?: () => void;
  onAnalyzeMistakes?: () => void;
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
  className?: string;
}

