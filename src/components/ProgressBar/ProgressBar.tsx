import React from 'react';
import styles from './progress-bar.module.scss';

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  let width;
  if (progress < 0) {
    width = '0%';
  } else if (progress > 100) {
    width = '100%';
  } else {
    width = `${progress}%`;
  }

  return (
    <div className={styles.bar}>
      <div className={styles.bar__progress} style={{ width }} />
    </div>
  );
};
