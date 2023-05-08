import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import React, { useState } from 'react';
import { TextInput } from '../TextInput';
import styles from './password-input.module.scss';

type PasswordInputProps = {
  inputId: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  errorMsg?: string;
};

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      inputId,
      value,
      handleChange,
      placeholder = '',
      required = true,
      errorMsg = ''
    },
    ref
  ) => {
    const [passwordType, setPasswordType] = useState<'password' | 'text'>(
      'password'
    );

    const togglePasswordVisibility = () => {
      if (passwordType === 'password') {
        setPasswordType('text');
      } else {
        setPasswordType('password');
      }
    };

    const clickableIcon = (
      <button
        type='button'
        onClick={togglePasswordVisibility}
        className={styles.button}
      >
        {passwordType === 'password' ? (
          <VisibilityOutlinedIcon className={styles.button__icon} />
        ) : (
          <VisibilityOffOutlinedIcon className={styles.button__icon} />
        )}
      </button>
    );

    return (
      <TextInput
        ref={ref}
        inputId={inputId}
        value={value}
        handleChange={handleChange}
        type={passwordType}
        placeholder={placeholder}
        required={required}
        errorMsg={errorMsg}
        icon={clickableIcon}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
