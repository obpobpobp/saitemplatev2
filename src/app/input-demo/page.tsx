'use client';

import React, { useState } from 'react';
import { ChatInput } from '@/design-system/components/chat';
import type { ContextTag } from '@/design-system/components/chat/ChatInput/ChatInput.types';
import styles from './page.module.css';

/**
 * ChatInput Demo Page
 * Showcases all the different states and variants of the ChatInput component
 */
export default function InputDemoPage(): JSX.Element {
  const [defaultValue, setDefaultValue] = useState('');
  const [quizValue, setQuizValue] = useState('');
  const [summaryValue, setSummaryValue] = useState('');
  const [flashcardsValue, setFlashcardsValue] = useState('');
  const [filledValue, setFilledValue] = useState('What is phenomenology');

  const contextTags: ContextTag[] = [
    {
      id: '1',
      label: 'Context',
      icon: 'fa-solid fa-sparkles',
    },
    {
      id: '2',
      label: 'Create',
      icon: 'fa-solid fa-wand-magic-sparkles',
    },
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
            <h3 className={styles.demoTitle}>Default</h3>
            <ChatInput
              value={defaultValue}
              onChange={setDefaultValue}
              onSubmit={() => console.log('Submit default')}
              onAttach={() => console.log('Attach')}
              placeholder="Ask about this project"
            />
          </div>

          {/* Hover State - shown via CSS */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Hover</h3>
            <p className={styles.hint}>Hover over the input to see the effect</p>
            <ChatInput
              placeholder="Ask about this project"
              onSubmit={() => {}}
              onAttach={() => {}}
            />
          </div>

          {/* Active/Focused State */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Active (Focus)</h3>
            <p className={styles.hint}>Click inside to see blue border</p>
            <ChatInput
              placeholder="Ask about this project"
              onSubmit={() => {}}
              onAttach={() => {}}
            />
          </div>

          {/* Filled State */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Filled</h3>
            <ChatInput
              value={filledValue}
              onChange={setFilledValue}
              onSubmit={() => console.log('Submit filled')}
              onAttach={() => console.log('Attach')}
            />
          </div>

          {/* With Context Tags */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>With Context Tags</h3>
            <ChatInput
              value="Ask about the syllabus"
              onSubmit={() => {}}
              onAttach={() => {}}
              contextTags={contextTags}
            />
          </div>

          {/* With Action Buttons */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>With Action Buttons</h3>
            <p className={styles.hint}>Click or type to see Context & Create buttons</p>
            <ChatInput
              value="Type something..."
              onSubmit={() => {}}
              onAttach={() => {}}
              onContext={() => console.log('Context clicked')}
              onCreate={() => console.log('Create clicked')}
            />
          </div>

          {/* Loading Attachments */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Attachments Loading</h3>
            <ChatInput
              value="Add this attachment to the note"
              onSubmit={() => {}}
              onAttach={() => {}}
              isLoadingAttachments={true}
            />
          </div>

          {/* Quiz Variant */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Quiz Tool</h3>
            <p className={styles.hint}>Purple text variant</p>
            <ChatInput
              value={quizValue}
              onChange={setQuizValue}
              onSubmit={() => console.log('Submit quiz')}
              onAttach={() => {}}
              aiTool="quiz"
            />
          </div>

          {/* Summary Variant */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Summary Tool</h3>
            <p className={styles.hint}>Purple text variant</p>
            <ChatInput
              value={summaryValue}
              onChange={setSummaryValue}
              onSubmit={() => console.log('Submit summary')}
              onAttach={() => {}}
              aiTool="summary"
            />
          </div>

          {/* Flashcards Variant */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>Flashcards Tool</h3>
            <p className={styles.hint}>Purple text variant</p>
            <ChatInput
              value={flashcardsValue}
              onChange={setFlashcardsValue}
              onSubmit={() => console.log('Submit flashcards')}
              onAttach={() => {}}
              aiTool="flashcards"
              onContext={() => console.log('Context')}
              onCreate={() => console.log('Create')}
            />
          </div>

          {/* All Features Combined */}
          <div className={styles.demoItem}>
            <h3 className={styles.demoTitle}>All Features</h3>
            <p className={styles.hint}>Context tags + Actions + Loading</p>
            <ChatInput
              value="Ask about 22 sources"
              onSubmit={() => {}}
              onAttach={() => {}}
              onContext={() => {}}
              onCreate={() => {}}
              contextTags={contextTags}
              isLoadingAttachments={true}
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
                <strong>Hover:</strong> Border color changes to #b8c5d0
              </div>
              <div className={styles.variantItem}>
                <strong>Active:</strong> Blue border (#3092fa) with shadow
              </div>
              <div className={styles.variantItem}>
                <strong>Filled:</strong> Contains text, send button enabled
              </div>
              <div className={styles.variantItem}>
                <strong>Quiz/Summary/Flashcards:</strong> Purple text (#9c27b0)
              </div>
              <div className={styles.variantItem}>
                <strong>Context Tags:</strong> Chip-style tags with remove buttons
              </div>
              <div className={styles.variantItem}>
                <strong>Action Buttons:</strong> Context & Create buttons appear when focused
              </div>
              <div className={styles.variantItem}>
                <strong>Loading:</strong> Animated dots show attachment processing
              </div>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>🎨 Design Specs</h2>
            <ul className={styles.specList}>
              <li>Border radius: 20px</li>
              <li>Padding: 12px</li>
              <li>Border: 1px solid #d3d9e0</li>
              <li>Font size: 16px (body), 14px (labels)</li>
              <li>Button height: 32px</li>
              <li>Gap: 8px (vertical), 4px (horizontal)</li>
              <li>Hover border: #b8c5d0</li>
              <li>Active border: #3092fa</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>💡 Usage</h2>
            <pre className={styles.codeBlock}>
{`<ChatInput
  value={value}
  onChange={setValue}
  onSubmit={handleSend}
  onAttach={handleAttach}
  onContext={handleContext}
  onCreate={handleCreate}
  aiTool="quiz"
  contextTags={tags}
  isLoadingAttachments={loading}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

