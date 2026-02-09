'use client';

import { useEffect, useState } from 'react';
import { Heading, Text, Link } from '@design-system/components/typography';
import { ThemeToggle } from '@design-system/components/theme/ThemeToggle';
import styles from './page.module.css';

export default function TypographyPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Heading level={1}>Typography System</Heading>
        <ThemeToggle size="medium" showLabel />
      </header>

      <main className={styles.main}>
        {/* Headings Section */}
        <section className={styles.section}>
          <Heading level={2} variant="headline">
            Headings
          </Heading>
          <Text variant="body-md" className={styles.description}>
            Semantic heading elements (h1-h6) with optional visual variants.
          </Text>

          <div className={styles.examples}>
            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Level 1 (Default)
              </Text>
              <Heading level={1}>The quick brown fox jumps</Heading>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Level 2 (Default)
              </Text>
              <Heading level={2}>The quick brown fox jumps</Heading>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Level 3 (Default)
              </Text>
              <Heading level={3}>The quick brown fox jumps</Heading>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Level 4 (Default)
              </Text>
              <Heading level={4}>The quick brown fox jumps</Heading>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Level 5 (Default)
              </Text>
              <Heading level={5}>The quick brown fox jumps</Heading>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Level 6 (Default)
              </Text>
              <Heading level={6}>The quick brown fox jumps</Heading>
            </div>
          </div>
        </section>

        {/* Heading Variants Section */}
        <section className={styles.section}>
          <Heading level={2} variant="headline">
            Heading Variants
          </Heading>
          <Text variant="body-md" className={styles.description}>
            Style variants can be applied independently of semantic level.
          </Text>

          <div className={styles.examples}>
            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Display Variant
              </Text>
              <Heading level={2} variant="display">
                Display Heading
              </Heading>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Headline Variant
              </Text>
              <Heading level={3} variant="headline">
                Headline Text
              </Heading>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Title Variant
              </Text>
              <Heading level={4} variant="title">
                Title Text
              </Heading>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Subtitle Variant
              </Text>
              <Heading level={5} variant="subtitle">
                Subtitle Text
              </Heading>
            </div>
          </div>
        </section>

        {/* Text Variants Section */}
        <section className={styles.section}>
          <Heading level={2} variant="headline">
            Text Variants
          </Heading>
          <Text variant="body-md" className={styles.description}>
            Body text components for paragraphs, captions, and labels.
          </Text>

          <div className={styles.examples}>
            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Body Large
              </Text>
              <Text variant="body-lg">
                The quick brown fox jumps over the lazy dog. This is body-lg
                variant with larger text size for emphasis or introductory
                paragraphs.
              </Text>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Body Medium (Default)
              </Text>
              <Text variant="body-md">
                The quick brown fox jumps over the lazy dog. This is body-md
                variant, the default size for body text and paragraphs.
              </Text>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Body Small
              </Text>
              <Text variant="body-sm">
                The quick brown fox jumps over the lazy dog. This is body-sm
                variant for smaller text and secondary content.
              </Text>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Caption
              </Text>
              <Text variant="caption">
                The quick brown fox jumps over the lazy dog. Caption text for
                images and supplementary information.
              </Text>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Label
              </Text>
              <Text variant="label">LABEL TEXT FOR FORMS AND UI ELEMENTS</Text>
            </div>
          </div>
        </section>

        {/* Text Alignment Section */}
        <section className={styles.section}>
          <Heading level={2} variant="headline">
            Text Alignment
          </Heading>
          <Text variant="body-md" className={styles.description}>
            Text components support left, center, and right alignment.
          </Text>

          <div className={styles.examples}>
            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Left Aligned (Default)
              </Text>
              <Text variant="body-md" align="left">
                The quick brown fox jumps over the lazy dog.
              </Text>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Center Aligned
              </Text>
              <Text variant="body-md" align="center">
                The quick brown fox jumps over the lazy dog.
              </Text>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Right Aligned
              </Text>
              <Text variant="body-md" align="right">
                The quick brown fox jumps over the lazy dog.
              </Text>
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section className={styles.section}>
          <Heading level={2} variant="headline">
            Links
          </Heading>
          <Text variant="body-md" className={styles.description}>
            Link component with Next.js integration and external link support.
          </Text>

          <div className={styles.examples}>
            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                Internal Link (Next.js)
              </Text>
              <Text variant="body-md">
                Visit our <Link href="/">homepage</Link> or learn more on the{' '}
                <Link href="/typography">typography page</Link>.
              </Text>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                External Link
              </Text>
              <Text variant="body-md">
                Check out <Link href="https://nextjs.org" external>
                  Next.js documentation
                </Link>{' '}
                for more information.
              </Text>
            </div>

            <div className={styles.example}>
              <Text variant="caption" className={styles.label}>
                External Link with Icon
              </Text>
              <Text variant="body-md">
                Read the{' '}
                <Link
                  href="https://www.w3.org/WAI/WCAG21/quickref/"
                  external
                  showExternalIcon
                >
                  WCAG Guidelines
                </Link>{' '}
                for accessibility best practices.
              </Text>
            </div>
          </div>
        </section>

        {/* Responsive Typography Section */}
        <section className={styles.section}>
          <Heading level={2} variant="headline">
            Responsive Typography
          </Heading>
          <Text variant="body-md" className={styles.description}>
            All typography scales responsively based on screen size. Resize your
            browser to see the effect.
          </Text>

          <div className={styles.responsiveDemo}>
            <Heading level={1}>Responsive Heading</Heading>
            <Text variant="body-lg">
              Typography automatically adjusts for mobile, tablet, and desktop
              viewports using design tokens and media queries.
            </Text>
          </div>
        </section>

        {/* Theme Demo Section */}
        <section className={styles.section}>
          <Heading level={2} variant="headline">
            Theme Support
          </Heading>
          <Text variant="body-md" className={styles.description}>
            Toggle the theme to see typography adapt to light and dark modes.
            All text colors use semantic design tokens.
          </Text>

          <div className={styles.themeDemo}>
            <Heading level={3}>Heading in Current Theme</Heading>
            <Text variant="body-md">
              Body text automatically adjusts color based on the active theme
              while maintaining WCAG AA contrast ratios.
            </Text>
            <Text variant="caption">
              Caption text uses secondary color with appropriate contrast.
            </Text>
            <Text variant="body-md">
              <Link href="#">Links use the interactive color</Link> which adapts
              to the theme.
            </Text>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <Text variant="caption" align="center">
          Typography System • StudocuAI Design System Template
        </Text>
      </footer>
    </div>
  );
}

