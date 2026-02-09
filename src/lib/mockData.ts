/**
 * Mock Data for Studocu Library
 * 
 * Simulates the Studocu document library for testing the course-first POC.
 * In production, this would be replaced with actual API calls to Studocu.
 */

import type { StudocuDocument } from '@/types/course';

/**
 * Mock Studocu library organized by course
 */
const mockStudocuLibrary: Record<string, StudocuDocument[]> = {
  pharmacology: [
    {
      id: 'sd-1',
      name: 'Nursing Drug Handbook Ch 1-5',
      downloads: 2341,
      covers: ['Drug Interactions', 'Dosing'],
      type: 'textbook',
    },
    {
      id: 'sd-2',
      name: 'Lecture Notes Week 1-8',
      downloads: 1892,
      covers: ['All core topics'],
      type: 'lecture',
    },
    {
      id: 'sd-3',
      name: 'Midterm 2024 with Solutions',
      downloads: 956,
      enables: 'Exam Prediction',
      type: 'exam',
    },
    {
      id: 'sd-4',
      name: 'Final Exam Study Guide',
      downloads: 723,
      covers: ['Comprehensive review'],
      type: 'notes',
    },
    {
      id: 'sd-5',
      name: 'Pharmacokinetics Summary',
      downloads: 612,
      covers: ['ADME', 'Half-life'],
      type: 'notes',
    },
    {
      id: 'sd-6',
      name: 'Drug Classification Chart',
      downloads: 589,
      covers: ['Drug classes'],
      type: 'notes',
    },
    {
      id: 'sd-7',
      name: 'Practice Problems Set 1',
      downloads: 445,
      covers: ['Calculations'],
      type: 'notes',
    },
    {
      id: 'sd-8',
      name: 'Clinical Cases Week 1-4',
      downloads: 334,
      covers: ['Application'],
      type: 'lecture',
    },
  ],
  psychology: [
    {
      id: 'sd-p1',
      name: 'Intro to Psychology Textbook Notes',
      downloads: 1543,
      covers: ['Foundations'],
      type: 'textbook',
    },
    {
      id: 'sd-p2',
      name: 'Cognitive Psychology Lectures',
      downloads: 1287,
      covers: ['Cognition', 'Memory'],
      type: 'lecture',
    },
    {
      id: 'sd-p3',
      name: 'Research Methods Study Guide',
      downloads: 892,
      covers: ['Research Methods', 'Statistics'],
      type: 'notes',
    },
    {
      id: 'sd-p4',
      name: 'Developmental Psychology Summary',
      downloads: 654,
      covers: ['Development'],
      type: 'notes',
    },
    {
      id: 'sd-p5',
      name: 'Final Exam Practice Questions',
      downloads: 521,
      enables: 'Exam Prediction',
      type: 'exam',
    },
  ],
  anatomy: [
    {
      id: 'sd-a1',
      name: 'Human Anatomy Atlas',
      downloads: 2145,
      covers: ['Body Systems', 'Organ Structure'],
      type: 'textbook',
    },
    {
      id: 'sd-a2',
      name: 'Skeletal System Notes',
      downloads: 1678,
      covers: ['Bones', 'Joints'],
      type: 'notes',
    },
    {
      id: 'sd-a3',
      name: 'Muscular System Lecture Slides',
      downloads: 1234,
      covers: ['Muscles', 'Movement'],
      type: 'lecture',
    },
    {
      id: 'sd-a4',
      name: 'Cardiovascular System Summary',
      downloads: 998,
      covers: ['Heart', 'Blood Vessels'],
      type: 'notes',
    },
  ],
};

/**
 * Course-specific topics for gap analysis
 */
const courseTopics: Record<string, string[]> = {
  pharmacology: [
    'Drug Interactions',
    'Pharmacokinetics',
    'Dosing',
    'Side Effects',
    'Drug Classes',
    'ADME',
    'Half-life',
    'Pharmacodynamics',
    'Clinical Applications',
  ],
  psychology: [
    'Cognition',
    'Development',
    'Social Psychology',
    'Abnormal Psychology',
    'Research Methods',
    'Memory',
    'Learning',
    'Personality',
  ],
  anatomy: [
    'Skeletal System',
    'Muscular System',
    'Cardiovascular System',
    'Respiratory System',
    'Nervous System',
    'Digestive System',
  ],
};

/**
 * Search the Studocu library for documents matching a query
 * 
 * @param query - Search query (course name)
 * @returns Array of matching documents
 */
export function searchLibrary(query: string): StudocuDocument[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  // Normalize query: lowercase, remove non-alphanumeric
  const normalized = query.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Try exact match first
  if (mockStudocuLibrary[normalized]) {
    return [...mockStudocuLibrary[normalized]];
  }

  // Try partial match
  for (const [key, docs] of Object.entries(mockStudocuLibrary)) {
    if (key.includes(normalized) || normalized.includes(key)) {
      return [...docs];
    }
  }

  // No matches found
  return [];
}

/**
 * Get recommended documents not yet added to the course
 * 
 * @param currentIds - IDs of documents already in the course
 * @param courseName - Course name for finding relevant docs
 * @returns Array of recommended documents (max 3)
 */
export function getRecommendedDocs(
  currentIds: string[],
  courseName: string
): StudocuDocument[] {
  const allDocs = searchLibrary(courseName);

  // Filter out already-added docs
  const available = allDocs.filter((doc) => !currentIds.includes(doc.id));

  // Return top 3 by downloads
  return available
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 3);
}

