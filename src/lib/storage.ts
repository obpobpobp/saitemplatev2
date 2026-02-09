/**
 * Storage Utilities
 * 
 * localStorage helpers for persisting course data, creations, and onboarding state.
 * All data is stored client-side for this POC prototype.
 */

import type { Course, Creation, OnboardingData } from '@/types/course';

/**
 * Storage keys used throughout the application
 */
export const STORAGE_KEYS = {
  ONBOARDING: 'studocu-poc-onboarding',
  COURSE_PREFIX: 'studocu-poc-course-',
  CREATIONS_PREFIX: 'studocu-poc-creations-',
} as const;

/**
 * Safely parse JSON from localStorage
 */
function safeJSONParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('Failed to parse JSON from localStorage:', error);
    return fallback;
  }
}

/**
 * Safely stringify and store to localStorage
 */
function safeJSONStringify(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
// ONBOARDING DATA
// ============================================================================

/**
 * Save onboarding data during course setup flow
 */
export function saveOnboarding(data: OnboardingData): boolean {
  return safeJSONStringify(STORAGE_KEYS.ONBOARDING, data);
}

/**
 * Get onboarding data
 */
export function getOnboarding(): OnboardingData | null {
  const data = localStorage.getItem(STORAGE_KEYS.ONBOARDING);
  if (!data) return null;
  
  return safeJSONParse<OnboardingData | null>(data, null);
}

/**
 * Clear onboarding data after course is created
 */
export function clearOnboarding(): void {
  localStorage.removeItem(STORAGE_KEYS.ONBOARDING);
}

// ============================================================================
// COURSE DATA
// ============================================================================

/**
 * Generate a URL-safe course ID from course name
 */
export function generateCourseId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with dash
    .replace(/^-+|-+$/g, '');     // Remove leading/trailing dashes
}

/**
 * Save course data to localStorage
 */
export function saveCourse(course: Course): boolean {
  const key = `${STORAGE_KEYS.COURSE_PREFIX}${course.id}`;
  return safeJSONStringify(key, course);
}

/**
 * Get course data by ID
 */
export function getCourse(id: string): Course | null {
  const key = `${STORAGE_KEYS.COURSE_PREFIX}${id}`;
  const data = localStorage.getItem(key);
  
  if (!data) return null;
  
  const course = safeJSONParse<Course | null>(data, null);
  
  // Convert date strings back to Date objects
  if (course) {
    if (course.createdAt) {
      course.createdAt = new Date(course.createdAt);
    }
    if (course.examDate) {
      course.examDate = new Date(course.examDate);
    }
    course.libraryDocs = course.libraryDocs.map((doc) => ({
      ...doc,
      addedAt: doc.addedAt ? new Date(doc.addedAt) : undefined,
    }));
    course.userUploads = course.userUploads.map((upload) => ({
      ...upload,
      uploadedAt: new Date(upload.uploadedAt),
    }));
  }
  
  return course;
}

/**
 * Get all course IDs stored in localStorage
 */
export function getAllCourseIds(): string[] {
  const ids: string[] = [];
  const prefix = STORAGE_KEYS.COURSE_PREFIX;
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      ids.push(key.slice(prefix.length));
    }
  }
  
  return ids;
}

/**
 * Delete a course from localStorage
 */
export function deleteCourse(id: string): void {
  const courseKey = `${STORAGE_KEYS.COURSE_PREFIX}${id}`;
  const creationsKey = `${STORAGE_KEYS.CREATIONS_PREFIX}${id}`;
  
  localStorage.removeItem(courseKey);
  localStorage.removeItem(creationsKey);
}

// ============================================================================
// CREATIONS DATA
// ============================================================================

/**
 * Save creations for a course
 */
export function saveCreations(courseId: string, creations: Creation[]): boolean {
  const key = `${STORAGE_KEYS.CREATIONS_PREFIX}${courseId}`;
  return safeJSONStringify(key, creations);
}

/**
 * Get creations for a course
 */
export function getCreations(courseId: string): Creation[] {
  const key = `${STORAGE_KEYS.CREATIONS_PREFIX}${courseId}`;
  const data = localStorage.getItem(key);
  
  if (!data) return [];
  
  const creations = safeJSONParse<Creation[]>(data, []);
  
  // Convert date strings back to Date objects
  return creations.map((creation) => ({
    ...creation,
    createdAt: new Date(creation.createdAt),
  }));
}

/**
 * Add a new creation to a course
 */
export function addCreation(courseId: string, creation: Creation): boolean {
  const existing = getCreations(courseId);
  const updated = [...existing, creation];
  return saveCreations(courseId, updated);
}

/**
 * Update an existing creation
 */
export function updateCreation(courseId: string, creationId: string, updates: Partial<Creation>): boolean {
  const existing = getCreations(courseId);
  const updated = existing.map((c) =>
    c.id === creationId ? { ...c, ...updates } : c
  );
  return saveCreations(courseId, updated);
}

/**
 * Delete a creation
 */
export function deleteCreation(courseId: string, creationId: string): boolean {
  const existing = getCreations(courseId);
  const updated = existing.filter((c) => c.id !== creationId);
  return saveCreations(courseId, updated);
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Check if localStorage is available and has space
 */
export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get estimated localStorage usage
 */
export function getStorageUsage(): { used: number; total: number } {
  let used = 0;
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key);
      used += key.length + (value?.length || 0);
    }
  }
  
  // Most browsers limit localStorage to 5-10MB
  const total = 5 * 1024 * 1024; // Assume 5MB
  
  return { used, total };
}

/**
 * Clear all POC-related data from localStorage
 */
export function clearAllPOCData(): void {
  const keysToRemove: string[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (
      key.startsWith(STORAGE_KEYS.COURSE_PREFIX) ||
      key.startsWith(STORAGE_KEYS.CREATIONS_PREFIX) ||
      key === STORAGE_KEYS.ONBOARDING
    )) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}
