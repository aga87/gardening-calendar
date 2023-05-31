import React from 'react';
import { useAppDispatch } from '@/redux/typed-hooks';
import { restorePlant } from '../../redux/plants/thunks';
import { Alert, Button, Heading, Logo } from '@/components';
import { RestoreIcon } from '@/icons';
import { PlantDescription, PlantChart } from '../../components';
import { useFetchPlantsInTrash } from './useFetchPlantsInTrash';
import { useDeletePlants } from './useDeletePlants';
import type { Plant } from '../../types';
import styles from './plants-in-trash.module.scss';

export const PlantsInTrash = () => {
  const { plantsInTrash, isLoading, error } = useFetchPlantsInTrash();

  const { handleDeleteAllPlants, isLoadingDeletePlants, deletePlantsError } =
    useDeletePlants();

  const dispatch = useAppDispatch();

  const handleRestoreClick = (plantId: Plant['_id']) => {
    dispatch(restorePlant(plantId));
  };

  const plantListItems = plantsInTrash.map(plant => {
    return (
      <li key={plant._id} className={styles.listItem}>
        <div className={styles.listItem__plant}>
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
        </div>
        <button
          className={styles.listItem__button}
          type='button'
          onClick={() => handleRestoreClick(plant._id)}
        >
          <RestoreIcon />
          Restore
        </button>
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
      <Heading text={`Trash (${plantsInTrash.length})`} />
      {deletePlantsError && (
        <div className={styles.errorWrapper}>
          <Alert type='error' message={deletePlantsError} />
        </div>
      )}
      <ul className={styles.list}>{plantListItems}</ul>
      {plantsInTrash.length > 0 && (
        <Button
          variant='tertiary'
          text='Delete all'
          handleClick={handleDeleteAllPlants}
        />
      )}
    </>
  );
};
