import React from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  CustomSelect,
  Heading,
  useCustomSelect,
  Logo
} from '@/components';
import { PlantChart, PlantDescription } from './components';
import { useFetchPlants } from './useFetchPlants';
import type { Plant, PlantCategory } from './types';
import styles from './plants.module.scss';

type PlantsProps = {
  category: PlantCategory | 'plants';
};

export const Plants = ({ category }: PlantsProps) => {
  const { plants, isLoading, error } = useFetchPlants();

  const router = useRouter();

  const handleClick = (plantCategory: PlantCategory, plantId: Plant['_id']) => {
    router.push(`/plants/${plantCategory}/${plantId}`);
  };

  const sortOptions = ['name', 'sowing time', 'harvesting time'];

  const sort = useCustomSelect(sortOptions[0]);
  // TODO: sort plants

  const filteredPlants =
    category === 'plants'
      ? plants
      : plants.filter(plant => plant.category === category);

  const plantListItems = filteredPlants.map(plant => {
    return (
      <li
        key={plant._id}
        className={styles.list__item}
        onClick={() => handleClick(plant.category, plant._id)}
      >
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
      <Heading text={`${category} (${filteredPlants.length})`} />
      <ul className={styles.list}>{plantListItems}</ul>
      <div role='menu' className={styles.plantsMenu}>
        <div className={styles.plantsMenu__item}>
          <CustomSelect
            label='Sort by:'
            options={sortOptions}
            value={sort.value}
            handleChange={sort.handleChange}
          />
        </div>
      </div>
    </>
  );
};
