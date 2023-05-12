import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/typed-hooks';
import { useFirstRender } from '@/hooks';
import { getPlants } from '../redux/plants/thunks';
import { setPlantsError } from '../redux/plants/plantsSlice';
import {
  selectIsLoadingPlants,
  selectPlants,
  selectPlantsError
} from '../redux/plants/selectors';

export const useFetchPlants = () => {
  const plants = useAppSelector(selectPlants);
  const isLoading = useAppSelector(selectIsLoadingPlants);
  const error = useAppSelector(selectPlantsError);

  const dispatch = useAppDispatch();

  const isFirstRender = useFirstRender();

  // Clear errors on first render, if any
  useEffect(() => {
    if (isFirstRender && error) {
      dispatch(setPlantsError(null));
    }
  }, [dispatch, isFirstRender, error]);

  useEffect(() => {
    dispatch(getPlants());
  }, [dispatch]);

  return { plants, isLoading, error };
};
