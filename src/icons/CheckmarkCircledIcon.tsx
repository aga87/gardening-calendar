import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type CheckmarkCircledIconProps = {
  className: string;
};

export const CheckmarkCircledIcon = ({
  className
}: CheckmarkCircledIconProps) => (
  <CheckCircleOutlineIcon className={className} />
);
