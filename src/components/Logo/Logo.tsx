import React from 'react';
import FoodBankIcon from '@mui/icons-material/FoodBank';
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
      <FoodBankIcon className={styles.logo__icon} fontSize='large' />
    </div>
  );
};
