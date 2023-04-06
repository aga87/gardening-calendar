import React from 'react';
import { Button, GitHubIcon } from '@/components';
import styles from './sign-in-with-github.module.scss';

export const SignInWithGitHub = () => {
  const handleClick = () => {
    console.log('click');
  };
  return (
    <Button
      variant='secondary'
      icon={<GitHubIcon className={styles.icon} />}
      text='Sign in with GitHub'
      handleClick={handleClick}
    />
  );
};
