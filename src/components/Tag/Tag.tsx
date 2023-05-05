import React from 'react';
import { capitalize } from '@/utils';
import styles from './tag.module.scss';

type TagProps = {
  tag: string;
};

export const Tag = ({ tag }: TagProps) => (
  <div className={styles.tag}>{capitalize(tag)}</div>
);
