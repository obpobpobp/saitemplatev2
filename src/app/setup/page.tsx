/**
 * Setup Page
 * 
 * Optional step for adding user's own documents and setting exam date.
 * Can be skipped to go directly to the course workspace.
 */

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/design-system/components/layout/Header';
import { Logo } from '@/design-system/components/branding/Logo';
import { Button } from '@/design-system/components/buttons/Button';
import { FileUploadArea } from '@/design-system/components/onboarding/FileUploadArea';
import { ExamDatePicker } from '@/components/ExamDatePicker';
import { getOnboarding, clearOnboarding, saveCourse, generateCourseId } from '@/lib/storage';
import type { Course } from '@/types/course';
import styles from './page.module.css';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

function SetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEmpty = searchParams.get('empty') === 'true';
  
  const [onboardingData, setOnboardingData] = useState<ReturnType<typeof getOnboarding>>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [examDate, setExamDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Load onboarding data
    const data = getOnboarding();
    
    // Redirect to home if no onboarding data and not empty mode
    if (!data && !isEmpty) {
      router.push('/');
      return;
    }
    
    setOnboardingData(data);
  }, [isEmpty, router]);
  
  const handleUpload = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: `upload-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      type: file.type || file.name.split('.').pop() || 'unknown',
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };
  
  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  const handleContinue = () => {
    setIsLoading(true);
    
    // Generate course ID
    const courseName = onboardingData?.courseName || 'My Course';
    const courseId = generateCourseId(courseName);
    
    // Create course object
    const course: Course = {
      id: courseId,
      name: courseName,
      code: 'Bio141-2273', // TODO: Extract from courseName or allow user input
      university: onboardingData?.university,
      examDate: examDate ? new Date(examDate) : undefined,
      libraryDocs: onboardingData?.selectedDocs || [],
      userUploads: uploadedFiles.map(f => ({
        ...f,
        uploadedAt: new Date(),
      })),
      createdAt: new Date(),
    };
    
    // Save course
    saveCourse(course);
    
    // Clear onboarding data
    clearOnboarding();
    
    // Navigate to workspace
    router.push(`/course/${courseId}`);
  };
  
  const libraryCount = onboardingData?.selectedDocs?.length || 0;
  const hasContent = libraryCount > 0 || uploadedFiles.length > 0;
  
  return (
    <div className={styles.page}>
      <div className={styles.headerWrapper}>
        <Header
          variant="home-guest"
          logo={<Logo variant="icon" height={16} />}
          title="Studocu AI"
        />
      </div>
      
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>Almost ready!</h1>
            
            {libraryCount > 0 && (
              <div className={styles.badge}>
                <i className="fa-solid fa-check-circle" />
                Added from Studocu: <strong>{libraryCount}</strong> document{libraryCount !== 1 ? 's' : ''}
              </div>
            )}
            
            {isEmpty && (
              <p className={styles.subtitle}>
                Starting fresh – add your materials below
              </p>
            )}
          </div>
          
          {/* File Upload Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Have your own materials? Add them too.
            </h2>
            
            <FileUploadArea
              onFileSelect={handleUpload}
              showInput={false}
              placeholder="Drop files here or click to browse"
            />
            
            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className={styles.fileList}>
                {uploadedFiles.map(file => (
                  <div key={file.id} className={styles.fileItem}>
                    <div className={styles.fileIcon}>
                      <i className="fa-solid fa-file" />
                    </div>
                    <div className={styles.fileInfo}>
                      <div className={styles.fileName}>{file.name}</div>
                      <div className={styles.fileSize}>{formatFileSize(file.size)}</div>
                    </div>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handleRemoveFile(file.id)}
                      aria-label={`Remove ${file.name}`}
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
          
          {/* Exam Date Section */}
          <section className={styles.section}>
            <ExamDatePicker value={examDate} onChange={setExamDate} />
          </section>
          
          {/* Warning if no content */}
          {!hasContent && (
            <div className={styles.warning}>
              <i className="fa-solid fa-info-circle" />
              <span>You can add sources later from the workspace</span>
            </div>
          )}
          
          {/* Actions */}
          <div className={styles.actions}>
            <Button
              variant="secondary"
              color="gray"
              size="large"
              onClick={handleContinue}
              isDisabled={isLoading}
            >
              Skip for Now
            </Button>
            <Button
              variant="primary"
              color="blue"
              size="large"
              onClick={handleContinue}
              isLoading={isLoading}
              rightIcon={!isLoading ? <i className="fa-solid fa-arrow-right" /> : undefined}
            >
              Continue
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SetupPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
      <SetupContent />
    </Suspense>
  );
}
