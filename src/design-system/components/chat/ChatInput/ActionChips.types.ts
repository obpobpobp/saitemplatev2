export interface ActionChip {
  id: string;
  label: string;
  icon?: string;
}

export interface ActionChipsProps {
  chips: ActionChip[];
  onSelect: (chipId: string) => void;
  className?: string;
}

