import React from 'react';
import styles from './nav-button.module.scss';

type NavButtonProps = {
  variant?: 'primary' | 'icon';
  text: string;
  icon?: React.ReactNode;
  handleClick: () => void;
};

export const NavButton = ({
  variant = 'primary',
  text,
  icon = null,
  handleClick
}: NavButtonProps) => {
  let className = styles.button;
  if (variant === 'icon') {
    className = `${className} ${styles['button--icon']}`;
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      className={className}
      aria-label={variant === 'icon' ? text : undefined}
    >
      {icon && (
        <div className={variant === 'primary' ? styles.button__icon : ''}>
          {icon}
        </div>
      )}
      {variant === 'primary' && text}
    </button>
  );
};
