/**
 * Types for QuizConfigModal component
 * 
 * Progressive disclosure modal for quiz configuration options.
 */

export interface QuizConfigModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Number of questions available
   */
  availableQuestions: number;

  /**
   * Topics covered by the quiz
   */
  topics: string[];

  /**
   * Number of sources analyzed
   */
  sourceCount: number;

  /**
   * Callback when quiz is confirmed
   */
  onConfirm: (questionCount: number) => void;

  /**
   * Callback when modal is closed
   */
  onClose: () => void;

  /**
   * Recommended question count (intelligent default)
   */
  recommendedCount?: number;
}

export type QuestionCountOption = 15 | 30;
