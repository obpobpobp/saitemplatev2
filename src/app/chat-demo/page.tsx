'use client';

import React, { useState } from 'react';
import { ChatWindow } from '@/design-system/components/chat';
import type { Message } from '@/design-system/components/chat/ChatWindow/ChatWindow.types';
import styles from './page.module.css';

/**
 * Chat Demo Page
 * Showcases the Study Assistant panel with 100% Figma fidelity
 */
export default function ChatDemoPage(): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);
  
  const messages: Message[] = [
    {
      role: 'assistant',
      content: `I will prepared a mock exam for you. It covered these topics from this course. I have the syllabus on Studocu, you gave me this, and I will use other student's mock exams from this same course. Do you want me to adjust anything before starting? `,
      attachments: [
        {
          name: 'class_slides.pptx',
          type: 'ppt',
        },
        {
          name: 'Pasted text',
          type: 'text',
        },
        {
          name: 'Bauman_Liquid_modernity.pdf',
          type: 'pdf',
        },
      ],
    },
  ];

  const handleSendMessage = (message: string): void => {
    console.log('Send message:', message);
  };

  const handleActionClick = (action: string): void => {
    console.log('Action clicked:', action);
  };

  const suggestedActions = [
    {
      label: 'Upload my materials',
      action: 'upload',
    },
    {
      label: 'Find materials from other students',
      action: 'find',
    },
    {
      label: 'Set my study goal',
      action: 'goal',
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Study Assistant - Figma Fidelity</h1>
          <p className={styles.subtitle}>
            100% faithful implementation of the Figma design
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.demoSection}>
          <div className={styles.chatContainer}>
            <ChatWindow
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              messages={messages}
              suggestedActions={suggestedActions}
              onSendMessage={handleSendMessage}
              onActionClick={handleActionClick}
              onAttach={() => console.log('Attach clicked')}
              inline={true}
            />
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>✅ Input Variants</h2>
              <ul className={styles.featureList}>
                <li>
                  <strong>States:</strong> Default, Hover, Active, Filled
                </li>
                <li>
                  <strong>AI Tools:</strong> Quiz, Summary, Flashcards (purple text)
                </li>
                <li>
                  <strong>Features:</strong> Context tags, Action buttons, Loading
                </li>
                <li>
                  <strong>Interactions:</strong> Focus state with blue border
                </li>
                <li>
                  <strong>Typography:</strong> 16px body, 14px labels
                </li>
                <li>
                  <strong>Buttons:</strong> 32px height with proper icons
                </li>
              </ul>
            </div>

            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>🎨 Design Details</h2>
              <ul className={styles.stepList}>
                <li>Chat panel: 400px width, 20px padding</li>
                <li>Avatar: 43px circular</li>
                <li>File cards: 215px width, 12px padding, 12px radius</li>
                <li>Button heights: 32px (icon), 40px (action)</li>
                <li>Typography: 18px title, 16px body, 14px labels</li>
              </ul>
            </div>

            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>📦 Updated Components</h2>
              <ul className={styles.shortcutList}>
                <li>
                  <code>ChatWindow</code> - Stacked attachments layout
                </li>
                <li>
                  <code>FileAttachment</code> - Icon sticker with rotation
                </li>
                <li>
                  <code>ChatInput</code> - Exact Figma dimensions
                </li>
                <li>
                  <code>ActionButton</code> - Proper sizing & spacing
                </li>
              </ul>
            </div>

            {!isOpen && (
              <div className={styles.infoCard}>
                <button
                  className={styles.reopenButton}
                  onClick={() => setIsOpen(true)}
                >
                  Reopen Chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


