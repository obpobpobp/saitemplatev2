/**
 * Toast Component
 * 
 * Notification toast for user feedback.
 */

'use client';

import { useEffect } from 'react';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  const getIcon = () => {
    switch (type) {
      case 'success': return 'fa-check-circle';
      case 'error': return 'fa-exclamation-circle';
      case 'warning': return 'fa-exclamation-triangle';
      case 'info': return 'fa-info-circle';
    }
  };
  
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <i className={`fa-solid ${getIcon()}`} />
      <span className={styles.message}>{message}</span>
      <button className={styles.close} onClick={onClose} aria-label="Close">
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
}
