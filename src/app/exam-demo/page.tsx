'use client';

import React from 'react';
import { MockExam } from '@/design-system/components/exam';
import { mockQuestions, mockGradeExam } from './mockExamData';

export default function ExamDemoPage() {
  return (
    <MockExam
      examId="demo-exam-1"
      questions={mockQuestions}
      onSubmit={mockGradeExam}
      onMoreFeedback={async (questionId) => {
        // Simulate AI detailed feedback
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return `Detailed AI-generated feedback for question ${questionId} would appear here with more specific guidance and learning resources.`;
      }}
    />
  );
}

