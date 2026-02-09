import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { IconStickerProps } from './IconSticker.types';
import styles from './IconSticker.module.css';

/**
 * IconSticker - Decorative icon container with background
 * Used in tiles and cards to display Font Awesome icons
 * 
 * @example
 * <IconSticker icon="fa-solid fa-file" variant="neutral" />
 */
export const IconSticker: React.FC<IconStickerProps> = ({
  icon,
  variant = 'neutral',
  size = 'medium',
  className,
  ariaLabel,
}) => {
  const renderIcon = (): JSX.Element | ReactNode => {
    if (typeof icon === 'string') {
      // Font Awesome icon string
      return <i className={icon} aria-hidden="true" />;
    }
    // Custom React element
    return icon;
  };

  return (
    <div
      className={classNames(
        styles.sticker,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        className
      )}
      role="img"
      aria-label={ariaLabel}
    >
      <div className={styles.iconWrapper}>
        {renderIcon()}
      </div>
    </div>
  );
};

