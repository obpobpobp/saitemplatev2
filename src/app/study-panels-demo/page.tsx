/**
 * Study Panels Demo Page
 * 
 * Demonstrates the new Sources and Creations panels with timeline organization
 * and 3-way view toggle functionality.
 */

'use client';

import { useState } from 'react';
import { SourcesPanel } from '@/design-system/components/sources';
import { CreationsPanel } from '@/design-system/components/creations';
import type { Source, SourceRecommendation, Creation, Exam, CreationsViewMode } from '@/types/course';
import { mockExams, mockSources, mockCreationsExtended } from '@/lib/mockData';
import styles from './page.module.css';

export default function StudyPanelsDemoPage() {
  // Sources state
  const [sources, setSources] = useState<Source[]>(mockSources);
  const [activeSourceId, setActiveSourceId] = useState<string | undefined>();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Creations state
  const [creations, setCreations] = useState<Creation[]>(mockCreationsExtended);
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [viewMode, setViewMode] = useState<CreationsViewMode>('exam');
  const [activeCreationId, setActiveCreationId] = useState<string | undefined>();
  
  // Sample recommendations
  const recommendations: SourceRecommendation[] = [
    {
      id: 'rec-1',
      name: 'Past Exam 2023',
      downloads: 1234,
      unlocks: 'exam prediction',
    },
  ];
  
  // Handlers - Sources
  const handleFilesSelected = (files: File[]) => {
    console.log('Files selected:', files);
    
    // Simulate upload
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add uploaded files as sources
          const newSources: Source[] = files.map((file, index) => ({
            id: `upload-${Date.now()}-${index}`,
            name: file.name,
            addedAt: new Date(),
            origin: 'upload' as const,
            fileSize: file.size,
            fileType: file.name.endsWith('.pdf') ? 'pdf' as const : 'other' as const,
            questionCount: Math.floor(Math.random() * 20) + 5,
          }));
          
          setSources(prev => [...newSources, ...prev]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };
  
  const handleBrowseStudocu = () => {
    console.log('Browse Studocu clicked');
    // Would open a modal in real implementation
    alert('Browse Studocu modal would open here');
  };
  
  const handleSourceClick = (source: Source) => {
    console.log('Source clicked:', source);
    setActiveSourceId(source.id);
  };
  
  const handleSourceRemove = (sourceId: string) => {
    if (confirm('Remove this source?')) {
      setSources(prev => prev.filter(s => s.id !== sourceId));
      if (activeSourceId === sourceId) {
        setActiveSourceId(undefined);
      }
    }
  };
  
  const handleAddRecommendation = (rec: SourceRecommendation) => {
    console.log('Add recommendation:', rec);
    const newSource: Source = {
      id: `rec-${Date.now()}`,
      name: rec.name,
      addedAt: new Date(),
      origin: 'studocu',
      studocuId: rec.id,
      downloads: rec.downloads,
      questionCount: 15,
      type: 'exam',
      isExam: true,
    };
    setSources(prev => [newSource, ...prev]);
  };
  
  // Handlers - Creations
  const handleCreateNew = () => {
    console.log('Create new clicked');
    alert('Create new modal would open here');
  };
  
  const handleCreationClick = (creation: Creation) => {
    console.log('Creation clicked:', creation);
    setActiveCreationId(creation.id);
  };
  
  const handleCreationDelete = (creation: Creation) => {
    if (confirm(`Delete "${creation.title}"?`)) {
      setCreations(prev => prev.filter(c => c.id !== creation.id));
      if (activeCreationId === creation.id) {
        setActiveCreationId(undefined);
      }
    }
  };
  
  const handleAddExam = () => {
    const name = prompt('Exam name:');
    if (!name) return;
    
    const dateStr = prompt('Exam date (YYYY-MM-DD):');
    const date = dateStr ? new Date(dateStr) : undefined;
    
    const newExam: Exam = {
      id: `exam-${Date.now()}`,
      name,
      date,
      isCompleted: false,
      createdAt: new Date(),
    };
    
    setExams(prev => [...prev, newExam]);
  };
  
  // Calculate storage
  const storageUsedMB = sources.reduce((sum, s) => sum + (s.fileSize || 0), 0) / (1024 * 1024);
  
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <h1>Study Panels Demo</h1>
        <p>Timeline-based Sources + Flexible 3-view Creations</p>
      </header>
      
      {/* Panels Container */}
      <div className={styles.container}>
        {/* Sources Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Sources Panel</h2>
            <span className={styles.badge}>Timeline View</span>
          </div>
          <div className={styles.panelContent}>
            <SourcesPanel
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
          </div>
        </div>
        
        {/* Creations Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Creations Panel</h2>
            <span className={styles.badge}>
              {viewMode === 'recent' && 'Recent View'}
              {viewMode === 'exam' && 'Exam View'}
              {viewMode === 'type' && 'Type View'}
            </span>
          </div>
          <div className={styles.panelContent}>
            <CreationsPanel
              creations={creations}
              exams={exams}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onCreateNew={handleCreateNew}
              activeCreationId={activeCreationId}
              onCreationClick={handleCreationClick}
              onCreationDelete={handleCreationDelete}
              onAddExam={handleAddExam}
            />
          </div>
        </div>
        
        {/* Stats Panel */}
        <div className={styles.stats}>
          <h3>Demo Stats</h3>
          <div className={styles.statGrid}>
            <div className={styles.stat}>
              <div className={styles.statValue}>{sources.length}</div>
              <div className={styles.statLabel}>Sources</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{creations.length}</div>
              <div className={styles.statLabel}>Creations</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{exams.length}</div>
              <div className={styles.statLabel}>Exams</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{storageUsedMB.toFixed(1)} MB</div>
              <div className={styles.statLabel}>Storage Used</div>
            </div>
          </div>
          
          <div className={styles.features}>
            <h4>Features Demonstrated:</h4>
            <ul>
              <li>✅ Timeline grouping (This Week / Earlier)</li>
              <li>✅ Drag-and-drop file upload</li>
              <li>✅ 3-way view toggle (Recent / Exam / Type)</li>
              <li>✅ Collapsible exam sections</li>
              <li>✅ Storage visualization</li>
              <li>✅ Source recommendations</li>
              <li>✅ Adaptive card displays</li>
              <li>✅ Keyboard navigation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
