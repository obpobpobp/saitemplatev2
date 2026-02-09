'use client';

import React, { useState, useRef, DragEvent, ChangeEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { FileUploadAreaProps } from './FileUploadArea.types';
import styles from './FileUploadArea.module.css';

/**
 * FileUploadArea - Combined drag & drop and text input area
 * Used in onboarding for file uploads and text input
 * 
 * @example
 * <FileUploadArea 
 *   placeholder="Generate a mock exam of this content"
 *   contextTag="Add your course"
 *   onFileSelect={handleFileSelect}
 *   onSubmit={handleSubmit}
 * />
 */
export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  placeholder = 'Type your request...',
  value: controlledValue,
  onChange,
  onSubmit,
  onFileSelect,
  contextTag,
  showInput = true,
  isDisabled = false,
  className,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleDragEnter = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect?.(files);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      onFileSelect?.(files);
    }
  };

  const handleChooseFile = (): void => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleSubmit = (): void => {
    if (value.trim()) {
      onSubmit?.();
      if (controlledValue === undefined) {
        setInternalValue('');
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClearInput = (): void => {
    if (controlledValue === undefined) {
      setInternalValue('');
    }
    onChange?.('');
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      {/* Drag & Drop Area */}
      <div
        className={classNames(
          styles.dropZone,
          isDragging && styles.dragging
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className={styles.fileInput}
          onChange={handleFileInputChange}
          multiple
          aria-label="File upload"
        />
        
        <div className={styles.dropContent}>
          <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '48px', color: 'var(--color-text-subtle)' }} aria-hidden="true" />
          <h3 className={styles.dropTitle}>Drag & Drop anything</h3>
          <p className={styles.dropSubtitle}>
            Or{' '}
            <button
              type="button"
              className={styles.chooseFileButton}
              onClick={handleChooseFile}
            >
              choose file
            </button>
            {' '}from your device. Docs, images and text supported
          </p>
        </div>
      </div>

      {/* Input Area */}
      {showInput && (
        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              value={value}
              placeholder={placeholder}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isDisabled}
              aria-label="Text input"
            />
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClearInput}
              aria-label="Clear input"
              disabled={!value}
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>

            <div className={styles.spacer}>
              {contextTag && (
                <div className={styles.contextTag}>
                  <i className="fa-solid fa-pencil" aria-hidden="true" />
                  <span className={styles.contextLabel}>{contextTag}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              className={classNames(
                styles.submitButton,
                !value.trim() && styles.submitDisabled
              )}
              onClick={handleSubmit}
              disabled={!value.trim() || isDisabled}
              aria-label="Submit"
            >
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


