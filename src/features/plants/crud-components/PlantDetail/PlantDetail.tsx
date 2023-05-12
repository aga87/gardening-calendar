import React from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, Heading, Logo } from '@/components';
import { useFetchPlantDetail } from './useFetchPlantDetail';
import type { Plant } from '../../types';
import { capitalize } from '@/utils';
import { months } from '../../utils';
import styles from './plant-detail.module.scss';

type PlantDetailProps = {
  plantId: Plant['_id'];
};

export const PlantDetail = ({ plantId }: PlantDetailProps) => {
  const { plantDetail, isLoading, error } = useFetchPlantDetail(plantId);

  const router = useRouter();
  const { id, category } = router.query;

  const handleClick = () => {
    router.push(`/plants/${category}/${id}/edit`);
  };

  const sowFromMonthName = plantDetail?.sowFrom
    ? months[plantDetail.sowFrom - 1]
    : '-';

  const sowUntilMonthName = plantDetail?.sowUntil
    ? months[plantDetail.sowUntil - 1]
    : '-';

  const harvestFromMonthName = plantDetail?.harvestFrom
    ? months[plantDetail.harvestFrom - 1]
    : '-';

  const harvestUntilMonthName = plantDetail?.harvestUntil
    ? months[plantDetail.harvestUntil - 1]
    : '-';

  return (
    <>
      <Heading text='Plant Detail' />
      {error && (
        <div className={styles.error}>
          <Alert type='error' message={error} />
        </div>
      )}
      {isLoading && (
        <div className={styles.loader}>
          <Logo spin />
        </div>
      )}
      {plantDetail && (
        <>
          <dl className={styles.list}>
            <dt className={styles.label}>Name</dt>
            <dd className={styles.data}>{capitalize(plantDetail.name)}</dd>
            <dt className={styles.label}>Variety</dt>
            <dd className={styles.data}>
              {capitalize(plantDetail.variety || '-')}
            </dd>
            <dt className={styles.label}>Category</dt>
            <dd className={styles.data}>{capitalize(plantDetail.category)}</dd>
            <dt className={styles.label}>Sow</dt>
            <dd className={styles.dataContainer}>
              <div className={styles.dataContainer__item}>
                <div>From</div>
                <div className={styles.data}>{sowFromMonthName}</div>
              </div>
              <div className={styles.dataContainer__item}>
                <div>Until</div>
                <div className={styles.data}>{sowUntilMonthName}</div>
              </div>
            </dd>
            <dt className={styles.label}>Harvest</dt>
            <dd className={styles.dataContainer}>
              <div className={styles.dataContainer__item}>
                <div>From</div>
                <div className={styles.data}>{harvestFromMonthName}</div>
              </div>
              <div className={styles.dataContainer__item}>
                <div>Until</div>
                <div className={styles.data}>{harvestUntilMonthName}</div>
              </div>
            </dd>
            <dt className={styles.label}>Notes</dt>
            <dd className={styles.notes}>{plantDetail.notes || ''}</dd>
          </dl>
          <Button variant='primary' text='Edit' handleClick={handleClick} />
        </>
      )}
    </>
  );
};
