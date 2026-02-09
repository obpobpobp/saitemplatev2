/**
 * Course Context
 * 
 * Global state management for the active course.
 * Provides course data, creations, and UI state for the workspace.
 */

'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { 
  Course, 
  Creation, 
  StudocuDocument, 
  UserUpload, 
  CanvasContent,
  Source,
  Exam,
  CreationsViewMode,
  CourseExtended,
} from '@/types/course';
import { 
  getCourse, 
  saveCourse, 
  getCreations, 
  addCreation as addCreationToStorage 
} from '@/lib/storage';
import { 
  getCourseSources,
  studocuToSource,
  uploadToSource,
  sourceToStudocu,
  sourceToUpload,
} from '@/types/course';

interface CourseContextType {
  // Course data (EXISTING - unchanged)
  course: Course | null;
  isLoading: boolean;
  error: string | null;
  
  // Creations (EXISTING - unchanged)
  creations: Creation[];
  
  // UI state (EXISTING - unchanged)
  canvasContent: CanvasContent;
  setCanvasContent: (content: CanvasContent) => void;
  
  // Computed values (EXISTING - unchanged)
  totalSources: number;
  possibleQuestions: number;
  possibleWords: number;
  topics: string[];
  
  // Actions (EXISTING - unchanged)
  addLibraryDoc: (doc: StudocuDocument) => void;
  removeLibraryDoc: (docId: string) => void;
  addUserUpload: (upload: UserUpload) => void;
  removeUserUpload: (uploadId: string) => void;
  addCreation: (creation: Creation) => void;
  updateCourse: (updates: Partial<Course>) => void;
  
  // NEW: Unified source management (optional, backward compatible)
  allSources?: Source[];
  addSource?: (source: Omit<Source, 'id' | 'addedAt'>) => void;
  removeSource?: (sourceId: string) => void;
  
  // NEW: Exam management (optional)
  exams?: Exam[];
  addExam?: (exam: Omit<Exam, 'id' | 'createdAt'>) => void;
  updateExam?: (id: string, updates: Partial<Exam>) => void;
  removeExam?: (examId: string) => void;
  
  // NEW: Enhanced creation management (optional)
  updateCreation?: (id: string, updates: Partial<Creation>) => void;
  removeCreation?: (creationId: string) => void;
  
  // NEW: Preferences (optional)
  setCreationsViewMode?: (mode: CreationsViewMode) => void;
  
  // NEW: Computed values (optional)
  totalStorageUsed?: number;
}

const CourseContext = createContext<CourseContextType | null>(null);

interface CourseProviderProps {
  children: ReactNode;
  courseId: string;
}

