import React, { useId } from 'react';
import { capitalize } from '../../../utils';
import styles from './select-input.module.scss';

type SelectInputProps = {
  id: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { text: string; value: string | number }[] | string[];
  placeholder?: string;
  required?: boolean;
  errorMsg?: string;
};

export const SelectInput = ({
  id,
  options,
  placeholder,
  value,
  handleChange,
  required = false,
  errorMsg
}: SelectInputProps): JSX.Element => {
  const errorId = useId();

  let className = styles.select;
  if (errorMsg) {
    className = `${className} ${styles['select--error']}`;
  }

  const selectOptions = options.map(option => {
    if (typeof option === 'string')
      return (
        <option key={option} value={option}>
          {capitalize(option)}
        </option>
      );
    return (
      <option key={option.value} value={option.value}>
        {capitalize(option.text)}
      </option>
    );
  });

  return (
    <div className={styles.container}>
      <select
        className={className}
        id={id}
        required={required}
        value={value}
        onChange={handleChange}
        aria-describedby={errorMsg && errorId}
        aria-invalid={errorMsg !== ''}
      >
        {placeholder && <option value=''>{placeholder}</option>}
        {selectOptions}
      </select>
      {errorMsg && (
        <div
          id={errorId}
          role='alert'
          aria-live='assertive'
          className={styles.select__error}
        >
          {errorMsg}
        </div>
      )}
    </div>
  );
};
