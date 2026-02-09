'use client';

import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { DragDropUploadProps } from './DragDropUpload.types';
import styles from './DragDropUpload.module.css';

/**
 * DragDropUpload - File upload with drag & drop
 * @example
 * <DragDropUpload 
 *   accept=".pdf,.doc,.txt"
 *   onUpload={(files) => handleUpload(files)}
 *   multiple
 * />
 */
export const DragDropUpload: React.FC<DragDropUploadProps> = ({
  accept = '.pdf,.txt,.png,.jpg,.jpeg,.doc,.docx',
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = true,
  onUpload,
  className,
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]): void => {
    // Filter by size
    const validFiles = files.filter(file => file.size <= maxSize);
    
    if (validFiles.length > 0) {
      onUpload?.(validFiles);
    }
  };

  const handleChooseFile = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={classNames(
        styles.container,
        {
          [styles.dragging]: isDragging,
          [styles.disabled]: disabled,
        },
        className
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <i className="fa-solid fa-cloud-arrow-up" />
        </div>
        
        <h3 className={styles.title}>Drag & Drop files</h3>
        
        <p className={styles.description}>
          Or{' '}
          <button
            type="button"
            className={styles.chooseButton}
            onClick={handleChooseFile}
            disabled={disabled}
          >
            choose file
          </button>
          {' '}from your device
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className={styles.hiddenInput}
        disabled={disabled}
      />
    </div>
  );
};







