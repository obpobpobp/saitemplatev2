import { ReactNode, ElementType } from 'react';

/**
 * Text component props
 */
export interface TextProps {
  /**
   * Text variant style
   * @default 'body-md'
   */
  variant?: 'body-lg' | 'body-md' | 'body-sm' | 'caption' | 'label';

  /**
   * Text content
   */
  children: ReactNode;

  /**
   * Optional additional CSS class
   */
  className?: string;

  /**
   * Polymorphic element type
   * @default 'p'
   */
  as?: ElementType;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
}







