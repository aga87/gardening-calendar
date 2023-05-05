import React from 'react';
import { useRouter } from 'next/router';
import { AddIcon, Navigation, TrashIcon } from '@/components';

export const PlantsNavigation = () => {
  const router = useRouter();
  const { pathname } = router;

  const currentPagePath = pathname === '/' ? '/plants' : pathname;

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
  return <Navigation navItems={navItems} currentPagePath={currentPagePath} />;
};
