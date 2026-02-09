'use client';

import React from 'react';
import classNames from 'classnames';
import { AssistantMessageProps } from './AssistantMessage.types';
import styles from './AssistantMessage.module.css';

/**
 * AssistantMessage - Message bubble for onboarding assistant
 * Uses specific border radius for message sequences
 * 
 * @example
 * <AssistantMessage position="first">
 *   To generate a mock exam, why don't you <strong>upload something</strong>?
 * </AssistantMessage>
 */
export const AssistantMessage: React.FC<AssistantMessageProps> = ({
  children,
  position = 'single',
  className,
}) => {
  return (
    <div
      className={classNames(
        styles.message,
        styles[position],
        className
      )}
    >
      {children}
    </div>
  );
};







