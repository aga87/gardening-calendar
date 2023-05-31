import React from 'react';
import { useAppDispatch } from '@/redux/typed-hooks';
import { signInWithGoogle } from '../../redux/authSlice';
import { Button } from '@/components';
import { GoogleIcon } from '@/icons';
import styles from './sign-in-with-google.module.scss';

export const SignInWithGoogle = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(signInWithGoogle());
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
