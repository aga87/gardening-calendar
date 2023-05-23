import { useEffect, useState } from 'react';
import { useSelectInput, useTextArea, useTextInput } from '@/components';
import { useFirstRender } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/redux/typed-hooks';
import { hasNonEmptyValue, validateRequiredField } from '@/utils';
import { editPlantDetail } from '../../redux/plants/thunks';
import { setPlantDetailUpdateError } from '../../redux/plants/plantsSlice';
import {
  selectIsLoadingPlantDetailUpdate,
  selectPlantDetailUpdateError
} from '../../redux/plants/selectors';
import {
  validateEndingMonthField,
  validateStartingMonthField
} from '../../utils';
import { PlantCategory, Month, PlantDetail, NewPlantDetail } from '../../types';

export const useEditPlantDetailForm = (plantDetail: PlantDetail) => {
  const name = useTextInput(plantDetail.name);
  const variety = useTextInput(plantDetail.variety);
  const category = useSelectInput(plantDetail.category);
  const sowFrom = useSelectInput(plantDetail.sowFrom);
  const sowUntil = useSelectInput(plantDetail.sowUntil);
  const harvestFrom = useSelectInput(plantDetail.harvestFrom);
  const harvestUntil = useSelectInput(plantDetail.harvestUntil);
  const notes = useTextArea(plantDetail.notes);

  const [formErrors, setFormErrors] = useState({
    name: '',
    sowFrom: '',
    sowUntil: '',
    harvestFrom: '',
    harvestUntil: ''
  });

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoadingPlantDetailUpdate);
  const error = useAppSelector(selectPlantDetailUpdateError);

  const isFirstRender = useFirstRender();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = {
      name: validateRequiredField(name.value),
      sowFrom: validateStartingMonthField({
        startingMonth: sowFrom.value,
        endingMonth: sowUntil.value
      }),
      sowUntil: validateEndingMonthField({
        startingMonth: sowFrom.value,
        endingMonth: sowUntil.value
      }),
      harvestFrom: validateStartingMonthField({
        startingMonth: harvestFrom.value,
        endingMonth: harvestUntil.value
      }),
      harvestUntil: validateEndingMonthField({
        startingMonth: harvestFrom.value,
        endingMonth: harvestUntil.value
      })
    };

    const newPlantDetail: NewPlantDetail = {
      name: name.value,
      variety: variety.value || null,
      category: category.value as PlantCategory,
      sowFrom: (Number(sowFrom.value) as Month) || null,
      sowUntil: (Number(sowUntil.value) as Month) || null,
      harvestFrom: (Number(harvestFrom.value) as Month) || null,
      harvestUntil: (Number(harvestUntil.value) as Month) || null,
      notes: notes.value || null
    };

    if (hasNonEmptyValue(errors)) {
      setFormErrors(errors);
    } else {
      dispatch(editPlantDetail({ newPlantDetail, plantId: plantDetail._id }));
    }
  };

  // Clear form submission errors on initial render, if any
  useEffect(() => {
    if (isFirstRender && error) {
      dispatch(setPlantDetailUpdateError(null));
    }
  }, [dispatch, error, isFirstRender]);

  return {
    name,
    variety,
    category,
    sowFrom,
    sowUntil,
    harvestFrom,
    harvestUntil,
    notes,
    formErrors,
    handleSubmit,
    isLoading,
    error
  };
};
