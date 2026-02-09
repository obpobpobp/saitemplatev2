export interface Project {
  id: string;
  emoji: string;
  title: string;
  lastModified: string;
  isViewing?: boolean;
}

export interface HeaderDropdownProps {
  projects?: Project[];
  onProjectClick?: (projectId: string) => void;
  onViewAllClick?: () => void;
  onNewProjectClick?: () => void;
  onClose?: () => void;
  className?: string;
}




