import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type ErrorIconProps = {
  className: string;
};

export const ErrorIcon = ({ className }: ErrorIconProps) => (
  <ErrorOutlineIcon className={className} />
);
