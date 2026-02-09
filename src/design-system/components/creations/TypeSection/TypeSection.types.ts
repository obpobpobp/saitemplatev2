/**
 * TypeSection Type Definitions
 */

import type { CreationType } from '@/types/course';

export interface TypeSectionProps {
  /**
   * Creation type
   */
  type: CreationType;
  
  /**
   * Number of creations of this type
   */
  count: number;
  
  /**
   * Section content (CreationCards)
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
