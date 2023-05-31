import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/typed-hooks';
import { deletePlants } from '../../redux/plants/thunks';
import { setDeletePlantsError } from '../../redux/plants/plantsSlice';
import {
  selectIsLoadingDeletePlants,
  selectDeletePlantsError
} from '../../redux/plants/selectors';
import { useFirstRender } from '@/hooks';
import type { Plant } from '../../types';

export const useDeletePlants = () => {
  const isLoadingDeletePlants = useAppSelector(selectIsLoadingDeletePlants);
  const deletePlantsError = useAppSelector(selectDeletePlantsError);
  const isFirstRender = useFirstRender();

  const dispatch = useAppDispatch();

  const handleDeleteAllPlants = () => {
    dispatch(deletePlants());
  };

  // Clear errors on first render, if any
  useEffect(() => {
    if (isFirstRender && deletePlantsError) {
      dispatch(setDeletePlantsError(null));
    }
  }, [dispatch, isFirstRender, deletePlantsError]);

  return { handleDeleteAllPlants, isLoadingDeletePlants, deletePlantsError };
};
