import { forwardRef } from 'react';
import NextLink from 'next/link';
import styles from './Link.module.css';
import { LinkProps } from './Link.types';

/**
 * Link - Accessible link component with Next.js integration
 *
 * Wraps Next.js Link for internal navigation and standard anchor for external links.
 * Automatically handles external link security and optional icon indicators.
 *
 * @example
 * ```tsx
 * // Internal link (Next.js navigation)
 * <Link href="/about">About Us</Link>
 *
 * // External link with security attributes
 * <Link href="https://example.com" external>
 *   Visit Example
 * </Link>
 *
 * // External link with icon indicator
 * <Link href="https://example.com" external showExternalIcon>
 *   External Resource
 * </Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      href,
      external = false,
      showExternalIcon = false,
      className,
      ...rest
    },
    ref
  ) => {
    const classNames = [styles.link, className].filter(Boolean).join(' ');

    // External link
    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          className={classNames}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
          {showExternalIcon && (
            <i className={`fa-solid fa-arrow-up-right-from-square ${styles.externalIcon}`} aria-hidden="true" />
          )}
        </a>
      );
    }

    // Internal link (Next.js)
    return (
      <NextLink ref={ref} href={href} className={classNames} {...rest}>
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';


