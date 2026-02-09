'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { ModalProps } from './Modal.types';
import styles from './Modal.module.css';

/**
 * Modal - Base modal component with backdrop and portal rendering
 * Handles focus trapping, body scroll lock, and escape/backdrop close
 * 
 * @example
 * <Modal isOpen={isOpen} onClose={handleClose} size="medium">
 *   <ModalHeader title="Add Sources" onClose={handleClose} />
 *   <ModalContent>
 *     Modal content here
 *   </ModalContent>
 *   <ModalFooter>
 *     <Button onClick={handleClose}>Cancel</Button>
 *     <Button variant="primary" onClick={handleSave}>Save</Button>
 *   </ModalFooter>
 * </Modal>
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'medium',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className,
  ariaLabel = 'Modal',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle body scroll lock and focus management
  useEffect(() => {
    if (!isOpen) return;

    // Store current active element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Lock body scroll
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Focus modal
    modalRef.current?.focus();

    return () => {
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      // Restore focus
      previousActiveElement.current?.focus();
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose?.();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className={styles.backdrop}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-label={ariaLabel}
    >
      <div
        ref={modalRef}
        className={classNames(
          styles.modal,
          styles[size],
          className
        )}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );

  // Render in portal
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
};







