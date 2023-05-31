import React from 'react';
import { FlowerIcon } from '@/icons';
import styles from './loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <FlowerIcon className={styles.loader__icon} />
    </div>
  );
};
