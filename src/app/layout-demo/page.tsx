'use client';

import React, { useState } from 'react';
import { Header } from '@/design-system/components/layout/Header';
import { 
  Sidebar, 
  SidebarPanel, 
  SourceTile 
} from '@/design-system/components/layout/Sidebar';
import { Logo } from '@/design-system/components/branding/Logo';
import { TileButton } from '@/design-system/components/modals/TileButton';
import styles from './page.module.css';

/**
 * Layout Demo Page
 * Showcases the Header and Sidebar components with all variants
 */
export default function LayoutDemoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [creationsExpanded, setCreationsExpanded] = useState(true);
  const [sourcesExpanded, setSourcesExpanded] = useState(false);
  const [activeVariant, setActiveVariant] = useState<'project' | 'home' | 'guest'>('project');
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className={styles.page}>
      {/* Controls */}
      <div className={styles.controls}>
        <h1>Layout Components Demo</h1>
        
        <div className={styles.controlGroup}>
          <h3>Header Variant</h3>
          <div className={styles.buttons}>
            <button 
              className={activeVariant === 'project' ? styles.active : ''}
              onClick={() => setActiveVariant('project')}
            >
              Project
            </button>
            <button 
              className={activeVariant === 'home' ? styles.active : ''}
              onClick={() => setActiveVariant('home')}
            >
              Home
            </button>
            <button 
              className={activeVariant === 'guest' ? styles.active : ''}
              onClick={() => setActiveVariant('guest')}
            >
              Guest
            </button>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <h3>Layout Options</h3>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={sidebarOpen}
              onChange={(e) => setSidebarOpen(e.target.checked)}
            />
            <span>Sidebar Open</span>
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={isMobile}
              onChange={(e) => setIsMobile(e.target.checked)}
            />
            <span>Mobile View</span>
          </label>
        </div>

        <div className={styles.controlGroup}>
          <h3>Panel States</h3>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={creationsExpanded}
              onChange={(e) => setCreationsExpanded(e.target.checked)}
            />
            <span>Creations Expanded</span>
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={sourcesExpanded}
              onChange={(e) => setSourcesExpanded(e.target.checked)}
            />
            <span>Sources Expanded</span>
          </label>
        </div>
      </div>

      {/* Demo Layout */}
      <div className={styles.demoContainer}>
        {/* Header Demo */}
        <Header
          variant={activeVariant}
          logo={<Logo variant="icon" height={24} />}
          title={activeVariant === 'home' ? 'Studocu AI' : 'Untitled Project'}
          hasTitleDropdown={activeVariant === 'project'}
          onTitleDropdownClick={() => console.log('Title dropdown clicked')}
          breadcrumbLabel={activeVariant === 'project' ? 'Pharmacology' : undefined}
          onBreadcrumbClick={activeVariant === 'project' ? () => console.log('Breadcrumb clicked') : undefined}
          avatarUrl={activeVariant !== 'home' ? '/useravatar.jpg' : undefined}
          avatarInitials={activeVariant !== 'home' ? 'U' : undefined}
          onAvatarClick={() => console.log('Avatar clicked')}
        />

        {/* Main Content Area */}
        <div className={styles.mainArea}>
          {/* Sidebar Demo */}
          <Sidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            side="left"
            width={400}
            collapsedWidth={72}
          >
            {/* Creations Panel */}
            <SidebarPanel
              title="Creations"
              icon={<span>✨</span>}
              isExpanded={creationsExpanded}
              isSidebarCollapsed={!sidebarOpen}
              onToggle={() => setCreationsExpanded(!creationsExpanded)}
              footer={
                sidebarOpen && creationsExpanded && (
                  <div className={styles.tileButtonsGrid}>
                    <TileButton
                      title="AI Notes"
                      subtitle="Create from documents"
                      icon="fa-solid fa-file"
                      chipLabel="New"
                      orientation="vertical"
                      color="neutral"
                      onClick={() => console.log('AI Notes clicked')}
                    />
                    <TileButton
                      title="AI Summary"
                      subtitle="Summarize content"
                      icon="fa-solid fa-pen-nib"
                      orientation="vertical"
                      color="neutral"
                      onClick={() => console.log('AI Summary clicked')}
                    />
                    <TileButton
                      title="AI Quiz"
                      subtitle="Generate quiz"
                      icon="fa-solid fa-circle-question"
                      orientation="vertical"
                      color="neutral"
                      onClick={() => console.log('AI Quiz clicked')}
                    />
                  </div>
                )
              }
            >
              {/* Using SourceTile for creations with creation-specific icons */}
              <SourceTile
                title="Pharmacology for Nurses"
                type="pdf"
                subtitle="Note"
                state="selected"
                icon={<i className="fa-solid fa-file" aria-hidden="true" />}
                onClick={() => console.log('Note clicked')}
                onMoreClick={() => console.log('More clicked')}
              />
              <SourceTile
                title="Pharmacology for Nurses"
                type="pdf"
                subtitle="Summary"
                icon={<i className="fa-solid fa-pen-nib" aria-hidden="true" />}
                onClick={() => console.log('Summary clicked')}
                onMoreClick={() => console.log('More clicked')}
              />
              <SourceTile
                title="Cardiovascular System"
                type="pdf"
                subtitle="Note"
                icon={<i className="fa-solid fa-file" aria-hidden="true" />}
                onClick={() => console.log('Note 2 clicked')}
                onMoreClick={() => console.log('More clicked')}
              />
            </SidebarPanel>

            {/* Sources Panel */}
            <SidebarPanel
              title="Sources"
              icon={<span>📚</span>}
              isExpanded={sourcesExpanded}
              isSidebarCollapsed={!sidebarOpen}
              onToggle={() => setSourcesExpanded(!sourcesExpanded)}
              headerActions={
                sidebarOpen && (
                  <div className={styles.panelActions}>
                    <button className={styles.iconButton} aria-label="Search">
                      🔍
                    </button>
                    <button className={styles.iconButton} aria-label="Collapse">
                      ▼
                    </button>
                  </div>
                )
              }
              footer={
                sidebarOpen && sourcesExpanded && (
                  <div className={styles.sourceActions}>
                    <button className={styles.addButton}>
                      ➕ Add
                    </button>
                    <button className={styles.recordButton}>
                      🎤 Record
                    </button>
                  </div>
                )
              }
            >
              <SourceTile
                title="Pharmacology for Nurses.pdf"
                type="pdf"
                subtitle="Document"
                onClick={() => console.log('PDF clicked')}
                onMoreClick={() => console.log('More clicked')}
              />
              <SourceTile
                title="Pasted notes"
                type="text"
                subtitle="Text"
                onClick={() => console.log('Text clicked')}
                onMoreClick={() => console.log('More clicked')}
              />
              <SourceTile
                title="Lesson 1: Cardiovascular System"
                type="audio"
                subtitle="Class recording"
                state="selected"
                onClick={() => console.log('Recording clicked')}
                onMoreClick={() => console.log('More clicked')}
              />
            </SidebarPanel>
          </Sidebar>

          {/* Content Area */}
          <div className={styles.content}>
            <div className={styles.placeholder}>
              <h2>Main Content Area</h2>
              <p>This is where your main application content would appear.</p>
              <p>Use the controls above to test different header and sidebar configurations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


