/**
 * ExamCountdown - Sophisticated exam countdown with progress tracking
 * 
 * A beautiful, monochromatic countdown component featuring:
 * - Circular progress visualization
 * - Interactive date slider for quick adjustments
 * - Study progress tracking
 * - Urgency-based visual states
 * - Smooth micro-interactions
 * 
 * @example
 * ```tsx
 * <ExamCountdown 
 *   examDate="2026-03-15"
 *   studyProgress={65}
 *   hoursStudied={12}
 *   onDateChange={(date) => updateExamDate(date)}
 *   onRemoveDate={() => clearExamDate()}
 * />
 * ```
 */

'use client';

import { useState, useMemo, useCallback } from 'react';
import type { ExamCountdownProps, UrgencyLevel, ViewMode } from './ExamCountdown.types';
import styles from './ExamCountdown.module.css';

export const ExamCountdown = ({
  exams,
  onAddExam,
  examDate,
  onDateChange,
  onRemoveDate,
  studyProgress = 0,
  hoursStudied,
  showSlider = true,
  className = '',
}: ExamCountdownProps): JSX.Element => {
  const [viewMode, setViewMode] = useState<ViewMode>('compact');
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  
  // Get active exam from new exams array or fallback to legacy examDate
  const activeExamDate = useMemo(() => {
    if (exams && exams.length > 0) {
      const upcomingExams = exams
        .filter(e => !e.isCompleted && e.date)
        .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
      
      if (upcomingExams.length > 0) {
        const exam = upcomingExams[currentExamIndex % upcomingExams.length];
        return exam.date ? exam.date.toISOString().split('T')[0] : undefined;
      }
    }
    return examDate;
  }, [exams, examDate, currentExamIndex]);
  
  // Get current exam object (if using new API)
  const currentExam = useMemo(() => {
    if (exams && exams.length > 0) {
      const upcomingExams = exams
        .filter(e => !e.isCompleted && e.date)
        .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
      return upcomingExams[currentExamIndex % upcomingExams.length];
    }
    return null;
  }, [exams, currentExamIndex]);
  
  // Count upcoming exams
  const upcomingExamsCount = useMemo(() => {
    if (exams) {
      return exams.filter(e => !e.isCompleted && e.date).length;
    }
    return examDate ? 1 : 0;
  }, [exams, examDate]);

  // Calculate countdown and urgency
  const countdown = useMemo(() => {
    if (!activeExamDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const exam = new Date(activeExamDate);
    exam.setHours(0, 0, 0, 0);
    
    const diffTime = exam.getTime() - today.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let urgency: UrgencyLevel = 'distant';
    if (days <= 2) urgency = 'critical';
    else if (days <= 5) urgency = 'urgent';
    else if (days <= 10) urgency = 'approaching';
    else if (days <= 20) urgency = 'comfortable';
    
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    
    return { days, weeks, remainingDays, urgency, isPast: days < 0 };
  }, [activeExamDate]);

  // Format display text
  const getCountdownText = () => {
    if (!countdown) return '';
    if (countdown.isPast) return 'Exam passed';
    if (countdown.days === 0) return 'Exam today!';
    if (countdown.days === 1) return 'Exam tomorrow';
    if (countdown.days <= 13) return `${countdown.days} days`;
    if (countdown.weeks === 1) return `1 week, ${countdown.remainingDays}d`;
    return `${countdown.weeks} weeks`;
  };

  // Calculate circular progress
  const getCircleProgress = () => {
    if (!countdown || countdown.days < 0) return 100;
    const maxDays = 60; // Consider 60 days as 0% progress
    const progress = Math.min(100, ((maxDays - countdown.days) / maxDays) * 100);
    return Math.max(0, progress);
  };

  // Handle slider change
  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const daysFromNow = parseInt(e.target.value, 10);
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + daysFromNow);
    const dateString = newDate.toISOString().split('T')[0];
    onDateChange?.(dateString);
  }, [onDateChange]);

  const circleProgress = getCircleProgress();
  const circumference = 2 * Math.PI * 54; // radius = 54
  const strokeDashoffset = circumference - (circleProgress / 100) * circumference;

  // Handle cycle to next exam
  const handleCycleExam = () => {
    if (upcomingExamsCount > 1) {
      setCurrentExamIndex((prev) => (prev + 1) % upcomingExamsCount);
    }
  };

  // Empty state
  if (!activeExamDate) {
    return (
      <div className={`${styles.container} ${styles.empty} ${className}`}>
        <div className={styles.emptyContent}>
          <div className={styles.emptyIcon}>
            <i className="fa-regular fa-calendar-clock" aria-hidden="true" />
          </div>
          <div className={styles.emptyText}>
            <h3 className={styles.emptyTitle}>No exams scheduled</h3>
            <p className={styles.emptySubtitle}>Add an exam date to organize your prep by milestone</p>
          </div>
        </div>
        
        <button
          className={styles.setDateButton}
          onClick={() => {
            if (onAddExam) {
              onAddExam();
            } else {
              // Fallback to old behavior
              const defaultDate = new Date();
              defaultDate.setDate(defaultDate.getDate() + 30);
              onDateChange?.(defaultDate.toISOString().split('T')[0]);
            }
          }}
        >
          <i className="fa-solid fa-calendar-plus" aria-hidden="true" />
          <span>{onAddExam ? 'Set exam date' : 'Set exam date'}</span>
        </button>
      </div>
    );
  }

  // Active countdown state
  const classNames = [
    styles.container,
    styles.active,
    countdown && styles[countdown.urgency],
    viewMode === 'expanded' && styles.expanded,
    isAdjusting && styles.adjusting,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {/* Main countdown display */}
      <div className={styles.mainDisplay}>
        {/* Circular progress */}
        <div className={styles.circularProgress}>
          <svg className={styles.progressRing} viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              className={styles.progressBackground}
              cx="60"
              cy="60"
              r="54"
              fill="none"
              strokeWidth="6"
            />
            {/* Progress circle */}
            <circle
              className={styles.progressBar}
              cx="60"
              cy="60"
              r="54"
              fill="none"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 60 60)"
            />
            {/* Study progress indicator */}
            {studyProgress > 0 && (
              <circle
                className={styles.studyProgressBar}
                cx="60"
                cy="60"
                r="46"
                fill="none"
                strokeWidth="3"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={2 * Math.PI * 46 * (1 - studyProgress / 100)}
                transform="rotate(-90 60 60)"
              />
            )}
          </svg>
          
          <div className={styles.countdownCenter}>
            <div className={styles.daysNumber}>{countdown?.days || 0}</div>
            <div className={styles.daysLabel}>days</div>
          </div>
        </div>

        {/* Info section */}
        <div className={styles.info}>
          <div className={styles.examInfo}>
            {currentExam && <div className={styles.examName}>{currentExam.name}</div>}
            <div className={styles.countdownText}>{getCountdownText()}</div>
            <div className={styles.examDate}>
              {new Date(activeExamDate).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            {upcomingExamsCount > 1 && (
              <button
                className={styles.examCycle}
                onClick={handleCycleExam}
                aria-label="Cycle to next exam"
              >
                {currentExamIndex + 1} of {upcomingExamsCount} exams
                <i className="fa-solid fa-chevron-right" />
              </button>
            )}
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {studyProgress > 0 && (
              <div className={styles.stat}>
                <i className="fa-solid fa-chart-line" aria-hidden="true" />
                <span>{studyProgress}% ready</span>
              </div>
            )}
            {hoursStudied !== undefined && hoursStudied > 0 && (
              <div className={styles.stat}>
                <i className="fa-solid fa-clock" aria-hidden="true" />
                <span>{hoursStudied}h studied</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            onClick={() => setViewMode(viewMode === 'compact' ? 'expanded' : 'compact')}
            aria-label={viewMode === 'compact' ? 'Expand' : 'Collapse'}
            title={viewMode === 'compact' ? 'Adjust date' : 'Collapse'}
          >
            <i className={`fa-solid fa-chevron-${viewMode === 'compact' ? 'down' : 'up'}`} />
          </button>
          <button
            className={styles.removeButton}
            onClick={onRemoveDate}
            aria-label="Remove exam date"
            title="Remove exam date"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      </div>

      {/* Expanded: Date adjustment slider */}
      {viewMode === 'expanded' && showSlider && countdown && (
        <div className={styles.sliderSection}>
          <div className={styles.sliderLabel}>
            <span>Adjust exam date</span>
            <span className={styles.sliderValue}>
              {countdown.days} day{countdown.days !== 1 ? 's' : ''} from now
            </span>
          </div>
          
          <div className={styles.sliderContainer}>
            <div className={styles.sliderTrack}>
              <input
                type="range"
                className={styles.slider}
                min="1"
                max="90"
                value={countdown.days}
                onChange={handleSliderChange}
                onMouseDown={() => setIsAdjusting(true)}
                onMouseUp={() => setIsAdjusting(false)}
                onTouchStart={() => setIsAdjusting(true)}
                onTouchEnd={() => setIsAdjusting(false)}
                aria-label="Adjust exam date"
              />
              {/* Milestone markers */}
              <div className={styles.milestones}>
                <span className={styles.milestone} style={{ left: '0%' }}>Today</span>
                <span className={styles.milestone} style={{ left: '33.3%' }}>1 mo</span>
                <span className={styles.milestone} style={{ left: '66.6%' }}>2 mo</span>
                <span className={styles.milestone} style={{ left: '100%' }}>3 mo</span>
              </div>
            </div>
          </div>

          <div className={styles.quickActions}>
            {[7, 14, 30, 60].map((days) => (
              <button
                key={days}
                className={styles.quickButton}
                onClick={() => {
                  const newDate = new Date();
                  newDate.setDate(newDate.getDate() + days);
                  onDateChange?.(newDate.toISOString().split('T')[0]);
                }}
              >
                {days < 30 ? `${days}d` : `${days / 30}mo`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

ExamCountdown.displayName = 'ExamCountdown';
