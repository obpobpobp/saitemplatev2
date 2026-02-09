'use client';

import React from 'react';
import classNames from 'classnames';
import { FileAttachmentProps, FileType } from './FileAttachment.types';
import styles from './FileAttachment.module.css';

/**
 * FileAttachment - File tile component for chat attachments
 * Shows file icon and name in a compact tile format with rotation
 * 
 * @example
 * <FileAttachment 
 *   fileName="document.pdf"
 *   fileType="pdf"
 *   rotation={5}
 *   onClick={() => console.log('Open file')}
 * />
 */
export const FileAttachment: React.FC<FileAttachmentProps> = ({
  fileName,
  fileType = 'other',
  fileSize,
  onClick,
  rotation = 0,
  className,
}) => {
  // Map file types to Font Awesome solid icons
  const getFileIcon = (type: FileType): string => {
    switch (type) {
      case 'pdf':
        return 'fa-solid fa-file';
      case 'ppt':
        return 'fa-solid fa-presentation-screen';
      case 'doc':
        return 'fa-solid fa-file-word';
      case 'image':
        return 'fa-solid fa-file-image';
      case 'text':
        return 'fa-solid fa-text';
      default:
        return 'fa-solid fa-file';
    }
  };

  const iconClass = getFileIcon(fileType);

  return (
    <div
      className={classNames(styles.attachment, className)}
      onClick={onClick}
      style={{ transform: `rotate(${rotation}deg)` }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.iconSticker}>
        <div className={styles.iconBackground} />
        <i className={iconClass} aria-hidden="true" />
      </div>
      <div className={styles.content}>
        <span className={styles.fileName}>{fileName}</span>
        {fileSize && <span className={styles.fileSize}>{fileSize}</span>}
      </div>
    </div>
  );
};


