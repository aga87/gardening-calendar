import React from 'react';
import { Logo } from '@/components';
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
        <Logo spin />
      </div>
    );

  return children;
};
