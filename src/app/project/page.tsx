'use client';

import React, { useState } from 'react';
import { Logo } from '@/design-system/components/branding/Logo';
import { Sidebar, SidebarPanel, SourceTile, StatusChip } from '@/design-system/components/layout/Sidebar';
import { DragDropUpload, FloatingAssistantButton } from '@/design-system/components/uploads';
import styles from './page.module.css';

/**
 * Project Page - Main workspace for creating and managing study materials
 */
export default function ProjectPage(): JSX.Element {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [creationsPanelOpen, setCreationsPanelOpen] = useState(true);
  const [sourcesPanelOpen, setSourcesPanelOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFileUpload = (files: File[]): void => {
    console.log('Files uploaded:', files);
    // Handle file upload
  };

  const handleAssistantClick = (): void => {
    const newChatState = !chatOpen;
    setChatOpen(newChatState);
    setLeftSidebarCollapsed(newChatState);
  };

  const handleCollapsedSidebarClick = (): void => {
    setLeftSidebarCollapsed(false);
    setChatOpen(false);
  };

  const handleExpandToggle = (): void => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logoContainer}>
            <Logo variant="icon" height={16} />
          </div>
          
          <div className={styles.projectInfo}>
            <h1 className={styles.projectTitle}>Untitled Project</h1>
            <button className={styles.projectDropdown} aria-label="Project options">
              <i className="fa-solid fa-chevron-down" />
            </button>
          </div>

          <div className={styles.coursePrompt}>
            <i className="fa-solid fa-pencil" />
            <a href="#" className={styles.courseLink}>Add your course</a>
          </div>
        </div>

        <div className={styles.headerRight}>
          <button className={styles.headerButton}>
            <i className="fa-solid fa-globe" />
            <span>Public</span>
          </button>

          <button className={styles.headerButton}>
            <i className="fa-solid fa-share" />
            <span>Share</span>
          </button>

          <button className={styles.avatarButton}>
            <div className={styles.avatar}>
              <img src="/useravatar.jpg" alt="Avatar" />
            </div>
            <i className="fa-solid fa-chevron-down" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.mainContainer}>
        {/* Left Sidebar */}
        {leftSidebarOpen && !isFullscreen && (
          <aside 
            className={`${styles.leftSidebar} ${leftSidebarCollapsed ? styles.collapsed : ''}`}
            onClick={leftSidebarCollapsed ? handleCollapsedSidebarClick : undefined}
            aria-label={leftSidebarCollapsed ? "Click to expand sidebar" : "Sidebar"}
            title={leftSidebarCollapsed ? "Click to expand sidebar and close chat" : undefined}
          >
            {/* Creations Panel */}
            <div className={styles.sidebarPanel}>
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>Creations</h2>
                <button 
                  className={styles.panelToggle}
                  onClick={(e) => {
                    if (!leftSidebarCollapsed) {
                      setCreationsPanelOpen(!creationsPanelOpen);
                    }
                    e.stopPropagation();
                  }}
                  aria-label="Toggle creations panel"
                >
                  <i className={`fa-solid fa-chevron-${creationsPanelOpen ? 'up' : 'down'}`} />
                </button>
              </div>

              {creationsPanelOpen && (
                <div className={styles.panelContent}>
                  {/* Current Note - Using SourceTile */}
                  <SourceTile
                    title="New Note"
                    type="pdf"
                    subtitle="Note"
                    icon={<i className="fa-solid fa-file" aria-hidden="true" />}
                    state="selected"
                    onClick={() => console.log('Note clicked')}
                    onMoreClick={() => console.log('More options')}
                  />

                  {/* Generation Options */}
                  <div className={styles.generationOptions}>
                    <button className={styles.generationTile}>
                      <div className={styles.genTileLeft}>
                        <i className="fa-solid fa-ballot-check" />
                        <div>
                          <div className={styles.genTileTitle}>Generate new Mock exam</div>
                          <div className={styles.genTileDesc}>Practice with realistic exam questions</div>
                        </div>
                      </div>
                      <i className="fa-solid fa-chevron-right" />
                    </button>

                    <button className={styles.generationTile}>
                      <div className={styles.genTileLeft}>
                        <i className="fa-solid fa-pen-nib" />
                        <div>
                          <div className={styles.genTileTitle}>Generate new Summary</div>
                          <div className={styles.genTileDesc}>A study-ready overview of your sources</div>
                        </div>
                      </div>
                      <i className="fa-solid fa-chevron-right" />
                    </button>

                    <button className={styles.generationTile}>
                      <div className={styles.genTileLeft}>
                        <i className="fa-solid fa-list-check" />
                        <div>
                          <div className={styles.genTileTitle}>Generate new Quiz</div>
                          <div className={styles.genTileDesc}>Test yourself with multiple-choice quiz</div>
                        </div>
                      </div>
                      <i className="fa-solid fa-chevron-right" />
                    </button>
                  </div>

                  <button className={styles.generateButton}>
                    <i className="fa-solid fa-sparkle" />
                    <span>Generate new</span>
                  </button>
                </div>
              )}
            </div>

            {/* Sources Panel */}
            <div className={styles.sidebarPanel}>
              <div className={styles.panelHeader}>
                <div className={styles.panelTitleRow}>
                  <h2 className={styles.panelTitle}>Sources</h2>
                  <button className={styles.panelCollapseIcon}>
                    <i className="fa-solid fa-chevron-down" />
                  </button>
                </div>
                <button 
                  className={styles.panelToggle}
                  onClick={(e) => {
                    if (!leftSidebarCollapsed) {
                      setSourcesPanelOpen(!sourcesPanelOpen);
                    }
                    e.stopPropagation();
                  }}
                  aria-label="Toggle sources panel"
                >
                  <i className={`fa-solid fa-chevron-${sourcesPanelOpen ? 'up' : 'down'}`} />
                </button>
              </div>

              {sourcesPanelOpen && (
                <div className={styles.panelContent}>
                  <p className={styles.sourcesDescription}>
                    Your sources will appear here. Start by uploading
                  </p>

                  <DragDropUpload 
                    onUpload={handleFileUpload}
                    accept=".pdf,.txt,.png,.jpg,.doc,.docx"
                    multiple
                  />

                  <div className={styles.sourceActions}>
                    <button className={styles.addButton}>
                      <i className="fa-solid fa-plus" />
                      <span>Add</span>
                    </button>
                    <button className={styles.recordButton}>
                      <i className="fa-solid fa-microphone" />
                      <span>Record</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Toggle button for left sidebar */}
        {!leftSidebarOpen && !isFullscreen && (
          <button 
            className={styles.sidebarToggleLeft}
            onClick={() => setLeftSidebarOpen(true)}
            aria-label="Show sidebar"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        )}

        {/* Content Area */}
        <main className={styles.content}>
          <button 
            className={styles.expandButton}
            onClick={handleExpandToggle}
            aria-label={isFullscreen ? "Exit fullscreen" : "Expand content"}
          >
            <i className={`fa-solid fa-${isFullscreen ? 'down-left-and-up-right-to-center' : 'up-right-and-down-left-from-center'}`} />
          </button>

          <div className={styles.documentArea}>
            <h1 className={styles.documentTitle}>New Note</h1>
            
            <div className={styles.placeholder}>
              <span className={styles.placeholderText}>
                Start taking notes here or press "/" for actions and formatting
              </span>
              <span className={styles.cursor} />
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.actionButton}>
                <i className="fa-solid fa-pen-nib" />
                <span>Generate a summary</span>
              </button>

              <button className={styles.actionButton}>
                <i className="fa-solid fa-list-check" />
                <span>Create a quiz</span>
              </button>

              <button className={styles.actionButton}>
                <i className="fa-solid fa-comment" />
                <span>Ask a question</span>
              </button>

              <button className={styles.actionButton}>
                <i className="fa-solid fa-microphone" />
                <span>Record my class</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Assistant Button */}
      {!isFullscreen && <FloatingAssistantButton onClick={handleAssistantClick} />}
    </div>
  );
}


