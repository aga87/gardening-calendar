import React, { useId } from 'react';
import {
  Alert,
  Fieldset,
  Form,
  Heading,
  Label,
  Loader,
  SelectInput,
  SubmitButton,
  TextInput
} from '@/components';
import { useNewPlant } from './useNewPlant';
import { useFetchPlants } from '../../hooks';
import { months, plantCategories } from '../../utils';
import styles from './new-plant.module.scss';

export const NewPlant = () => {
  const {
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
  } = useNewPlant();

  // In case user lands on this page first
  // We need to populate the store before the user adds a new plant
  const { isLoading: isLoadingPlants, error: plantsError } = useFetchPlants();

  const nameInputId = useId();
  const varietyInputId = useId();
  const categoryInputId = useId();
  const sowFromInputId = useId();
  const sowUntilInputId = useId();
  const harvestFromInputId = useId();
  const harvestUntilInputId = useId();

  const monthOptions = months.map((month, i) => ({
    text: month,
    value: i + 1
  }));

  const selectMonthPlaceholder = 'Month';

  if (isLoadingPlants) return <Loader />;

  if (plantsError) return <Alert type='error' message={plantsError} />;

  return (
    <div className={styles.newPlantContainer}>
      <Heading text='New Plant' />
      {error && (
        <div className={styles.error}>
          <Alert type='error' message={error} />
        </div>
      )}
      {isLoading && <Loader />}
      <Form handleSubmit={handleSubmit}>
        <Label inputId={nameInputId} text='Name' />
        <TextInput
          variant='primary'
          id={nameInputId}
          value={name.value}
          handleChange={name.handleChange}
          required
          maxLength={20}
          errorMsg={formErrors.name}
        />
        <Label inputId={varietyInputId} text='Variety' />
        <TextInput
          variant='primary'
          id={varietyInputId}
          value={variety.value}
          handleChange={variety.handleChange}
          maxLength={30}
        />
        <Label inputId={categoryInputId} text='Category' />
        <SelectInput
          id={categoryInputId}
          options={plantCategories}
          value={category.value}
          handleChange={category.handleChange}
          required
        />
        <Fieldset legend='Sow'>
          <div className={styles.container}>
            <div className={styles.container__item}>
              <Label inputId={sowFromInputId} text='From' />
              <SelectInput
                id={sowFromInputId}
                placeholder={selectMonthPlaceholder}
                options={monthOptions}
                value={sowFrom.value}
                handleChange={sowFrom.handleChange}
                required={sowUntil.value !== ''}
                errorMsg={formErrors.sowFrom}
              />
            </div>
            <div className={styles.container__item}>
              <Label inputId={sowUntilInputId} text='Until' />
              <SelectInput
                id={sowUntilInputId}
                placeholder={selectMonthPlaceholder}
                options={monthOptions}
                value={sowUntil.value}
                handleChange={sowUntil.handleChange}
                required={sowFrom.value !== ''}
                errorMsg={formErrors.sowUntil}
              />
            </div>
          </div>
        </Fieldset>
        <Fieldset legend='Harvest'>
          <div className={styles.container}>
            <div className={styles.container__item}>
              <Label inputId={harvestFromInputId} text='From' />
              <SelectInput
                id={harvestFromInputId}
                placeholder={selectMonthPlaceholder}
                options={monthOptions}
                value={harvestFrom.value}
                handleChange={harvestFrom.handleChange}
                required={harvestUntil.value !== ''}
                errorMsg={formErrors.harvestFrom}
              />
            </div>
            <div className={styles.container__item}>
              <Label inputId={harvestUntilInputId} text='Until' />
              <SelectInput
                id={harvestUntilInputId}
                placeholder={selectMonthPlaceholder}
                options={monthOptions}
                value={harvestUntil.value}
                handleChange={harvestUntil.handleChange}
                required={harvestFrom.value !== ''}
                errorMsg={formErrors.harvestUntil}
              />
            </div>
          </div>
        </Fieldset>
        <div className={styles.buttonContainer}>
          <SubmitButton text='Add plant' />
        </div>
      </Form>
    </div>
  );
};
