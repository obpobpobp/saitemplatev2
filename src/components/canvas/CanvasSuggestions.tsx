/**
 * CanvasSuggestions Component
 * 
 * Smart suggestions view applying cognitive load reduction principles:
 * - Progressive disclosure (quiz options in modal)
 * - Visual hierarchy (quiz card primary)
 * - Choice architecture (intelligent defaults)
 * - Processing fluency (clear, actionable language)
 */

'use client';

import { useState } from 'react';
import { useCourse } from '@/contexts/CourseContext';
import type { SmartSuggestion } from '@/types/course';
import { QuizConfigModal } from './QuizConfigModal';
import styles from './CanvasSuggestions.module.css';

export function CanvasSuggestions() {
  const { course, totalSources, possibleQuestions, possibleWords, topics, setCanvasContent } = useCourse();
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  
  if (!course) return null;
  
  // Calculate intelligent default for question count
  const getRecommendedQuestionCount = (): number => {
    if (totalSources >= 5) return 30; // More content = longer quiz
    if (totalSources >= 3) return 30; // Moderate content
    return 15; // Default to quick session
  };

  const recommendedCount = getRecommendedQuestionCount();
  
  // Generate smart suggestions based on available sources
  const suggestions: SmartSuggestion[] = [
    {
      type: 'quiz',
      title: 'Start Quiz',
      description: 'Test your understanding with personalized questions',
      metrics: totalSources > 0 ? 'Quiz ready to start' : 'Add sources to unlock',
      topics: topics.slice(0, 3),
      available: totalSources > 0,
      unlockCondition: totalSources === 0 ? 'Add sources to unlock' : undefined,
      isPrimary: true, // Visual hierarchy marker
    },
    {
      type: 'summary',
      title: 'Create Summary',
      description: 'Get a comprehensive overview of all materials',
      metrics: `${Math.ceil(totalSources)} ${totalSources === 1 ? 'source' : 'sources'} available`,
      available: totalSources > 0,
      unlockCondition: totalSources === 0 ? 'Add sources to unlock' : undefined,
      isPrimary: false,
    },
    {
      type: 'gap-analysis',
      title: 'Analyze Gaps',
      description: 'Identify areas that need more attention',
      metrics: totalSources >= 3 ? 'Analysis ready' : 'Add more sources',
      available: totalSources >= 3,
      unlockCondition: totalSources < 3 ? `Add ${3 - totalSources} more ${3 - totalSources === 1 ? 'source' : 'sources'}` : undefined,
      isPrimary: false,
    },
  ];
  
  const handleSuggestionClick = (suggestion: SmartSuggestion) => {
    if (!suggestion.available) return;
    
    // Progressive disclosure: show modal for quiz
    if (suggestion.type === 'quiz') {
      setIsQuizModalOpen(true);
      return;
    }
    
    // Direct action for other types
    handleGenerateContent(suggestion.type);
  };

  const handleQuizConfirm = async (questionCount: number) => {
    await handleGenerateContent('quiz', questionCount);
  };

  const handleGenerateContent = async (type: string, questionCount?: number) => {
    // Enhanced loading state with progress perception
    setCanvasContent({
      type: 'loading',
      message: type === 'quiz' 
        ? 'Analyzing your materials...'
        : `Generating ${type.replace('-', ' ')}...`,
    });
    
    try {
      if (type === 'quiz') {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'quiz',
            courseName: course.name,
            sources: course.libraryDocs.map(doc => ({ name: doc.name, covers: doc.covers })),
            questionCount: questionCount || recommendedCount,
          }),
        });
        
        const data = await response.json();
        
        setCanvasContent({
          type: 'quiz-active',
          quiz: { questions: data.questions },
        });
      }
      // Other types will be handled next
    } catch (error) {
      console.error('Generation error:', error);
      setCanvasContent({ type: 'suggestions' });
    }
  };
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Ready to study {course.name}?</h2>
          <p className={styles.subtitle}>
            {totalSources > 0 
              ? `${totalSources} ${totalSources === 1 ? 'document' : 'documents'} analyzed and ready`
              : 'Upload documents to get started'
            }
          </p>
        </div>
        
        <div className={styles.suggestions}>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.type}
              className={`${styles.card} ${!suggestion.available ? styles.locked : ''} ${suggestion.isPrimary ? styles.primary : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={!suggestion.available}
              aria-label={`${suggestion.title}: ${suggestion.description}`}
              aria-disabled={!suggestion.available}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>
                  {suggestion.type === 'quiz' && (
                    <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
                  )}
                  {suggestion.type === 'summary' && (
                    <i className="fa-solid fa-file-lines" aria-hidden="true" />
                  )}
                  {suggestion.type === 'gap-analysis' && (
                    <i className="fa-solid fa-chart-line" aria-hidden="true" />
                  )}
                </div>
                
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>
                    {suggestion.title}
                    {suggestion.isPrimary && suggestion.available && (
                      <span className={styles.recommendedLabel}>
                        <i className="fa-solid fa-star" aria-hidden="true" />
                        Recommended
                      </span>
                    )}
                  </h3>
                  <p className={styles.cardDescription}>{suggestion.description}</p>
                  
                  {suggestion.available ? (
                    <div className={styles.cardInfo}>
                      <div className={styles.metricsRow}>
                        <i className="fa-solid fa-circle-check" aria-hidden="true" />
                        <span className={styles.metrics}>{suggestion.metrics}</span>
                      </div>
                      {suggestion.topics && suggestion.topics.length > 0 && (
                        <div className={styles.topicsPreview} title={topics.join(', ')}>
                          <i className="fa-solid fa-tags" aria-hidden="true" />
                          <span>{suggestion.topics.slice(0, 2).join(', ')}</span>
                          {suggestion.topics.length > 2 && (
                            <span className={styles.topicsMore}>+{suggestion.topics.length - 2} more</span>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={styles.lockMessage}>
                      <i className="fa-solid fa-lock" aria-hidden="true" />
                      {suggestion.unlockCondition}
                    </div>
                  )}
                </div>

                {suggestion.available && (
                  <div className={styles.cardAction}>
                    <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {totalSources > 0 && (
          <p className={styles.helpText}>
            <i className="fa-solid fa-lightbulb" aria-hidden="true" />
            Tip: Start with a quick quiz to identify your strengths and gaps
          </p>
        )}
      </div>

      <QuizConfigModal
        isOpen={isQuizModalOpen}
        availableQuestions={possibleQuestions}
        topics={topics}
        sourceCount={totalSources}
        onConfirm={handleQuizConfirm}
        onClose={() => setIsQuizModalOpen(false)}
        recommendedCount={recommendedCount}
      />
    </>
  );
}
