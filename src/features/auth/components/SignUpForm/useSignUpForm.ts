import React, { useEffect, useState } from 'react';
import { useTextInput, usePasswordStrength } from '@/components';
import { useFirstRender } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/redux/typed-hooks';
import {
  setSignUpError,
  setVerificationEmailSent,
  signUp
} from '../../redux/authSlice';
import {
  selectIsVerificationEmailSent,
  selectSignUpError
} from '../../redux/authSelectors';
import { validateNewPasswordField } from '../../utils';
import { hasNonEmptyValue, validateRequiredField } from '@/utils';

export const useSignUpForm = () => {
  const { value: email, handleChange: handleEmailChange } = useTextInput('');

  const {
    password,
    passwordStrength,
    passwordStrengthPercentage,
    passwordStrengthFeedback,
    handlePasswordChange
  } = usePasswordStrength();

  const [formErrors, setFormErrors] = useState({ email: '', password: '' });

  const signUpError = useAppSelector(selectSignUpError);
  const isVerificationEmailSent = useAppSelector(selectIsVerificationEmailSent);

  const isFirstRender = useFirstRender();

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = {
      email: validateRequiredField(email),
      password: validateNewPasswordField(passwordStrengthPercentage)
    };

    if (hasNonEmptyValue(errors)) {
      setFormErrors(errors);
    } else {
      dispatch(signUp({ email, password }));
    }
  };

  // Clear sign up errors on first render if any
  useEffect(() => {
    if (isFirstRender && signUpError) {
      dispatch(setSignUpError(null));
    }
  }, [dispatch, signUpError, isFirstRender]);

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
    passwordStrength,
    passwordStrengthPercentage,
    passwordStrengthFeedback,
    handlePasswordChange,
    handleSubmit,
    formErrors,
    signUpError,
    isVerificationEmailSent
  };
};
