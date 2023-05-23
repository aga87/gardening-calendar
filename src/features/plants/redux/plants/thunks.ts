import { AppThunk } from '@/redux/store';
import { PlantsApiService } from '../../services';
import {
  // Plants
  setPlants,
  setPlantsLoading,
  setPlantsError,
  // New plant
  setNewPlant,
  setNewPlantLoading,
  setNewPlantError,
  // Plant detail
  setPlantDetail,
  setPlantDetailLoading,
  setPlantDetailError,
  // New plant detail
  setPlantDetailUpdate,
  setPlantDetailUpdateLoading,
  setPlantDetailUpdateError
} from './plantsSlice';
import { setRedirectLink } from '../redirect/redirectSlice';
import type { NewPlant, NewPlantDetail, Plant } from '../../types';

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

export const getPlantDetail =
  (plantId: Plant['_id']): AppThunk =>
  async (dispatch, getState) => {
    // If the plant detail is already in Redux store, do not fetch
    const plantDetailsInStore = getState().plantsReducer.plantDetails;
    if (plantDetailsInStore.some(plant => plant._id === plantId)) return;
    // Fetch plant details only if it is not already in store
    dispatch(setPlantDetailLoading(true));
    const { plantDetail, error } = await PlantsApiService.getPlantDetail(
      plantId
    );
    if (plantDetail) {
      dispatch(setPlantDetail(plantDetail));
    } else if (error) {
      dispatch(setPlantDetailError(error));
    }
    dispatch(setPlantDetailLoading(false));
  };

export const editPlantDetail =
  ({
    newPlantDetail,
    plantId
  }: {
    newPlantDetail: NewPlantDetail;
    plantId: Plant['_id'];
  }): AppThunk =>
  async dispatch => {
    dispatch(setPlantDetailUpdateLoading(true));
    const { updatedPlantDetail, error } =
      await PlantsApiService.editPlantDetail({ newPlantDetail, plantId });
    if (updatedPlantDetail) {
      dispatch(setPlantDetailUpdate(updatedPlantDetail));
      dispatch(
        setRedirectLink(
          `/plants/${updatedPlantDetail.category}/${updatedPlantDetail._id}`
        )
      );
    } else if (error) {
      dispatch(setPlantDetailUpdateError(error));
    }
    dispatch(setPlantDetailUpdateLoading(false));
  };
