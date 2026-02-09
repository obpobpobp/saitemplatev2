'use client';

import React from 'react';
import classNames from 'classnames';
import { SelectionToolbarProps } from './SelectionToolbar.types';
import styles from './SelectionToolbar.module.css';

/**
 * SelectionToolbar - Floating toolbar for text formatting
 * Appears when text is selected in the editor
 * 
 * @example
 * <SelectionToolbar 
 *   buttons={formatButtons}
 *   position={{ top: 100, left: 200 }}
 *   isVisible={true}
 *   separatorAfter={['explain']}
 * />
 */
export const SelectionToolbar: React.FC<SelectionToolbarProps> = ({
  buttons,
  position,
  isVisible = false,
  separatorAfter = [],
  className,
}) => {
  if (!isVisible) {
    return null;
  }

  const renderIcon = (icon: string | React.ReactNode): React.ReactNode => {
    if (typeof icon === 'string') {
      return <i className={`fa-solid fa-${icon}`} aria-hidden="true" />;
    }
    return icon;
  };

  return (
    <div
      className={classNames(styles.toolbar, className)}
      style={position ? { top: position.top, left: position.left } : undefined}
      role="toolbar"
      aria-label="Text formatting toolbar"
    >
      {buttons.map((button, index) => (
        <React.Fragment key={button.id}>
          <button
            type="button"
            className={classNames(
              styles.button,
              button.variant === 'primary' && styles.primary,
              button.variant === 'text' && styles.withText,
              button.isActive && styles.active,
              button.isDisabled && styles.disabled
            )}
            onClick={button.onClick}
            disabled={button.isDisabled}
            aria-label={button.label}
            aria-pressed={button.isActive}
          >
            {renderIcon(button.icon)}
            {button.variant === 'text' || button.variant === 'primary' ? (
              <span className={styles.labelText}>{button.label}</span>
            ) : null}
          </button>
          
          {separatorAfter.includes(button.id) && index < buttons.length - 1 && (
            <div className={styles.separator} aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};


