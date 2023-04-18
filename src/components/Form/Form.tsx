import React from 'react';

type FormProps = {
  children: React.ReactNode;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  id?: string; // to associate with the submit button if outside of the form, or form label
  formLabel?: string; // accessible form label
  formLabelId?: string; // to associate the form with an external form label
};

export const Form = ({
  children,
  id = '',
  formLabel = '',
  formLabelId = '',
  handleSubmit
}: FormProps) => (
  <form
    onSubmit={e => handleSubmit && handleSubmit(e)}
    id={id}
    aria-label={formLabel}
    aria-labelledby={formLabelId}
    noValidate
  >
    {children}
  </form>
);
