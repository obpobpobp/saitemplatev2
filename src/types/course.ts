/**
 * Course POC Type Definitions
 * 
 * Core domain types for the course-first POC prototype.
 * These types define the data structures for courses, documents, creations, and UI state.
 */

/**
 * Document from Studocu library
 */
export interface StudocuDocument {
  id: string;
  name: string;
  downloads: number;
  covers?: string[];      // Topics this doc covers
  enables?: string;       // Feature this doc unlocks (e.g., "Exam Prediction")
  type: 'lecture' | 'textbook' | 'exam' | 'notes' | 'other';
  addedAt?: Date;
}

/**
 * User-uploaded file
 */
export interface UserUpload {
  id: string;
  name: string;
  size: number;           // File size in bytes
  type: string;           // MIME type or file extension
  uploadedAt: Date;
}

/**
 * Course container - the main entity
 */
export interface Course {
  id: string;
  name: string;
  code?: string;           // Course code (e.g., "Bio141-2273")
  university?: string;
  examDate?: Date;
  libraryDocs: StudocuDocument[];
  userUploads: UserUpload[];
  createdAt: Date;
}

/**
 * Quiz question structure
 */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  topic: string;
  explanation?: string;
  userAnswer?: number;
}

/**
 * Quiz data structure
 */
export interface QuizData {
  questions: QuizQuestion[];
  score?: number;
  completedAt?: Date;
  weakTopics?: string[];
}

/**
 * Summary data structure
 */
export interface SummaryData {
  content: string;        // Markdown content
  wordCount: number;
  chapters: string[];
}

/**
 * Gap analysis data structure
 */
export interface GapData {
  coveredTopics: { topic: string; strength: 'strong' | 'medium' | 'weak' }[];
  missingTopics: string[];
  recommendations: { doc: string; covers: string[] }[];
}

/**
 * Extended creation types - adds mock-exam and flashcards
 * BACKWARD COMPATIBLE: Includes all existing types
 */
export type CreationType = 
  | 'quiz'           // ✅ Existing
  | 'summary'        // ✅ Existing
  | 'gap-analysis'   // ✅ Existing
  | 'mock-exam'      // 🆕 New
  | 'flashcards';    // 🆕 New

/**
 * Creation - any AI-generated artifact
 */
export interface Creation {
  id: string;
  type: CreationType;  // Updated to use extended type
  title: string;
  createdAt: Date;
  data: QuizData | SummaryData | GapData;
  examId?: string; // Optional link to an exam
}

/**
 * Smart suggestion for what can be created
 */
export interface SmartSuggestion {
  type: 'quiz' | 'summary' | 'gap-analysis';
  title: string;
  description: string;
  metrics: string;        // e.g., "47 questions available"
  topics?: string[];
  available: boolean;
  unlockCondition?: string;
  isPrimary?: boolean;    // Visual hierarchy marker (Von Restorff effect)
}

/**
 * Canvas content types - what's displayed in the main content area
 */
export type CanvasContent = 
  | { type: 'suggestions' }
  | { type: 'source'; source: StudocuDocument | UserUpload }
  | { type: 'creation'; creation: Creation }
  | { type: 'quiz-active'; quiz: QuizData }
  | { type: 'loading'; message: string };

/**
 * Onboarding data stored during course setup flow
 */
export interface OnboardingData {
  courseName: string;
  university?: string;
  selectedDocs: StudocuDocument[];
  userUploads: { name: string; size: number; type: string }[];
  examDate?: string;
}

// ============================================
// NEW: UNIFIED SOURCE TYPE (Study Panels)
// ============================================

/**
 * Unified Source - combines StudocuDocument and UserUpload into single type
 * 
 * Represents any study material in the course, regardless of origin.
 * Uses `addedAt` for timeline-based organization.
 */
export interface Source {
  id: string;
  name: string;
  addedAt: Date;              // Drives timeline grouping
  origin: 'upload' | 'studocu';
  
  // Studocu-specific fields (optional for uploads)
  studocuId?: string;
  downloads?: number;
  type?: 'lecture' | 'textbook' | 'exam' | 'notes' | 'other';
  covers?: string[];
  enables?: string;
  
  // Upload-specific fields (optional for studocu)
  fileSize?: number;          // bytes
  fileType?: 'pdf' | 'doc' | 'image' | 'txt' | 'other';
  
  // Shared metadata
  questionCount: number;      // AI-estimated questions
  wordCount?: number;
  topics?: string[];
  isExam?: boolean;           // Past exam - unlocks prediction
  isPinned?: boolean;         // Future: pinned references
}

/**
 * Source recommendation (ghost card)
 */
export interface SourceRecommendation {
  id: string;
  name: string;
  downloads: number;
  unlocks?: string;           // "exam prediction", "12 more questions"
  topics?: string[];
}

