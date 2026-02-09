export interface TypingAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  onAddContext?: (type: 'course' | 'topic') => void;
  placeholder?: string;
  isMobile?: boolean;
  className?: string;
}





