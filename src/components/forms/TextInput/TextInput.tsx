import React, { useId } from 'react';
import styles from './input.module.scss';

type TextInputProps = {
  variant: 'primary' | 'secondary';
  id: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
  errorMsg?: string;
  icon?: React.ReactNode;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      variant,
      id,
      value,
      handleChange,
      type = 'text',
      placeholder = '',
      required = true,
      errorMsg = '',
      icon = null
    },
    ref
  ) => {
    const errorId = useId();

    let inputContainerClassName = styles.inputContainer;
    let inputClassName = styles.input;
    if (variant === 'secondary') {
      inputContainerClassName = `${inputContainerClassName} ${styles['inputContainer--secondary']}`;
      inputClassName = `${inputClassName} ${styles['input--secondary']}`;
    }
    if (errorMsg) {
      inputContainerClassName = `${inputContainerClassName} ${styles['inputContainer--error']}`;
    }

    return (
      <div className={styles.container}>
        <div className={inputContainerClassName}>
          <input
            ref={ref}
            className={inputClassName}
            id={id}
            placeholder={placeholder}
            type={type}
            size={30}
            value={value}
            onChange={handleChange}
            required={required}
            aria-describedby={errorMsg && errorId}
            aria-invalid={errorMsg !== ''}
          />
          {icon && icon}
        </div>
        {errorMsg && (
          <div
            id={errorId}
            role='alert'
            aria-live='assertive'
            className={styles.input__error}
          >
            {errorMsg}
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
