import React, { useId, useState } from 'react';
import { Logo, Tab, TabList, TabPanel } from '@/components';
import {
  SignInForm,
  SignInWithGitHub,
  SignInWithGoogle,
  SignUpForm
} from '@/features/auth/components';
import { useRovingFocus } from '@/hooks';
import styles from './auth.module.scss';

export const Auth = () => {
  const [selectedTab, selectTab] = useState<'sign-in' | 'sign-up'>('sign-in');
  const { widgetItemsRefs, handleKeyDown } = useRovingFocus({
    widgetItemsCount: 2,
    initialFocus: 0,
    withAutomaticActivation: false
  });

  const handleSignInTabClick = () => {
    selectTab('sign-in');
  };

  const handleSignUpTabClick = () => {
    selectTab('sign-up');
  };

  const tabPanelId = useId();

  return (
    <div className={styles.auth}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.tabListContainer}>
        <TabList>
          <Tab
            variant='secondary'
            ref={ref => {
              widgetItemsRefs.current[0] = ref;
            }}
            text='Sign in'
            selected={selectedTab === 'sign-in'}
            tabPanelId={tabPanelId}
            handleClick={handleSignInTabClick}
            handleKeyDown={handleKeyDown}
          />
          <Tab
            variant='secondary'
            ref={ref => {
              widgetItemsRefs.current[1] = ref;
            }}
            text='Sign up'
            selected={selectedTab === 'sign-up'}
            tabPanelId={tabPanelId}
            handleClick={handleSignUpTabClick}
            handleKeyDown={handleKeyDown}
          />
        </TabList>
      </div>
      <TabPanel id={tabPanelId}>
        {selectedTab === 'sign-in' ? (
          <div className={styles.signInTabPanel}>
            <SignInForm />
            <p className={styles.signInTabPanel__or}>OR</p>
            <div className={styles.signInTabPanel__buttonContainer}>
              <SignInWithGoogle />
            </div>
            <SignInWithGitHub />
          </div>
        ) : (
          <div className={styles.signUpTabPanel}>
            <SignUpForm />
          </div>
        )}
      </TabPanel>
    </div>
  );
};
