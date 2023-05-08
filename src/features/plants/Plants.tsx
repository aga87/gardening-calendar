import React from 'react';
import { useRouter } from 'next/router';
import { PlantChart, PlantDescription } from './components';
import { plants } from './data/mock-plants-data';
import type { Plant, PlantCategory } from './types';
import styles from './plants.module.scss';

type PlantsProps = {
  category: PlantCategory | 'all';
};

export const Plants = ({ category }: PlantsProps) => {
  const router = useRouter();

  const filteredPlants =
    category === 'all'
      ? plants
      : plants.filter(plant => plant.category === category);

  const handleClick = (plantCategory: PlantCategory, plantId: Plant['_id']) => {
    router.push(`/plants/${plantCategory}/${plantId}`);
  };

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

  return <ul className={styles.list}>{plantListItems}</ul>;
};
