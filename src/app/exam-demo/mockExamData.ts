import { Question, ExamFeedback, Answer } from '@/design-system/components/exam/exam.types';

export const mockQuestions: Question[] = [
  {
    id: '1',
    type: 'multiple-choice',
    questionNumber: 1,
    marks: 5,
    text: 'What concept does Bauman use to describe the temporary and loosely bound social groups in liquid modernity?',
    options: [
      'Networked individualism',
      'Mechanical solidarity',
      'Organic solidarity',
      'Swarm theory',
    ],
    correctAnswer: 3,
  },
  {
    id: '2',
    type: 'short-answer',
    questionNumber: 2,
    marks: 3,
    text: 'Define cognitive load theory in one sentence.',
    correctAnswer: 'Cognitive load theory explains how working memory capacity affects learning.',
  },
  {
    id: '3',
    type: 'true-false',
    questionNumber: 3,
    marks: 2,
    text: 'React is a JavaScript framework designed for building mobile applications.',
    correctAnswer: false,
  },
  {
    id: '4',
    type: 'multi-select',
    questionNumber: 4,
    marks: 4,
    text: 'Which of the following are valid React hooks? (Select all that apply)',
    options: ['useState', 'useContext', 'useClass', 'useEffect', 'useComponent', 'useRef'],
    correctAnswer: [0, 1, 3, 5],
  },
  {
    id: '5',
    type: 'long-answer',
    questionNumber: 5,
    marks: 8,
    stem: 'Consider the following scenario: A teacher wants to explain photosynthesis to middle school students.',
    text: 'Explain how you would apply multimedia learning principles to design an effective lesson. Include specific examples of media types and their purposes.',
    correctAnswer: 'A comprehensive answer should mention Mayer\'s principles, dual coding theory, and provide concrete examples of visuals and text integration.',
  },
  {
    id: '6',
    type: 'fill-blanks',
    questionNumber: 6,
    marks: 6,
    text: 'The process of  is essential for converting sunlight into  energy, which plants use for .',
    blanks: [
      { id: 'blank1', correctAnswer: 'photosynthesis', position: 15 },
      { id: 'blank2', correctAnswer: 'chemical', position: 60 },
      { id: 'blank3', correctAnswer: 'growth', position: 95 },
    ],
  },
];

export const mockGradeExam = async (answers: Record<string, Answer>): Promise<ExamFeedback> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const questionFeedback: Record<string, any> = {};
  let totalEarnedMarks = 0;

  mockQuestions.forEach((question) => {
    const answer = answers[question.id];
    let isCorrect = false;
    let earnedMarks = 0;
    let explanation = '';

    if (!answer) {
      isCorrect = false;
      earnedMarks = 0;
      explanation = 'No answer provided.';
    } else {
      switch (question.type) {
        case 'multiple-choice':
          isCorrect = answer.value === question.correctAnswer;
          earnedMarks = isCorrect ? question.marks : 0;
          explanation = isCorrect
            ? 'Excellent! That\'s the correct answer.'
            : `Incorrect. The correct answer was option ${String.fromCharCode(65 + (question.correctAnswer as number))}.`;
          break;

        case 'short-answer':
          const answerText = (answer.value as string).toLowerCase();
          const correctText = (question.correctAnswer as string).toLowerCase();
          isCorrect = answerText.includes('cognitive') && answerText.includes('working memory');
          earnedMarks = isCorrect ? question.marks : Math.floor(question.marks / 2);
          explanation = isCorrect
            ? 'Great! Your answer captures the key concepts.'
            : 'Partial credit. Your answer is on the right track but missing some key elements like working memory capacity.';
          break;

        case 'true-false':
          isCorrect = answer.value === question.correctAnswer;
          earnedMarks = isCorrect ? question.marks : 0;
          explanation = isCorrect
            ? 'Correct!'
            : `Incorrect. The statement is ${question.correctAnswer ? 'true' : 'false'}.`;
          break;

        case 'multi-select':
          const selected = (answer.value as number[]) || [];
          const correct = question.correctAnswer as number[];
          const correctCount = selected.filter((i) => correct.includes(i)).length;
          const incorrectCount = selected.filter((i) => !correct.includes(i)).length;
          isCorrect = correctCount === correct.length && incorrectCount === 0;
          earnedMarks = Math.max(0, Math.floor((correctCount - incorrectCount) * (question.marks / correct.length)));
          explanation = isCorrect
            ? 'Perfect! You selected all the correct options.'
            : `Partial credit. You got ${correctCount} out of ${correct.length} correct.`;
          break;

        case 'long-answer':
          const longAnswer = (answer.value as string).toLowerCase();
          const hasKeyTerms = longAnswer.includes('mayer') || longAnswer.includes('dual coding');
          const hasExamples = longAnswer.length > 100;
          earnedMarks = hasKeyTerms && hasExamples ? question.marks : hasKeyTerms ? Math.floor(question.marks * 0.6) : Math.floor(question.marks * 0.3);
          isCorrect = earnedMarks === question.marks;
          explanation = earnedMarks === question.marks
            ? 'Excellent answer with strong theoretical foundation and practical examples!'
            : 'Good effort, but could be improved with more specific references to learning theories and concrete examples.';
          break;

        case 'fill-blanks':
          const blankAnswers = answer.value as Record<string, string>;
          let correctBlanks = 0;
          question.blanks?.forEach((blank) => {
            if (blankAnswers[blank.id]?.toLowerCase() === blank.correctAnswer.toLowerCase()) {
              correctBlanks++;
            }
          });
          earnedMarks = Math.floor((correctBlanks / (question.blanks?.length || 1)) * question.marks);
          isCorrect = correctBlanks === question.blanks?.length;
          explanation = isCorrect
            ? 'All blanks filled correctly!'
            : `You got ${correctBlanks} out of ${question.blanks?.length} blanks correct.`;
          break;
      }
    }

    totalEarnedMarks += earnedMarks;

    questionFeedback[question.id] = {
      questionId: question.id,
      isCorrect,
      earnedMarks,
      totalMarks: question.marks,
      percentage: (earnedMarks / question.marks) * 100,
      explanation,
    };
  });

  const totalMarks = mockQuestions.reduce((sum, q) => sum + q.marks, 0);
  const timeElapsed = Math.floor(Math.random() * 600) + 300; // Random time between 5-15 minutes

  return {
    totalMarks,
    earnedMarks: totalEarnedMarks,
    percentage: (totalEarnedMarks / totalMarks) * 100,
    timeElapsed,
    questionFeedback,
    recommendedDocs: [
      {
        id: '1',
        title: 'De Moivre\'s theorem and complex roots',
        category: 'Assignments',
        pages: 11,
        rating: 100,
        ratingCount: 3,
        isPremium: true,
        isNew: true,
      },
      {
        id: '2',
        title: 'Exercises and examples of polynoms',
        category: 'Assignments',
        pages: 4,
        rating: 100,
        ratingCount: 3,
        isPremium: true,
        isNew: true,
      },
      {
        id: '3',
        title: 'Introduction to differential equations',
        category: 'Assignments',
        pages: 9,
        rating: 100,
        ratingCount: 3,
        isPremium: true,
        isNew: true,
      },
    ],
    studyAssistantMessage: 'Mock exam complete! Let\'s lock in what you\'ve learned — I can generate targeted questions on the topics you missed. Would you like me to do that?',
  };
};

