import React, { useId } from 'react';
import {
  Alert,
  Fieldset,
  Form,
  Label,
  Loader,
  SelectInput,
  SubmitButton,
  TextArea,
  TextInput
} from '@/components';
import { useEditPlantDetailForm } from './usePlantDetailForm';
import { months, plantCategories } from '../../utils';
import type { PlantDetail } from '../../types';
import styles from './plant-detail-form.module.scss';
import { useRedirect } from '../../hooks';

type PlantDetailFormProps = {
  plantDetail: PlantDetail;
};

export const PlantDetailForm = ({ plantDetail }: PlantDetailFormProps) => {
  const {
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
  } = useEditPlantDetailForm(plantDetail);

  // Redirect upon successful plant detail edit
  useRedirect();

  const nameInputId = useId();
  const varietyInputId = useId();
  const categoryInputId = useId();
  const sowFromInputId = useId();
  const sowUntilInputId = useId();
  const harvestFromInputId = useId();
  const harvestUntilInputId = useId();
  const notesInputId = useId();

  const monthOptions = months.map((month, i) => ({
    text: month,
    value: i + 1
  }));

  const selectMonthPlaceholder = 'Month';

  return (
    <div>
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
        <Label inputId={notesInputId} text='Notes' />
        <TextArea
          id={nameInputId}
          value={notes.value}
          handleChange={notes.handleChange}
          maxLength={1000}
        />
        <div className={styles.buttonContainer}>
          <SubmitButton text='Save' />
        </div>
      </Form>
    </div>
  );
};
