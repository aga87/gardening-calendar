import React, { useState } from 'react';
import { useTextInput, usePasswordStrength } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux/typed-hooks';
import { signUp } from '../../redux/authSlice';
import {
  selectIsVerificationEmailSent,
  selectSignUpError
} from '../../redux/authSelectors';
import {
  hasNonEmptyValue,
  validateRequiredField,
  validateNewPasswordField
} from '../../utils';

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
