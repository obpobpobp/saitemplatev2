'use client';

import { useState } from 'react';
import { ExamCountdown } from '@/design-system/components/study';
import { ExamDatePicker } from '@/components/ExamDatePicker';
import styles from './page.module.css';

/**
 * ExamCountdown Component Demo
 * Showcases the exam countdown in all urgency states
 */
export default function ExamCountdownDemoPage(): JSX.Element {
  const [examDate, setExamDate] = useState<string>('');
  const [showPicker, setShowPicker] = useState(false);

  // Calculate example dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const threeDays = new Date(today);
  threeDays.setDate(threeDays.getDate() + 3);
  
  const sevenDays = new Date(today);
  sevenDays.setDate(sevenDays.getDate() + 7);
  
  const fourteenDays = new Date(today);
  fourteenDays.setDate(fourteenDays.getDate() + 14);
  
  const thirtyDays = new Date(today);
  thirtyDays.setDate(thirtyDays.getDate() + 30);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Exam Countdown Component</h1>
          <p className={styles.description}>
            Beautiful, understated countdown component with urgency-based styling
          </p>
        </header>

        {/* Interactive Demo */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Interactive Demo</h2>
          <div className={styles.demoCard}>
            <ExamCountdown
              examDate={examDate}
              onDateChange={(date) => setExamDate(date)}
              onRemoveDate={() => {
                setExamDate('');
                setShowPicker(false);
              }}
              studyProgress={examDate ? 65 : 0}
              hoursStudied={examDate ? 12 : undefined}
              showSlider={true}
            />
            
            {showPicker && (
              <div className={styles.pickerContainer}>
                <ExamDatePicker
                  value={examDate}
                  onChange={(date) => {
                    setExamDate(date);
                    if (!date) setShowPicker(false);
                  }}
                />
              </div>
            )}
          </div>
        </section>

        {/* Quick Select Examples */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Quick Examples</h2>
          <div className={styles.quickSelect}>
            <button
              className={styles.quickButton}
              onClick={() => setExamDate(formatDate(tomorrow))}
            >
              Tomorrow
            </button>
            <button
              className={styles.quickButton}
              onClick={() => setExamDate(formatDate(threeDays))}
            >
              3 days
            </button>
            <button
              className={styles.quickButton}
              onClick={() => setExamDate(formatDate(sevenDays))}
            >
              1 week
            </button>
            <button
              className={styles.quickButton}
              onClick={() => setExamDate(formatDate(fourteenDays))}
            >
              2 weeks
            </button>
            <button
              className={styles.quickButton}
              onClick={() => setExamDate(formatDate(thirtyDays))}
            >
              1 month
            </button>
            <button
              className={styles.quickButton}
              onClick={() => setExamDate('')}
            >
              Clear
            </button>
          </div>
        </section>

        {/* All States Preview */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>All Urgency States</h2>
          
          <div className={styles.statesGrid}>
            <div className={styles.stateCard}>
              <h3 className={styles.stateTitle}>Empty State</h3>
              <p className={styles.stateDescription}>
                When no exam date is set
              </p>
              <ExamCountdown onDateChange={(date) => console.log('Date:', date)} />
            </div>

            <div className={styles.stateCard}>
              <h3 className={styles.stateTitle}>Distant (30 days)</h3>
              <p className={styles.stateDescription}>
                Neutral - plenty of time
              </p>
              <ExamCountdown
                examDate={formatDate(thirtyDays)}
                studyProgress={25}
                hoursStudied={4}
                onDateChange={(date) => console.log('Date:', date)}
                onRemoveDate={() => console.log('Remove')}
              />
            </div>

            <div className={styles.stateCard}>
              <h3 className={styles.stateTitle}>Comfortable (14 days)</h3>
              <p className={styles.stateDescription}>
                Warm tint - on track
              </p>
              <ExamCountdown
                examDate={formatDate(fourteenDays)}
                studyProgress={55}
                hoursStudied={9}
                onDateChange={(date) => console.log('Date:', date)}
                onRemoveDate={() => console.log('Remove')}
              />
            </div>

            <div className={styles.stateCard}>
              <h3 className={styles.stateTitle}>Approaching (7 days)</h3>
              <p className={styles.stateDescription}>
                Subtle amber - focus time
              </p>
              <ExamCountdown
                examDate={formatDate(sevenDays)}
                studyProgress={75}
                hoursStudied={15}
                onDateChange={(date) => console.log('Date:', date)}
                onRemoveDate={() => console.log('Remove')}
              />
            </div>

            <div className={styles.stateCard}>
              <h3 className={styles.stateTitle}>Urgent (3 days)</h3>
              <p className={styles.stateDescription}>
                Warmer amber - crunch time
              </p>
              <ExamCountdown
                examDate={formatDate(threeDays)}
                studyProgress={85}
                hoursStudied={22}
                onDateChange={(date) => console.log('Date:', date)}
                onRemoveDate={() => console.log('Remove')}
              />
            </div>

            <div className={styles.stateCard}>
              <h3 className={styles.stateTitle}>Critical (Tomorrow)</h3>
              <p className={styles.stateDescription}>
                Subtle red - final review
              </p>
              <ExamCountdown
                examDate={formatDate(tomorrow)}
                studyProgress={95}
                hoursStudied={30}
                onDateChange={(date) => console.log('Date:', date)}
                onRemoveDate={() => console.log('Remove')}
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Features</h2>
          <ul className={styles.featureList}>
            <li>🎨 Sophisticated monochromatic design with subtle urgency tints</li>
            <li>⭕ Circular progress visualization with dual rings</li>
            <li>🎚️ Interactive date adjustment slider (drag to change)</li>
            <li>📊 Study progress tracking with visual indicators</li>
            <li>⏱️ Study hours display with stats badges</li>
            <li>🔄 Expandable/collapsible view modes</li>
            <li>⚡ Quick action buttons (7d, 14d, 30d, 60d)</li>
            <li>🎯 Elegant empty state with one-click setup</li>
            <li>✨ Glass-morphism effects and smooth animations</li>
            <li>♿ WCAG 2.1 AA compliant with full keyboard support</li>
            <li>🌓 Beautiful in both light and dark modes</li>
            <li>📱 Fully responsive on all screen sizes</li>
          </ul>
        </section>

        {/* Usage */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Usage</h2>
          <div className={styles.codeBlock}>
            <pre>{`import { ExamCountdown } from '@design-system/components/study';

// Full-featured with progress tracking
<ExamCountdown 
  examDate="2026-03-15"
  studyProgress={65}
  hoursStudied={12}
  showSlider={true}
  onDateChange={(date) => updateExamDate(date)}
  onRemoveDate={() => clearExamDate()}
/>

// Minimal with date only
<ExamCountdown 
  examDate="2026-03-15"
  onDateChange={(date) => updateExamDate(date)}
/>

// Empty state
<ExamCountdown onDateChange={(date) => setExamDate(date)} />`}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}
