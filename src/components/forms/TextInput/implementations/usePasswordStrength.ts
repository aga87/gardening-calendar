import { useState } from 'react';
import { useTextInput } from '../useTextInput';

export const usePasswordStrength = () => {
  const { value: password, handleChange } = useTextInput('');

  const [passwordStrength, setPasswordStrength] = useState<{
    [key: string]: boolean;
  }>({
    hasMin8Characters: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasDigit: false,
    hasSpecialChar: false
  });

  const checkPasswordStrength = (password: string) => ({
    hasMin8Characters: password.length >= 8,
    hasUpperCase: /[A-Z]+/.test(password),
    hasLowerCase: /[a-z]+/.test(password),
    hasDigit: /[0-9]+/.test(password),
    hasSpecialChar: /[@#$]/.test(password)
  });

  const passwordStrengthFeedback: {
    [key: string]: string;
  } = {
    hasMin8Characters: 'at least 8 characters',
    hasUpperCase: 'at least one uppercase character',
    hasLowerCase: 'at least one lowercase character',
    hasDigit: 'at least one digit',
    hasSpecialChar: 'at least one symbol (@#$)'
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
