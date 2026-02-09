/**
 * Props for the CourseInfoCard component
 * 
 * Displays current course context in the chat interface.
 */
export interface CourseInfoCardProps {
  /**
   * Course code
   * @example 'Bio141-2273'
   */
  courseCode: string;
  
  /**
   * Course name
   * @example 'Human Physiology'
   */
  courseName: string;
  
  /**
   * University name
   * @example 'UVA'
   */
  university: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}
