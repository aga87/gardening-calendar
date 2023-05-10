import React from 'react';
import styles from './fieldset.module.scss';

interface FieldsetProps {
  legend: string;
  children: React.ReactNode;
}

export const Fieldset = ({ legend, children }: FieldsetProps) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.fieldset__legend}>{legend}</legend>
      {children}
    </fieldset>
  );
};
