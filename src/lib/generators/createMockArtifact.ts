/**
 * Mock Artifact Generator
 * 
 * Generates realistic mock data for different artifact types.
 * In production, this will be replaced with actual AI generation.
 */

import type { Creation, CreationType, Source, QuizData, SummaryData, GapData } from '@/types/course';

/**
 * Generate a mock artifact based on type and selected sources
 */
export function createMockArtifact(
  type: CreationType,
  sourceIds: string[],
  sources: Source[]
): Creation {
  const selectedSources = sources.filter(s => sourceIds.includes(s.id));
  const sourceNames = selectedSources.map(s => s.name).join(', ');
  const id = `creation-${Date.now()}`;
  const createdAt = new Date();

  switch (type) {
    case 'quiz':
      return {
        id,
        type: 'quiz',
        title: `Quiz on ${sourceNames}`,
        createdAt,
        data: generateQuizData(selectedSources),
      };

    case 'summary':
      return {
        id,
        type: 'summary',
        title: `Summary of ${sourceNames}`,
        createdAt,
        data: generateSummaryData(selectedSources),
      };

    case 'mock-exam':
      return {
        id,
        type: 'mock-exam',
        title: `Mock Exam from ${sourceNames}`,
        createdAt,
        data: generateMockExamData(selectedSources),
      };

    case 'flashcards':
      return {
        id,
        type: 'flashcards',
        title: `Flashcards: ${sourceNames}`,
        createdAt,
        data: generateFlashcardsData(selectedSources),
      };

    case 'gap-analysis':
      return {
        id,
        type: 'gap-analysis',
        title: `Gap Analysis: ${sourceNames}`,
        createdAt,
        data: generateGapAnalysisData(selectedSources),
      };

    default:
      throw new Error(`Unknown artifact type: ${type}`);
  }
}

/**
 * Generate quiz questions
 */
function generateQuizData(sources: Source[]): QuizData {
  const questionCount = Math.floor(Math.random() * 6) + 10; // 10-15 questions
  const questions = [];

  const topics = [
    'Key Concepts',
    'Definitions',
    'Applications',
    'Analysis',
    'Problem Solving',
    'Critical Thinking',
  ];

  for (let i = 0; i < questionCount; i++) {
    const topic = topics[i % topics.length];
    questions.push({
      id: `q-${i + 1}`,
      question: `Question ${i + 1}: What is the main concept related to ${topic}?`,
      options: [
        `Option A: Related to ${topic}`,
        `Option B: Alternative explanation`,
        `Option C: Different approach`,
        `Option D: Contrasting view`,
      ],
      correctIndex: Math.floor(Math.random() * 4),
      topic,
      explanation: `This question tests your understanding of ${topic} from the source materials.`,
    });
  }

  return {
    questions,
    score: undefined,
  };
}

/**
 * Generate summary content
 */
function generateSummaryData(sources: Source[]): SummaryData {
  const chapters = [
    'Introduction',
    'Key Concepts',
    'Detailed Analysis',
    'Important Points',
    'Summary',
  ];

  const content = `
# Summary

This comprehensive summary covers the main points from your selected sources.

## Introduction
The materials provide a thorough overview of the key topics, offering detailed explanations and examples that help build understanding.

## Key Concepts
- **Concept 1**: Fundamental principles that form the foundation
- **Concept 2**: Important relationships between ideas
- **Concept 3**: Practical applications and examples
- **Concept 4**: Critical analysis and evaluation

## Detailed Analysis
The sources explore various aspects in depth, presenting multiple perspectives and encouraging critical thinking. Each section builds upon previous knowledge while introducing new concepts.

### Important Subtopics
1. Primary focus areas that require attention
2. Secondary concepts that support main ideas
3. Connections between different topics
4. Real-world applications and case studies

## Important Points
- Key takeaway #1: Main concept from the materials
- Key takeaway #2: Supporting evidence and examples
- Key takeaway #3: Critical analysis points
- Key takeaway #4: Practical implications
- Key takeaway #5: Areas for further study

## Summary
This material provides essential knowledge for understanding the subject matter. Review these key points regularly to reinforce your learning.

**Total Sources Analyzed**: ${sources.length}
**Estimated Reading Time**: ${Math.floor(sources.length * 5)} minutes
`.trim();

  return {
    content,
    wordCount: content.split(/\s+/).length,
    chapters,
  };
}

/**
 * Generate mock exam questions
 */
function generateMockExamData(sources: Source[]): QuizData {
  const questionCount = 20; // Mock exams are typically longer
  const questions = [];

  for (let i = 0; i < questionCount; i++) {
    questions.push({
      id: `exam-q-${i + 1}`,
      question: `Exam Question ${i + 1}: Analyze the following concept from your studies...`,
      options: [
        `A) First potential answer`,
        `B) Second potential answer`,
        `C) Third potential answer`,
        `D) Fourth potential answer`,
      ],
      correctIndex: Math.floor(Math.random() * 4),
      topic: 'Exam Content',
      explanation: `This question reflects typical exam-style questioning about the material.`,
    });
  }

  return {
    questions,
    score: undefined,
  };
}

/**
 * Generate flashcards
 */
function generateFlashcardsData(sources: Source[]): QuizData {
  const cardCount = Math.floor(Math.random() * 11) + 20; // 20-30 cards
  const questions = [];

  const cardTypes = [
    { front: 'Definition', back: 'Term' },
    { front: 'Concept', back: 'Explanation' },
    { front: 'Question', back: 'Answer' },
    { front: 'Term', back: 'Example' },
  ];

  for (let i = 0; i < cardCount; i++) {
    const cardType = cardTypes[i % cardTypes.length];
    questions.push({
      id: `card-${i + 1}`,
      question: `${cardType.front} #${i + 1}`,
      options: [`${cardType.back} #${i + 1}`], // Flashcards use options[0] for the "back"
      correctIndex: 0,
      topic: 'Flashcard',
      explanation: `Review this card regularly to master the concept.`,
    });
  }

  return {
    questions,
    score: undefined,
  };
}

/**
 * Generate gap analysis
 */
function generateGapAnalysisData(sources: Source[]): GapData {
  const topics = [
    'Core Concepts',
    'Advanced Topics',
    'Practical Applications',
    'Theoretical Foundations',
    'Case Studies',
    'Problem Solving',
  ];

  const coveredTopics = topics.slice(0, 4).map((topic, index) => ({
    topic,
    strength: ['strong', 'medium', 'weak'][Math.floor(Math.random() * 3)] as 'strong' | 'medium' | 'weak',
  }));

  const missingTopics = topics.slice(4);

  const recommendations = sources.slice(0, 3).map((source) => ({
    doc: source.name,
    covers: missingTopics.slice(0, 2),
  }));

  return {
    coveredTopics,
    missingTopics,
    recommendations,
  };
}
