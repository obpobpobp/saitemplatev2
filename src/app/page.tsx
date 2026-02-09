'use client';

import { Header } from '@/design-system/components/layout/Header';
import { Logo } from '@/design-system/components/branding/Logo';
import { CourseSearch } from './CourseSearch';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerWrapper}>
        <Header
          variant="home-guest"
          logo={<Logo variant="icon" height={16} />}
          title="Studocu AI"
        />
      </div>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.content}>
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <h1 className={styles.heroHeading}>
              <span className={styles.headingText}>What course are you </span>
              <span className={styles.headingGradient}>studying?</span>
            </h1>
            <p className={styles.heroSubtext}>
              Find your course to start with study materials from other students
            </p>

            <CourseSearch />
          </div>
        </div>
      </main>
    </div>
  );
}

