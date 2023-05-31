import React from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

type EmailIconProps = {
  className: string;
};

export const EmailIcon = ({ className }: EmailIconProps) => (
  <MailOutlineIcon className={className} />
);
