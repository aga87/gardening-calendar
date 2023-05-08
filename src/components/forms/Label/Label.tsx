import React from 'react';
import styles from './label.module.scss';

type LabelProps = {
  text: string;
  inputId: string;
  required?: boolean;
  hidden?: boolean;
};

export const Label = ({
  text,
  inputId,
  required = true,
  hidden = false
}: LabelProps) => {
  let className = styles.label;
  if (hidden) {
    className = `${className} ${styles['label--hidden']}`;
  }

  return (
    <label htmlFor={inputId} className={className}>
      {text}
      {!required && (
        <span className={styles.label__optional}>
          <i>Optional</i>
        </span>
      )}
    </label>
  );
};
