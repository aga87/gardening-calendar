import React from 'react';
import { PlantChart, PlantDescription } from './components';
import { plants } from './data/mock-plants-data';
import styles from './plants.module.scss';

export const Plants = () => {
  const plantListItems = plants.map(plant => (
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
  ));

  return <ul className={styles.list}>{plantListItems}</ul>;
};
