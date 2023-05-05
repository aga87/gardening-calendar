import React from 'react';
import styles from './nav-button.module.scss';

type NavButtonProps = {
  text: string;
  icon?: React.ReactNode;
  handleClick: () => void;
};

export const NavButton = ({
  text,
  icon = null,
  handleClick
}: NavButtonProps) => {
  return (
    <button type='button' onClick={handleClick} className={styles.button}>
      {icon && <div className={styles.button__icon}>{icon}</div>}
      {text}
    </button>
  );
};
