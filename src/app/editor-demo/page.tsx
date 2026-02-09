'use client';

import React, { useState } from 'react';
import { ContentEditor } from '@/design-system/components/editor';
import styles from './page.module.css';

/**
 * Editor Demo Page
 * Showcases the ContentEditor with slash commands and selection toolbar
 */
export default function EditorDemoPage(): JSX.Element {
  const [content, setContent] = useState<string>(`
    <h1>Fundamentals of nursing</h1>
    <p>Nursing is a healthcare profession focused on the care of individuals, families, and communities to maintain or recover optimal health and quality of life. Nurses collaborate with doctors and other health professionals to deliver patient-centered care.</p>
    <p>🩺 Core Responsibilities</p>
    <ul>
      <li>Patient Care: Monitoring vital signs, administering medications, wound care, assisting in daily living activities.</li>
      <li>Health Promotion: Educating patients on healthy lifestyle choices and disease prevention.</li>
      <li>Advocacy: Representing patients' interests and ensuring their rights and needs are respected.</li>
      <li>Documentation: Keeping accurate records of patient status, interventions, and outcomes.</li>
      <li>Collaboration: Working in teams with other healthcare providers for comprehensive care.</li>
    </ul>
  `);

  const handleContentChange = (newContent: string): void => {
    setContent(newContent);
    console.log('Content updated:', newContent);
  };

  const handleAskAI = (selectedText: string): void => {
    console.log('Ask AI about:', selectedText);
    // This would normally open the Study Assistant panel
    alert(`Ask AI about: "${selectedText}"\n\nThis will invoke the Study Assistant panel.`);
  };

  const handleExplain = (selectedText: string): void => {
    console.log('Explain:', selectedText);
    // This would normally open the Study Assistant panel
    alert(`Explain: "${selectedText}"\n\nThis will invoke the Study Assistant panel.`);
  };

  const handleGenerateSummary = (): void => {
    console.log('Generate summary');
    alert('Generate a summary\n\nThis will invoke the Study Assistant panel.');
  };

  const handleCreateQuiz = (): void => {
    console.log('Create quiz');
    alert('Create a quiz\n\nThis will invoke the Study Assistant panel.');
  };

  const handleAskQuestion = (): void => {
    console.log('Ask question');
    alert('Ask a question\n\nThis will invoke the Study Assistant panel.');
  };

  const handleRecordClass = (): void => {
    console.log('Record class');
    alert('Record my class\n\nThis will invoke the Study Assistant panel.');
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Content Editor Demo</h1>
          <p className={styles.subtitle}>
            Rich text editor with slash commands (/) and text selection toolbar
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.editorSection}>
          <div className={styles.editorWrapper}>
            <ContentEditor
              content={content}
              placeholder="Start taking notes here or press '/' for actions and formatting"
              onChange={handleContentChange}
              onReady={(editor) => {
                console.log('Editor ready:', editor);
              }}
              showSlashCommands={true}
              showSelectionToolbar={true}
              onAskAI={handleAskAI}
              onExplain={handleExplain}
              onGenerateSummary={handleGenerateSummary}
              onCreateQuiz={handleCreateQuiz}
              onAskQuestion={handleAskQuestion}
              onRecordClass={handleRecordClass}
            />
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>✨ Features</h2>
            <ul className={styles.featureList}>
              <li>
                <strong>Slash Commands:</strong> Type <code>/</code> to access formatting options
                <ul>
                  <li>Paragraph</li>
                  <li>Heading 1, 2, 3</li>
                  <li>Bullet List</li>
                  <li>Table (3×3 with header row)</li>
                </ul>
              </li>
              <li>
                <strong>Selection Toolbar:</strong> Select text to show formatting toolbar
                <ul>
                  <li>Ask AI (invokes Study Assistant)</li>
                  <li>Explain (invokes Study Assistant)</li>
                  <li>Bold, Italic</li>
                  <li>Bullet List</li>
                  <li>Highlight</li>
                </ul>
              </li>
              <li>
                <strong>Inline Action Buttons:</strong> Click on empty line to see
                <ul>
                  <li>Generate a summary</li>
                  <li>Create a quiz</li>
                  <li>Ask a question</li>
                  <li>Record my class</li>
                </ul>
              </li>
              <li>
                <strong>Keyboard Navigation:</strong>
                <ul>
                  <li>↑↓ Navigate slash commands</li>
                  <li>Enter - Select command</li>
                  <li>Esc - Close menus</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>🎨 Typography</h2>
            <p className={styles.infoText}>
              Editor uses design system typography:
            </p>
            <ul className={styles.typographyList}>
              <li><strong>Heading 1:</strong> 32px / Bold / 48px line-height</li>
              <li><strong>Heading 2:</strong> 24px / Bold / 36px line-height</li>
              <li><strong>Heading 3:</strong> 20px / Bold / 30px line-height</li>
              <li><strong>Body:</strong> 18px / Regular / 28px line-height</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>⚡ Try It Out</h2>
            <ol className={styles.stepList}>
              <li>Type <code>/</code> to open slash command menu</li>
              <li>Try <code>/table</code> to insert a table</li>
              <li>Use arrow keys to navigate commands</li>
              <li>Press Enter to insert command</li>
              <li>Select text to show formatting toolbar</li>
              <li>Click "Ask AI" or "Explain" to invoke Study Assistant</li>
              <li>Position cursor on empty line to see action buttons</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}




