import { useEffect, useState } from 'react';
import { useSelectInput, useTextInput } from '@/components';
import { useFirstRender } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/redux/typed-hooks';
import { hasNonEmptyValue, validateRequiredField } from '@/utils';
import { addNewPlant } from '../../redux/plants/thunks';
import { setNewPlantError } from '../../redux/plants/plantsSlice';
import { useRedirect } from '../../hooks';
import {
  plantCategories,
  validateEndingMonthField,
  validateStartingMonthField
} from '../../utils';
import { PlantCategory, Month, NewPlant } from '../../types';
import {
  selectIsLoadingNewPlant,
  selectNewPlantError
} from '../../redux/plants/selectors';

export const useNewPlant = () => {
  const name = useTextInput('');
  const variety = useTextInput('');
  const category = useSelectInput(plantCategories[0]);
  const sowFrom = useSelectInput('');
  const sowUntil = useSelectInput('');
  const harvestFrom = useSelectInput('');
  const harvestUntil = useSelectInput('');

  const [formErrors, setFormErrors] = useState({
    name: '',
    sowFrom: '',
    sowUntil: '',
    harvestFrom: '',
    harvestUntil: ''
  });

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoadingNewPlant);
  const error = useAppSelector(selectNewPlantError);

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

    const newPlant: NewPlant = {
      name: name.value,
      variety: variety.value || null,
      category: category.value as PlantCategory,
      sowFrom: (Number(sowFrom.value) as Month) || null,
      sowUntil: (Number(sowUntil.value) as Month) || null,
      harvestFrom: (Number(harvestFrom.value) as Month) || null,
      harvestUntil: (Number(harvestUntil.value) as Month) || null
    };
    if (hasNonEmptyValue(errors)) {
      setFormErrors(errors);
    } else {
      dispatch(addNewPlant(newPlant));
    }
  };

  // Clear form submission errors on initial render, if any
  useEffect(() => {
    if (isFirstRender && error) {
      dispatch(setNewPlantError(null));
    }
  }, [dispatch, error, isFirstRender]);

  // Redirect upon successful plant creation
  useRedirect();

  return {
    name,
    variety,
    category,
    sowFrom,
    sowUntil,
    harvestFrom,
    harvestUntil,
    formErrors,
    handleSubmit,
    isLoading,
    error
  };
};
