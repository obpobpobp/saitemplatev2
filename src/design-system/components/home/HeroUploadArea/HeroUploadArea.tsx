'use client';

import React, { useState } from 'react';
import classNames from 'classnames';
import { HeroUploadAreaProps } from './HeroUploadArea.types';
import { DragDropArea } from '../../uploads/DragDropArea';
import { TypingArea } from '../../inputs/TypingArea';
import { UploadedFile } from '../../uploads/FileUploadItem/FileUploadItem.types';
import styles from './HeroUploadArea.module.css';

/**
 * HeroUploadArea - Complete hero upload composition
 * Combines DragDropArea + TypingArea with full state management
 * Used as the main hero section on the home page
 */
export const HeroUploadArea: React.FC<HeroUploadAreaProps> = ({
  files: controlledFiles,
  question: controlledQuestion,
  onUpload,
  onRemoveFile,
  onSubmit,
  onQuestionChange,
  onAddContext,
  isMobile = false,
  className,
}) => {
  // Internal state for uncontrolled mode
  const [internalFiles, setInternalFiles] = useState<UploadedFile[]>([]);
  const [internalQuestion, setInternalQuestion] = useState('');

  // Use controlled or internal state
  const files = controlledFiles !== undefined ? controlledFiles : internalFiles;
  const question = controlledQuestion !== undefined ? controlledQuestion : internalQuestion;

  const handleUpload = (newFiles: File[]): void => {
    if (onUpload) {
      onUpload(newFiles);
    } else {
      // Convert Files to UploadedFile format
      const uploadedFiles: UploadedFile[] = newFiles.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setInternalFiles(prev => [...prev, ...uploadedFiles]);
    }
  };

  const handleRemoveFile = (fileId: string): void => {
    if (onRemoveFile) {
      onRemoveFile(fileId);
    } else {
      setInternalFiles(prev => prev.filter(f => f.id !== fileId));
    }
  };

  const handleQuestionChange = (value: string): void => {
    if (onQuestionChange) {
      onQuestionChange(value);
    } else {
      setInternalQuestion(value);
    }
  };

  const handleClear = (): void => {
    if (onQuestionChange) {
      onQuestionChange('');
    } else {
      setInternalQuestion('');
    }
  };

  const handleSubmit = (): void => {
    if (question.trim()) {
      onSubmit?.();
    }
  };

  return (
    <div className={classNames(styles.container, { [styles.mobile]: isMobile }, className)}>
      <DragDropArea
        files={files}
        onUpload={handleUpload}
        onRemoveFile={handleRemoveFile}
        isMobile={isMobile}
      />
      <TypingArea
        value={question}
        onChange={handleQuestionChange}
        onSubmit={handleSubmit}
        onClear={handleClear}
        onAddContext={onAddContext}
        isMobile={isMobile}
      />
    </div>
  );
};
