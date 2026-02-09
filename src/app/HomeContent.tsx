'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectCard } from '@design-system/components/cards';
import { 
  HeroUploadArea, 
  CourseSectionHeader, 
  Footer, 
  AssistantAvatar,
  QuickActionButtons,
  QuickAction
} from '@design-system/components/home';
import { Header } from '@/design-system/components/layout/Header';
import { Logo } from '@/design-system/components/branding/Logo';
import { usePersona } from '@/contexts/PersonaContext';
import { getMockProjects } from '@/data/mockProjects';
import styles from './page.module.css';

export function HomeContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid SSR issues
  if (!mounted) {
    return (
      <div className={styles.loading}>Loading...</div>
    );
  }

  return <HomeContentInner />;
}

function HomeContentInner() {
  const router = useRouter();
  const { persona } = usePersona();
  const projects = getMockProjects(persona);
  const [activeQuickAction, setActiveQuickAction] = useState<QuickAction>(null);

  const handleProjectClick = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  const handleNewProject = () => {
    router.push('/project/new');
  };

  const handleUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
  };

  const handleSubmit = () => {
    console.log('Question submitted');
  };

  const handleQuickAction = (action: QuickAction) => {
    console.log('Quick action:', action);
    setActiveQuickAction(action);
  };

  // Group projects by course
  const course1Projects = projects.filter(p => p.course === 'Anatomy & Physiology');
  const course2Projects = projects.filter(p => p.course === 'Pharmacology 101');
  const noCourseProjects = projects.filter(p => !p.course);

  const handleSignIn = () => {
    console.log('Sign in clicked');
  };

  const handleAvatarClick = () => {
    console.log('Avatar clicked');
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerWrapper}>
        <Header
          variant={persona === 'new-user' ? 'home-guest' : 'home'}
          logo={<Logo variant="icon" height={16} />}
          title="Studocu AI"
          onSignInClick={handleSignIn}
          avatarUrl={persona !== 'new-user' ? '/useravatar.jpg' : undefined}
          avatarInitials="U"
          onAvatarClick={handleAvatarClick}
        />
      </div>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.content}>
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <h1 className={styles.heroHeading}>
              <span className={styles.headingText}>Studying starts with </span>
              <span className={styles.headingGradient}>Studocu AI,</span>
              <span className={styles.headingText}> upload something</span>
            </h1>

            <AssistantAvatar />

            <HeroUploadArea
              onUpload={handleUpload}
              onSubmit={handleSubmit}
            />

            <QuickActionButtons
              activeAction={activeQuickAction}
              onActionChange={handleQuickAction}
            />
          </div>

          {/* My Projects Section */}
          <div className={styles.projectsSection}>
            <h2 className={styles.projectsTitle}>My projects</h2>

            {/* Anatomy & Physiology */}
            {course1Projects.length > 0 && (
              <div className={styles.courseGroup}>
                <CourseSectionHeader icon="folder" title="Anatomy & Physiology" />
                <div className={styles.projectGrid}>
                  {course1Projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      emoji={project.emoji}
                      title={project.title}
                      course={project.course}
                      updatedDate={project.updatedDate}
                      isLocked={project.isLocked}
                      onClick={() => handleProjectClick(project.id)}
                      onMenuClick={(e) => {
                        console.log('Menu clicked for', project.id);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pharmacology 101 */}
            {course2Projects.length > 0 && (
              <div className={styles.courseGroup}>
                <CourseSectionHeader icon="folder" title="Pharmacology 101" />
                <div className={styles.projectGrid}>
                  {course2Projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      emoji={project.emoji}
                      title={project.title}
                      course={project.course}
                      updatedDate={project.updatedDate}
                      isLocked={project.isLocked}
                      onClick={() => handleProjectClick(project.id)}
                      onMenuClick={(e) => {
                        console.log('Menu clicked for', project.id);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Projects with no course */}
            <div className={styles.courseGroup}>
              <CourseSectionHeader icon="folder-minus" title="Projects with no course" />
              <div className={styles.projectGrid}>
                <ProjectCard
                  variant="new-project"
                  title="New Project"
                  subtitle="Start a new study topic"
                  onClick={handleNewProject}
                />
                {noCourseProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    emoji={project.emoji}
                    title={project.title}
                    course={project.course}
                    updatedDate={project.updatedDate}
                    isLocked={project.isLocked}
                    showAddCourse={!project.course}
                    onAddCourse={() => console.log('Add course for', project.id)}
                    onClick={() => handleProjectClick(project.id)}
                    onMenuClick={(e) => {
                      console.log('Menu clicked for', project.id);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

