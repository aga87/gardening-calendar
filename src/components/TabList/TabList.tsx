import React from 'react';
import styles from './tab-list.module.scss';

type TabListProps = {
  children: React.ReactNode;
};

export const TabList = ({ children }: TabListProps) => {
  return (
    <div role='tablist' className={styles.tabList}>
      {children}
    </div>
  );
};
