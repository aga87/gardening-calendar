import React from 'react';
import { useAppDispatch } from '@/redux/typed-hooks';
import { Button } from '@/components';
import { signOut as logOut } from '../../redux/authSlice';

export const SignOut = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <Button variant='secondary' text='Sign out' handleClick={handleClick} />
  );
};
