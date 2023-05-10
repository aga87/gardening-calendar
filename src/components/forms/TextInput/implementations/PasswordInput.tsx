import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import React, { useState } from 'react';
import { TextInput } from '../TextInput';
import styles from './password-input.module.scss';

type PasswordInputProps = {
  id: string;
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
      id,
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
        variant='secondary'
        ref={ref}
        id={id}
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
