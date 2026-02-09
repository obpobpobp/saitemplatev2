/**
 * Exam Helper Utilities
 * 
 * Utilities for exam management including smart naming suggestions.
 */

import type { Exam } from '@/types/course';

/**
 * Suggest a smart exam name based on existing exams
 * 
 * Logic:
 * - If no exams: "Midterm I"
 * - If Midterm I exists: "Midterm II"
 * - If Midterm II exists: "Final Exam"
 * - Otherwise: "Quiz 1", "Quiz 2", etc.
 * 
 * @param existingExams - Array of existing exams
 * @returns Suggested exam name
 */
export function suggestExamName(existingExams: Exam[]): string {
  const names = existingExams.map(e => e.name.toLowerCase());
  
  // No exams yet - suggest Midterm I
  if (names.length === 0) {
    return 'Midterm I';
  }
  
  // Check for midterms
  if (!names.some(n => n.includes('midterm'))) {
    return 'Midterm I';
  }
  
  // Count midterms
  const midtermCount = names.filter(n => n.includes('midterm')).length;
  const nextMidterm = midtermCount + 1;
  
  // Suggest next midterm
  if (nextMidterm === 2 && !names.some(n => n.includes('midterm ii') || n.includes('midterm 2'))) {
    return 'Midterm II';
  }
  
  // Check for final
  if (!names.some(n => n.includes('final'))) {
    return 'Final Exam';
  }
  
  // Default to Quiz numbering
  const quizCount = names.filter(n => n.includes('quiz')).length;
  return `Quiz ${quizCount + 1}`;
}

/**
 * Calculate days until exam
 * 
 * @param examDate - Date of the exam
 * @returns Number of days until exam (negative if past)
 */
export function getDaysUntilExam(examDate: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const exam = new Date(examDate);
  exam.setHours(0, 0, 0, 0);
  
  const diffTime = exam.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Format exam date display
 * 
 * @param examDate - Date of the exam
 * @returns Formatted date string
 */
export function formatExamDate(examDate: Date): string {
  return new Date(examDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get the nearest upcoming exam from a list
 * 
 * @param exams - Array of exams
 * @returns Nearest upcoming exam or undefined
 */
export function getNearestExam(exams: Exam[]): Exam | undefined {
  const now = new Date();
  
  const upcomingExams = exams
    .filter(e => !e.isCompleted && e.date && new Date(e.date) > now)
    .sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  
  return upcomingExams[0];
}
