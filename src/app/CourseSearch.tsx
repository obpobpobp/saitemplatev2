/**
 * CourseSearch Component
 * 
 * Landing page form for searching courses.
 * Users enter course name and optional university to find Studocu library docs.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/design-system/components/buttons/Button';
import styles from './CourseSearch.module.css';

export function CourseSearch() {
  const router = useRouter();
  const [courseName, setCourseName] = useState('');
  const [university, setUniversity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseName.trim()) {
      return;
    }

    // Build query params
    const params = new URLSearchParams();
    params.set('q', courseName.trim());
    if (university.trim()) {
      params.set('u', university.trim());
    }

    // Navigate to library page
    router.push(`/library?${params.toString()}`);
  };

  const handleStartEmpty = () => {
    router.push('/setup?empty=true');
  };

  const isValid = courseName.trim().length > 0;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="courseName" className={styles.label}>
            Course name
          </label>
          <input
            id="courseName"
            type="text"
            className={styles.input}
            placeholder="e.g., Pharmacology 101"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            autoFocus
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="university" className={styles.label}>
            University (optional)
          </label>
          <input
            id="university"
            type="text"
            className={styles.input}
            placeholder="University name"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          color="blue"
          size="large"
          isFullWidth
          isDisabled={!isValid}
        >
          Find My Course
        </Button>
      </form>

      <div className={styles.divider}>
        <span className={styles.dividerText}>Or</span>
      </div>

      <button
        type="button"
        className={styles.linkButton}
        onClick={handleStartEmpty}
      >
        Start with empty course
      </button>
    </div>
  );
}
