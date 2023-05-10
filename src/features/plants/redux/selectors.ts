import type { RootState } from '@/redux/store';
import type { Plant } from '../types';

// GET
export const selectPlants = (state: RootState): Plant[] =>
  state.plantsReducer.plants;

export const selectIsLoadingPlants = (state: RootState): boolean =>
  state.plantsReducer.isLoadingPlants;

export const selectPlantsError = (state: RootState): string | null =>
  state.plantsReducer.plantsError;

// POST
export const selectIsLoadingNewPlant = (state: RootState): boolean =>
  state.plantsReducer.isLoadingNewPlant;

export const selectNewPlantError = (state: RootState): string[] | null =>
  state.plantsReducer.newPlantError;
