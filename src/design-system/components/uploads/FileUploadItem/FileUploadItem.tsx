'use client';

import React from 'react';
import classNames from 'classnames';
import { FileUploadItemProps, FileIconType } from './FileUploadItem.types';
import styles from './FileUploadItem.module.css';

/**
 * Helper function to determine file icon based on filename and mime type
 */
const getFileIcon = (filename: string, mimeType?: string): FileIconType => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  if (ext === 'pdf' || mimeType?.includes('pdf')) return 'file';
  if (['ppt', 'pptx', 'key'].includes(ext || '')) return 'slides';
  if (['mp4', 'mov', 'avi', 'webm'].includes(ext || '') || mimeType?.includes('video')) return 'video';
  if (['mp3', 'wav', 'm4a', 'ogg'].includes(ext || '') || mimeType?.includes('audio')) return 'microphone';
  if (filename.toLowerCase().includes('studocu')) return 'studocu-logo';
  
  return 'link'; // default for URLs and unknown types
};

/**
 * FileUploadItem - Displays an uploaded file with icon, name, and remove button
 */
export const FileUploadItem: React.FC<FileUploadItemProps> = ({
  file,
  onRemove,
  className,
}) => {
  const iconType = getFileIcon(file.name, file.type);
  const fileExtension = file.name.split('.').pop() || '';
  const fileName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

  const handleRemove = (): void => {
    onRemove?.(file.id);
  };

  const renderIcon = (): JSX.Element => {
    if (iconType === 'studocu-logo') {
      return (
        <div className={styles.studocuLogo}>
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z" fill="#0A0A0A"/>
          </svg>
        </div>
      );
    }

    if (iconType === 'slides') {
      return (
        <div className={styles.slidesIcon}>
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="7.5" width="32" height="7" rx="1" fill="#2f3e4e" opacity="0.4"/>
            <rect x="4.24" y="11.48" width="23.84" height="8.52" rx="1" fill="#2f3e4e"/>
            <rect x="2" y="4.48" width="36" height="29.05" rx="2" fill="none" stroke="#2f3e4e" strokeWidth="2"/>
          </svg>
        </div>
      );
    }

    // Font Awesome solid icons
    const iconClass = classNames('fa-solid', {
      'fa-file': iconType === 'file',
      'fa-link': iconType === 'link',
      'fa-video': iconType === 'video',
      'fa-microphone': iconType === 'microphone',
    });

    return <i className={classNames(iconClass, styles.icon)} />;
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.iconContainer}>
        {renderIcon()}
      </div>
      
      <div className={styles.filename}>
        <span className={styles.name}>{fileName}</span>
        <span className={styles.extension}>.{fileExtension}</span>
      </div>

      <button
        onClick={handleRemove}
        className={styles.removeButton}
        aria-label={`Remove ${file.name}`}
        type="button"
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
};


