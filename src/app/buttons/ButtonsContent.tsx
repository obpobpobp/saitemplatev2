/**
 * Buttons Page Content Component
 * Client-side mounted to avoid SSR issues with theme
 */

'use client';

import { useEffect, useState } from 'react';
import { Button, Icon } from '@/design-system/components/buttons';
import { ThemeToggle } from '@/design-system/components/theme/ThemeToggle';
import { Logo } from '@/design-system/components/branding';
import styles from './page.module.css';

export function ButtonsContent() {
  const [mounted, setMounted] = useState(false);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLoading = (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Don't render until mounted to avoid SSR issues
  if (!mounted) {
    return (
      <main className={styles.main}>
        <div className={styles.loading}>Loading...</div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.headerTop}>
        <Logo variant="logotype" color="auto" height={28} />
      </div>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Button System</h1>
        <ThemeToggle />
      </div>

      <p className={styles.subtitle}>
        Complete button component library with Figma design fidelity
      </p>

      {/* All Variants Overview */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Variants Overview</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Primary</h3>
            <div className={styles.buttonGroup}>
              <Button variant="primary" color="black">Black</Button>
              <Button variant="primary" color="blue">Blue</Button>
              <Button variant="primary" color="gray">Gray</Button>
              <Button variant="primary" color="white">White</Button>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Secondary</h3>
            <div className={styles.buttonGroup}>
              <Button variant="secondary" color="black">Black</Button>
              <Button variant="secondary" color="blue">Blue</Button>
              <Button variant="secondary" color="gray">Gray</Button>
              <Button variant="secondary" color="white">White</Button>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Tertiary</h3>
            <div className={styles.buttonGroup}>
              <Button variant="tertiary" color="black">Black</Button>
              <Button variant="tertiary" color="blue">Blue</Button>
              <Button variant="tertiary" color="gray">Gray</Button>
              <Button variant="tertiary" color="white">White</Button>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Plain</h3>
            <div className={styles.buttonGroup}>
              <Button variant="plain" color="black">Black</Button>
              <Button variant="plain" color="blue">Blue</Button>
              <Button variant="plain" color="gray">Gray</Button>
              <Button variant="plain" color="white">White</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Size Variants */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Size Variants</h2>
        <div className={styles.card}>
          <div className={styles.sizeDemo}>
            <div className={styles.sizeRow}>
              <span className={styles.sizeLabel}>Large</span>
              <Button size="large" variant="primary" color="blue">
                Large Button
              </Button>
            </div>
            <div className={styles.sizeRow}>
              <span className={styles.sizeLabel}>Medium</span>
              <Button size="medium" variant="primary" color="blue">
                Medium Button
              </Button>
            </div>
            <div className={styles.sizeRow}>
              <span className={styles.sizeLabel}>Small</span>
              <Button size="small" variant="primary" color="blue">
                Small Button
              </Button>
            </div>
            <div className={styles.sizeRow}>
              <span className={styles.sizeLabel}>Micro</span>
              <Button size="micro" variant="primary" color="blue">
                Micro Button
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons with Icons */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Buttons with Icons</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Left Icon</h3>
            <div className={styles.buttonGroup}>
              <Button
                variant="primary"
                color="blue"
                leftIcon={<Icon name="check" size="medium" />}
              >
                Save
              </Button>
              <Button
                variant="secondary"
                color="blue"
                leftIcon={<Icon name="download" size="medium" />}
              >
                Download
              </Button>
              <Button
                variant="tertiary"
                color="blue"
                leftIcon={<Icon name="arrow-left" size="medium" />}
              >
                Back
              </Button>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Right Icon</h3>
            <div className={styles.buttonGroup}>
              <Button
                variant="primary"
                color="blue"
                rightIcon={<Icon name="arrow-right" size="medium" />}
              >
                Next
              </Button>
              <Button
                variant="secondary"
                color="blue"
                rightIcon={<Icon name="external-link" size="medium" />}
              >
                Open
              </Button>
              <Button
                variant="tertiary"
                color="blue"
                rightIcon={<Icon name="chevron-down" size="medium" />}
              >
                More
              </Button>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Icon Only</h3>
            <div className={styles.buttonGroup}>
              <Button
                variant="primary"
                color="blue"
                size="large"
                iconOnly={<Icon name="heart" size="large" ariaLabel="Like" />}
              />
              <Button
                variant="secondary"
                color="blue"
                size="medium"
                iconOnly={<Icon name="search" size="medium" ariaLabel="Search" />}
              />
              <Button
                variant="tertiary"
                color="blue"
                size="small"
                iconOnly={<Icon name="close" size="small" ariaLabel="Close" />}
              />
              <Button
                variant="plain"
                color="blue"
                size="micro"
                iconOnly={<Icon name="ellipsis" size="micro" ariaLabel="Menu" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive States */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Interactive States</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Loading State</h3>
            <div className={styles.buttonGroup}>
              <Button
                variant="primary"
                color="blue"
                isLoading={loadingStates.primary1}
                onClick={() => toggleLoading('primary1')}
              >
                {loadingStates.primary1 ? 'Loading...' : 'Click to Load'}
              </Button>
              <Button
                variant="secondary"
                color="blue"
                isLoading={loadingStates.secondary1}
                onClick={() => toggleLoading('secondary1')}
              >
                {loadingStates.secondary1 ? 'Processing...' : 'Process'}
              </Button>
              <Button
                variant="tertiary"
                color="blue"
                isLoading={loadingStates.tertiary1}
                size="small"
                onClick={() => toggleLoading('tertiary1')}
              >
                {loadingStates.tertiary1 ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Disabled State</h3>
            <div className={styles.buttonGroup}>
              <Button variant="primary" color="blue" isDisabled>
                Disabled Primary
              </Button>
              <Button variant="secondary" color="blue" isDisabled>
                Disabled Secondary
              </Button>
              <Button variant="tertiary" color="blue" isDisabled>
                Disabled Tertiary
              </Button>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Full Width</h3>
            <div className={styles.fullWidthDemo}>
              <Button variant="primary" color="blue" isFullWidth>
                Full Width Primary
              </Button>
              <Button variant="secondary" color="blue" isFullWidth>
                Full Width Secondary
              </Button>
              <Button variant="tertiary" color="blue" isFullWidth>
                Full Width Tertiary
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Button Groups */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Button Groups</h2>
        <div className={styles.card}>
          <div className={styles.buttonGroupInline}>
            <Button variant="secondary" color="blue">
              Cancel
            </Button>
            <Button variant="primary" color="blue">
              Confirm
            </Button>
          </div>
        </div>
      </section>

      {/* All Colors - Primary Buttons */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Primary Buttons - All Colors</h2>
        <div className={styles.colorGrid}>
          {(['black', 'blue', 'gray', 'white'] as const).map((color) => (
            <div key={color} className={styles.colorDemo}>
              <h3 className={styles.colorTitle}>{color.charAt(0).toUpperCase() + color.slice(1)}</h3>
              <div className={styles.colorButtonGroup}>
                <Button variant="primary" color={color} size="large">
                  Large
                </Button>
                <Button variant="primary" color={color} size="medium">
                  Medium
                </Button>
                <Button variant="primary" color={color} size="small">
                  Small
                </Button>
                <Button variant="primary" color={color} size="micro">
                  Micro
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accessibility Demo */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Accessibility</h2>
        <div className={styles.card}>
          <p className={styles.accessibilityNote}>
            ✓ Keyboard navigation (Tab, Enter, Space)<br />
            ✓ Focus-visible states<br />
            ✓ Screen reader support<br />
            ✓ WCAG 2.1 AA color contrast<br />
            ✓ Disabled buttons not focusable<br />
            ✓ Loading state announced<br />
            ✓ Icon-only buttons with aria-labels
          </p>
        </div>
      </section>

      {/* Usage Examples */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Usage Examples</h2>
        <div className={styles.card}>
          <div className={styles.codeExample}>
            <pre className={styles.code}>
{`// Basic button
<Button variant="primary" color="blue">
  Click me
</Button>

// Button with icon
<Button 
  variant="secondary" 
  color="blue"
  leftIcon={<Icon name="check" />}
>
  Save
</Button>

// Icon-only button
<Button
  variant="tertiary"
  color="blue"
  iconOnly={<Icon name="close" ariaLabel="Close" />}
/>

// Loading button
<Button 
  variant="primary" 
  color="blue"
  isLoading
>
  Loading...
</Button>`}
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}

