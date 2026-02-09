/**
 * InlineActionsWidget - React component rendered inside TipTap editor
 * Shows action buttons on empty lines using design system components
 */

'use client';

import React from 'react';
import { Button } from '@/design-system/components/buttons/Button';
import { Icon } from '@/design-system/components/buttons/Icon';
import styles from './InlineActionsWidget.module.css';

interface InlineActionsWidgetProps {
  onGenerateSummary?: () => void;
  onCreateQuiz?: () => void;
  onAskQuestion?: () => void;
  onRecordClass?: () => void;
}

/**
 * Widget component that renders inline action buttons
 * Uses design system Button component with secondary/gray/medium styling
 */
export const InlineActionsWidget: React.FC<InlineActionsWidgetProps> = ({
  onGenerateSummary,
  onCreateQuiz,
  onAskQuestion,
  onRecordClass,
}) => {
  return (
    <div className={styles.container}>
      <Button
        variant="secondary"
        color="gray"
        size="medium"
        leftIcon={<Icon name="pen-nib" size="medium" />}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onGenerateSummary?.();
        }}
      >
        Generate a summary
      </Button>

      <Button
        variant="secondary"
        color="gray"
        size="medium"
        leftIcon={<Icon name="circle-question" size="medium" />}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onCreateQuiz?.();
        }}
      >
        Create a quiz
      </Button>

      <Button
        variant="secondary"
        color="gray"
        size="medium"
        leftIcon={<Icon name="comment" size="medium" />}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAskQuestion?.();
        }}
      >
        Ask a question
      </Button>

      <Button
        variant="secondary"
        color="gray"
        size="medium"
        leftIcon={<Icon name="microphone" size="medium" />}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRecordClass?.();
        }}
      >
        Record my class
      </Button>
    </div>
  );
};

