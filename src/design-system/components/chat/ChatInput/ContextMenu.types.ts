export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  hasSubmenu?: boolean;
  onClick?: () => void;
}

export interface ContextMenuProps {
  items: MenuItem[];
  onClose: () => void;
  onSelect: (itemId: string) => void;
  position?: 'bottom-left' | 'bottom-right';
  className?: string;
}

