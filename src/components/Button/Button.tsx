import React from 'react';
import styles from './button.module.scss';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  text: string;
  icon?: React.ReactNode;
  handleClick: () => void;
};

export const Button = ({
  variant = 'primary',
  text,
  icon = null,
  handleClick
}: ButtonProps) => {
  let className = styles.button;
  if (variant === 'secondary') {
    className = `${className} ${styles['button--secondary']}`;
  } else if (variant === 'tertiary') {
    className = `${className} ${styles['button--tertiary']}`;
  }

  return (
    <button type='button' onClick={handleClick} className={className}>
      {icon && <span className={styles.button__icon}>{icon}</span>}
      {text}
    </button>
  );
};
