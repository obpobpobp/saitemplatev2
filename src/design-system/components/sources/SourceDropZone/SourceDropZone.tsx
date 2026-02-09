/**
 * SourceDropZone - Upload entry point
 * 
 * Drag-and-drop zone for file uploads with browse Studocu option.
 */

'use client';

import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import type { SourceDropZoneProps } from './SourceDropZone.types';
import styles from './SourceDropZone.module.css';

const ACCEPTED_TYPES = ['.pdf', '.doc', '.docx', '.txt', '.png', '.jpg', '.jpeg'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const SourceDropZone: React.FC<SourceDropZoneProps> = ({
  onFilesSelected,
  onBrowseStudocu,
  isUploading = false,
  uploadProgress = 0,
  className,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(f => f.size <= MAX_FILE_SIZE);
    
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  }, [onFilesSelected]);
  
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);
  
  const handleDropZoneClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  return (
    <div
      className={classNames(
        styles.zone,
        isDragOver && styles.isDragOver,
        isUploading && styles.isUploading,
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        multiple
        onChange={handleFileSelect}
        className={styles.fileInput}
        aria-label="Select files to upload"
      />
      
      {isUploading ? (
        <>
          <div className={styles.icon}>⏳</div>
          <div className={styles.title}>Adding...</div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.icon}>⬆</div>
          <div className={styles.title}>Add this week's materials</div>
          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleDropZoneClick}
              className={styles.actionLink}
            >
              Drop files
            </button>
            <span className={styles.separator}>·</span>
            <button
              type="button"
              onClick={onBrowseStudocu}
              className={styles.actionLink}
            >
              Browse Studocu
            </button>
          </div>
        </>
      )}
    </div>
  );
};

SourceDropZone.displayName = 'SourceDropZone';
