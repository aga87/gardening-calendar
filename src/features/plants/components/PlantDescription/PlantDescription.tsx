import React from 'react';
import { Tag } from '@/components';
import { capitalize } from '@/utils';
import type { Plant } from '../../types';
import styles from './plant-description.module.scss';

type PlantDescriptionProps = {
  name: Plant['name'];
  variety: Plant['variety'];
  category: Plant['category'];
};

export const PlantDescription = ({
  name,
  variety,
  category
}: PlantDescriptionProps) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.tag}>
          <Tag tag={category} />
        </div>
        <p className={styles.name}>{capitalize(name)}</p>
        {variety && <p className={styles.variety}>{capitalize(variety)}</p>}
      </div>
    </>
  );
};
