import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/typed-hooks';
import { useFirstRender } from '@/hooks';
import {
  signIn,
  resendVerificationEmail,
  setSignInError,
  setVerificationEmailSent
} from '../../redux/authSlice';
import {
  selectUserEmail,
  selectSignInError,
  selectIsVerificationEmailSent
} from '../../redux/authSelectors';
import { useTextInput } from '@/components';
import { hasNonEmptyValue, validateRequiredField } from '@/utils';

export const useSignInForm = () => {
  const userEmail = useAppSelector(selectUserEmail);
  const { value: email, handleChange: handleEmailChange } =
    useTextInput(userEmail);
  const { value: password, handleChange: handlePasswordChange } =
    useTextInput('');

  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const signInError = useAppSelector(selectSignInError);

  const isVerificationEmailSent = useAppSelector(selectIsVerificationEmailSent);

  const isFirstRender = useFirstRender();

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

  // Clear sign in errors on first render if any
  useEffect(() => {
    if (isFirstRender && signInError) {
      dispatch(setSignInError(null));
    }
  }, [dispatch, signInError, isFirstRender]);

  // Clear notification on first render if any
  useEffect(() => {
    if (isFirstRender && isVerificationEmailSent) {
      dispatch(setVerificationEmailSent(false));
    }
  }, [dispatch, isVerificationEmailSent, isFirstRender]);

  return {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    handleSubmit,
    formErrors,
    signInError,
    handleResendVerificationEmail,
    isVerificationEmailSent
  };
};
