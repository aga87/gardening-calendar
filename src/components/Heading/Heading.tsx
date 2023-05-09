import React from 'react';
import { capitalize } from '@/utils';
import styles from './heading.module.scss';

type HeadingProps = {
  text: string;
};

export const Heading = ({ text }: HeadingProps) => {
  return <h1 className={styles.heading}>{capitalize(text)}</h1>;
};
