import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/typed-hooks';
import {
  selectIsUserVerified,
  selectIsCurrentUserLoading
} from '../../redux/authSelectors';
import { subscribeToAuthStateChanges } from '../../redux/authSlice';

export const useAuthRedirect = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isUserVerified = useAppSelector(selectIsUserVerified);
  const isLoading = useAppSelector(selectIsCurrentUserLoading);

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToAuthStateChanges());
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    // Wait for the authentication check
    if (!isLoading) {
      if (!isUserVerified && router.pathname !== '/auth') {
        router.push('/auth');
      } else if (isUserVerified && router.pathname === '/auth') {
        router.push('/');
      }
    }
  }, [isLoading, isUserVerified, router]);

  return isLoading;
};
