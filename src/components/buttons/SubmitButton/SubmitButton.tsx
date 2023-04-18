import React from 'react';
import styles from '../button.module.scss';

type SubmitButtonProps = {
  variant?: 'primary' | 'secondary';
  text: string;
  formId?: string; // to associate the button with a form if the button placed outside the form
};

export const SubmitButton = ({
  text,
  formId = undefined,
  variant = 'primary'
}: SubmitButtonProps) => {
  let className = styles.button;
  if (variant === 'secondary') {
    className = `${className} ${styles['button--secondary']}`;
  }
  return (
    <button type='submit' form={formId} className={className}>
      {text}
    </button>
  );
};
