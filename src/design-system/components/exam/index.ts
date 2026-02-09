// Main exam container
export { MockExam } from './MockExam';
export type { MockExamProps } from './MockExam';

// Progress bar
export { ExamProgressBar } from './ExamProgressBar';
export type { ExamProgressBarProps } from './ExamProgressBar';

// Question types
export { ExamMultipleChoice } from './ExamMultipleChoice';
export type { ExamMultipleChoiceProps, OptionState } from './ExamMultipleChoice';

export { ExamShortAnswer } from './ExamShortAnswer';
export type { ExamShortAnswerProps } from './ExamShortAnswer';

export { ExamLongAnswer } from './ExamLongAnswer';
export type { ExamLongAnswerProps } from './ExamLongAnswer';

export { ExamMultiSelect } from './ExamMultiSelect';
export type { ExamMultiSelectProps, MultiSelectOptionState } from './ExamMultiSelect';

export { ExamTrueFalse } from './ExamTrueFalse';
export type { ExamTrueFalseProps } from './ExamTrueFalse';

export { ExamFillBlanks } from './ExamFillBlanks';
export type { ExamFillBlanksProps } from './ExamFillBlanks';

// Feedback components
export { ExamFeedbackHeader } from './ExamFeedbackHeader';
export type { ExamFeedbackHeaderProps, FeedbackLevel } from './ExamFeedbackHeader';

export { ExamQuestionFeedback } from './ExamQuestionFeedback';
export type { ExamQuestionFeedbackProps } from './ExamQuestionFeedback';

// Results components
export { ExamResults } from './ExamResults';
export type { ExamResultsProps } from './ExamResults';

export { ExamDocuments } from './ExamDocuments';
export type { ExamDocumentsProps, Document } from './ExamDocuments';

export { ExamStudyAssistant } from './ExamStudyAssistant';
export type { ExamStudyAssistantProps } from './ExamStudyAssistant';

// Shared types
export type {
  QuestionType,
  FeedbackType,
  PerformanceLevel,
  BlankDefinition,
  Question,
  Answer,
  QuestionFeedback,
  ExamFeedback,
  ExamState,
} from './exam.types';

