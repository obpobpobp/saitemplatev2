'use client';

import React from 'react';
import { Logo } from '@/design-system/components/branding/Logo';
import { LogoBox } from '@/design-system/components/layout/Header/LogoBox';
import styles from './page.module.css';

export default function LogoDemo(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Logo Component - Figma Specifications</h1>
        <p className={styles.description}>
          Logo rendering exactly as specified in Figma design
        </p>

        {/* Header Logo (In Box) */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Header Logo (With Background Box)</h2>
          <p className={styles.sectionDesc}>24x24px box with 16x16px icon - as used in header</p>
          
          <div className={styles.logoDisplay}>
            <div className={styles.logoItem}>
              <LogoBox>
                <Logo variant="icon" height={16} />
              </LogoBox>
              <div className={styles.specs}>
                <div className={styles.specLabel}>Container:</div>
                <div className={styles.specValue}>24x24px</div>
                <div className={styles.specLabel}>Background:</div>
                <div className={styles.specValue}>#f6f7fb</div>
                <div className={styles.specLabel}>Border Radius:</div>
                <div className={styles.specValue}>5px</div>
                <div className={styles.specLabel}>Logo Size:</div>
                <div className={styles.specValue}>16x16px</div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Icon Sizes */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Logo Icon - Various Sizes</h2>
          <p className={styles.sectionDesc}>Icon-only variant at different sizes</p>
          
          <div className={styles.logoRow}>
            <div className={styles.logoItem}>
              <Logo variant="icon" height={16} />
              <span className={styles.sizeLabel}>16px (Header)</span>
            </div>
            <div className={styles.logoItem}>
              <Logo variant="icon" height={24} />
              <span className={styles.sizeLabel}>24px (Default)</span>
            </div>
            <div className={styles.logoItem}>
              <Logo variant="icon" height={32} />
              <span className={styles.sizeLabel}>32px (Large)</span>
            </div>
            <div className={styles.logoItem}>
              <Logo variant="icon" height={48} />
              <span className={styles.sizeLabel}>48px (XL)</span>
            </div>
          </div>
        </div>

        {/* Logo Logotype */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Logo Logotype (Full Brand)</h2>
          <p className={styles.sectionDesc}>Full brand mark with text</p>
          
          <div className={styles.logoRow}>
            <div className={styles.logoItem}>
              <Logo variant="logotype" height={24} />
              <span className={styles.sizeLabel}>24px (Default)</span>
            </div>
          </div>
          <div className={styles.logoRow}>
            <div className={styles.logoItem}>
              <Logo variant="logotype" height={32} />
              <span className={styles.sizeLabel}>32px (Large)</span>
            </div>
          </div>
          <div className={styles.logoRow}>
            <div className={styles.logoItem}>
              <Logo variant="logotype" height={48} />
              <span className={styles.sizeLabel}>48px (XL)</span>
            </div>
          </div>
        </div>

        {/* Color Variants */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Color Variants</h2>
          <p className={styles.sectionDesc}>Dark, light, and auto (theme-aware)</p>
          
          <div className={styles.colorGrid}>
            <div className={styles.colorBox} style={{ backgroundColor: '#ffffff' }}>
              <Logo variant="icon" height={32} color="dark" />
              <span className={styles.colorLabel}>Dark (on light)</span>
            </div>
            <div className={styles.colorBox} style={{ backgroundColor: '#2f3e4e' }}>
              <Logo variant="icon" height={32} color="light" />
              <span className={styles.colorLabel}>Light (on dark)</span>
            </div>
            <div className={styles.colorBox} style={{ backgroundColor: '#f6f7fb' }}>
              <Logo variant="icon" height={32} color="auto" />
              <span className={styles.colorLabel}>Auto (theme-aware)</span>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Usage in Header</h2>
          <p className={styles.sectionDesc}>Complete header logo implementation</p>
          
          <div className={styles.codeBlock}>
            <pre><code>{`// In Header component
<LogoBox>
  <Logo variant="icon" height={16} />
</LogoBox>

// LogoBox provides:
// - 24x24px container
// - #f6f7fb background
// - 5px border radius
// - Centered logo`}</code></pre>
          </div>
        </div>

        {/* Specifications */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Complete Specifications</h2>
          <div className={styles.specGrid}>
            <div className={styles.specCard}>
              <h3>Container (LogoBox)</h3>
              <ul>
                <li><strong>Size:</strong> 24x24px</li>
                <li><strong>Background:</strong> #f6f7fb (var(--color-surface-secondary))</li>
                <li><strong>Border Radius:</strong> 5px (var(--border-radius-xs))</li>
                <li><strong>Display:</strong> flex, centered</li>
                <li><strong>Gap:</strong> 10px (not used for single logo)</li>
              </ul>
            </div>
            <div className={styles.specCard}>
              <h3>Logo Icon</h3>
              <ul>
                <li><strong>Size:</strong> 16x16px (in header)</li>
                <li><strong>Color:</strong> #0a0a0a (currentColor)</li>
                <li><strong>Format:</strong> SVG inline</li>
                <li><strong>ViewBox:</strong> 0 0 30 30</li>
                <li><strong>Fill:</strong> currentColor</li>
              </ul>
            </div>
            <div className={styles.specCard}>
              <h3>Logo Logotype</h3>
              <ul>
                <li><strong>Default Height:</strong> 24px</li>
                <li><strong>Aspect Ratio:</strong> 124:30 (~4.13:1)</li>
                <li><strong>ViewBox:</strong> 0 0 124 30</li>
                <li><strong>Color:</strong> currentColor</li>
                <li><strong>Usage:</strong> Hero, marketing pages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






