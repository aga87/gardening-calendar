import type { RootState } from '@/redux/store';
import type { Plant, PlantDetail } from '../../types';

// GET Plants
export const selectPlants = (state: RootState): Plant[] =>
  state.plantsReducer.plants;

export const selectIsLoadingPlants = (state: RootState): boolean =>
  state.plantsReducer.isLoadingPlants;

export const selectPlantsError = (state: RootState): string | null =>
  state.plantsReducer.plantsError;

// ADD New plant
export const selectIsLoadingNewPlant = (state: RootState): boolean =>
  state.plantsReducer.isLoadingNewPlant;

export const selectNewPlantError = (state: RootState): string[] | null =>
  state.plantsReducer.newPlantError;

// GET Plant detail
export const selectPlantDetailById = (
  state: RootState,
  id: string
): PlantDetail | undefined =>
  state.plantsReducer.plantDetails.find(plant => plant._id === id);

export const selectIsLoadingPlantDetail = (state: RootState): boolean =>
  state.plantsReducer.isLoadingPlantDetail;

export const selectPlantDetailError = (state: RootState): string | null =>
  state.plantsReducer.plantDetailError;

// UPDATE Plant detail
export const selectIsLoadingPlantDetailUpdate = (state: RootState): boolean =>
  state.plantsReducer.isLoadingPlantDetailUpdate;

export const selectPlantDetailUpdateError = (state: RootState): string | null =>
  state.plantsReducer.plantDetailUpdateError;