// ============================================
// NEW: EXAM TYPE (Creation Organization)
// ============================================

/**
 * Exam entity for organizing creations by milestone
 */
export interface Exam {
  id: string;
  name: string;               // "Final Exam", "Midterm II"
  date?: Date;                // Optional - some students don't know
  isCompleted: boolean;       // Past date or manually marked
  weight?: number;            // e.g., 40 (percent of grade)
  createdAt: Date;
}

// ============================================
// EXTENDED: CREATION STATUS
// ============================================

/**
 * Creation status for progress tracking
 */
export type CreationStatus = 'not-started' | 'in-progress' | 'completed';

/**
 * View mode for Creations panel
 */
export type CreationsViewMode = 'recent' | 'exam' | 'type';

// ============================================
// EXTENDED: COURSE INTERFACE
// ============================================

/**
 * Extended Course interface with optional new fields
 * BACKWARD COMPATIBLE: All new fields are optional
 */
export interface CourseExtended extends Course {
  sources?: Source[];                 // 🆕 Unified source list
  exams?: Exam[];                     // 🆕 Exam organization
  creationsViewMode?: CreationsViewMode;  // 🆕 View preference
}

// ============================================
// TYPE CONVERSION HELPERS
// ============================================

/**
 * Convert StudocuDocument to unified Source format
 */
export function studocuToSource(doc: StudocuDocument): Source {
  return {
    id: doc.id,
    name: doc.name,
    addedAt: doc.addedAt || new Date(),
    origin: 'studocu',
    studocuId: doc.id,
    downloads: doc.downloads,
    type: doc.type,
    covers: doc.covers,
    enables: doc.enables,
    questionCount: estimateQuestionsFromDoc(doc),
    topics: doc.covers,
    isExam: doc.type === 'exam',
  };
}

/**
 * Convert UserUpload to unified Source format
 */
export function uploadToSource(upload: UserUpload): Source {
  return {
    id: upload.id,
    name: upload.name,
    addedAt: upload.uploadedAt,
    origin: 'upload',
    fileSize: upload.size,
    fileType: inferFileType(upload.type),
    questionCount: 12, // Default estimate: ~12 questions per document
  };
}

/**
 * Convert Source back to StudocuDocument (if applicable)
 */
export function sourceToStudocu(source: Source): StudocuDocument | null {
  if (source.origin !== 'studocu') return null;
  
  return {
    id: source.studocuId || source.id,
    name: source.name,
    downloads: source.downloads || 0,
    covers: source.covers,
    enables: source.enables,
    type: source.type || 'other',
    addedAt: source.addedAt,
  };
}

/**
 * Convert Source back to UserUpload (if applicable)
 */
export function sourceToUpload(source: Source): UserUpload | null {
  if (source.origin !== 'upload') return null;
  
  return {
    id: source.id,
    name: source.name,
    size: source.fileSize || 0,
    type: source.fileType || 'other',
    uploadedAt: source.addedAt,
  };
}

/**
 * Get unified source list from Course (auto-converts if needed)
 * 
 * @param course - Course object (standard or extended)
 * @returns Array of unified Source objects
 */
export function getCourseSources(course: Course | CourseExtended): Source[] {
  const extended = course as CourseExtended;
  
  // If course already has sources array, use it
  if (extended.sources && extended.sources.length > 0) {
    return extended.sources;
  }
  
  // Otherwise, convert from old format
  const studocuSources = course.libraryDocs.map(studocuToSource);
  const uploadSources = course.userUploads.map(uploadToSource);
  
  // Combine and sort by addedAt descending (newest first)
  return [...studocuSources, ...uploadSources].sort(
    (a, b) => b.addedAt.getTime() - a.addedAt.getTime()
  );
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Estimate questions from document metadata
 */
function estimateQuestionsFromDoc(doc: StudocuDocument): number {
  if (doc.type === 'exam') return 15; // Typical exam has ~15 questions
  if (doc.type === 'textbook') return 20; // Textbook chapters have more content
  if (doc.type === 'lecture') return 10; // Lecture notes have moderate content
  return 12; // Default estimate
}

/**
 * Infer file type from MIME type or extension
 */
function inferFileType(type: string): 'pdf' | 'doc' | 'image' | 'txt' | 'other' {
  const lower = type.toLowerCase();
  if (lower.includes('pdf')) return 'pdf';
  if (lower.includes('doc') || lower.includes('word')) return 'doc';
  if (lower.includes('image') || lower.includes('png') || lower.includes('jpg') || lower.includes('jpeg')) return 'image';
  if (lower.includes('text') || lower.includes('txt')) return 'txt';
  return 'other';
}
