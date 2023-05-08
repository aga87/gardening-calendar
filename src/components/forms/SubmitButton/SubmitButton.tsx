import React from 'react';
import styles from './submit-button.module.scss';

type SubmitButtonProps = {
  text: string;
  formId?: string; // to associate the button with a form if the button placed outside the form
};

export const SubmitButton = ({
  text,
  formId = undefined
}: SubmitButtonProps) => {
  return (
    <button type='submit' form={formId} className={styles.button}>
      {text}
    </button>
  );
};
