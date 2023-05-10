import { AppThunk } from '@/redux/store';
import { PlantsApiService } from '../../services';
import {
  setPlants,
  setPlantsLoading,
  setPlantsError,
  setNewPlant,
  setNewPlantLoading,
  setNewPlantError
} from './plantsSlice';
import { setRedirectLink } from '../redirect/redirectSlice';
import type { NewPlant } from '../../types';

export const getPlants = (): AppThunk => async (dispatch, getState) => {
  // If the plants are already in Redux store, do not fetch
  const plantsInStore = getState().plantsReducer.plants;
  if (plantsInStore.length > 0) return;
  // Fetch plants only if they are not already in store
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
      dispatch(setRedirectLink(`/plants/${plant.category}/${plant._id}`));
    } else if (error) {
      dispatch(setNewPlantError(error));
    }
    dispatch(setNewPlantLoading(false));
  };
