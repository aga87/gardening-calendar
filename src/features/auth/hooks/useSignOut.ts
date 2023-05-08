import { useAppDispatch } from '@/redux/typed-hooks';
import { signOut } from '../redux/authSlice';

export const useSignOut = () => {
  const dispatch = useAppDispatch();

  const handleSignOutClick = () => {
    dispatch(signOut());
  };

  return { handleSignOutClick };
};

// TODO: move to hooks?
