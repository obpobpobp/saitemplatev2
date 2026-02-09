# Exam Components

Comprehensive mock exam system with multiple question types, real-time progress tracking, and AI-powered feedback.

## Features

- **6 Question Types**: Multiple choice, short answer, long answer, multi-select, true/false, fill-in-the-blanks
- **Progress Tracking**: Fixed progress bar with timer and answered count
- **Bulk Submission**: Collect all answers before grading
- **Rich Feedback**: Per-question feedback with performance indicators
- **Results Screen**: Circular gauge, documents, and study assistant suggestions
- **Mobile Responsive**: Optimized layouts for all screen sizes

## Usage

```tsx
import { MockExam } from '@design-system/components/exam';

function ExamPage() {
  const questions = [
    {
      id: '1',
      type: 'multiple-choice',
      questionNumber: 1,
      marks: 5,
      text: 'What is React?',
      options: ['Library', 'Framework', 'Language', 'Tool'],
      correctAnswer: 0,
    },
    // ... more questions
  ];

  const handleSubmit = async (answers) => {
    // Grade answers and return feedback
    return {
      totalMarks: 20,
      earnedMarks: 18,
      percentage: 90,
      timeElapsed: 1800,
      questionFeedback: {
        '1': {
          questionId: '1',
          isCorrect: true,
          earnedMarks: 5,
          totalMarks: 5,
          percentage: 100,
          explanation: 'Correct! React is a JavaScript library.',
        },
      },
    };
  };

  return (
    <MockExam
      examId="exam-1"
      questions={questions}
      onSubmit={handleSubmit}
    />
  );
}
```

## Components

### MockExam

Main container that orchestrates the entire exam flow.

### ExamProgressBar

Fixed header showing progress, timer, and completion status.

### Question Types

- **ExamMultipleChoice**: Single selection from options
- **ExamShortAnswer**: Single-line text input
- **ExamLongAnswer**: Multi-line textarea with word count
- **ExamMultiSelect**: Multiple selections with checkboxes
- **ExamTrueFalse**: Binary true/false selection
- **ExamFillBlanks**: Fill-in-the-blank with inline inputs

### Feedback Components

- **ExamFeedbackHeader**: Performance indicator with emoji
- **ExamQuestionFeedback**: Detailed explanation with "More feedback" option

### Results Components

- **ExamResults**: Circular gauge with score and actions
- **ExamDocuments**: Recommended study materials
- **ExamStudyAssistant**: AI suggestions for improvement

## AI Integration

The system is designed for easy AI integration:

1. **Question Generation**: `POST /api/exam/generate`
2. **Grading**: `POST /api/exam/submit`
3. **Detailed Feedback**: `GET /api/exam/feedback/:questionId`

See `/exam-demo` for implementation examples.

