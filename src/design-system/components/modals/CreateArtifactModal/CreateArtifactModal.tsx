/**
 * CreateArtifactModal - Modal for creating new artifacts
 * 
 * Two-step flow:
 * 1. Source selection (this week, all, or custom)
 * 2. Artifact type selection (summary, quiz, mock exam, flashcards, gap analysis)
 */

'use client';

import { useState, useMemo } from 'react';
import { Modal } from '../Modal';
import { TileButton } from '../TileButton';
import { Button } from '@/design-system/components/buttons/Button';
import { ExamBadge } from '@/design-system/components/study/ExamBadge';
import { createMockArtifact } from '@/lib/generators/createMockArtifact';
import type { CreateArtifactModalProps, SourceSelectionMode, ModalStep } from './CreateArtifactModal.types';
import type { CreationType } from '@/types/course';
import { isThisWeek } from '@/lib/utils/dateHelpers';
import styles from './CreateArtifactModal.module.css';

export const CreateArtifactModal: React.FC<CreateArtifactModalProps> = ({
  isOpen,
  onClose,
  sources,
  exams,
  onCreateArtifact,
}) => {
  const [step, setStep] = useState<ModalStep>('source-selection');
  const [selectionMode, setSelectionMode] = useState<SourceSelectionMode>('all-references');
  const [customSelectedIds, setCustomSelectedIds] = useState<string[]>([]);
  const [selectedArtifactType, setSelectedArtifactType] = useState<CreationType | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<string | undefined>(undefined);

  // Calculate source counts
  const thisWeekSources = useMemo(() => {
    return sources.filter(s => isThisWeek(s.addedAt));
  }, [sources]);

  // Get selected source IDs based on mode
  const selectedSourceIds = useMemo(() => {
    switch (selectionMode) {
      case 'this-week':
        return thisWeekSources.map(s => s.id);
      case 'all-references':
        return sources.map(s => s.id);
      case 'custom':
        return customSelectedIds;
      default:
        return [];
    }
  }, [selectionMode, thisWeekSources, sources, customSelectedIds]);

  const hasSelection = selectedSourceIds.length > 0;

  // Handle custom checkbox toggle
  const handleCustomToggle = (sourceId: string) => {
    setCustomSelectedIds(prev => 
      prev.includes(sourceId)
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  // Get upcoming exams for linking
  const upcomingExams = useMemo(() => {
    if (!exams || exams.length === 0) return [];
    const now = new Date();
    return exams
      .filter(e => !e.isCompleted && (!e.date || new Date(e.date) > now))
      .sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [exams]);

  // Handle artifact type selection
  const handleArtifactSelect = (type: CreationType) => {
    setSelectedArtifactType(type);
    
    // If exams are available, go to exam linking step
    if (upcomingExams.length > 0) {
      setStep('exam-linking');
    } else {
      // Otherwise create artifact immediately
      createAndCloseArtifact(type, undefined);
    }
  };
  
  // Create artifact and close modal
  const createAndCloseArtifact = (type: CreationType, examId?: string) => {
    const artifact = createMockArtifact(type, selectedSourceIds, sources);
    if (examId) {
      artifact.examId = examId;
    }
    onCreateArtifact(artifact);
    handleClose();
  };

  // Reset and close
  const handleClose = () => {
    setStep('source-selection');
    setSelectionMode('all-references');
    setCustomSelectedIds([]);
    setSelectedArtifactType(null);
    setSelectedExamId(undefined);
    onClose();
  };

  // Render Step 1: Source Selection
  const renderSourceSelection = () => (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Create New Material</h2>
        <p className={styles.subtitle}>Select sources to use</p>
      </div>

      <div className={styles.sourceOptions}>
        {/* This Week */}
        <div
          className={`${styles.radioOption} ${selectionMode === 'this-week' ? styles.selected : ''}`}
          onClick={() => setSelectionMode('this-week')}
        >
          <input
            type="radio"
            className={styles.radioInput}
            checked={selectionMode === 'this-week'}
            onChange={() => setSelectionMode('this-week')}
            aria-label="This week's materials"
          />
          <div className={styles.radioLabel}>
            <span className={styles.radioTitle}>This Week's Materials</span>
            <span className={styles.radioCount}>{thisWeekSources.length} sources</span>
          </div>
        </div>

        {/* All References */}
        <div
          className={`${styles.radioOption} ${selectionMode === 'all-references' ? styles.selected : ''}`}
          onClick={() => setSelectionMode('all-references')}
        >
          <input
            type="radio"
            className={styles.radioInput}
            checked={selectionMode === 'all-references'}
            onChange={() => setSelectionMode('all-references')}
            aria-label="All references"
          />
          <div className={styles.radioLabel}>
            <span className={styles.radioTitle}>All References</span>
            <span className={styles.radioCount}>{sources.length} sources</span>
          </div>
        </div>

        {/* Custom Selection */}
        <div
          className={`${styles.radioOption} ${selectionMode === 'custom' ? styles.selected : ''}`}
          onClick={() => setSelectionMode('custom')}
        >
          <input
            type="radio"
            className={styles.radioInput}
            checked={selectionMode === 'custom'}
            onChange={() => setSelectionMode('custom')}
            aria-label="Custom selection"
          />
          <div className={styles.radioLabel}>
            <span className={styles.radioTitle}>Custom Selection</span>
            <span className={styles.radioCount}>
              {selectionMode === 'custom' ? `${customSelectedIds.length} selected` : 'Choose specific sources'}
            </span>
          </div>
        </div>

        {/* Custom Source List */}
        {selectionMode === 'custom' && (
          <div className={styles.customSourceList}>
            {sources.map(source => (
              <label key={source.id} className={styles.sourceCheckbox}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={customSelectedIds.includes(source.id)}
                  onChange={() => handleCustomToggle(source.id)}
                />
                <span className={styles.sourceName}>{source.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerLeft} />
        <div className={styles.footerRight}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            color="black"
            onClick={() => setStep('artifact-selection')}
            isDisabled={!hasSelection}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );

  // Render Step 2: Artifact Type Selection
  const renderArtifactSelection = () => (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Choose Type</h2>
        <p className={styles.subtitle}>What would you like to create?</p>
      </div>

      <div className={styles.artifactGrid}>
        <TileButton
          title="Summary"
          subtitle="Study-ready overview"
          icon="fa-solid fa-file-lines"
          onClick={() => handleArtifactSelect('summary')}
        />
        <TileButton
          title="Quiz"
          subtitle="Test your knowledge"
          icon="fa-solid fa-circle-question"
          onClick={() => handleArtifactSelect('quiz')}
        />
        <TileButton
          title="Mock Exam"
          subtitle="Practice exam questions"
          icon="fa-solid fa-clipboard-check"
          onClick={() => handleArtifactSelect('mock-exam')}
        />
        <TileButton
          title="Flashcards"
          subtitle="Memorization cards"
          icon="fa-solid fa-layer-group"
          onClick={() => handleArtifactSelect('flashcards')}
        />
        <TileButton
          title="Gap Analysis"
          subtitle="Find knowledge gaps"
          icon="fa-solid fa-chart-line"
          onClick={() => handleArtifactSelect('gap-analysis')}
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <Button
            variant="secondary"
            onClick={() => setStep('source-selection')}
          >
            Back
          </Button>
        </div>
        <div className={styles.footerRight}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );

  // Render Step 3: Exam Linking (Optional)
  const renderExamLinking = () => (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Link to Exam?</h2>
        <p className={styles.subtitle}>Connect this material to an upcoming exam (optional)</p>
      </div>

      <div className={styles.examList}>
        {upcomingExams.map((exam) => (
          <div
            key={exam.id}
            className={`${styles.examOption} ${selectedExamId === exam.id ? styles.examSelected : ''}`}
            onClick={() => setSelectedExamId(exam.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedExamId(exam.id);
              }
            }}
          >
            <ExamBadge exam={exam} showDays showWeight size="medium" />
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <Button
            variant="secondary"
            onClick={() => setStep('artifact-selection')}
          >
            Back
          </Button>
        </div>
        <div className={styles.footerRight}>
          <Button
            variant="secondary"
            onClick={() => selectedArtifactType && createAndCloseArtifact(selectedArtifactType, undefined)}
          >
            Skip
          </Button>
          <Button
            variant="primary"
            color="black"
            onClick={() => selectedArtifactType && createAndCloseArtifact(selectedArtifactType, selectedExamId)}
            isDisabled={!selectedExamId}
          >
            Link & Create
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="medium"
      ariaLabel="Create new material"
    >
      <div className={styles.modalContent}>
        {step === 'source-selection' && renderSourceSelection()}
        {step === 'artifact-selection' && renderArtifactSelection()}
        {step === 'exam-linking' && renderExamLinking()}
      </div>
    </Modal>
  );
};
