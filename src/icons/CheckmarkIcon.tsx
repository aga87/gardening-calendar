import React from 'react';
import DoneIcon from '@mui/icons-material/Done';

type CheckmarkIconProps = {
  className: string;
};

export const CheckmarkIcon = ({ className }: CheckmarkIconProps) => (
  <DoneIcon className={className} />
);
