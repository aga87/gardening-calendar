import React from 'react';
import Google from '@mui/icons-material/Google';

type GoogleIconProps = {
  className: string;
};

export const GoogleIcon = ({ className }: GoogleIconProps) => (
  <Google className={className} />
);
