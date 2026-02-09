'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Logo } from '@/design-system/components/branding/Logo';
import { Header } from '@/design-system/components/layout/Header';
import { Sidebar, CreationsPanel, SourcesPanel, SourceTile } from '@/design-system/components/layout/Sidebar';
import { DragDropUpload, FloatingAssistantButton } from '@/design-system/components/uploads';
import { ChatWindow } from '@/design-system/components/chat';
import { ContentEditor } from '@/design-system/components/editor';
import { RenameProjectModal } from '@/design-system/components/modals';
import { MockExam } from '@/design-system/components/exam';
import type { Answer, ExamFeedback } from '@/design-system/components/exam/exam.types';
// Custom quiz styling - using Figma design
import { getProjectById } from '@/data/mockProjects';
import type { Creation } from '@/data/mockProjects';
import styles from './page.module.css';

export default function ProjectDetailPage(): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const project = getProjectById(projectId);

  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [creationsPanelOpen, setCreationsPanelOpen] = useState(true);
  const [sourcesPanelOpen, setSourcesPanelOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [content, setContent] = useState<string>('');
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState(project?.title || '');
  const [projectEmoji, setProjectEmoji] = useState(project?.emoji || '📔');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState<any[]>([]);
  const [aiTool, setAiTool] = useState<'ask-ai' | 'quiz' | 'summary' | 'flashcards'>('ask-ai');
  const [contextTags, setContextTags] = useState<any[]>([]);
  const [isLoadingAttachments, setIsLoadingAttachments] = useState(false);
  
  // Action chips for tool switching - shown when user has content in conversation
  const [showActionChips, setShowActionChips] = useState(false);
  const actionChips = showActionChips ? [
    { id: 'summary', label: 'Summary', icon: 'fa-solid fa-file-lines' },
    { id: 'quiz', label: 'Quiz', icon: 'fa-solid fa-clipboard-question' },
  ] : [];

  // Quiz state
  const [activeCreationId, setActiveCreationId] = useState<string | null>(null);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<(number | undefined)[]>([]);
  const [quizQuestionStates, setQuizQuestionStates] = useState<('unanswered' | 'correct' | 'incorrect' | 'skipped')[]>([]);

  if (!project) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Project Not Found</h1>
          <button onClick={() => router.push('/')} className={styles.backButton}>
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const handleFileUpload = (files: File[]): void => {
    console.log('Files uploaded:', files);
  };

  const handleAssistantClick = (): void => {
    const newChatState = !chatOpen;
    setChatOpen(newChatState);
    setLeftSidebarCollapsed(newChatState);
  };

  const handleCollapsedSidebarClick = (): void => {
    setLeftSidebarCollapsed(false);
    setChatOpen(false);
  };

  const handleExpandToggle = (): void => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSendMessage = (message: string): void => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      role: 'user' as const,
      content: message,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response based on tool variant
    setTimeout(() => {
      let aiResponse = '';
      let attachments: any[] | undefined = undefined;

      switch (aiTool) {
        case 'quiz':
          aiResponse = `I'll create a quiz about "${message}". Here are 5 questions based on your materials:

1. What is the main concept discussed in the first chapter?
2. How does this relate to the overall theory?
3. Can you identify the key terminology?
4. What are the practical applications?
5. How would you explain this to someone else?`;
          break;
        
        case 'summary':
          aiResponse = `Here's a summary of "${message}":

Key Points:
• Main concept: [Topic Overview]
• Critical arguments presented
• Supporting evidence and examples
• Conclusion and implications

This covers the essential information you need to understand the material.`;
          break;
        
        case 'flashcards':
          aiResponse = `I've created flashcards about "${message}":

Card 1: What is [concept]? → [Definition]
Card 2: Why is [topic] important? → [Explanation]
Card 3: How does [process] work? → [Steps]
Card 4: What are the key principles? → [List]

Ready to study these flashcards?`;
          break;
        
        default:
          aiResponse = `I understand you're asking about "${message}". Let me help you with that.

Based on your project materials, here's what I can tell you:
• I can see you have ${project?.sources.length || 0} sources uploaded
• Your current notes cover various topics
• Would you like me to analyze specific sections or create study materials?`;
          
          if (messages.length === 0) {
            attachments = [
              { name: 'class_slides.pptx', type: 'ppt' as const },
              { name: 'Pasted text', type: 'text' as const },
              { name: `${project?.title || 'Document'}.pdf`, type: 'pdf' as const },
            ];
          }
          break;
      }

      const assistantMessage = {
        role: 'assistant' as const,
        content: aiResponse,
        attachments,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Generate suggested actions based on context
      updateSuggestedActions();
    }, 1000);
  };

  const handleActionChipClick = (chipId: string): void => {
    console.log('Action chip clicked:', chipId);
    
    // Set the AI tool based on chip clicked
    if (chipId === 'quiz') {
      setAiTool('quiz');
    } else if (chipId === 'summary') {
      setAiTool('summary');
    } else if (chipId === 'flashcards') {
      setAiTool('flashcards');
    }
    
    // Show action chips after first interaction
    setShowActionChips(true);
  };

  const handleActionClick = (action: string): void => {
    console.log('Action clicked:', action);
    
    switch (action) {
      case 'upload':
        handleFileUpload([]);
        break;
      case 'find-materials':
        setMessages(prev => [...prev, {
          role: 'assistant' as const,
          content: 'I can help you find materials from other students. What specific topics are you looking for?',
          timestamp: new Date(),
        }]);
        break;
      case 'set-goal':
        setMessages(prev => [...prev, {
          role: 'assistant' as const,
          content: 'Let\'s set up your study goal! What would you like to achieve? (e.g., "Prepare for exam in 2 weeks", "Understand chapter 3", "Create flashcards for review")',
          timestamp: new Date(),
        }]);
        break;
    }
  };

  const updateSuggestedActions = (): void => {
    // This would dynamically update based on conversation context
    // For now, keeping the default actions
  };

  const handleProjectMenuAction = (projectId: string, action: string): void => {
    console.log('Project menu action:', projectId, action);
    
    switch (action) {
      case 'share':
        console.log('Share project:', projectId);
        break;
      case 'rename':
        setRenameModalOpen(true);
        break;
      case 'privacy':
        console.log('Change privacy:', projectId);
        break;
      case 'delete':
        console.log('Delete project:', projectId);
        if (confirm('Are you sure you want to delete this project?')) {
          router.push('/');
        }
        break;
    }
  };

  const handleRename = (newTitle: string, newEmoji: string): void => {
    console.log('Renaming project:', newTitle, newEmoji);
    setProjectTitle(newTitle);
    setProjectEmoji(newEmoji);
    // In a real app, you would update the backend here
  };

  const activeCreation = activeCreationId 
    ? project.creations.find(c => c.id === activeCreationId) 
    : project.creations.find(c => c.status === 'viewing') || project.creations[0];

  const handleCreationClick = (creation: Creation): void => {
    setActiveCreationId(creation.id);
    if (creation.type === 'quiz' && creation.quizData) {
      // Initialize quiz state for scrollable all-questions view
      setSelectedQuizAnswers(new Array(creation.quizData.questions.length).fill(undefined));
      setQuizQuestionStates(new Array(creation.quizData.questions.length).fill('unanswered'));
    }
  };

  const handleQuizSelectOption = (questionIndex: number, optionIndex: number): void => {
    if (!activeCreation?.quizData) return;
    
    const newAnswers = [...selectedQuizAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedQuizAnswers(newAnswers);

    const newStates = [...quizQuestionStates];
    newStates[questionIndex] = optionIndex === activeCreation.quizData.questions[questionIndex].correctOption ? 'correct' : 'incorrect';
    setQuizQuestionStates(newStates);
  };

  const correctAnswersCount = quizQuestionStates.filter(s => s === 'correct').length;

  // Exam grading handler
  const handleExamSubmit = async (answers: Record<string, Answer>): Promise<ExamFeedback> => {
    if (!activeCreation?.examData) {
      throw new Error('No exam data available');
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const questionFeedback: Record<string, any> = {};
    let totalEarnedMarks = 0;

    activeCreation.examData.questions.forEach((question: any) => {
      const answer = answers[question.id];
      let isCorrect = false;
      let earnedMarks = 0;
      let explanation = '';

      if (!answer) {
        isCorrect = false;
        earnedMarks = 0;
        explanation = 'No answer provided.';
      } else {
        switch (question.type) {
          case 'multiple-choice':
            isCorrect = answer.value === question.correctAnswer;
            earnedMarks = isCorrect ? question.marks : 0;
            explanation = isCorrect
              ? 'Excellent! That\'s the correct answer.'
              : `Incorrect. The correct answer was option ${String.fromCharCode(65 + (question.correctAnswer as number))}.`;
            break;

          case 'short-answer':
            const answerText = (answer.value as string).toLowerCase();
            isCorrect = answerText.includes('cognitive') && answerText.includes('working memory');
            earnedMarks = isCorrect ? question.marks : Math.floor(question.marks / 2);
            explanation = isCorrect
              ? 'Great! Your answer captures the key concepts.'
              : 'Partial credit. Your answer is on the right track but missing some key elements.';
            break;

          case 'true-false':
            isCorrect = answer.value === question.correctAnswer;
            earnedMarks = isCorrect ? question.marks : 0;
            explanation = isCorrect
              ? 'Correct!'
              : `Incorrect. The statement is ${question.correctAnswer ? 'true' : 'false'}.`;
            break;

          case 'multi-select':
            const selected = (answer.value as number[]) || [];
            const correct = question.correctAnswer as number[];
            const correctCount = selected.filter((i: number) => correct.includes(i)).length;
            const incorrectCount = selected.filter((i: number) => !correct.includes(i)).length;
            isCorrect = correctCount === correct.length && incorrectCount === 0;
            earnedMarks = Math.max(0, Math.floor((correctCount - incorrectCount) * (question.marks / correct.length)));
            explanation = isCorrect
              ? 'Perfect! You selected all the correct options.'
              : `Partial credit. You got ${correctCount} out of ${correct.length} correct.`;
            break;

          case 'long-answer':
            const longAnswer = (answer.value as string).toLowerCase();
            const hasKeyTerms = longAnswer.includes('mayer') || longAnswer.includes('dual coding');
            const hasExamples = longAnswer.length > 100;
            earnedMarks = hasKeyTerms && hasExamples ? question.marks : hasKeyTerms ? Math.floor(question.marks * 0.6) : Math.floor(question.marks * 0.3);
            isCorrect = earnedMarks === question.marks;
            explanation = earnedMarks === question.marks
              ? 'Excellent answer with strong theoretical foundation and practical examples!'
              : 'Good effort, but could be improved with more specific references.';
            break;

          case 'fill-blanks':
            const blankAnswers = answer.value as Record<string, string>;
            let correctBlanks = 0;
            question.blanks?.forEach((blank: any) => {
              if (blankAnswers[blank.id]?.toLowerCase() === blank.correctAnswer.toLowerCase()) {
                correctBlanks++;
              }
            });
            earnedMarks = Math.floor((correctBlanks / (question.blanks?.length || 1)) * question.marks);
            isCorrect = correctBlanks === question.blanks?.length;
            explanation = isCorrect
              ? 'All blanks filled correctly!'
              : `You got ${correctBlanks} out of ${question.blanks?.length} blanks correct.`;
            break;
        }
      }

      totalEarnedMarks += earnedMarks;

      questionFeedback[question.id] = {
        questionId: question.id,
        isCorrect,
        earnedMarks,
        totalMarks: question.marks,
        percentage: (earnedMarks / question.marks) * 100,
        explanation,
      };
    });

    const totalMarks = activeCreation.examData.questions.reduce((sum: number, q: any) => sum + q.marks, 0);
    const timeElapsed = Math.floor(Math.random() * 600) + 300;

    return {
      totalMarks,
      earnedMarks: totalEarnedMarks,
      percentage: (totalEarnedMarks / totalMarks) * 100,
      timeElapsed,
      questionFeedback,
      recommendedDocs: [
        {
          id: '1',
          title: 'De Moivre\'s theorem and complex roots',
          category: 'Assignments',
          pages: 11,
          rating: 100,
          ratingCount: 3,
          isPremium: true,
          isNew: true,
        },
        {
          id: '2',
          title: 'Exercises and examples of polynoms',
          category: 'Assignments',
          pages: 4,
          rating: 100,
          ratingCount: 3,
          isPremium: true,
          isNew: true,
        },
      ],
      studyAssistantMessage: 'Mock exam complete! Let\'s lock in what you\'ve learned.',
    };
  };

  // Suggested actions that update based on context
  const suggestedActions = messages.length === 0 ? [
    { label: 'Upload my materials', action: 'upload' },
    { label: 'Find materials from other students', action: 'find-materials' },
    { label: 'Set my study goal', action: 'set-goal' },
  ] : [];

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerContainer}>
        <Header
          variant="project"
          logo={<Logo variant="icon" height={16} />}
          onLogoClick={() => router.push('/')}
          title={projectTitle}
          hasTitleDropdown
          breadcrumbLabel={project.course}
          onBreadcrumbClick={() => console.log('Breadcrumb clicked')}
          privacy="public"
          onPrivacyClick={() => console.log('Privacy clicked')}
          onShareClick={() => console.log('Share clicked')}
          avatarUrl="/useravatar.jpg"
          avatarInitials="U"
          onAvatarClick={() => console.log('Avatar clicked')}
          recentProjects={[
            { id: project.id, title: projectTitle, emoji: projectEmoji, lastAccessed: 'Viewing', isViewing: true },
            { id: '2', title: 'Arterial blood gas levels', emoji: '🩸', lastAccessed: '2 mins ago' },
            { id: '3', title: 'Patient nutrition', emoji: '🥑', lastAccessed: '2 mins ago' },
            { id: '4', title: 'Pulmonary contusion and cardiac tamponade', emoji: '🫁', lastAccessed: '2 mins ago' },
          ]}
          onProjectSelect={(id) => router.push(`/project/${id}`)}
          onProjectMenu={handleProjectMenuAction}
          onViewAllProjects={() => router.push('/')}
          onNewProject={() => console.log('New project')}
        />
      </div>

      {/* Main Content */}
      <div className={styles.mainContainer}>
        {/* Left Sidebar - Always use Sidebar component */}
        {leftSidebarOpen && !isFullscreen && (
          <Sidebar 
            isOpen={!leftSidebarCollapsed}
            side="left"
          >
            {/* Creations Panel */}
            <CreationsPanel
              isExpanded={leftSidebarCollapsed ? false : creationsPanelOpen}
              onToggle={() => {
                if (leftSidebarCollapsed) {
                  handleCollapsedSidebarClick();
                } else {
                  setCreationsPanelOpen(!creationsPanelOpen);
                }
              }}
              onGenerateClick={() => console.log('Generate new clicked')}
            >
              {/* Existing Creations */}
              {project.creations.map((creation) => {
                const getIcon = () => {
                  if (creation.type === 'quiz') return 'fa-solid fa-circle-question';
                  if (creation.type === 'summary') return 'fa-solid fa-pen-nib';
                  if (creation.type === 'exam') return 'fa-solid fa-clipboard-check';
                  return 'fa-solid fa-file';
                };
                
                const getSubtitle = () => {
                  const baseType = creation.type.charAt(0).toUpperCase() + creation.type.slice(1);
                  if (creation.metadata?.score) {
                    return `${baseType} • Score: ${creation.metadata.score}%`;
                  }
                  if (creation.metadata?.questionCount) {
                    return `${baseType} • ${creation.metadata.questionCount} questions`;
                  }
                  return baseType;
                };
                
                return (
                  <SourceTile
                    key={creation.id}
                    title={creation.title}
                    type="pdf"
                    subtitle={getSubtitle()}
                    icon={<i className={getIcon()} aria-hidden="true" />}
                    state={activeCreationId === creation.id ? 'selected' : 'default'}
                    onClick={() => handleCreationClick(creation)}
                    onMoreClick={() => console.log('More options:', creation.id)}
                  />
                );
              })}
            </CreationsPanel>

            {/* Sources Panel */}
            <SourcesPanel
              isExpanded={leftSidebarCollapsed ? false : sourcesPanelOpen}
              onToggle={() => {
                if (leftSidebarCollapsed) {
                  handleCollapsedSidebarClick();
                } else {
                  setSourcesPanelOpen(!sourcesPanelOpen);
                }
              }}
              onSearchClick={() => console.log('Search clicked')}
              onFilterClick={() => console.log('Filter clicked')}
              onAddClick={() => handleFileUpload([])}
              onRecordClick={() => console.log('Record clicked')}
            >
              {/* Sources List */}
              {project.sources.map((source) => {
                const getSourceType = () => {
                  if (source.type === 'pdf') return 'pdf';
                  if (source.type === 'image') return 'image';
                  if (source.type === 'recording') return 'audio';
                  return 'pdf';
                };
                
                return (
                  <SourceTile
                    key={source.id}
                    title={source.name}
                    type={getSourceType()}
                    subtitle={`${source.size} • ${source.uploadedAt}`}
                    onClick={() => console.log('Source clicked:', source.id)}
                    onMoreClick={() => console.log('Source more:', source.id)}
                  />
                );
              })}
            </SourcesPanel>
          </Sidebar>
        )}

        {/* Toggle button for left sidebar */}
        {!leftSidebarOpen && !isFullscreen && (
          <button 
            className={styles.sidebarToggleLeft}
            onClick={() => setLeftSidebarOpen(true)}
            aria-label="Show sidebar"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        )}

        {/* Content Area */}
        <main className={styles.content}>
          <button 
            className={styles.expandButton}
            onClick={handleExpandToggle}
            aria-label={isFullscreen ? "Exit fullscreen" : "Expand content"}
          >
            <i className={`fa-solid fa-${isFullscreen ? 'down-left-and-up-right-to-center' : 'up-right-and-down-left-from-center'}`} />
          </button>

          <div className={styles.documentArea}>
            {activeCreation ? (
              <>
                <h1 className={styles.documentTitle}>{activeCreation.title}</h1>
                
                {/* Render Quiz Interface for quiz type - Scrollable All Questions */}
                {activeCreation.type === 'quiz' && activeCreation.quizData ? (
                  <div className={styles.quizContainer}>
                    {/* Progress Header */}
                    <div className={styles.quizProgressHeader}>
                      <div className={styles.quizProgressCounter}>
                        <span className={styles.quizProgressAnswered}>{selectedQuizAnswers.filter(a => a !== undefined).length}</span>
                        <span className={styles.quizProgressSeparator}>/</span>
                        <span className={styles.quizProgressTotal}>{activeCreation.quizData.questions.length} answered</span>
                      </div>
                      <div className={styles.quizProgressBarContainer}>
                        <div className={styles.quizProgressBarTrack}>
                          <div 
                            className={styles.quizProgressBarFill}
                            style={{ 
                              width: `${(selectedQuizAnswers.filter(a => a !== undefined).length / activeCreation.quizData.questions.length) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* All Questions List */}
                    <div className={styles.quizQuestionsList}>
                      {activeCreation.quizData.questions.map((question, questionIndex) => {
                        const hasAnswered = selectedQuizAnswers[questionIndex] !== undefined;
                        const questionState = quizQuestionStates[questionIndex];

                        return (
                          <div key={questionIndex} className={styles.quizQuestionItem}>
                            {/* Question Header */}
                            <div className={styles.quizQuestionHeader}>
                              <div className={styles.quizQuestionNumber}>
                                Question {questionIndex + 1}
                              </div>
                              {hasAnswered && questionState !== 'unanswered' && (
                                <div className={`${styles.quizStatusBadge} ${
                                  questionState === 'correct' ? styles.correct :
                                  questionState === 'incorrect' ? styles.incorrect :
                                  styles.skipped
                                }`}>
                                  {questionState === 'correct' && (
                                    <>
                                      <i className="fa-duotone fa-check" />
                                      <span>Correct</span>
                                    </>
                                  )}
                                  {questionState === 'incorrect' && (
                                    <>
                                      <i className="fa-duotone fa-xmark" />
                                      <span>Incorrect</span>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Question Text */}
                            <div className={styles.quizQuestionText}>
                              {question.question}
                            </div>

                            {/* Answer Options */}
                            <div className={styles.quizAnswers}>
                              {question.options.map((option, optionIndex) => {
                                const isSelected = selectedQuizAnswers[questionIndex] === optionIndex;
                                const isCorrect = optionIndex === question.correctOption;
                                const isDisabled = hasAnswered && !isSelected && !isCorrect;
                                
                                let optionState = 'default';
                                if (hasAnswered) {
                                  if (isSelected && isCorrect) optionState = 'correct';
                                  else if (isSelected && !isCorrect) optionState = 'incorrect';
                                  else if (!isSelected && isCorrect) optionState = 'correct';
                                  else optionState = 'disabled';
                                }

                                const optionLabel = String.fromCharCode(65 + optionIndex);

                                return (
                                  <button
                                    key={optionIndex}
                                    className={`${styles.quizOption} ${styles[optionState]}`}
                                    onClick={() => !hasAnswered && handleQuizSelectOption(questionIndex, optionIndex)}
                                    disabled={hasAnswered}
                                  >
                                    <div className={styles.quizOptionContent}>
                                      {optionState === 'correct' ? (
                                        <div className={styles.quizOptionIcon}>
                                          <i className="fa-solid fa-circle-check" />
                                        </div>
                                      ) : optionState === 'incorrect' && isSelected ? (
                                        <div className={styles.quizOptionIcon}>
                                          <i className="fa-solid fa-xmark-circle" />
                                        </div>
                                      ) : (
                                        <div className={styles.quizOptionBadge}>
                                          {optionLabel}
                                        </div>
                                      )}
                                      <div className={styles.quizOptionText}>{option}</div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Explanation */}
                            {hasAnswered && question.explanation && (
                              <div className={styles.quizExplanation}>
                                <div className={styles.quizExplanationText}>
                                  {question.explanation}
                                </div>
                                <div className={styles.quizExplanationActions}>
                                  <button className={styles.quizExplanationButton}>
                                    Explain with simpler terms
                                  </button>
                                  <button className={styles.quizExplanationButton}>
                                    Ask about this...
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Results (shown when all questions are answered) */}
                    {selectedQuizAnswers.filter(a => a !== undefined).length === activeCreation.quizData.questions.length && (
                      <div className={styles.quizResults}>
                        <div className={styles.quizResultsGauge}>
                          <svg viewBox="0 0 132 132" className={styles.quizResultsGaugeSvg}>
                            <circle 
                              cx="66" 
                              cy="66" 
                              r="56" 
                              fill="none" 
                              stroke="#E6EBEF" 
                              strokeWidth="20"
                            />
                            <circle 
                              cx="66" 
                              cy="66" 
                              r="56" 
                              fill="none" 
                              stroke="#2CC302" 
                              strokeWidth="20"
                              strokeDasharray={`${(correctAnswersCount / activeCreation.quizData.questions.length) * 351.86} 351.86`}
                              strokeLinecap="round"
                              transform="rotate(-90 66 66)"
                            />
                          </svg>
                          <div className={styles.quizResultsPercentage}>
                            {Math.round((correctAnswersCount / activeCreation.quizData.questions.length) * 100)}%
                          </div>
                        </div>

                        <div className={styles.quizResultsTitle}>Well done!</div>

                        <div className={styles.quizResultsStats}>
                          <div className={styles.quizResultsStat}>
                            <i className="fa-solid fa-check" />
                            <span><strong>{correctAnswersCount}</strong> correct</span>
                          </div>
                          <div className={styles.quizResultsStat}>
                            <i className="fa-solid fa-xmark" />
                            <span><strong>{quizQuestionStates.filter(s => s === 'incorrect').length}</strong> incorrect</span>
                          </div>
                          <div className={styles.quizResultsStat}>
                            <i className="fa-solid fa-angles-right" />
                            <span><strong>{quizQuestionStates.filter(s => s === 'skipped').length}</strong> skipped</span>
                          </div>
                        </div>

                        <div className={styles.quizResultsActions}>
                          <button 
                            className={styles.quizResultsSecondaryButton}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          >
                            <i className="fa-solid fa-arrow-up" />
                            Go to top
                          </button>
                          <button 
                            className={styles.quizResultsSecondaryButton}
                            onClick={() => {
                              setSelectedQuizAnswers(new Array(activeCreation.quizData!.questions.length).fill(undefined));
                              setQuizQuestionStates(new Array(activeCreation.quizData!.questions.length).fill('unanswered'));
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          >
                            <i className="fa-solid fa-rotate-left" />
                            Retry
                          </button>
                        </div>

                        <div className={styles.quizResultsFeedback}>
                          <span>Was this quiz useful?</span>
                          <div className={styles.quizResultsFeedbackButtons}>
                            <button className={styles.quizFeedbackButton} aria-label="Yes">
                              <i className="fa-solid fa-thumbs-up" />
                            </button>
                            <button className={styles.quizFeedbackButton} aria-label="No">
                              <i className="fa-solid fa-thumbs-down" />
                            </button>
                          </div>
                        </div>

                        <button className={styles.quizResultsPrimaryButton}>
                          <i className="fa-solid fa-plus" />
                          Another quiz
                        </button>
                      </div>
                    )}
                  </div>
                ) : activeCreation.type === 'exam' && activeCreation.examData ? (
                  /* Render MockExam for exam type */
                  <MockExam
                    examId={activeCreation.examData.examId}
                    questions={activeCreation.examData.questions}
                    onSubmit={handleExamSubmit}
                  />
                ) : (
                  /* Render ContentEditor for summary/note types */
                  <div className={styles.documentContent}>
                    <ContentEditor
                      content={content}
                      onChange={setContent}
                      placeholder="Start taking notes here or press '/' for actions and formatting"
                      showSlashCommands={true}
                      showSelectionToolbar={true}
                      onAskAI={(text) => {
                        setAiTool('ask-ai');
                        setChatOpen(true);
                        setLeftSidebarCollapsed(true);
                        if (text) {
                          setTimeout(() => handleSendMessage(text), 100);
                        }
                      }}
                      onExplain={(text) => {
                        setAiTool('ask-ai');
                        setChatOpen(true);
                        setLeftSidebarCollapsed(true);
                        setTimeout(() => handleSendMessage(`Explain: ${text}`), 100);
                      }}
                      onGenerateSummary={() => {
                        setAiTool('summary');
                        setChatOpen(true);
                        setLeftSidebarCollapsed(true);
                      }}
                      onCreateQuiz={() => {
                        setAiTool('quiz');
                        setChatOpen(true);
                        setLeftSidebarCollapsed(true);
                      }}
                      onAskQuestion={() => {
                        setAiTool('ask-ai');
                        setChatOpen(true);
                        setLeftSidebarCollapsed(true);
                      }}
                      onRecordClass={() => {
                        console.log('Record class');
                        // Handle recording
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <h1 className={styles.documentTitle}>{project.title}</h1>
                
                <div className={styles.documentContent}>
                  <ContentEditor
                    content={content}
                    onChange={setContent}
                    placeholder="Start taking notes here or press '/' for actions and formatting"
                    showSlashCommands={true}
                    showSelectionToolbar={true}
                    onAskAI={(text) => {
                      setAiTool('ask-ai');
                      setChatOpen(true);
                      setLeftSidebarCollapsed(true);
                      if (text) {
                        setTimeout(() => handleSendMessage(text), 100);
                      }
                    }}
                    onExplain={(text) => {
                      setAiTool('ask-ai');
                      setChatOpen(true);
                      setLeftSidebarCollapsed(true);
                      setTimeout(() => handleSendMessage(`Explain: ${text}`), 100);
                    }}
                    onGenerateSummary={() => {
                      setAiTool('summary');
                      setChatOpen(true);
                      setLeftSidebarCollapsed(true);
                    }}
                    onCreateQuiz={() => {
                      setAiTool('quiz');
                      setChatOpen(true);
                      setLeftSidebarCollapsed(true);
                    }}
                    onAskQuestion={() => {
                      setAiTool('ask-ai');
                      setChatOpen(true);
                      setLeftSidebarCollapsed(true);
                    }}
                    onRecordClass={() => {
                      console.log('Record class');
                      // Handle recording
                    }}
                  />
                </div>

                <div className={styles.actionButtons}>
                  <button 
                    className={styles.actionButton}
                    onClick={() => {
                      setAiTool('summary');
                      setChatOpen(true);
                      setLeftSidebarCollapsed(true);
                    }}
                  >
                    <i className="fa-solid fa-pen-nib" />
                    <span>Generate a summary</span>
                  </button>

                  <button 
                    className={styles.actionButton}
                    onClick={() => {
                      setAiTool('quiz');
                      setChatOpen(true);
                      setLeftSidebarCollapsed(true);
                    }}
                  >
                    <i className="fa-solid fa-list-check" />
                    <span>Create a quiz</span>
                  </button>

                  <button 
                    className={styles.actionButton}
                    onClick={() => {
                      setAiTool('ask-ai');
                      setChatOpen(true);
                      setLeftSidebarCollapsed(true);
                    }}
                  >
                    <i className="fa-solid fa-comment" />
                    <span>Ask a question</span>
                  </button>

                  <button 
                    className={styles.actionButton}
                    onClick={() => {
                      console.log('Record class');
                      // Handle recording
                    }}
                  >
                    <i className="fa-solid fa-microphone" />
                    <span>Record my class</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </main>

        {/* Chat Window - Inline */}
        {chatOpen && !isFullscreen && (
          <div className={styles.chatContainer}>
            <ChatWindow
              isOpen={chatOpen}
              onClose={() => {
                setChatOpen(false);
                setLeftSidebarCollapsed(false);
              }}
              messages={messages}
              suggestedActions={suggestedActions}
              onSendMessage={handleSendMessage}
              onActionClick={handleActionClick}
              onAttach={() => {
                setIsLoadingAttachments(true);
                // Simulate file upload
                setTimeout(() => {
                  setContextTags(prev => [...prev, {
                    id: Date.now().toString(),
                    label: 'Document.pdf',
                    icon: 'fa-solid fa-file-pdf',
                    onRemove: () => {
                      setContextTags(tags => tags.filter(t => t.id !== Date.now().toString()));
                    }
                  }]);
                  setIsLoadingAttachments(false);
                }, 1500);
              }}
              onContext={() => {
                setMessages(prev => [...prev, {
                  role: 'assistant' as const,
                  content: 'I can see the context from your uploaded materials. What would you like to know about them?',
                  timestamp: new Date(),
                }]);
              }}
              onCreate={() => {
                const creationType = aiTool === 'quiz' ? 'quiz' : 
                                   aiTool === 'summary' ? 'summary' : 
                                   aiTool === 'flashcards' ? 'flashcards' : 'note';
                setMessages(prev => [...prev, {
                  role: 'assistant' as const,
                  content: `Creating a ${creationType} for you based on your materials...`,
                  timestamp: new Date(),
                }]);
              }}
              aiTool={aiTool}
              contextTags={contextTags}
              actionChips={actionChips}
              onActionChipClick={handleActionChipClick}
              isLoadingAttachments={isLoadingAttachments}
              inline={true}
            />
          </div>
        )}
      </div>

      {/* Floating Assistant Button */}
      {!isFullscreen && (
        <FloatingAssistantButton 
          onClick={handleAssistantClick}
          isOpen={chatOpen}
        />
      )}

      {/* Rename Project Modal */}
      <RenameProjectModal
        isOpen={renameModalOpen}
        currentTitle={projectTitle}
        currentEmoji={projectEmoji}
        onRename={handleRename}
        onClose={() => setRenameModalOpen(false)}
      />
    </div>
  );
}