export function CourseProvider({ children, courseId }: CourseProviderProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [creations, setCreations] = useState<Creation[]>([]);
  const [canvasContent, setCanvasContent] = useState<CanvasContent>({ type: 'suggestions' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load course data on mount
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      const loadedCourse = getCourse(courseId);
      if (!loadedCourse) {
        setError('Course not found');
        setCourse(null);
      } else {
        setCourse(loadedCourse);
      }
      
      const loadedCreations = getCreations(courseId);
      setCreations(loadedCreations);
    } catch (err) {
      console.error('Error loading course:', err);
      setError('Failed to load course');
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);
  
  // Persist course changes
  const persistCourse = useCallback((updatedCourse: Course) => {
    try {
      saveCourse(updatedCourse);
      setCourse(updatedCourse);
    } catch (err) {
      console.error('Error saving course:', err);
    }
  }, []);
  
  // Computed values
  const totalSources = (course?.libraryDocs.length || 0) + (course?.userUploads.length || 0);
  const possibleQuestions = totalSources * 12; // ~12 questions per source
  const possibleWords = totalSources * 600;    // ~600 words per source
  
  const topics = course?.libraryDocs.reduce((acc, doc) => {
    if (doc.covers) {
      doc.covers.forEach(topic => {
        if (!acc.includes(topic)) {
          acc.push(topic);
        }
      });
    }
    return acc;
  }, [] as string[]) || [];
  
  // Actions
  const addLibraryDoc = useCallback((doc: StudocuDocument) => {
    if (!course) return;
    
    const updated: Course = {
      ...course,
      libraryDocs: [...course.libraryDocs, { ...doc, addedAt: new Date() }],
    };
    persistCourse(updated);
  }, [course, persistCourse]);
  
  const removeLibraryDoc = useCallback((docId: string) => {
    if (!course) return;
    
    const updated: Course = {
      ...course,
      libraryDocs: course.libraryDocs.filter(doc => doc.id !== docId),
    };
    persistCourse(updated);
  }, [course, persistCourse]);
  
  const addUserUpload = useCallback((upload: UserUpload) => {
    if (!course) return;
    
    const updated: Course = {
      ...course,
      userUploads: [...course.userUploads, upload],
    };
    persistCourse(updated);
  }, [course, persistCourse]);
  
  const removeUserUpload = useCallback((uploadId: string) => {
    if (!course) return;
    
    const updated: Course = {
      ...course,
      userUploads: course.userUploads.filter(upload => upload.id !== uploadId),
    };
    persistCourse(updated);
  }, [course, persistCourse]);
  
  const addCreation = useCallback((creation: Creation) => {
    if (!course) return;
    
    try {
      addCreationToStorage(course.id, creation);
      setCreations(prev => [...prev, creation]);
    } catch (err) {
      console.error('Error adding creation:', err);
    }
  }, [course]);
  
  const updateCourse = useCallback((updates: Partial<Course>) => {
    if (!course) return;
    
    const updated: Course = {
      ...course,
      ...updates,
    };
    persistCourse(updated);
  }, [course, persistCourse]);
  
  // ===== NEW: Unified sources =====
  const allSources = course ? getCourseSources(course) : [];
  
  const addSource = useCallback((source: Omit<Source, 'id' | 'addedAt'>) => {
    if (!course) return;
    
    // Generate ID and add timestamp
    const id = `source-${Date.now()}`;
    const fullSource: Source = {
      ...source,
      id,
      addedAt: new Date(),
    };
    
    // Delegate to existing methods based on origin
    if (source.origin === 'studocu') {
      const doc = sourceToStudocu(fullSource);
      if (doc) addLibraryDoc(doc);
    } else {
      const upload = sourceToUpload(fullSource);
      if (upload) addUserUpload(upload);
    }
  }, [course, addLibraryDoc, addUserUpload]);
  
  const removeSource = useCallback((sourceId: string) => {
    if (!course) return;
    
    // Try to find in libraryDocs first
    const inLibrary = course.libraryDocs.find(d => d.id === sourceId);
    if (inLibrary) {
      removeLibraryDoc(sourceId);
      return;
    }
    
    // Try userUploads
    const inUploads = course.userUploads.find(u => u.id === sourceId);
    if (inUploads) {
      removeUserUpload(sourceId);
    }
  }, [course, removeLibraryDoc, removeUserUpload]);
  
  // ===== NEW: Exam management =====
  const exams: Exam[] = (course as CourseExtended)?.exams || [];
  
  const addExam = useCallback((exam: Omit<Exam, 'id' | 'createdAt'>) => {
    if (!course) return;
    
    const newExam: Exam = {
      ...exam,
      id: `exam-${Date.now()}`,
      createdAt: new Date(),
    };
    
    const extended = course as CourseExtended;
    const updated: CourseExtended = {
      ...extended,
      exams: [...(extended.exams || []), newExam],
    };
    persistCourse(updated as Course);
  }, [course, persistCourse]);
  
  const updateExam = useCallback((id: string, updates: Partial<Exam>) => {
    if (!course) return;
    
    const extended = course as CourseExtended;
    const exams = extended.exams || [];
    const updated: CourseExtended = {
      ...extended,
      exams: exams.map(e => e.id === id ? { ...e, ...updates } : e),
    };
    persistCourse(updated as Course);
  }, [course, persistCourse]);
  
  const removeExam = useCallback((examId: string) => {
    if (!course) return;
    
    const extended = course as CourseExtended;
    const updated: CourseExtended = {
      ...extended,
      exams: (extended.exams || []).filter(e => e.id !== examId),
    };
    persistCourse(updated as Course);
  }, [course, persistCourse]);
  
  // ===== NEW: Enhanced creation management =====
  const updateCreation = useCallback((id: string, updates: Partial<Creation>) => {
    if (!course) return;
    
    setCreations(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    // TODO: Persist to storage if needed
  }, [course]);
  
  const removeCreation = useCallback((creationId: string) => {
    if (!course) return;
    
    setCreations(prev => prev.filter(c => c.id !== creationId));
    // TODO: Remove from storage if needed
  }, [course]);
  
  // ===== NEW: Preferences =====
  const setCreationsViewMode = useCallback((mode: CreationsViewMode) => {
    if (!course) return;
    
    const extended = course as CourseExtended;
    const updated: CourseExtended = {
      ...extended,
      creationsViewMode: mode,
    };
    persistCourse(updated as Course);
  }, [course, persistCourse]);
  
  // ===== NEW: Computed values =====
  const totalStorageUsed = allSources.reduce((sum, s) => sum + (s.fileSize || 0), 0) / (1024 * 1024); // MB
  
  const value: CourseContextType = {
    // Existing values
    course,
    isLoading,
    error,
    creations,
    canvasContent,
    setCanvasContent,
    totalSources,
    possibleQuestions,
    possibleWords,
    topics,
    addLibraryDoc,
    removeLibraryDoc,
    addUserUpload,
    removeUserUpload,
    addCreation,
    updateCourse,
    
    // NEW values (optional, backward compatible)
    allSources,
    addSource,
    removeSource,
    exams,
    addExam,
    updateExam,
    removeExam,
    updateCreation,
    removeCreation,
    setCreationsViewMode,
    totalStorageUsed,
  };
  
  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}

/**
 * Hook to access course context
 */
export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within CourseProvider');
  }
  return context;
}
