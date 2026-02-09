'use client';

import React from 'react';
import { AvatarControl } from '@/design-system/components/layout/Header/AvatarControl';
import { AvatarSet } from '@/design-system/components/layout/Header/AvatarSet';
import styles from './page.module.css';

export default function AvatarDemo(): JSX.Element {
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
      name: 'Zara Johnson',
      initials: 'ZJ',
      bgColor: '#d8bdff',
    },
    {
      name: 'Emma Smith',
      initials: 'ES',
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
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Avatar Components - Figma Fidelity</h1>
        <p className={styles.description}>
          All avatar components matching Figma specifications exactly
        </p>

        {/* Avatar Master States */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Avatar Master (28x28px)</h2>
          <p className={styles.sectionDesc}>Individual avatar states</p>
          
          <div className={styles.group}>
            <div className={styles.variantLabel}>Guest (No Avatar)</div>
            <div className={styles.avatarGroup}>
              <div className={styles.avatarItem}>
                <span className={styles.label}>Default</span>
                <AvatarControl
                  initials="U"
                  hasDropdown={false}
                />
              </div>
            </div>
          </div>

          <div className={styles.group}>
            <div className={styles.variantLabel}>Studocu Initials</div>
            <div className={styles.avatarGroup}>
              <div className={styles.avatarItem}>
                <span className={styles.label}>Default</span>
                <AvatarControl
                  initials="MT"
                  hasDropdown={false}
                />
              </div>
              <div className={styles.avatarItem}>
                <span className={styles.label}>Hover</span>
                <AvatarControl
                  initials="MT"
                  hasDropdown={false}
                  className={styles.hover}
                />
              </div>
            </div>
          </div>

          <div className={styles.group}>
            <div className={styles.variantLabel}>Studocu Image</div>
            <div className={styles.avatarGroup}>
              <div className={styles.avatarItem}>
                <span className={styles.label}>Default</span>
                <AvatarControl
                  avatarUrl="/useravatar.jpg"
                  hasDropdown={false}
                />
              </div>
              <div className={styles.avatarItem}>
                <span className={styles.label}>Hover</span>
                <AvatarControl
                  avatarUrl="/useravatar.jpg"
                  hasDropdown={false}
                  className={styles.hover}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Controls */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Avatar Controls (32px height)</h2>
          <p className={styles.sectionDesc}>Avatar with dropdown chevron</p>
          
          <div className={styles.group}>
            <div className={styles.variantLabel}>No Active Collab</div>
            <div className={styles.avatarGroup}>
              <div className={styles.avatarItem}>
                <span className={styles.label}>Default</span>
                <AvatarControl
                  avatarUrl="/useravatar.jpg"
                  onClick={() => console.log('Clicked')}
                />
              </div>
              <div className={styles.avatarItem}>
                <span className={styles.label}>Hover</span>
                <AvatarControl
                  avatarUrl="/useravatar.jpg"
                  onClick={() => console.log('Clicked')}
                  className={styles.hover}
                />
              </div>
            </div>
          </div>

          <div className={styles.group}>
            <div className={styles.variantLabel}>Active Collab</div>
            <div className={styles.avatarGroup}>
              <div className={styles.avatarItem}>
                <span className={styles.label}>Default</span>
                <AvatarControl
                  avatarUrl="/useravatar.jpg"
                  collabCount={6}
                  onClick={() => console.log('Clicked')}
                />
              </div>
              <div className={styles.avatarItem}>
                <span className={styles.label}>Hover</span>
                <AvatarControl
                  avatarUrl="/useravatar.jpg"
                  collabCount={6}
                  onClick={() => console.log('Clicked')}
                  className={styles.hover}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Set */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Avatar Set</h2>
          <p className={styles.sectionDesc}>Multiple collaborator avatars</p>
          
          <div className={styles.group}>
            <div className={styles.variantLabel}>Variant 2 (2 avatars)</div>
            <div className={styles.avatarGroup}>
              <div className={styles.avatarItem}>
                <AvatarSet
                  avatars={mockCollaborators.slice(0, 2)}
                  maxDisplay={4}
                  onOverflowClick={() => console.log('Overflow clicked')}
                />
              </div>
            </div>
          </div>

          <div className={styles.group}>
            <div className={styles.variantLabel}>Variant 3 (3 avatars)</div>
            <div className={styles.avatarGroup}>
              <div className={styles.avatarItem}>
                <AvatarSet
                  avatars={mockCollaborators.slice(0, 3)}
                  maxDisplay={4}
                  onOverflowClick={() => console.log('Overflow clicked')}
                />
              </div>
            </div>
          </div>

          <div className={styles.group}>
            <div className={styles.variantLabel}>Variant 4 (4 avatars)</div>
            <div className={styles.avatarGroup}>
              <div className={styles.avatarItem}>
                <AvatarSet
                  avatars={mockCollaborators.slice(0, 4)}
                  maxDisplay={4}
                  onOverflowClick={() => console.log('Overflow clicked')}
                />
              </div>
            </div>
          </div>

          <div className={styles.group}>
            <div className={styles.variantLabel}>Overflow (6+ avatars)</div>
            <div className={styles.avatarGroup}>
              <div className={styles.avatarItem}>
                <AvatarSet
                  avatars={mockCollaborators}
                  maxDisplay={4}
                  onOverflowClick={() => console.log('Overflow clicked')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Design Specifications</h2>
          <div className={styles.specs}>
            <div className={styles.specItem}>
              <strong>Avatar Size:</strong> 28x28px
            </div>
            <div className={styles.specItem}>
              <strong>Avatar Control Height:</strong> 32px
            </div>
            <div className={styles.specItem}>
              <strong>Border Radius:</strong> 50% (circle)
            </div>
            <div className={styles.specItem}>
              <strong>Border (with image):</strong> 2px solid white
            </div>
            <div className={styles.specItem}>
              <strong>Overlap:</strong> -4px (margin-right)
            </div>
            <div className={styles.specItem}>
              <strong>Initials Font:</strong> Lazzer Heavy, 10px, 900 weight
            </div>
            <div className={styles.specItem}>
              <strong>Count Font:</strong> DM Sans Medium, 14px, 500 weight
            </div>
            <div className={styles.specItem}>
              <strong>Chevron Size:</strong> 9.6px
            </div>
            <div className={styles.specItem}>
              <strong>Gap:</strong> 4px
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






