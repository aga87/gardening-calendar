import React from 'react';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import styles from './logo.module.scss';

export const Logo = () => (
  <div className={styles.logo}>
    <FoodBankIcon className={styles.logo__icon} fontSize='large' />
  </div>
);
