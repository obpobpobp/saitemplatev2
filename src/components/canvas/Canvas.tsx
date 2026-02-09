/**
 * Canvas Component
 * 
 * Main content area that switches between different views based on canvas content state.
 */

'use client';

import { useCourse } from '@/contexts/CourseContext';
import { CanvasSuggestions } from './CanvasSuggestions';
import { CanvasLoading } from './CanvasLoading';
import { CanvasQuiz } from './CanvasQuiz';
import styles from './Canvas.module.css';

export function Canvas() {
  const { canvasContent } = useCourse();
  
  return (
    <div className={styles.canvas}>
      {canvasContent.type === 'suggestions' && <CanvasSuggestions />}
      {canvasContent.type === 'loading' && <CanvasLoading message={canvasContent.message} />}
      {/* Other canvas types will be implemented in Phase 4 */}
      {canvasContent.type === 'source' && (
        <div className={styles.placeholder}>
          <p>Source preview will be implemented next</p>
        </div>
      )}
      {canvasContent.type === 'creation' && (
        <div className={styles.placeholder}>
          <p>Creation view will be implemented in Phase 4</p>
        </div>
      )}
      {canvasContent.type === 'quiz-active' && <CanvasQuiz quiz={canvasContent.quiz} />}
    </div>
  );
}
