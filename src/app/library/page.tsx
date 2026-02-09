/**
 * Library Results Page
 * 
 * Displays Studocu library documents matching the course search.
 * Users can select documents to add to their course.
 */

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/design-system/components/layout/Header';
import { Logo } from '@/design-system/components/branding/Logo';
import { Button } from '@/design-system/components/buttons/Button';
import { LibraryDocCard } from '@/components/LibraryDocCard';
import { searchLibrary } from '@/lib/mockData';
import { saveOnboarding } from '@/lib/storage';
import type { StudocuDocument } from '@/types/course';
import styles from './page.module.css';

function LibraryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseName = searchParams.get('q') || '';
  const university = searchParams.get('u') || '';
  
  const [docs, setDocs] = useState<StudocuDocument[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  
  useEffect(() => {
    // Redirect if no course name
    if (!courseName) {
      router.push('/');
      return;
    }
    
    // Search library
    const results = searchLibrary(courseName);
    setDocs(results);
    
    // Pre-select top 2 by downloads
    if (results.length > 0) {
      const topTwo = [...results]
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, 2)
        .map(doc => doc.id);
      setSelectedIds(new Set(topTwo));
    }
  }, [courseName, router]);
  
  const handleToggle = (docId: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(docId)) {
        newSet.delete(docId);
      } else {
        newSet.add(docId);
      }
      return newSet;
    });
  };
  
  const handleContinue = () => {
    const selectedDocs = docs.filter(doc => selectedIds.has(doc.id));
    
    // Save onboarding data
    saveOnboarding({
      courseName,
      university: university || undefined,
      selectedDocs,
      userUploads: [],
    });
    
    // Navigate to setup
    router.push('/setup');
  };
  
  const visibleDocs = showAll ? docs : docs.slice(0, 4);
  const hasMore = docs.length > 4;
  const selectedCount = selectedIds.size;
  
  // Empty state
  if (docs.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.headerWrapper}>
          <Header
            variant="home-guest"
            logo={<Logo variant="icon" height={16} />}
            title="Studocu AI"
          />
        </div>
        
        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <i className="fa-solid fa-folder-open" />
              </div>
              <h2 className={styles.emptyTitle}>No documents found</h2>
              <p className={styles.emptyText}>
                We couldn't find any documents for "{courseName}"{university && ` at ${university}`}.
              </p>
              <div className={styles.emptyActions}>
                <Button
                  variant="secondary"
                  color="gray"
                  onClick={() => router.push('/')}
                >
                  Try another search
                </Button>
                <Button
                  variant="primary"
                  color="blue"
                  onClick={() => router.push('/setup?empty=true')}
                >
                  Start with empty course
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className={styles.page}>
      <div className={styles.headerWrapper}>
        <Header
          variant="home-guest"
          logo={<Logo variant="icon" height={16} />}
          title="Studocu AI"
        />
      </div>
      
      <main className={styles.main}>
        <div className={styles.content}>
          <button 
            className={styles.backButton}
            onClick={() => router.push('/')}
            aria-label="Back to search"
          >
            <i className="fa-solid fa-arrow-left" />
            Back
          </button>
          
          <div className={styles.header}>
            <h1 className={styles.title}>
              Found {docs.length} document{docs.length !== 1 ? 's' : ''} for{' '}
              <span className={styles.courseName}>{courseName}</span>
            </h1>
            {university && (
              <p className={styles.subtitle}>at {university}</p>
            )}
          </div>
          
          <div className={styles.docsList}>
            {visibleDocs.map(doc => (
              <LibraryDocCard
                key={doc.id}
                doc={doc}
                isSelected={selectedIds.has(doc.id)}
                onToggle={handleToggle}
              />
            ))}
          </div>
          
          {hasMore && !showAll && (
            <button
              className={styles.showMoreButton}
              onClick={() => setShowAll(true)}
            >
              Show {docs.length - 4} more document{docs.length - 4 !== 1 ? 's' : ''}...
            </button>
          )}
        </div>
      </main>
      
      {/* Fixed footer with action button */}
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerInfo}>
            <span className={styles.selectedCount}>
              Selected: <strong>{selectedCount}</strong> document{selectedCount !== 1 ? 's' : ''}
            </span>
          </div>
          <Button
            variant="primary"
            color="blue"
            size="large"
            isDisabled={selectedCount === 0}
            onClick={handleContinue}
            rightIcon={<i className="fa-solid fa-arrow-right" />}
          >
            Add to My Course
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
      <LibraryContent />
    </Suspense>
  );
}
