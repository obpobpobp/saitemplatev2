'use client';

import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { DragDropAreaProps } from './DragDropArea.types';
import { FileUploadItem } from '../FileUploadItem';
import { AddFileButton } from '../AddFileButton';
import styles from './DragDropArea.module.css';

/**
 * DragDropArea - Drag & drop file upload area with grid display
 * Shows empty state or uploaded files grid
 */
export const DragDropArea: React.FC<DragDropAreaProps> = ({
  files = [],
  onUpload,
  onRemoveFile,
  onAddMore,
  accept = '.pdf,.txt,.png,.jpg,.jpeg,.doc,.docx,.ppt,.pptx',
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = true,
  isMobile = false,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasFiles = files.length > 0;

  const handleDragEnter = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
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

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]): void => {
    const validFiles = newFiles.filter(file => file.size <= maxSize);
    if (validFiles.length > 0) {
      onUpload?.(validFiles);
    }
  };

  const handleChooseFile = (): void => {
    fileInputRef.current?.click();
  };

  const handleAddMore = (): void => {
    onAddMore?.();
    fileInputRef.current?.click();
  };

  return (
    <div
      className={classNames(
        styles.container,
        {
          [styles.dragging]: isDragging,
          [styles.hasFiles]: hasFiles,
          [styles.mobile]: isMobile,
        },
        className
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.content}>
        {!hasFiles ? (
          <div className={styles.emptyState}>
            <i className="fa-solid fa-cloud-arrow-up" />
            <h3 className={styles.title}>
              {isMobile ? 'Upload anything' : 'Drag & Drop anything'}
            </h3>
            <p className={styles.description}>
              {isMobile ? (
                'Supported file types: PDF, images, text'
              ) : (
                <>
                  Or{' '}
                  <button
                    type="button"
                    onClick={handleChooseFile}
                    className={styles.chooseButton}
                  >
                    choose file
                  </button>
                  {' '}from your device. Docs, images and text supported
                </>
              )}
            </p>
          </div>
        ) : (
          <div className={styles.filesGrid}>
            {files.map((file) => (
              <FileUploadItem
                key={file.id}
                file={file}
                onRemove={onRemoveFile}
              />
            ))}
            <AddFileButton onClick={handleAddMore} />
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className={styles.hiddenInput}
      />
    </div>
  );
};


