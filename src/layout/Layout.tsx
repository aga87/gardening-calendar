import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { HamburgerIcon, Logo, NavButton } from '@/components';
import { Navigation } from '@/features';
import { useOnClickOutside } from '@/hooks';
import styles from './layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  let className = styles.sideBar;
  if (isSideBarOpen) {
    className = `${className} ${styles['sideBar--isOpen']}`;
  }

  // Reset state when navigating to a new page (to hide the sidebar)
  useEffect(() => {
    const handleRouteChange = () => {
      setIsSideBarOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // Close the sidebar on click outside on mobile
  useOnClickOutside(sideBarRef, () => closeSideBar());

  return (
    <>
      <div className={styles.mobileNavBar}>
        <NavButton
          variant='icon'
          text='Menu'
          icon={<HamburgerIcon />}
          handleClick={toggleSideBar}
        />
      </div>
      <div className={styles.container}>
        <div ref={sideBarRef} className={className}>
          <header className={styles.header}>
            <Logo />
          </header>
          <Navigation />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};
