import React from 'react';
import { Alert, Heading, Logo } from '@/components';
import { PlantDescription, PlantChart } from '../../components';
import { useFetchPlantsInTrash } from './useFetchPlantsInTrash';
import styles from './plants-in-trash.module.scss';

export const PlantsInTrash = () => {
  const { plantsInTrash, isLoading, error } = useFetchPlantsInTrash();

  const plantListItems = plantsInTrash.map(plant => {
    return (
      <li key={plant._id} className={styles.list__item}>
        <PlantDescription
          name={plant.name}
          variety={plant.variety}
          category={plant.category}
        />
        <PlantChart
          sowFrom={plant.sowFrom}
          sowUntil={plant.sowUntil}
          harvestFrom={plant.harvestFrom}
          harvestUntil={plant.harvestUntil}
        />
      </li>
    );
  });

  if (isLoading)
    return (
      <div className={styles.loader}>
        <Logo spin />
      </div>
    );
  if (error) return <Alert type='error' message={error} />;
  return (
    <>
      <Heading text='Trash' />
      <ul className={styles.list}>{plantListItems}</ul>
    </>
  );
};
