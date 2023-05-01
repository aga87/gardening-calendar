import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/typed-hooks';
import { signIn, resendVerificationEmail } from '../../redux/authSlice';
import { selectUserEmail, selectSignInError } from '../../redux/authSelectors';
import { useTextInput } from '@/components';
import { hasNonEmptyValue, validateRequiredField } from '../../utils';

export const useSignInForm = () => {
  const userEmail = useAppSelector(selectUserEmail);
  const { value: email, handleChange: handleEmailChange } =
    useTextInput(userEmail);
  const { value: password, handleChange: handlePasswordChange } =
    useTextInput('');

  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const signInError = useAppSelector(selectSignInError);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = {
      email: validateRequiredField(email),
      password: validateRequiredField(password)
    };

    if (hasNonEmptyValue(errors)) {
      setFormErrors(errors);
    } else {
      dispatch(signIn({ email, password }));
    }
  };

  const handleResendVerificationEmail = () => {
    dispatch(resendVerificationEmail());
  };

  return {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    handleSubmit,
    formErrors,
    signInError,
    handleResendVerificationEmail
  };
};
