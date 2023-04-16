import React, { useId } from 'react';
import styles from './input.module.scss';

type TextInputProps = {
  inputId: string;
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
      inputId,
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
    if (errorMsg) {
      inputContainerClassName = `${inputContainerClassName} ${styles['inputContainer--error']}`;
    }

    return (
      <div className={styles.container}>
        <div className={inputContainerClassName}>
          <input
            ref={ref}
            className={styles.input}
            id={inputId}
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