/**
 * Get topics for a specific course
 * 
 * @param courseName - Course name
 * @returns Array of expected topics for the course
 */
export function getCourseTopics(courseName: string): string[] {
  const normalized = courseName.toLowerCase().replace(/[^a-z0-9]/g, '');

  for (const [key, topics] of Object.entries(courseTopics)) {
    if (key.includes(normalized) || normalized.includes(key)) {
      return [...topics];
    }
  }

  // Default topics if course not found
  return ['Core Concepts', 'Applications', 'Theory', 'Practice'];
}

/**
 * Get all covered topics from documents
 * 
 * @param docs - Array of documents
 * @returns Flattened array of unique topics
 */
export function getCoveredTopics(docs: StudocuDocument[]): string[] {
  const topics = new Set<string>();

  docs.forEach((doc) => {
    if (doc.covers) {
      doc.covers.forEach((topic) => topics.add(topic));
    }
  });

  return Array.from(topics);
}

// ============================================
// NEW: MOCK DATA FOR STUDY PANELS
// ============================================

import type { Exam, Source } from '@/types/course';

/**
 * Mock Exams for organizing creations
 */
export const mockExams: Exam[] = [
  {
    id: 'exam-midterm1',
    name: 'Midterm I',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    weight: 35,
    isCompleted: false,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Created 30 days ago
  },
  {
    id: 'exam-midterm2',
    name: 'Midterm II',
    date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    weight: 35,
    isCompleted: false,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // Created 25 days ago
  },
  {
    id: 'exam-final',
    name: 'Final Exam',
    date: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000), // 75 days from now
    weight: 30,
    isCompleted: false,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // Created 20 days ago
  },
];

/**
 * Mock Sources (unified timeline)
 */
export const mockSources: Source[] = [
  {
    id: 'source-1',
    name: 'Lecture 5 Notes.pdf',
    addedAt: new Date(),
    origin: 'upload',
    fileSize: 2.4 * 1024 * 1024,
    fileType: 'pdf',
    questionCount: 12,
  },
  {
    id: 'source-2',
    name: 'Midterm 2024 Solutions',
    addedAt: new Date(),
    origin: 'studocu',
    studocuId: 'studocu-123',
    downloads: 956,
    questionCount: 15,
    isExam: true,
    type: 'exam',
  },
  {
    id: 'source-3',
    name: 'Nursing Drug Handbook',
    addedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    origin: 'studocu',
    studocuId: 'studocu-456',
    downloads: 2341,
    questionCount: 0,
    type: 'textbook',
  },
  {
    id: 'source-4',
    name: 'Lecture 4 Notes.pdf',
    addedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    origin: 'upload',
    fileSize: 1.8 * 1024 * 1024,
    fileType: 'pdf',
    questionCount: 8,
  },
];

import type { Creation, QuizData, SummaryData } from '@/types/course';

/**
 * Mock Creations with extended fields for new types
 * 
 * Uses existing Creation interface but adds extra metadata as dynamic properties.
 * The `data` property conforms to QuizData | SummaryData | GapData as required.
 */
export const mockCreationsExtended: Creation[] = [
  {
    id: 'creation-1',
    type: 'mock-exam' as const,
    title: 'Midterm I Practice Exam',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    data: {
      questions: [],
      score: undefined,
    } as QuizData,
    examId: 'exam-midterm1', // Linked to Midterm I
    status: 'not-started',
    questionCount: 15,
    sourceIds: ['source-1', 'source-2'],
  } as Creation & { examId?: string; status?: string; questionCount?: number; sourceIds?: string[] },
  {
    id: 'creation-2',
    type: 'flashcards' as const,
    title: 'Midterm I Flashcards',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    data: {
      questions: [],
    } as QuizData,
    examId: 'exam-midterm1', // Linked to Midterm I
    status: 'in-progress',
    cardCount: 48,
    masteredCount: 12,
    sourceIds: ['source-1'],
  } as Creation & { examId?: string; status?: string; cardCount?: number; masteredCount?: number; sourceIds?: string[] },
  {
    id: 'creation-3',
    type: 'mock-exam' as const,
    title: 'Final Exam Practice #1',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    data: {
      questions: [],
      score: 82,
    } as QuizData,
    examId: 'exam-final', // Linked to Final Exam
    status: 'completed',
    questionCount: 15,
    bestScore: 82,
    attempts: 2,
    sourceIds: ['source-1', 'source-2'],
  } as Creation & { examId?: string; status?: string; questionCount?: number; bestScore?: number; attempts?: number; sourceIds?: string[] },
  {
    id: 'creation-4',
    type: 'mock-exam' as const,
    title: 'Midterm Practice',
    createdAt: new Date('2024-11-08'),
    data: {
      questions: [],
      score: 85,
    } as QuizData,
    examId: 'exam-midterm2',
    status: 'completed',
    questionCount: 12,
    bestScore: 85,
    attempts: 1,
    sourceIds: ['source-3'],
  } as Creation & { examId?: string; status?: string; questionCount?: number; bestScore?: number; attempts?: number; sourceIds?: string[] },
  {
    id: 'creation-5',
    type: 'summary' as const,
    title: 'Running Notes',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    data: {
      content: 'Sample summary content',
      wordCount: 1240,
      chapters: [],
    } as SummaryData,
    examId: undefined, // Unlinked
    status: 'in-progress',
    wordCount: 1240,
    sourceIds: [],
  } as Creation & { examId?: string; status?: string; wordCount?: number; sourceIds?: string[] },
];
