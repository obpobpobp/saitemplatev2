export type MobileHeaderVariant = 'project' | 'home' | 'home-guest' | 'shared';

export interface MobileHeaderProps {
  variant?: MobileHeaderVariant;
  logo?: React.ReactNode;
  title?: string;
  hasTitleDropdown?: boolean;
  onTitleDropdownClick?: () => void;
  onSignInClick?: () => void;
  onShareClick?: () => void;
  onMenuClick?: () => void;
  avatarUrl?: string;
  avatarInitials?: string;
  onAvatarClick?: () => void;
  collaborators?: Array<{
    id: string;
    avatarUrl?: string;
    initials?: string;
    name?: string;
  }>;
  collabCount?: number;
  onCollaboratorsClick?: () => void;
  className?: string;
}




