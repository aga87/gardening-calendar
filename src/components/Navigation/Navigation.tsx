import React from 'react';
import Link from 'next/link';
import { useRovingFocus } from '@/hooks';
import styles from './navigation.module.scss';

type NavigationProps = {
  navItems: { name: string; path: string; icon?: React.ReactNode }[];
  currentPagePath: string;
};

export const Navigation = ({ navItems, currentPagePath }: NavigationProps) => {
  const selectedNavItemIndex = navItems.findIndex(
    navItem => navItem.path === currentPagePath
  );

  const { widgetItemsRefs, handleKeyDown } = useRovingFocus({
    widgetItemsCount: navItems.length,
    initialFocus: selectedNavItemIndex,
    withAutomaticActivation: false
  });

  const menuItems = navItems.map((navItem, i) => {
    let linkClassName = styles.link;
    if (selectedNavItemIndex === i)
      linkClassName = `${linkClassName} ${styles['link--selected']}`;

    return (
      <li key={navItem.name}>
        <Link
          className={linkClassName}
          href={navItem.path}
          ref={ref => {
            widgetItemsRefs.current[i] = ref;
          }}
          onKeyDown={handleKeyDown}
        >
          {navItem.icon && <div>{navItem.icon}</div>}
          {navItem.name}
        </Link>
      </li>
    );
  });

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>{menuItems}</ul>
    </nav>
  );
};
