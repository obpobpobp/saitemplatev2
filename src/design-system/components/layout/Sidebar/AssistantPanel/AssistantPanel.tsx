'use client';

import React from 'react';
import classNames from 'classnames';
import { ChatWindow } from '@design-system/components/chat/ChatWindow';
import { CourseInfoCard } from '@design-system/components/chat/CourseInfoCard';
import type { AssistantPanelProps } from './AssistantPanel.types';
import styles from './AssistantPanel.module.css';

/**
 * AssistantPanel - Wrapper for ChatWindow in sidebar
 * 
 * Displays the Study Assistant chat interface within the sidebar
 * tab panel. Uses ChatWindow in inline mode.
 * 
 * Features:
 * - Wraps ChatWindow with panel styling
 * - Always open (no slide animation in sidebar)
 * - Fits sidebar width (400px)
 * - Consistent with other sidebar panels
 * 
 * @example
 * ```tsx
 * <AssistantPanel 
 *   messages={messages}
 *   onSendMessage={handleSendMessage}
 *   suggestedActions={actions}
 * />
 * ```
 */
export const AssistantPanel: React.FC<AssistantPanelProps> = ({
  messages = [],
  suggestedActions = [],
  onSendMessage,
  onActionClick,
  onAddClick,
  onContextClick,
  onCreateClick,
  onSourceToggle,
  aiTool = 'ask-ai',
  sources = [],
  showContextMenu = false,
  attachments = [],
  courseInfo,
  className,
}) => {
  return (
    <div 
      className={classNames(styles.panel, className)}
      role="tabpanel"
      id="assistant-panel"
      aria-labelledby="assistant-tab"
    >
      {courseInfo && (
        <CourseInfoCard
          courseCode={courseInfo.courseCode}
          courseName={courseInfo.courseName}
          university={courseInfo.university}
        />
      )}
      <ChatWindow
        isOpen={true}
        onClose={() => {}} // No-op in sidebar mode
        messages={messages}
        suggestedActions={suggestedActions}
        onSendMessage={onSendMessage}
        onActionClick={onActionClick}
        onAddClick={onAddClick}
        onContextClick={onContextClick}
        onCreateClick={onCreateClick}
        onSourceToggle={onSourceToggle}
        aiTool={aiTool}
        sources={sources}
        showContextMenu={showContextMenu}
        attachments={attachments}
        inline={true}
      />
    </div>
  );
};
