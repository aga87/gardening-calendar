import React from 'react';
import YardIcon from '@mui/icons-material/Yard';

type FlowerIconProps = {
  className: string;
};

export const FlowerIcon = ({ className }: FlowerIconProps) => (
  <YardIcon className={className} fontSize='large' />
);
