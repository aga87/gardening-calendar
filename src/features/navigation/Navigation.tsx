import React from 'react';
import { useRouter } from 'next/router';
import { NavButton, Navigation as NavigationComponent } from '@/components';
import { AddIcon, LogOutIcon, TrashIcon } from '@/icons';
import { useSignOut } from '../auth/hooks';
import styles from './navigation.module.scss';

export const Navigation = () => {
  const { handleSignOutClick } = useSignOut();

  const router = useRouter();
  const { pathname } = router;
  const { category } = router.query;

  const currentPagePath =
    typeof category === 'string'
      ? `/plants/${category}`
      : pathname === '/'
      ? '/plants'
      : pathname;

  const navItems = [
    { name: 'All Plants', path: '/plants' },
    { name: 'Flowers', path: '/plants/flowers' },
    { name: 'Fruits', path: '/plants/fruits' },
    { name: 'Herbs', path: '/plants/herbs' },
    { name: 'Vegetables', path: '/plants/vegetables' },

    {
      name: 'New Plant',
      path: '/new-plant',
      icon: <AddIcon />
    },
    {
      name: 'Trash',
      path: '/trash',
      icon: <TrashIcon />
    }
  ];

  return (
    <div className={styles.nav}>
      <NavigationComponent
        navItems={navItems}
        currentPagePath={currentPagePath}
      />
      <NavButton
        text='Sign out'
        icon={<LogOutIcon />}
        handleClick={handleSignOutClick}
      />
    </div>
  );
};
