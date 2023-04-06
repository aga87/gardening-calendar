import React from 'react';
import { Button, GoogleIcon } from '@/components';
import styles from './sign-in-with-google.module.scss';

export const SignInWithGoogle = () => {
  const handleClick = () => {
    console.log('click');
  };
  return (
    <Button
      variant='secondary'
      icon={<GoogleIcon className={styles.icon} />}
      text='Sign in with Google'
      handleClick={handleClick}
    />
  );
};
