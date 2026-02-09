import React from 'react';
import classNames from 'classnames';
import { SourceTileProps } from './SourceTile.types';
import { StatusChip } from '../StatusChip';
import { Spinner } from '../../../buttons/Spinner';
import styles from './SourceTile.module.css';

/**
 * SourceTile - Displays an individual source file item with multiple states
 * Used in the sidebar's Sources panel
 * 
 * @example
 * <SourceTile 
 *   title="Pharmacology Notes.pdf" 
 *   type="pdf"
 *   subtitle="Document"
 *   state="selected"
 *   onClick={handleClick}
 * />
 */
export const SourceTile: React.FC<SourceTileProps> = ({
  title,
  type,
  state = 'default',
  subtitle,
  icon,
  errorMessage,
  onClick,
  onMoreClick,
  onRetryClick,
  onCloseClick,
  className,
}) => {
  const handleMoreClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    onMoreClick?.(event);
  };

  const handleRetryClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    onRetryClick?.();
  };

  const handleCloseClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    onCloseClick?.();
  };

  // Default icons for each type (Font Awesome solid - free version)
  const getDefaultIcon = (): string => {
    const icons: Record<string, string> = {
      pdf: 'file',
      text: 'file-lines',
      video: 'video',
      audio: 'waveform-lines',
      image: 'image',
      slides: 'presentation-screen',
      link: 'link',
      studocu: 'graduation-cap',
    };
    return icons[type] || 'file';
  };

  const getSubtitle = (): string => {
    if (subtitle) return subtitle;
    
    const subtitles: Record<string, string> = {
      pdf: 'Document',
      text: 'Text',
      video: 'Video',
      audio: 'Audio',
      image: 'Image',
      slides: 'Slideshow',
      link: 'Link',
      studocu: 'Studocu',
    };
    return subtitles[type] || 'Document';
  };

  const isInteractive = onClick && state !== 'loading' && state !== 'error';

  return (
    <div
      className={classNames(
        styles.tile,
        styles[`state-${state}`],
        isInteractive && styles.clickable,
        className
      )}
      onClick={isInteractive ? onClick : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={isInteractive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
    >
      {/* Icon decoration */}
      <div className={styles.iconWrapper}>
        <div className={styles.iconBackground}>
          {state === 'loading' ? (
            <Spinner size="small" />
          ) : icon ? (
            icon
          ) : (
            <i className={`fa-solid fa-${getDefaultIcon()} ${styles.icon}`} aria-hidden="true" />
          )}
        </div>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.textContent}>
          {/* Title */}
          <p className={styles.title}>
            {state === 'error' && errorMessage ? errorMessage : title}
          </p>
          
          {/* Subtitle */}
          {state !== 'loading' && (
            <div className={styles.secondary}>
              <span className={styles.subtitle}>
                {state === 'error' && errorMessage ? 'Size cannot be larger than 10MB' : getSubtitle()}
              </span>
              {state === 'selected' && (
                <StatusChip 
                  variant="info"
                  icon={<i className="fa-solid fa-eye" aria-hidden="true" />}
                >
                  Viewing
                </StatusChip>
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        {state === 'error' ? (
          <div className={styles.errorActions}>
            {onRetryClick && (
              <button
                type="button"
                className={styles.retryButton}
                onClick={handleRetryClick}
                aria-label="Retry"
              >
                <i className="fa-solid fa-arrows-rotate" aria-hidden="true" />
              </button>
            )}
            {onCloseClick && (
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleCloseClick}
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            )}
          </div>
        ) : state !== 'loading' && onMoreClick && (
          <button
            type="button"
            className={styles.moreButton}
            onClick={handleMoreClick}
            aria-label="More options"
          >
            <i className="fa-solid fa-ellipsis-vertical" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};
