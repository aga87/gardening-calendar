import { useState } from 'react';

export const useSelectInput = (initialValue: string | number | null) => {
  const [value, setValue] = useState(
    initialValue === null ? '' : initialValue.toString()
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return { value, handleChange };
};
