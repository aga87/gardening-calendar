import React from 'react';
import { Loader } from '@/components';
import { useAuthRedirect } from './useAuthRedirect';
import styles from './auth-redirect.module.scss';

type AuthRedirectProps = {
  children: JSX.Element;
};

export const AuthRedirect = ({ children }: AuthRedirectProps) => {
  const isLoading = useAuthRedirect();

  if (isLoading)
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );

  return children;
};
