/**
 * SourceList Type Definitions
 */

import type { Source, SourceRecommendation } from '@/types/course';

export interface SourceListProps {
  /**
   * Array of sources to display
   */
  sources: Source[];
  
  /**
   * Array of recommendations to show
   */
  recommendations?: SourceRecommendation[];
  
  /**
   * ID of currently active source
   */
  activeSourceId?: string;
  
  /**
   * Handler when source is clicked
   */
  onSourceClick: (source: Source) => void;
  
  /**
   * Handler when source is removed
   */
  onSourceRemove: (sourceId: string) => void;
  
  /**
   * Handler when recommendation is added
   */
  onAddRecommendation?: (rec: SourceRecommendation) => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
