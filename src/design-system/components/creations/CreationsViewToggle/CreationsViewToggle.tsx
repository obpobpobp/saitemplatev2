/**
 * CreationsViewToggle - Segmented control for view switching
 */

'use client';

import classNames from 'classnames';
import type { CreationsViewToggleProps } from './CreationsViewToggle.types';
import type { CreationsViewMode } from '@/types/course';
import styles from './CreationsViewToggle.module.css';

const VIEW_OPTIONS: { value: CreationsViewMode; label: string }[] = [
  { value: 'recent', label: 'Recent' },
  { value: 'exam', label: 'Exam' },
  { value: 'type', label: 'Type' },
];

export const CreationsViewToggle: React.FC<CreationsViewToggleProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div 
      className={classNames(styles.toggle, className)}
      role="tablist"
      aria-label="View mode selection"
    >
      {VIEW_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          aria-controls={`${option.value}-view`}
          className={classNames(
            styles.button,
            value === option.value && styles.isActive
          )}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

CreationsViewToggle.displayName = 'CreationsViewToggle';
