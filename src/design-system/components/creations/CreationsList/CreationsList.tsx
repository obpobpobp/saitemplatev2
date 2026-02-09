/**
 * CreationsList - View-aware renderer for creations
 * 
 * Renders creations with different grouping based on view mode:
 * - Recent: Timeline grouping (This Week / Last Week / Earlier)
 * - Exam: Grouped by exam (Upcoming → Completed → Ongoing)
 * - Type: Grouped by creation type
 */

'use client';

import { useState, useMemo } from 'react';
import classNames from 'classnames';
import type { CreationsListProps } from './CreationsList.types';
import type { Creation, Exam, CreationType } from '@/types/course';
import { CreationCard } from '../CreationCard';
import { ExamSection } from '../ExamSection';
import { TypeSection } from '../TypeSection';
import { EmptyCreationsState } from '../EmptyCreationsState';
import { Button } from '@design-system/components/buttons/Button';
import { isThisWeek, isLastWeek } from '@/lib/utils/dateHelpers';
import styles from './CreationsList.module.css';

// Section divider (for Recent view)
function SectionDivider({ label }: { label: string }) {
  return (
    <div className={styles.divider}>
      <span className={styles.dividerLabel}>{label}</span>
      <div className={styles.dividerLine} />
    </div>
  );
}

// Type order for Type view
const TYPE_ORDER: CreationType[] = ['mock-exam', 'flashcards', 'summary', 'quiz', 'gap-analysis'];

