import { AppThunk } from '@/redux/store';
import { PlantsApiService } from '../services';
import { setPlants, setPlantsLoading, setPlantsError } from './plantsSlice';

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
