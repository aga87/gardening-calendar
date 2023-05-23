import React, { useId } from 'react';
import styles from './textarea.module.scss';

type TextAreaProps = {
  id: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  errorMsg?: string;
};
export const TextArea = ({
  id,
  value,
  handleChange,
  placeholder = '',
  required = false,
  maxLength,
  errorMsg
}: TextAreaProps) => {
  const errorId = useId();

  return (
    <>
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        rows={4}
        cols={50}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        aria-describedby={errorMsg && errorId}
        aria-invalid={errorMsg !== ''}
        className={styles.textarea}
      />
      {errorMsg && (
        <div
          id={errorId}
          role='alert'
          aria-live='assertive'
          className={styles.textarea__error}
        >
          {errorMsg}
        </div>
      )}
    </>
  );
};