export const CreationsList: React.FC<CreationsListProps> = ({
  creations,
  exams,
  viewMode,
  activeCreationId,
  onCreationClick,
  onCreationDelete,
  onAddExam,
  onCreateNew,
  className,
}) => {
  // Collapsed state for exam sections
  const [collapsedExams, setCollapsedExams] = useState<Set<string>>(
    new Set(exams.filter(e => e.isCompleted).map(e => e.id))
  );
  
  // Toggle exam collapse
  const toggleExamCollapse = (examId: string) => {
    setCollapsedExams(prev => {
      const next = new Set(prev);
      if (next.has(examId)) {
        next.delete(examId);
      } else {
        next.add(examId);
      }
      return next;
    });
  };
  
  // Find exam for creation
  const getExam = (creation: Creation): Exam | undefined => {
    const examId = (creation as any).examId;
    return exams.find(e => e.id === examId);
  };
  
  // Empty state
  if (creations.length === 0) {
    return (
      <EmptyCreationsState 
        view={viewMode}
        onAddExam={onAddExam}
        className={className}
      />
    );
  }
  
  // ===== RECENT VIEW =====
  if (viewMode === 'recent') {
    const sorted = [...creations].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    const thisWeek = sorted.filter(c => isThisWeek(c.createdAt));
    const lastWeek = sorted.filter(c => isLastWeek(c.createdAt));
    const earlier = sorted.filter(c => !isThisWeek(c.createdAt) && !isLastWeek(c.createdAt));
    
    return (
      <div className={classNames(styles.list, className)}>
        {/* This Week */}
        {thisWeek.length > 0 && (
          <>
            <SectionDivider label="THIS WEEK" />
            {thisWeek.map(creation => (
              <CreationCard
                key={creation.id}
                creation={creation}
                exam={getExam(creation)}
                view="recent"
                isActive={activeCreationId === creation.id}
                onClick={() => onCreationClick(creation)}
                onDelete={onCreationDelete ? () => onCreationDelete(creation) : undefined}
              />
            ))}
          </>
        )}
        
        {/* Last Week */}
        {lastWeek.length > 0 && (
          <>
            <SectionDivider label="LAST WEEK" />
            {lastWeek.map(creation => (
              <CreationCard
                key={creation.id}
                creation={creation}
                exam={getExam(creation)}
                view="recent"
                isActive={activeCreationId === creation.id}
                onClick={() => onCreationClick(creation)}
                onDelete={onCreationDelete ? () => onCreationDelete(creation) : undefined}
              />
            ))}
          </>
        )}
        
        {/* Earlier */}
        {earlier.length > 0 && (
          <>
            <SectionDivider label="EARLIER" />
            {earlier.map(creation => (
              <CreationCard
                key={creation.id}
                creation={creation}
                exam={getExam(creation)}
                view="recent"
                isActive={activeCreationId === creation.id}
                onClick={() => onCreationClick(creation)}
                onDelete={onCreationDelete ? () => onCreationDelete(creation) : undefined}
              />
            ))}
          </>
        )}
        
        {/* Create New button */}
        {onCreateNew && (
          <div className={styles.createButtonContainer}>
            <Button
              variant="primary"
              color="black"
              size="medium"
              onClick={onCreateNew}
              leftIcon={<i className="fa-solid fa-plus" />}
              isFullWidth
            >
              Create new
            </Button>
          </div>
        )}
      </div>
    );
  }
  
  // ===== EXAM VIEW =====
  if (viewMode === 'exam') {
    const now = new Date();
    
    // Sort exams
    const upcomingExams = exams
      .filter(e => !e.isCompleted && e.date && new Date(e.date) > now)
      .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
    
    const completedExams = exams
      .filter(e => e.isCompleted)
      .sort((a, b) => (b.date && a.date ? new Date(b.date).getTime() - new Date(a.date).getTime() : 0));
    
    // Group creations by exam
    const byExam: Record<string, Creation[]> = {};
    const ongoing: Creation[] = [];
    
    creations.forEach(c => {
      const examId = (c as any).examId;
      if (examId) {
        byExam[examId] = byExam[examId] || [];
        byExam[examId].push(c);
      } else {
        ongoing.push(c);
      }
    });
    
    // Sort within each exam group
    Object.values(byExam).forEach(arr => {
      arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });
    
    // No exams at all
    if (exams.length === 0) {
      return (
        <EmptyCreationsState
          view="exam"
          onAddExam={onAddExam}
          className={className}
        />
      );
    }
    
    return (
      <div className={classNames(styles.list, className)}>
        {/* Upcoming Exams */}
        {upcomingExams.map(exam => (
          <ExamSection
            key={exam.id}
            exam={exam}
            creations={byExam[exam.id] || []}
            isCollapsed={collapsedExams.has(exam.id)}
            onToggleCollapse={() => toggleExamCollapse(exam.id)}
            onCreationClick={onCreationClick}
            onCreationDelete={onCreationDelete}
            activeCreationId={activeCreationId}
          />
        ))}
        
        {/* Completed Exams */}
        {completedExams.map(exam => (
          <ExamSection
            key={exam.id}
            exam={exam}
            creations={byExam[exam.id] || []}
            isCollapsed={collapsedExams.has(exam.id)}
            onToggleCollapse={() => toggleExamCollapse(exam.id)}
            onCreationClick={onCreationClick}
            onCreationDelete={onCreationDelete}
            activeCreationId={activeCreationId}
          />
        ))}
        
        {/* Ongoing */}
        {ongoing.length > 0 && (
          <>
            <SectionDivider label="ONGOING" />
            <div className={styles.subtitle}>Not tied to an exam</div>
            {ongoing.map(creation => (
              <CreationCard
                key={creation.id}
                creation={creation}
                view="exam"
                isActive={activeCreationId === creation.id}
                onClick={() => onCreationClick(creation)}
                onDelete={onCreationDelete ? () => onCreationDelete(creation) : undefined}
              />
            ))}
          </>
        )}
        
        {/* Create New button */}
        {onCreateNew && (
          <div className={styles.createButtonContainer}>
            <Button
              variant="primary"
              color="black"
              size="medium"
              onClick={onCreateNew}
              leftIcon={<i className="fa-solid fa-plus" />}
              isFullWidth
            >
              Create new
            </Button>
          </div>
        )}
      </div>
    );
  }
  
  // ===== TYPE VIEW =====
  if (viewMode === 'type') {
    // Group by type
    const byType: Record<CreationType, Creation[]> = {
      'mock-exam': [],
      'flashcards': [],
      'summary': [],
      'quiz': [],
      'gap-analysis': [],
    };
    
    creations.forEach(c => {
      const type = c.type as CreationType;
      if (byType[type]) {
        byType[type].push(c);
      }
    });
    
    // Sort within each group
    Object.values(byType).forEach(arr => {
      arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });
    
    return (
      <div className={classNames(styles.list, className)}>
        {TYPE_ORDER.map(type => {
          const items = byType[type];
          if (items.length === 0) return null;
          
          return (
            <TypeSection key={type} type={type} count={items.length}>
              {items.map(creation => (
                <CreationCard
                  key={creation.id}
                  creation={creation}
                  exam={getExam(creation)}
                  view="type"
                  isActive={activeCreationId === creation.id}
                  onClick={() => onCreationClick(creation)}
                  onDelete={onCreationDelete ? () => onCreationDelete(creation) : undefined}
                />
              ))}
            </TypeSection>
          );
        })}
        
        {/* Create New button */}
        {onCreateNew && (
          <div className={styles.createButtonContainer}>
            <Button
              variant="primary"
              color="black"
              size="medium"
              onClick={onCreateNew}
              leftIcon={<i className="fa-solid fa-plus" />}
              isFullWidth
            >
              Create new
            </Button>
          </div>
        )}
      </div>
    );
  }
  
  return null;
};

CreationsList.displayName = 'CreationsList';
