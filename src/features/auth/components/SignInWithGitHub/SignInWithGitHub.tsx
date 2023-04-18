import React from 'react';
import { useAppDispatch } from '@/redux/typed-hooks';
import { signInWithGitHub } from '../../redux/authSlice';
import { Button, GitHubIcon } from '@/components';
import styles from './sign-in-with-github.module.scss';

export const SignInWithGitHub = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(signInWithGitHub());
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
