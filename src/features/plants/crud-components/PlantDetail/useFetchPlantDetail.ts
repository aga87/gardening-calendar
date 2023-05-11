import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/typed-hooks';
import { useFirstRender } from '@/hooks';
import { getPlantDetail } from '../../redux/plants/thunks';
import { setPlantDetailError } from '../../redux/plants/plantsSlice';
import {
  selectIsLoadingPlantDetail,
  selectPlantDetailById,
  selectPlantDetailError
} from '../../redux/plants/selectors';

export const useFetchPlantDetail = (plantId: string) => {
  const dispatch = useAppDispatch();

  const plantDetail = useAppSelector(state =>
    selectPlantDetailById(state, plantId)
  );
  const isLoading = useAppSelector(selectIsLoadingPlantDetail);
  const error = useAppSelector(selectPlantDetailError);

  const isFirstRender = useFirstRender();

  // Clear errors on first render, if any
  useEffect(() => {
    if (isFirstRender && error) {
      dispatch(setPlantDetailError(null));
    }
  }, [dispatch, plantId, error, isFirstRender]);

  useEffect(() => {
    dispatch(getPlantDetail(plantId));
  }, [dispatch, plantId]);

  return { plantDetail, isLoading, error };
};
