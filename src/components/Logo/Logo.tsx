import React from 'react';
import YardIcon from '@mui/icons-material/Yard';
import styles from './logo.module.scss';

type LogoProps = {
  spin?: boolean;
};

export const Logo = ({ spin = false }: LogoProps) => {
  let className = styles.logo;
  if (spin) {
    className = `${className} ${styles['logo--spin']}`;
  }

  return (
    <div className={className}>
      <YardIcon className={styles.logo__icon} fontSize='large' />
    </div>
  );
};
