import { ReactNode } from 'react';
import { LinkProps as NextLinkProps } from 'next/link';

/**
 * Link component props extending Next.js Link
 */
export interface LinkProps extends Omit<NextLinkProps, 'as'> {
  /**
   * Link content
   */
  children: ReactNode;

  /**
   * Link destination
   */
  href: string;

  /**
   * Whether the link points to an external site
   * Automatically adds target="_blank" and rel="noopener noreferrer"
   * @default false
   */
  external?: boolean;

  /**
   * Show external link icon indicator
   * @default false
   */
  showExternalIcon?: boolean;

  /**
   * Optional additional CSS class
   */
  className?: string;
}







