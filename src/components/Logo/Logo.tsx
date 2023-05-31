import React from 'react';
import { FlowerIcon } from '@/icons';
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
      <FlowerIcon className={styles.logo__icon} />
    </div>
  );
};
