'use client';

import React, { useState } from 'react';
import { TileButton } from '@/design-system/components/modals/TileButton';
import { Heading } from '@/design-system/components/typography/Heading';
import { Text } from '@/design-system/components/typography/Text';
import type { TileButtonState } from '@/design-system/components/modals/TileButton';
import styles from './page.module.css';

/**
 * TileButton Demo Page - Showcases all tile button variants and states
 */
export default function TileButtonDemoPage(): JSX.Element {
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [loadingTile, setLoadingTile] = useState<string | null>(null);

  const handleTileClick = (id: string): void => {
    if (loadingTile === id) return;
    
    // Simulate loading
    setLoadingTile(id);
    setTimeout(() => {
      setLoadingTile(null);
      setSelectedTile(id);
    }, 1500);
  };

  const getTileState = (id: string): TileButtonState | undefined => {
    if (loadingTile === id) return 'loading';
    if (selectedTile === id) return 'selected';
    return undefined;
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Heading level={1}>TileButton Demo</Heading>
        <Text>Showcase of all TileButton variants and states</Text>
      </div>

      {/* Vertical Orientation */}
      <section className={styles.section}>
        <Heading level={2}>Vertical Orientation</Heading>
        
        <div className={styles.stateSection}>
          <Heading level={3}>Neutral Color - All States</Heading>
          <div className={styles.tilesGrid}>
            <TileButton
              title="Default"
              subtitle="Neutral color"
              icon="fa-solid fa-file"
              orientation="vertical"
              color="neutral"
              state="default"
            />
            <TileButton
              title="Hover"
              subtitle="Neutral color"
              icon="fa-solid fa-pen-nib"
              orientation="vertical"
              color="neutral"
              state="hover"
            />
            <TileButton
              title="Pressed"
              subtitle="Neutral color"
              icon="fa-solid fa-circle-question"
              orientation="vertical"
              color="neutral"
              state="pressed"
            />
            <TileButton
              title="Selected"
              subtitle="Neutral color"
              icon="fa-solid fa-lightbulb"
              chipLabel="Active"
              orientation="vertical"
              color="neutral"
              state="selected"
            />
            <TileButton
              title="Loading"
              subtitle="Neutral color"
              icon="fa-solid fa-microphone"
              orientation="vertical"
              color="neutral"
              state="loading"
              loadingText="Creating..."
            />
            <TileButton
              title="Disabled"
              subtitle="Neutral color"
              icon="fa-solid fa-image"
              orientation="vertical"
              color="neutral"
              disabled
            />
          </div>
        </div>

        <div className={styles.stateSection}>
          <Heading level={3}>Interactive Examples</Heading>
          <div className={styles.tilesGrid}>
            <TileButton
              title="AI Notes"
              subtitle="Create from documents"
              icon="fa-solid fa-file"
              chipLabel="New"
              orientation="vertical"
              color="neutral"
              state={getTileState('notes')}
              onClick={() => handleTileClick('notes')}
            />
            <TileButton
              title="AI Summary"
              subtitle="Summarize content"
              icon="fa-solid fa-pen-nib"
              orientation="vertical"
              color="neutral"
              state={getTileState('summary')}
              onClick={() => handleTileClick('summary')}
            />
            <TileButton
              title="AI Quiz"
              subtitle="Generate quiz"
              icon="fa-solid fa-circle-question"
              orientation="vertical"
              color="neutral"
              state={getTileState('quiz')}
              onClick={() => handleTileClick('quiz')}
            />
            <TileButton
              title="AI Flashcards"
              subtitle="Study cards"
              icon="fa-solid fa-layer-group"
              chipLabel="3"
              orientation="vertical"
              color="neutral"
              state={getTileState('flashcards')}
              onClick={() => handleTileClick('flashcards')}
            />
          </div>
        </div>
      </section>

      {/* Horizontal Orientation */}
      <section className={styles.section}>
        <Heading level={2}>Horizontal Orientation</Heading>
        
        <div className={styles.stateSection}>
          <Heading level={3}>Neutral Color - All States</Heading>
          <div className={styles.tilesGridHorizontal}>
            <TileButton
              title="Default State"
              subtitle="Secondary text"
              icon="fa-solid fa-microphone"
              orientation="horizontal"
              color="neutral"
              state="default"
              showArrow
            />
            <TileButton
              title="Hover State"
              subtitle="Secondary text"
              icon="fa-solid fa-image"
              orientation="horizontal"
              color="neutral"
              state="hover"
              showArrow
            />
            <TileButton
              title="Pressed State"
              subtitle="Secondary text"
              icon="fa-solid fa-link"
              orientation="horizontal"
              color="neutral"
              state="pressed"
              showArrow
            />
            <TileButton
              title="Selected State"
              subtitle="Secondary text"
              icon="fa-solid fa-file-pdf"
              chipLabel="✓"
              orientation="horizontal"
              color="neutral"
              state="selected"
              showArrow
            />
            <TileButton
              title="Loading State"
              subtitle="Please wait..."
              icon="fa-solid fa-spinner"
              orientation="horizontal"
              color="neutral"
              state="loading"
              loadingText="Processing..."
              showArrow
            />
            <TileButton
              title="Disabled State"
              subtitle="Not available"
              icon="fa-solid fa-ban"
              orientation="horizontal"
              color="neutral"
              disabled
              showArrow
            />
          </div>
        </div>

        <div className={styles.stateSection}>
          <Heading level={3}>Source Types</Heading>
          <div className={styles.tilesGridHorizontal}>
            <TileButton
              title="Document (PDF)"
              subtitle="Upload PDF files"
              icon="fa-solid fa-file-pdf"
              orientation="horizontal"
              color="neutral"
              state={getTileState('pdf')}
              onClick={() => handleTileClick('pdf')}
              showArrow
            />
            <TileButton
              title="Audio Recording"
              subtitle="Record or upload audio"
              icon="fa-solid fa-microphone"
              chipLabel="New"
              orientation="horizontal"
              color="neutral"
              state={getTileState('audio')}
              onClick={() => handleTileClick('audio')}
              showArrow
            />
            <TileButton
              title="Video"
              subtitle="Upload video files"
              icon="fa-solid fa-video"
              orientation="horizontal"
              color="neutral"
              state={getTileState('video')}
              onClick={() => handleTileClick('video')}
              showArrow
            />
            <TileButton
              title="Link"
              subtitle="Paste a web link"
              icon="fa-solid fa-link"
              orientation="horizontal"
              color="neutral"
              state={getTileState('link')}
              onClick={() => handleTileClick('link')}
              showArrow
            />
          </div>
        </div>
      </section>

      {/* With/Without Elements */}
      <section className={styles.section}>
        <Heading level={2}>Optional Elements</Heading>
        
        <div className={styles.tilesGrid}>
          <TileButton
            title="No Subtitle"
            icon="fa-solid fa-file"
            orientation="vertical"
            color="neutral"
          />
          <TileButton
            title="With Chip"
            subtitle="Has chip badge"
            icon="fa-solid fa-file"
            chipLabel="5"
            orientation="vertical"
            color="neutral"
          />
          <TileButton
            title="No Icon"
            subtitle="Title only"
            orientation="vertical"
            color="neutral"
          />
          <TileButton
            title="Long Title Text That Wraps to Multiple Lines"
            subtitle="This is how it handles longer content"
            icon="fa-solid fa-file"
            orientation="vertical"
            color="neutral"
          />
        </div>
      </section>
    </div>
  );
}






