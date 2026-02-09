'use client';

import React, { useState } from 'react';
import { ChatInput } from '@/design-system/components/chat';
import type { SourceItem, AttachmentItem } from '@/design-system/components/chat/ChatInput/ChatInput.types';
import styles from './page.module.css';

/**
 * ChatInput Demo Page
 * Showcases all states and variants from Figma design
 */
export default function InputDemoPage(): JSX.Element {
  const [defaultValue, setDefaultValue] = useState('');
  const [quizValue, setQuizValue] = useState('');
  const [summaryValue, setSummaryValue] = useState('');
  const [createValue, setCreateValue] = useState('');
  const [filledValue, setFilledValue] = useState('What is phenomenology');
  const [showContext, setShowContext] = useState(false);

  const sources: SourceItem[] = [
    { id: '1', name: 'Bauman_Liquid_modernity.pdf', type: 'pdf', selected: true },
    { id: '2', name: 'Pasted text', type: 'text', selected: false },
    { id: '3', name: 'Slides_from_last_class.pptx', type: 'slides', selected: false },
    { id: '4', name: 'class-recording-monday.rec', type: 'audio', selected: false },
    { id: '5', name: 'youtube-video.mov', type: 'video', selected: false },
  ];

  const attachments: AttachmentItem[] = [
    { id: '1', isLoading: true, onRemove: () => console.log('Remove 1') },
    { id: '2', isLoading: true, onRemove: () => console.log('Remove 2') },
    { id: '3', isLoading: true, onRemove: () => console.log('Remove 3') },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>ChatInput Variants</h1>
          <p className={styles.subtitle}>
            All states and variants from Figma design
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.demoGrid}>
          {/* Default State */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Default - Ask AI</h3>
            <ChatInput
              value={defaultValue}
              onChange={setDefaultValue}
              onSubmit={() => console.log('Submit default')}
              onAddClick={() => console.log('Add')}
              placeholder="Ask about this project"
            />
          </div>

          {/* Hover State */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Hover</h3>
            <p className={styles.hint}>Hover over the input</p>
            <ChatInput
              placeholder="Ask about this project"
              onSubmit={() => {}}
              onAddClick={() => {}}
            />
          </div>

          {/* Active/Focused State */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Active (Focus)</h3>
            <p className={styles.hint}>Click inside to see action buttons</p>
            <ChatInput
              placeholder="Ask about this project"
              onSubmit={() => {}}
              onAddClick={() => {}}
              onContextClick={() => console.log('Context')}
              onCreateClick={() => console.log('Create')}
            />
          </div>

          {/* Filled State */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Filled</h3>
            <ChatInput
              value={filledValue}
              onChange={setFilledValue}
              onSubmit={() => console.log('Submit')}
              onAddClick={() => {}}
              onContextClick={() => console.log('Context')}
              onCreateClick={() => console.log('Create')}
            />
          </div>

          {/* Long Text */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Long Text</h3>
            <ChatInput
              value="This is a much longer text that will cause the textarea to expand. It will show a custom scrollbar when it gets really long. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              onSubmit={() => {}}
              onAddClick={() => {}}
            />
          </div>

          {/* Attachments Loading */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Attachments Loading</h3>
            <ChatInput
              value="Add this attachment to the note"
              onSubmit={() => {}}
              onAddClick={() => {}}
              attachments={attachments}
            />
          </div>

          {/* Quiz Variant */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Quiz Tool</h3>
            <p className={styles.hint}>Rich placeholder with purple accent</p>
            <ChatInput
              value={quizValue}
              onChange={setQuizValue}
              onSubmit={() => console.log('Submit quiz')}
              onAddClick={() => {}}
              aiTool="quiz"
            />
          </div>

          {/* Summary Variant */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Summary Tool</h3>
            <p className={styles.hint}>Rich placeholder with purple accent</p>
            <ChatInput
              value={summaryValue}
              onChange={setSummaryValue}
              onSubmit={() => console.log('Submit summary')}
              onAddClick={() => {}}
              aiTool="summary"
            />
          </div>

          {/* Create Variant */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Create Tool</h3>
            <p className={styles.hint}>Purple accent with source reference</p>
            <ChatInput
              value={createValue}
              onChange={setCreateValue}
              onSubmit={() => console.log('Submit create')}
              onAddClick={() => {}}
              aiTool="create"
            />
          </div>

          {/* Context Menu */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Context Menu</h3>
            <p className={styles.hint}>Click Context button to toggle</p>
            <ChatInput
              value="Select sources for context"
              onSubmit={() => {}}
              onAddClick={() => {}}
              onContextClick={() => setShowContext(!showContext)}
              onCreateClick={() => {}}
              sources={sources}
              showContextMenu={showContext}
              onSourceToggle={(id) => console.log('Toggle source:', id)}
            />
          </div>
        </div>

        {/* Info Section */}
        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>📋 Variant Details</h2>
            <div className={styles.variantList}>
              <div className={styles.variantItem}>
                <strong>Default:</strong> Basic input with placeholder
              </div>
              <div className={styles.variantItem}>
                <strong>Hover:</strong> Border color changes
              </div>
              <div className={styles.variantItem}>
                <strong>Active:</strong> Blue border with shadow, action buttons visible
              </div>
              <div className={styles.variantItem}>
                <strong>Filled:</strong> Text entered, send button active (black)
              </div>
              <div className={styles.variantItem}>
                <strong>Long Text:</strong> Auto-expands with scrollbar
              </div>
              <div className={styles.variantItem}>
                <strong>Attachments:</strong> Loading indicators with remove buttons
              </div>
              <div className={styles.variantItem}>
                <strong>Quiz/Summary/Create:</strong> Rich placeholder with purple accent (#f064fc)
              </div>
              <div className={styles.variantItem}>
                <strong>Context Menu:</strong> Sources dropdown with checkboxes
              </div>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>🎨 Design Specs</h2>
            <ul className={styles.specList}>
              <li>Border radius: 20px</li>
              <li>Padding: 12px</li>
              <li>Min height: 100px</li>
              <li>Border: 1px solid</li>
              <li>Font size: 16px (body), 14px (labels)</li>
              <li>Button height: 32px</li>
              <li>Gap: 8px (vertical), 4px (horizontal)</li>
              <li>Active border: #3092fa</li>
              <li>Purple accent: #f064fc</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>💡 Usage</h2>
            <pre className={styles.codeBlock}>
{`<ChatInput
  value={value}
  onChange={setValue}
  onSubmit={handleSend}
  onAddClick={handleAdd}
  onContextClick={handleContext}
  onCreateClick={handleCreate}
  aiTool="quiz"
  sources={sources}
  showContextMenu={showMenu}
  onSourceToggle={handleToggle}
  attachments={attachments}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

