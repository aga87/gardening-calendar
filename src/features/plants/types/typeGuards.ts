import type { PlantCategory } from './types';
import { plantCategories } from '../utils';

export const isPlantCategory = (
  category: unknown
): category is PlantCategory => {
  return plantCategories.includes(category as PlantCategory);
};
