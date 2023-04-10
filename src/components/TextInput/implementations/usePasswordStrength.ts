// https://timetoprogram.com/check-password-strength-react/

import { useState } from 'react';
import { useTextInput } from '../useTextInput';

// https://iyurisko.medium.com/build-simple-password-strength-meter-in-react-js-7a33c04b9ab5

export const usePasswordStrength = () => {
  //   const [password, setPassword] = useState('');

  const { value: password, handleChange } = useTextInput('');
  //   const password = value;

  const [passwordStrength, setPasswordStrength] = useState<{
    [key: string]: boolean;
  }>({
    hasMin5Characters: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasDigit: false,
    hasSpecialChar: false
  });

  const checkPasswordStrength = (password: string) => ({
    hasMin5Characters: password.length >= 5,
    hasUpperCase: /[A-Z]+/.test(password),
    hasLowerCase: /[a-z]+/.test(password),
    hasDigit: /[0-9]+/.test(password),
    // hasSpecialChar: /[^A-Za-z0-9]+/.test(password)
    hasSpecialChar: /[@#$]/.test(password)
  });

  const passwordStrengthFeedback: {
    [key: string]: string;
  } = {
    hasMin5Characters: 'at least 5 characters',
    hasUpperCase: 'at least one uppercase character',
    hasLowerCase: 'at least one lowercase character',
    hasDigit: 'at least one digit',
    hasSpecialChar: 'at least one symbol (@#$)'
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // setPassword(e.target.value);
    handleChange(e);
    setPasswordStrength(checkPasswordStrength(e.target.value));
  };

  //  For password strength meter
  const calculatePasswordStrengthPercentage = (obj: {
    [key: string]: boolean;
  }) => {
    const total = Object.keys(obj).length;
    const trueCount = Object.values(obj).filter(value => value === true).length;
    return (trueCount / total) * 100;
  };

  const passwordStrengthPercentage =
    calculatePasswordStrengthPercentage(passwordStrength);

  return {
    password,
    passwordStrength,
    passwordStrengthFeedback,
    passwordStrengthPercentage,
    handlePasswordChange
  };
};
