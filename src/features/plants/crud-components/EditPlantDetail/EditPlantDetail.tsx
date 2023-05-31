import React from 'react';
import { Alert, Heading, Loader } from '@/components';
import { PlantDetailForm } from '../../components';
import { useFetchPlantDetail } from '../../hooks';
import type { Plant } from '../../types';
import styles from './edit-plant-detail.module.scss';

type EditPlantDetailProps = {
  plantId: Plant['_id'];
};

export const EditPlantDetail = ({ plantId }: EditPlantDetailProps) => {
  const { plantDetail, isLoading, error } = useFetchPlantDetail(plantId);

  return (
    <div className={styles.container}>
      <Heading text='Edit Plant Detail' />
      {isLoading && <Loader />}
      {error && <Alert type='error' message={error} />}
      {!plantDetail && !error && !isLoading && (
        <Alert type='error' message='Plant details not found' />
      )}
      {plantDetail && <PlantDetailForm plantDetail={plantDetail} />}
    </div>
  );
};
