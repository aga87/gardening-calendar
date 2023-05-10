import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/typed-hooks';
import { clearRedirectLink } from '../redux/redirect/redirectSlice';
import { selectRedirectLink } from '../redux/redirect/selectors';

export const useRedirect = (): void => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const redirectLink = useAppSelector(selectRedirectLink);

  useEffect(() => {
    if (redirectLink) {
      router.push(redirectLink);
      dispatch(clearRedirectLink());
    }
  }, [redirectLink, router, dispatch]);
};
