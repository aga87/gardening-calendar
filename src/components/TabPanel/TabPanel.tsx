import React from 'react';

type TabPanelProps = {
  children: React.ReactNode;
  id: string;
};

export const TabPanel = ({ children, id }: TabPanelProps) => {
  return (
    <div role='tabpanel' id={id}>
      {children}
    </div>
  );
};
