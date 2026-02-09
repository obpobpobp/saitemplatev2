/**
 * Generation API Route
 * 
 * Handles AI generation requests for quizzes, summaries, and chat.
 * Falls back to mock responses if OPENAI_API_KEY is not set.
 */

import { NextRequest, NextResponse } from 'next/server';
import type { QuizQuestion } from '@/types/course';

interface GenerateRequest {
  type: 'quiz' | 'summary' | 'chat';
  courseName: string;
  sources: { name: string; covers?: string[] }[];
  questionCount?: number;
  message?: string;
}

/**
 * Mock quiz data for demo mode
 */
function generateMockQuiz(count: number, courseName: string): QuizQuestion[] {
  const topics = ['Core Concepts', 'Applications', 'Theory', 'Practice'];
  const questions: QuizQuestion[] = [];
  
  for (let i = 0; i < count; i++) {
    const topic = topics[i % topics.length];
    questions.push({
      id: `q${i + 1}`,
      question: `Question ${i + 1}: What is the primary concept related to ${topic.toLowerCase()} in ${courseName}?`,
      options: [
        `The correct answer for ${topic}`,
        `An incorrect option about ${topic}`,
        `Another wrong choice`,
        `Yet another incorrect option`,
      ],
      correctIndex: 0,
      topic,
      explanation: `This question tests your understanding of ${topic.toLowerCase()} in ${courseName}. The correct answer demonstrates knowledge of the core principles.`,
    });
  }
  
  return questions;
}

/**
 * Mock summary for demo mode
 */
function generateMockSummary(courseName: string, sources: string[]): string {
  return `# Summary: ${courseName}

## Overview
This summary is based on ${sources.length} source${sources.length !== 1 ? 's' : ''} covering key topics in ${courseName}.

## Key Concepts

### Core Principles
The fundamental concepts covered in these materials include:
- Primary theoretical frameworks
- Essential definitions and terminology
- Core methodologies and approaches

### Practical Applications
Real-world applications and case studies demonstrate:
- Implementation strategies
- Common use cases
- Best practices in the field

### Advanced Topics
More complex subjects build upon foundational knowledge:
- Specialized techniques
- Contemporary research
- Emerging trends

## Sources Reviewed
${sources.map((source, idx) => `${idx + 1}. ${source}`).join('\n')}

## Study Recommendations
Based on this material, focus your study on:
1. Understanding core terminology
2. Connecting theory to practice
3. Reviewing key examples
4. Testing knowledge with practice problems

*This is a demo summary. Enable OpenAI API key for AI-generated content.*
`;
}

/**
 * Mock chat response for demo mode
 */
function generateMockChat(message: string, courseName: string): string {
  return `Thank you for your question about "${message}" in ${courseName}.

In a production environment with OpenAI API enabled, I would provide a detailed, contextual answer based on your course materials. For now, here's a general response:

This topic is an important part of ${courseName}. To fully understand it, I recommend:

1. Review the relevant sections in your materials
2. Consider how this concept connects to other topics
3. Try applying it to practice problems
4. Ask follow-up questions to deepen your understanding

*This is a demo response. Add your OpenAI API key to enable AI-powered answers.*`;
}

/**
 * POST handler for generation requests
 */
export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { type, courseName, sources, questionCount, message } = body;
    
    // Check for API key
    const hasApiKey = !!process.env.OPENAI_API_KEY;
    
    // Handle quiz generation
    if (type === 'quiz') {
      const count = questionCount || 15;
      
      // Use mock data for demo
      const questions = generateMockQuiz(count, courseName);
      
      return NextResponse.json({
        questions,
        demo: !hasApiKey,
      });
    }
    
    // Handle summary generation
    if (type === 'summary') {
      const sourceNames = sources.map(s => s.name);
      const summaryText = generateMockSummary(courseName, sourceNames);
      
      // For demo, return as plain text with a delay to simulate streaming
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return new NextResponse(summaryText, {
        headers: {
          'Content-Type': 'text/plain',
          'X-Demo-Mode': hasApiKey ? 'false' : 'true',
        },
      });
    }
    
    // Handle chat
    if (type === 'chat') {
      if (!message) {
        return NextResponse.json(
          { error: 'Message is required for chat' },
          { status: 400 }
        );
      }
      
      const response = generateMockChat(message, courseName);
      
      return new NextResponse(response, {
        headers: {
          'Content-Type': 'text/plain',
          'X-Demo-Mode': hasApiKey ? 'false' : 'true',
        },
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid type' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Generation failed' },
      { status: 500 }
    );
  }
}
