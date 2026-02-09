'use client';

import React, { useState } from 'react';
import { 
  Sidebar, 
  SourcesPanel, 
  CreationsPanel,
  SourceTile 
} from '@/design-system/components/layout/Sidebar';
import { Button } from '@/design-system/components/buttons/Button';
import styles from './page.module.css';

export default function SidebarDemoPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(false);
  const [isCreationsExpanded, setIsCreationsExpanded] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Sidebar Panel States Demo</h1>
        <div className={styles.controls}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={styles.controlButton}
          >
            {isSidebarOpen ? 'Collapse Sidebar (Icon-only)' : 'Expand Sidebar'}
          </button>
          <button 
            onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
            className={styles.controlButton}
          >
            {isSourcesExpanded ? 'Collapse Sources Panel' : 'Expand Sources Panel'}
          </button>
          <button 
            onClick={() => setIsCreationsExpanded(!isCreationsExpanded)}
            className={styles.controlButton}
          >
            {isCreationsExpanded ? 'Collapse Creations Panel' : 'Expand Creations Panel'}
          </button>
        </div>
      </div>

      <div className={styles.main}>
        <Sidebar 
          isOpen={isSidebarOpen}
          side="left"
        >
          <SourcesPanel
            isExpanded={isSourcesExpanded}
            onToggle={() => setIsSourcesExpanded(!isSourcesExpanded)}
            onSearchClick={() => console.log('Search clicked')}
            onFilterClick={() => console.log('Filter clicked')}
            onAddClick={() => console.log('Add clicked')}
            onRecordClick={() => console.log('Record clicked')}
          >
            <SourceTile
              title="Pharmacology for Nurses.pdf"
              type="pdf"
              subtitle="Document"
              state="default"
              onClick={() => console.log('Tile clicked')}
            />
            <SourceTile
              title="Pasted notes"
              type="text"
              subtitle="Text"
              state="default"
              onClick={() => console.log('Tile clicked')}
            />
            <SourceTile
              title="Lesson 1: Cardiovascular system"
              type="audio"
              subtitle="Class recording"
              state="default"
              onClick={() => console.log('Tile clicked')}
            />
            <SourceTile
              title="Slides_from_last_class.pptx"
              type="slides"
              subtitle="Slideshow"
              state="default"
              onClick={() => console.log('Tile clicked')}
            />
            <SourceTile
              title="youtube.mov"
              type="video"
              subtitle="Video"
              state="default"
              onClick={() => console.log('Tile clicked')}
            />
          </SourcesPanel>

          <CreationsPanel
            isExpanded={isCreationsExpanded}
            onToggle={() => setIsCreationsExpanded(!isCreationsExpanded)}
            onGenerateClick={() => console.log('Generate new clicked')}
          >
            <SourceTile
              title="Pharmacology for Nurses"
              type="pdf"
              subtitle="Note"
              state="selected"
              onClick={() => console.log('Tile clicked')}
            />
            <SourceTile
              title="Pharmacology for Nurses"
              type="pdf"
              subtitle="Summary"
              state="default"
              onClick={() => console.log('Tile clicked')}
            />
            <SourceTile
              title="Pharmacology for Nurses"
              type="pdf"
              subtitle="Note"
              state="default"
              onClick={() => console.log('Tile clicked')}
            />
          </CreationsPanel>
        </Sidebar>

        <div className={styles.content}>
          <div className={styles.stateInfo}>
            <h2>Current State</h2>
            <div className={styles.stateGrid}>
              <div className={styles.stateItem}>
                <strong>Sidebar:</strong> {isSidebarOpen ? 'Open (400px)' : 'Collapsed (72px icon-only)'}
              </div>
              <div className={styles.stateItem}>
                <strong>Sources Panel:</strong> {isSourcesExpanded ? 'Expanded (showing tiles)' : 'Collapsed (header only)'}
              </div>
              <div className={styles.stateItem}>
                <strong>Creations Panel:</strong> {isCreationsExpanded ? 'Expanded (showing tiles)' : 'Collapsed (header + footer only)'}
              </div>
            </div>
          </div>

          <div className={styles.figmaChecklist}>
            <h2>Figma Fidelity Checklist</h2>
            <div className={styles.checklistSection}>
              <h3>Sources Panel - Collapsed State</h3>
              <ul>
                <li>✓ Header: "Sources" text + chevron-down button (left)</li>
                <li>✓ Header: search + filter buttons (right)</li>
                <li>✓ Footer: "Add" button (black) + "Record" button (white/red)</li>
                <li>✓ Gap: 8px between buttons</li>
                <li>✓ Padding: 20px all sides</li>
                <li>✓ Border-radius: 20px</li>
              </ul>
            </div>

            <div className={styles.checklistSection}>
              <h3>Creations Panel - Collapsed State</h3>
              <ul>
                <li>✓ Header: "Creations" text + chevron-up button</li>
                <li>✓ Footer: "Generate new" button (white with sparkle icon)</li>
                <li>✓ Gap: 8px between header and footer</li>
                <li>✓ Padding: 20px all sides</li>
                <li>✓ Border-radius: 20px</li>
              </ul>
            </div>

            <div className={styles.checklistSection}>
              <h3>Sidebar Collapsed (Icon-Only)</h3>
              <ul>
                <li>✓ Width: 72px total (20px padding + 32px icon + 20px padding)</li>
                <li>✓ Each panel shows only icon button (32x32)</li>
                <li>✓ Icons: books (Sources), sparkle (Creations)</li>
                <li>✓ Gap between panels: 8px</li>
              </ul>
            </div>

            <div className={styles.checklistSection}>
              <h3>Expanded States</h3>
              <ul>
                <li>✓ Header shows chevron-up when expanded</li>
                <li>✓ Content area scrollable with tiles</li>
                <li>✓ Sidebar footer buttons at bottom (Add + Record)</li>
                <li>✓ Gap: 8px between elements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




