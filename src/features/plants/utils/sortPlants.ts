import { toZerosAndOnes } from './toZerosAndOnes';
import type { Plant, Sort } from '../types';

export const sortPlants = (plants: Plant[], sort: Sort): Plant[] => {
  switch (sort) {
    case 'name': {
      const compareName = (a: Plant, b: Plant) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      };
      // Create a copy of the array instead of sorting-in-place
      return [...plants].sort(compareName);
    }
    case 'sowing time': {
      const compareSowFrom = (a: Plant, b: Plant) => {
        // E.g. for sowing period from Nov - Feb the earliest month is January
        const earliestMonthPlantA = toZerosAndOnes({
          monthStart: a.sowFrom,
          monthEnd: a.sowUntil
        }).indexOf(1);
        const earliestMonthPlantB = toZerosAndOnes({
          monthStart: b.sowFrom,
          monthEnd: b.sowUntil
        }).indexOf(1);

        return earliestMonthPlantA - earliestMonthPlantB;
      };
      // Create a copy of the array instead of sorting-in-place
      return [...plants].sort(compareSowFrom);
    }
    case 'harvesting time': {
      const compareHarvestFrom = (a: Plant, b: Plant) => {
        // E.g. for harvesting period from Nov - Feb the earliest month is January
        const earliestMonthPlantA = toZerosAndOnes({
          monthStart: a.harvestFrom,
          monthEnd: a.harvestUntil
        }).indexOf(1);
        const earliestMonthPlantB = toZerosAndOnes({
          monthStart: b.harvestFrom,
          monthEnd: b.harvestUntil
        }).indexOf(1);
        return earliestMonthPlantA - earliestMonthPlantB;
      };
      // Create a copy of the array instead of sorting-in-place
      return [...plants].sort(compareHarvestFrom);
    }
    default:
      return plants;
  }
};
