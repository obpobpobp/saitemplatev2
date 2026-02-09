/**
 * Course Workspace Page
 * 
 * Main workspace for a course with sidebar panels and canvas content area.
 * Adapted from the existing project page structure.
 */

'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Logo } from '@/design-system/components/branding/Logo';
import { Header } from '@/design-system/components/layout/Header';
import { TabbedSidebar } from '@/design-system/components/layout/Sidebar/Sidebar';
import { AssistantPanel } from '@/design-system/components/layout/Sidebar/AssistantPanel';
import { SourcesPanel as NewSourcesPanel } from '@/design-system/components/sources';
import { CreationsPanel as NewCreationsPanel } from '@/design-system/components/creations';
import { CreateArtifactModal, AddExamModal } from '@/design-system/components/modals';
import { BottomTabBar } from '@/design-system/components/layout/BottomTabBar';
import { ExamCountdown } from '@/design-system/components/study';
import { useTabContext } from '@/hooks/useTabContext';
import { CourseProvider, useCourse } from '@/contexts/CourseContext';
import { Canvas } from '@/components/canvas/Canvas';
import type { Source, Creation, Exam, CreationsViewMode, SourceRecommendation } from '@/types/course';
import { getRecommendedDocs } from '@/lib/mockData';
import styles from './page.module.css';

