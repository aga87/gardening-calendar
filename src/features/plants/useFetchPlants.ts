import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/typed-hooks';
import { getPlants } from './redux/thunks';
import {
  selectIsLoadingPlants,
  selectPlants,
  selectPlantsError
} from './redux/selectors';

export const useFetchPlants = () => {
  const dispatch = useAppDispatch();
  const plants = useAppSelector(selectPlants);
  const isLoading = useAppSelector(selectIsLoadingPlants);
  const error = useAppSelector(selectPlantsError);

  useEffect(() => {
    // Fetch data only if it is not already in Redux store
    if (plants.length === 0) {
      dispatch(getPlants());
    }
  }, [dispatch, plants]);

  return { plants, isLoading, error };
};
