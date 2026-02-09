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
  const [messages, setMessages] = useState<Message[]>([
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
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = (message: string): void => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsThinking(true);
    
    // Simulate AI response with variable delay
    const responseDelay = Math.floor(Math.random() * 1500) + 1000; // 1-2.5s
    
    setTimeout(() => {
      const aiMessage: Message = {
        role: 'assistant',
        content: `Here's a helpful response to your question: "${message}"\n\nI can help you with study materials, creating quizzes, generating summaries, or answering questions about your course content. What would you like to focus on?`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, responseDelay);
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
              onAddClick={() => console.log('Add clicked')}
              inline={true}
              isThinking={isThinking}
            />
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>✨ Animation Features</h2>
              <ul className={styles.featureList}>
                <li>
                  <strong>Typing Effect:</strong> Character-by-character text streaming
                </li>
                <li>
                  <strong>Thinking State:</strong> Avatar pulse animation while processing
                </li>
                <li>
                  <strong>Message Animations:</strong> Subtle fade + slide up on appearance
                </li>
                <li>
                  <strong>Input States:</strong> Processing/disabled with visual feedback
                </li>
                <li>
                  <strong>Micro-interactions:</strong> Hover effects, cursor blink
                </li>
                <li>
                  <strong>Accessibility:</strong> Reduced motion support
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
              <h2 className={styles.infoTitle}>📦 New Components</h2>
              <ul className={styles.shortcutList}>
                <li>
                  <code>TypingIndicator</code> - Pulsing avatar with thinking state
                </li>
                <li>
                  <code>useTypingEffect</code> - Custom hook for text streaming
                </li>
                <li>
                  <code>ChatMessage</code> - Enhanced with typing animation
                </li>
                <li>
                  <code>ChatInput</code> - Processing state with spinner
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


