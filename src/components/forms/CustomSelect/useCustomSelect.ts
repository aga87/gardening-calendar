import { useState } from 'react';

export const useCustomSelect = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (option: string) => {
    setValue(option);
  };

  return { value, handleChange };
};
