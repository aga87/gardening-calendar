import React, { useState } from 'react';

export const useTextArea = (initialValue: string | null) => {
  const [value, setValue] = useState(initialValue === null ? '' : initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return { value, handleChange };
};
