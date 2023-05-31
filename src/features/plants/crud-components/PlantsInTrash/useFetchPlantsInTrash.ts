import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/typed-hooks';
import { useFirstRender } from '@/hooks';
import { getPlantsInTrash } from '../../redux/plants/thunks';
import { setPlantsInTrashError } from '../../redux/plants/plantsSlice';
import {
  selectIsLoadingPlantsInTrash,
  selectPlantsInTrash,
  selectPlantsInTrashError
} from '../../redux/plants/selectors';

export const useFetchPlantsInTrash = () => {
  const plantsInTrash = useAppSelector(selectPlantsInTrash);
  const isLoading = useAppSelector(selectIsLoadingPlantsInTrash);
  const error = useAppSelector(selectPlantsInTrashError);

  const dispatch = useAppDispatch();

  const isFirstRender = useFirstRender();

  // Clear errors on first render, if any
  useEffect(() => {
    if (isFirstRender && error) {
      dispatch(setPlantsInTrashError(null));
    }
  }, [dispatch, isFirstRender, error]);

  useEffect(() => {
    dispatch(getPlantsInTrash());
  }, [dispatch]);

  return { plantsInTrash, isLoading, error };
};
