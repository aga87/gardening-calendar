import React, { useState } from 'react';

export const useTextInput = (initialValue: string | null) => {
  const [value, setValue] = useState(initialValue === null ? '' : initialValue);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  return { value, handleChange };
};
