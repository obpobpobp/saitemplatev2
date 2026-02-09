'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Options for the useTypingEffect hook
 */
export interface UseTypingEffectOptions {
  /**
   * The full text to display character by character
   */
  text: string;

  /**
   * Speed in milliseconds per character
   * @default 30
   */
  speed?: number;

  /**
   * Whether the typing effect is enabled
   * @default true
   */
  enabled?: boolean;

  /**
   * Callback when typing completes
   */
  onComplete?: () => void;
}

/**
 * Return type for useTypingEffect hook
 */
export interface UseTypingEffectReturn {
  /**
   * The text that should currently be displayed
   */
  displayedText: string;

  /**
   * Whether the typing animation is currently in progress
   */
  isTyping: boolean;

  /**
   * Progress percentage (0-100)
   */
  progress: number;
}

/**
 * useTypingEffect - Custom hook for character-by-character text streaming
 * 
 * Displays text one character at a time to create a typing effect.
 * Respects reduced motion preferences and provides progress tracking.
 * 
 * Features:
 * - Configurable typing speed
 * - Progress tracking
 * - Reduced motion support (instant display)
 * - Completion callback
 * - Automatic cleanup
 * 
 * @example
 * ```tsx
 * const { displayedText, isTyping, progress } = useTypingEffect({
 *   text: 'Hello, this text will appear character by character!',
 *   speed: 30,
 *   onComplete: () => console.log('Typing complete!')
 * });
 * 
 * return <div>{displayedText}{isTyping && '|'}</div>;
 * ```
 * 
 * @param options - Configuration options for the typing effect
 * @returns Object containing displayedText, isTyping status, and progress
 */
export function useTypingEffect({
  text,
  speed = 30,
  enabled = true,
  onComplete,
}: UseTypingEffectOptions): UseTypingEffectReturn {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent): void => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTyping(enabled && text.length > 0);
  }, [text, enabled]);

  // Handle typing animation
  useEffect(() => {
    // If disabled or no text, show full text immediately
    if (!enabled || !text) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    // If reduced motion is preferred, show full text immediately
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsTyping(false);
      if (onComplete) {
        onComplete();
      }
      return;
    }

    // If we've finished typing
    if (currentIndex >= text.length) {
      setIsTyping(false);
      if (onComplete) {
        onComplete();
      }
      return;
    }

    // Type next character
    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, currentIndex + 1));
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, enabled, prefersReducedMotion, onComplete]);

  // Calculate progress
  const progress = text.length > 0 ? Math.round((currentIndex / text.length) * 100) : 0;

  return {
    displayedText,
    isTyping,
    progress,
  };
}
