/**
 * SourceRecommendation Type Definitions
 */

import type { SourceRecommendation } from '@/types/course';

export interface SourceRecommendationProps {
  /**
   * Recommendation data
   */
  recommendation: SourceRecommendation;
  
  /**
   * Handler when user adds recommendation
   */
  onAdd: () => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
