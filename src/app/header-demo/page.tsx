'use client';

import React, { useState } from 'react';
import { Header } from '@/design-system/components/layout/Header';
import { Logo } from '@/design-system/components/branding/Logo';
import styles from './page.module.css';

export default function HeaderDemo(): JSX.Element {
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');

  const mockCollaborators = [
    {
      name: 'Maya Thompson',
      initials: 'MT',
      bgColor: '#fff5c4',
      avatarUrl: '/useravatar.jpg',
    },
    {
      name: 'John Doe',
      initials: 'JD',
      bgColor: '#d8bdff',
    },
    {
      name: 'Jane Smith',
      initials: 'JS',
      avatarUrl: '/useravatar.jpg',
    },
    {
      name: 'Bob Wilson',
      initials: 'BW',
      bgColor: '#ffd4e5',
    },
    {
      name: 'Alice Brown',
      initials: 'AB',
      bgColor: '#c4e7ff',
    },
    {
      name: 'Charlie Green',
      initials: 'CG',
      bgColor: '#c4fff5',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Header Component - Figma Variants</h1>
        <p className={styles.description}>
          Header component with 100% fidelity to Figma design
        </p>

        <div className={styles.variantSection}>
          <div className={styles.variantHeader}>
            <h2 className={styles.variantTitle}>Home Variant</h2>
            <p className={styles.variantDesc}>Simple header with logo and avatar</p>
          </div>
          <div className={styles.headerWrapper}>
          <Header
            variant="home"
            logo={<Logo variant="icon" height={16} />}
            title="Studocu AI"
            avatarUrl="/useravatar.jpg"
            onAvatarClick={() => console.log('Avatar clicked')}
          />
          </div>
        </div>

        <div className={styles.variantSection}>
          <div className={styles.variantHeader}>
            <h2 className={styles.variantTitle}>Project Variant</h2>
            <p className={styles.variantDesc}>Full header with title, breadcrumb, actions, and avatar</p>
          </div>
          <div className={styles.headerWrapper}>
          <Header
            variant="project"
            logo={<Logo variant="icon" height={16} />}
            title="Untitled Project"
            hasTitleDropdown
            onTitleDropdownClick={() => console.log('Title dropdown clicked')}
            breadcrumbLabel="Pharmacology"
            onBreadcrumbClick={() => console.log('Breadcrumb clicked')}
            privacy={privacy}
            onPrivacyClick={() => setPrivacy(privacy === 'public' ? 'private' : 'public')}
            onShareClick={() => console.log('Share clicked')}
            avatarUrl="/useravatar.jpg"
            onAvatarClick={() => console.log('Avatar clicked')}
          />
          </div>
        </div>

        <div className={styles.variantSection}>
          <div className={styles.variantHeader}>
            <h2 className={styles.variantTitle}>Shared Variant</h2>
            <p className={styles.variantDesc}>Header with multiple collaborator avatars</p>
          </div>
          <div className={styles.headerWrapper}>
          <Header
            variant="shared"
            logo={<Logo variant="icon" height={16} />}
            title="Untitled Project"
            hasTitleDropdown
            onTitleDropdownClick={() => console.log('Title dropdown clicked')}
            breadcrumbLabel="Pharmacology"
            onBreadcrumbClick={() => console.log('Breadcrumb clicked')}
            privacy={privacy}
            onPrivacyClick={() => setPrivacy(privacy === 'public' ? 'private' : 'public')}
            onShareClick={() => console.log('Share clicked')}
            collaborators={mockCollaborators}
            onCollaboratorsClick={() => console.log('Collaborators clicked')}
          />
          </div>
        </div>

        <div className={styles.variantSection}>
          <div className={styles.variantHeader}>
            <h2 className={styles.variantTitle}>Guest Variant</h2>
            <p className={styles.variantDesc}>Header with sign-in button for guests</p>
          </div>
          <div className={styles.headerWrapper}>
          <Header
            variant="guest"
            logo={<Logo variant="icon" height={16} />}
            title="Untitled Project"
            hasTitleDropdown
            onTitleDropdownClick={() => console.log('Title dropdown clicked')}
            breadcrumbLabel="Pharmacology"
            onBreadcrumbClick={() => console.log('Breadcrumb clicked')}
            privacy={privacy}
            onPrivacyClick={() => setPrivacy(privacy === 'public' ? 'private' : 'public')}
            onShareClick={() => console.log('Share clicked')}
            onSignInClick={() => console.log('Sign in clicked')}
          />
          </div>
        </div>

        <div className={styles.variantSection}>
          <div className={styles.variantHeader}>
            <h2 className={styles.variantTitle}>Home Guest Variant</h2>
            <p className={styles.variantDesc}>Simple header with logo and sign-in button</p>
          </div>
          <div className={styles.headerWrapper}>
          <Header
            variant="home-guest"
            logo={<Logo variant="icon" height={16} />}
            title="Studocu AI"
            onSignInClick={() => console.log('Sign in clicked')}
          />
          </div>
        </div>
      </div>
    </div>
  );
}

