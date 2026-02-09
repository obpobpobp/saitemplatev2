'use client';

import React, { useState } from 'react';
import { SourceTile } from '@/design-system/components/layout/Sidebar/SourceTile';
import { Heading } from '@/design-system/components/typography/Heading';
import { Text } from '@/design-system/components/typography/Text';
import styles from './page.module.css';

/**
 * Tiles Demo Page - Showcases tile states for Creations and Sources using SourceTile
 */
export default function TilesDemoPage(): JSX.Element {
  const [selectedCreation, setSelectedCreation] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Heading level={1}>Tiles Demo</Heading>
        <Text>SourceTile component used for both Creation and Source tiles with custom icons and subtitles</Text>
      </div>

      {/* Creation Tiles - using SourceTile with custom icons */}
      <section className={styles.section}>
        <Heading level={2}>Creation Tiles (SourceTile with Custom Icons)</Heading>
        
        <div className={styles.stateSection}>
          <Heading level={3}>Default State - All Creation Types</Heading>
          <div className={styles.tilesGrid}>
            <SourceTile
              title="Pharmacology for Nurses"
              type="pdf"
              subtitle="Note"
              icon={<i className="fa-solid fa-file" aria-hidden="true" />}
              state="default"
              onClick={() => setSelectedCreation('note-default')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="Summary of Chapter 3"
              type="pdf"
              subtitle="Summary"
              icon={<i className="fa-solid fa-pen-nib" aria-hidden="true" />}
              state="default"
              onClick={() => setSelectedCreation('summary-default')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="Quiz: Cardiovascular System"
              type="pdf"
              subtitle="Quiz"
              icon={<i className="fa-solid fa-circle-question" aria-hidden="true" />}
              state="default"
              onClick={() => setSelectedCreation('quiz-default')}
              onMoreClick={() => console.log('More clicked')}
            />
          </div>
        </div>

        <div className={styles.stateSection}>
          <Heading level={3}>Hover State</Heading>
          <div className={styles.tilesGrid}>
            <SourceTile
              title="Pharmacology for Nurses"
              type="pdf"
              subtitle="Note"
              icon={<i className="fa-solid fa-file" aria-hidden="true" />}
              state="hover"
              onClick={() => setSelectedCreation('note-hover')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="Summary of Chapter 3"
              type="pdf"
              subtitle="Summary"
              icon={<i className="fa-solid fa-pen-nib" aria-hidden="true" />}
              state="hover"
              onClick={() => setSelectedCreation('summary-hover')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="Quiz: Cardiovascular System"
              type="pdf"
              subtitle="Quiz"
              icon={<i className="fa-solid fa-circle-question" aria-hidden="true" />}
              state="hover"
              onClick={() => setSelectedCreation('quiz-hover')}
              onMoreClick={() => console.log('More clicked')}
            />
          </div>
        </div>

        <div className={styles.stateSection}>
          <Heading level={3}>Selected State (with Viewing badge)</Heading>
          <div className={styles.tilesGrid}>
            <SourceTile
              title="Pharmacology for Nurses"
              type="pdf"
              subtitle="Note"
              icon={<i className="fa-solid fa-file" aria-hidden="true" />}
              state="selected"
              onClick={() => setSelectedCreation('note-selected')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="Summary of Chapter 3"
              type="pdf"
              subtitle="Summary"
              icon={<i className="fa-solid fa-pen-nib" aria-hidden="true" />}
              state="selected"
              onClick={() => setSelectedCreation('summary-selected')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="Quiz: Cardiovascular System"
              type="pdf"
              subtitle="Quiz"
              icon={<i className="fa-solid fa-circle-question" aria-hidden="true" />}
              state="selected"
              onClick={() => setSelectedCreation('quiz-selected')}
              onMoreClick={() => console.log('More clicked')}
            />
          </div>
        </div>

        <div className={styles.stateSection}>
          <Heading level={3}>Loading State</Heading>
          <div className={styles.tilesGrid}>
            <SourceTile
              title="Creating..."
              type="pdf"
              subtitle="Note"
              icon={<i className="fa-solid fa-file" aria-hidden="true" />}
              state="loading"
            />
            <SourceTile
              title="Creating..."
              type="pdf"
              subtitle="Summary"
              icon={<i className="fa-solid fa-pen-nib" aria-hidden="true" />}
              state="loading"
            />
            <SourceTile
              title="Creating..."
              type="pdf"
              subtitle="Quiz"
              icon={<i className="fa-solid fa-circle-question" aria-hidden="true" />}
              state="loading"
            />
          </div>
        </div>

        <div className={styles.stateSection}>
          <Heading level={3}>Error State (with retry and close buttons)</Heading>
          <div className={styles.tilesGrid}>
            <SourceTile
              title="Failed to generate"
              type="pdf"
              subtitle="Note"
              icon={<i className="fa-solid fa-file" aria-hidden="true" />}
              state="error"
              errorMessage="Failed to generate"
              onRetryClick={() => console.log('Retry clicked')}
              onCloseClick={() => console.log('Close clicked')}
            />
            <SourceTile
              title="Failed to create summary"
              type="pdf"
              subtitle="Summary"
              icon={<i className="fa-solid fa-pen-nib" aria-hidden="true" />}
              state="error"
              errorMessage="Failed to create summary"
              onRetryClick={() => console.log('Retry clicked')}
              onCloseClick={() => console.log('Close clicked')}
            />
            <SourceTile
              title="Quiz generation failed"
              type="pdf"
              subtitle="Quiz"
              icon={<i className="fa-solid fa-circle-question" aria-hidden="true" />}
              state="error"
              errorMessage="Quiz generation failed"
              onRetryClick={() => console.log('Retry clicked')}
              onCloseClick={() => console.log('Close clicked')}
            />
          </div>
        </div>
      </section>

      {/* Source Tiles - default SourceTile usage */}
      <section className={styles.section}>
        <Heading level={2}>Source Tiles (Default SourceTile Icons)</Heading>
        
        <div className={styles.stateSection}>
          <Heading level={3}>Default State - All Source Types</Heading>
          <div className={styles.tilesGrid}>
            <SourceTile
              title="Pharmacology for Nurses.pdf"
              type="pdf"
              state="default"
              onClick={() => setSelectedSource('pdf')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="Pasted notes"
              type="text"
              state="default"
              onClick={() => setSelectedSource('text')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="youtube.mov"
              type="video"
              state="default"
              onClick={() => setSelectedSource('video')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="Lesson 1: Cardiovascular system"
              type="audio"
              subtitle="Class recording"
              state="default"
              onClick={() => setSelectedSource('audio')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="Slides_from_last_class.pptx"
              type="slides"
              state="default"
              onClick={() => setSelectedSource('slides')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="Diagram23.png"
              type="image"
              state="default"
              onClick={() => setSelectedSource('image')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="en.wikipedia.org/wiki/Carper%2..."
              type="link"
              state="default"
              onClick={() => setSelectedSource('link')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="Lecture on nursing pract..."
              type="studocu"
              subtitle="Pharmacology • 98% (788)"
              state="default"
              onClick={() => setSelectedSource('studocu')}
              onMoreClick={() => console.log('More clicked')}
            />
          </div>
        </div>

        <div className={styles.stateSection}>
          <Heading level={3}>Hover State (with border)</Heading>
          <div className={styles.tilesGrid}>
            <SourceTile
              title="Pharmacology for Nurses.pdf"
              type="pdf"
              state="hover"
              onClick={() => console.log('PDF clicked')}
              onMoreClick={() => console.log('More clicked')}
            />
          </div>
        </div>

        <div className={styles.stateSection}>
          <Heading level={3}>Selected State (with Viewing badge)</Heading>
          <div className={styles.tilesGrid}>
            <SourceTile
              title="Pharmacology for Nurses.pdf"
              type="pdf"
              state="selected"
              onClick={() => setSelectedSource('pdf-selected')}
              onMoreClick={() => console.log('More clicked')}
            />
            <SourceTile
              title="youtube.mov"
              type="video"
              state="selected"
              onClick={() => setSelectedSource('video-selected')}
              onMoreClick={() => console.log('More clicked')}
            />
          </div>
        </div>

        <div className={styles.stateSection}>
          <Heading level={3}>Loading State</Heading>
          <div className={styles.tilesGrid}>
            <SourceTile
              title="Uploading..."
              type="pdf"
              state="loading"
            />
          </div>
        </div>

        <div className={styles.stateSection}>
          <Heading level={3}>Error State</Heading>
          <div className={styles.tilesGrid}>
            <SourceTile
              title="Failed to add"
              type="pdf"
              state="error"
              errorMessage="Failed to add"
              onRetryClick={() => console.log('Retry clicked')}
              onCloseClick={() => console.log('Close clicked')}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
