import React from 'react';
import { useAppDispatch } from '@/redux/typed-hooks';
import { LogOutIcon, NavButton } from '@/components';
import { signOut as logOut } from '../../redux/authSlice';

export const SignOut = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <NavButton
      text='Sign out'
      icon={<LogOutIcon />}
      handleClick={handleClick}
    />
  );
};