function CourseWorkspaceContent() {
  const router = useRouter();
  const { course, isLoading, error, creations, allSources, exams, addCreation, addExam, addSource } = useCourse();
  const { activeTab, handleTabChange, switchToCreations, switchToSources } = useTabContext();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>>([]);
  
  // New panels state
  const [creationsViewMode, setCreationsViewMode] = useState<CreationsViewMode>('recent');
  const [activeSourceId, setActiveSourceId] = useState<string | undefined>();
  const [activeCreationId, setActiveCreationId] = useState<string | undefined>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Create artifact modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Add exam modal state
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  
  // Convert course data to new panel format
  const sources: Source[] = useMemo(() => {
    return allSources || [];
  }, [allSources]);
  
  const courseCreations: Creation[] = useMemo(() => {
    return creations || [];
  }, [creations]);
  
  const courseExams: Exam[] = useMemo(() => {
    return exams || [];
  }, [exams]);
  
  const storageUsedMB = useMemo(() => {
    return sources.reduce((sum, s) => sum + (s.fileSize || 0), 0) / (1024 * 1024);
  }, [sources]);
  
  // Dynamic recommendations based on current sources
  const recommendations: SourceRecommendation[] = useMemo(() => {
    if (!course) return [];
    const currentIds = sources.filter(s => s.origin === 'studocu').map(s => s.id);
    const recommended = getRecommendedDocs(currentIds, course.name);
    return recommended.map(doc => ({
      id: doc.id,
      name: doc.name,
      downloads: doc.downloads,
      unlocks: doc.enables,
    }));
  }, [sources, course]);
  
  // Handle loading and error states
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}>Loading course...</div>
      </div>
    );
  }
  
  if (error || !course) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Course Not Found</h1>
          <p>{error || 'The course you are looking for does not exist.'}</p>
          <button onClick={() => router.push('/')} className={styles.backButton}>
            Go Back Home
          </button>
        </div>
      </div>
    );
  }
  
  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    setMessages(prev => [
      ...prev,
      {
        role: 'user' as const,
        content: message,
        timestamp: new Date(),
      },
    ]);
    
    // TODO: Implement AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `I understand you're asking about "${message}". This will be implemented with the AI features in Phase 4.`,
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };
  
  // New panel handlers
  const handleFilesSelected = (files: File[]): void => {
    console.log('Files selected for upload:', files);
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };
  
  const handleBrowseStudocu = (): void => {
    console.log('Browse Studocu clicked');
    switchToSources();
  };
  
  const handleSourceClick = (source: Source): void => {
    console.log('Source clicked:', source);
    setActiveSourceId(source.id);
  };
  
  const handleSourceRemove = (sourceId: string): void => {
    console.log('Remove source:', sourceId);
  };
  
  const handleAddRecommendation = (recommendation: SourceRecommendation): void => {
    console.log('Add recommendation:', recommendation);
    if (addSource) {
      addSource({
        name: recommendation.name,
        origin: 'studocu',
        fileType: 'pdf', // Default for Studocu docs
        questionCount: 0, // Will be AI-estimated after upload
        fileSize: 0, // Default for Studocu docs
        downloads: recommendation.downloads,
      });
    }
  };
  
  const handleCreateNew = (): void => {
    setIsCreateModalOpen(true);
  };
  
  const handleCreateArtifact = (artifact: Creation): void => {
    console.log('Artifact created:', artifact);
    if (addCreation) {
      addCreation(artifact);
    }
    setActiveCreationId(artifact.id);
    setIsCreateModalOpen(false);
    switchToCreations(true);
  };
  
  const handleCreationClick = (creation: Creation): void => {
    console.log('Creation clicked:', creation);
    setActiveCreationId(creation.id);
  };
  
  const handleCreationDelete = (creation: Creation): void => {
    console.log('Delete creation:', creation);
  };
  
  const handleAddExam = (): void => {
    setIsAddExamModalOpen(true);
  };
  
  const handleCreateExam = (exam: Omit<Exam, 'id' | 'createdAt'>): void => {
    console.log('Exam created:', exam);
    if (addExam) {
      addExam(exam);
    }
    setIsAddExamModalOpen(false);
  };
  
  const handleDateChange = (date: string) => {
    // TODO: Update course exam date
    console.log('Date changed to:', date);
  };
  
  const handleRemoveExamDate = () => {
    // TODO: Remove exam date from course
    console.log('Remove exam date');
  };
  
  // Prepare content for each tab
  const assistantContent = (
    <AssistantPanel
      messages={messages}
      onSendMessage={handleSendMessage}
      onActionClick={(action) => console.log('Action:', action)}
      aiTool="ask-ai"
      courseInfo={course.university ? {
        courseCode: course.code || 'Bio141-2273',
        courseName: course.name,
        university: course.university,
      } : undefined}
    />
  );
  
  const creationsContent = (
    <NewCreationsPanel
      creations={courseCreations}
      exams={courseExams}
      viewMode={creationsViewMode}
      onViewModeChange={setCreationsViewMode}
      onCreateNew={handleCreateNew}
      activeCreationId={activeCreationId}
      onCreationClick={handleCreationClick}
      onCreationDelete={handleCreationDelete}
      onAddExam={handleAddExam}
    />
  );

  const sourcesContent = (
    <NewSourcesPanel
      sources={sources}
      recommendations={recommendations}
      activeSourceId={activeSourceId}
      onFilesSelected={handleFilesSelected}
      onBrowseStudocu={handleBrowseStudocu}
      onSourceClick={handleSourceClick}
      onSourceRemove={handleSourceRemove}
      onAddRecommendation={handleAddRecommendation}
      isUploading={isUploading}
      uploadProgress={uploadProgress}
      storageUsedMB={storageUsedMB}
      storageMaxMB={100}
    />
  );
  
  const totalSources = course.libraryDocs.length + course.userUploads.length;
  
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerContainer}>
        <Header
          variant="project"
          logo={<Logo variant="icon" height={16} />}
          onLogoClick={() => router.push('/')}
          title={course.name}
          breadcrumbLabel={course.university}
          onBreadcrumbClick={() => console.log('Breadcrumb clicked')}
          avatarInitials="U"
          onAvatarClick={() => console.log('Avatar clicked')}
        />
      </div>
      
      {/* Main Content */}
      <div className={styles.mainContainer}>
        {/* Tabbed Sidebar */}
        <TabbedSidebar
          isOpen={!sidebarCollapsed}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          assistantContent={assistantContent}
          creationsContent={creationsContent}
          sourcesContent={sourcesContent}
          sourceCount={totalSources}
        />
        
        {/* Content Area */}
        <main className={styles.content}>
          <div className={styles.examCountdownWrapper}>
            <ExamCountdown
              exams={courseExams}
              onAddExam={handleAddExam}
              examDate={course.examDate ? course.examDate.toISOString().split('T')[0] : undefined}
              onDateChange={handleDateChange}
              onRemoveDate={handleRemoveExamDate}
              studyProgress={45}
              hoursStudied={8}
              showSlider={true}
            />
          </div>
          
          <Canvas />
        </main>
      </div>
      
      {/* Bottom Tab Bar (mobile only) */}
      <BottomTabBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        sourceCount={totalSources}
      />
      
      {/* Create Artifact Modal */}
      <CreateArtifactModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        sources={sources}
        exams={courseExams}
        onCreateArtifact={handleCreateArtifact}
      />
      
      {/* Add Exam Modal */}
      <AddExamModal
        isOpen={isAddExamModalOpen}
        onClose={() => setIsAddExamModalOpen(false)}
        existingExams={courseExams}
        onAddExam={handleCreateExam}
      />
    </div>
  );
}

export default function CoursePage() {
  const params = useParams();
  const courseId = params.id as string;
  
  return (
    <CourseProvider courseId={courseId}>
      <CourseWorkspaceContent />
    </CourseProvider>
  );
}
