import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/typed-hooks';
import { getPlants } from '../../redux/plants/thunks';
import {
  selectIsLoadingPlants,
  selectPlants,
  selectPlantsError
} from '../../redux/plants/selectors';

export const useFetchPlants = () => {
  const dispatch = useAppDispatch();
  const plants = useAppSelector(selectPlants);
  const isLoading = useAppSelector(selectIsLoadingPlants);
  const error = useAppSelector(selectPlantsError);

  useEffect(() => {
    dispatch(getPlants());
  }, [dispatch]);

  return { plants, isLoading, error };
};
