import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/typed-hooks';
import { movePlantToTrash } from '../../redux/plants/thunks';
import { setMovePlantToTrashError } from '../../redux/plants/plantsSlice';
import {
  selectIsLoadingMovePlantToTrash,
  selectMovePlantToTrashError
} from '../../redux/plants/selectors';
import { useFirstRender } from '@/hooks';
import type { Plant } from '../../types';

export const useMoveToTrash = (plantId: Plant['_id']) => {
  const isLoadingMoveToTrash = useAppSelector(selectIsLoadingMovePlantToTrash);
  const moveToTrashError = useAppSelector(selectMovePlantToTrashError);
  const dispatch = useAppDispatch();
  const isFirstRender = useFirstRender();

  const handleMoveToTrashClick = () => {
    dispatch(movePlantToTrash(plantId));
  };

  // Clear errors on first render, if any
  useEffect(() => {
    if (isFirstRender && moveToTrashError) {
      dispatch(setMovePlantToTrashError(null));
    }
  }, [dispatch, isFirstRender, moveToTrashError]);

  return { handleMoveToTrashClick, isLoadingMoveToTrash, moveToTrashError };
};
