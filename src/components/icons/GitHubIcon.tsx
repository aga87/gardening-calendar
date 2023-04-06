import React from 'react';
import GitHubIconComponent from '@mui/icons-material/GitHub';

type GitHubIconProps = {
  className: string;
};

export const GitHubIcon = ({ className }: GitHubIconProps) => (
  <GitHubIconComponent className={className} />
);
