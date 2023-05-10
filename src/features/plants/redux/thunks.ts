import { AppThunk } from '@/redux/store';
import { PlantsApiService } from '../services';
import {
  setPlants,
  setPlantsLoading,
  setPlantsError,
  setNewPlant,
  setNewPlantLoading,
  setNewPlantError
} from './plantsSlice';
import type { NewPlant } from '../types';

export const getPlants = (): AppThunk => async dispatch => {
  dispatch(setPlantsLoading(true));
  const { plantsWithCount, error } = await PlantsApiService.getPlants();
  if (plantsWithCount) {
    dispatch(setPlants(plantsWithCount));
  } else if (error) {
    dispatch(setPlantsError(error));
  }
  dispatch(setPlantsLoading(false));
};

export const addNewPlant =
  (newPlant: NewPlant): AppThunk =>
  async dispatch => {
    dispatch(setNewPlantLoading(true));
    const { plant, error } = await PlantsApiService.addPlant(newPlant);
    if (plant) {
      dispatch(setNewPlant(plant));
    } else if (error) {
      dispatch(setNewPlantError(error));
    }
    dispatch(setNewPlantLoading(false));
  };
