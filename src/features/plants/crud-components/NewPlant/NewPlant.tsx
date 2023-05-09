import React, { useId } from 'react';
import {
  Fieldset,
  Form,
  Heading,
  Label,
  SelectInput,
  SubmitButton,
  TextInput,
  useSelectInput,
  useTextInput
} from '@/components';
import { months, plantCategories } from '../../utils';
import styles from './new-plant.module.scss';

export const NewPlant = () => {
  const name = useTextInput('');
  const variety = useTextInput('');
  const category = useSelectInput(plantCategories[0]);
  const sowFrom = useSelectInput('');
  const sowUntil = useSelectInput('');
  const harvestFrom = useSelectInput('');
  const harvestUntil = useSelectInput('');

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
  return (
    <>
      <Heading text='New Plant' />
      <Form>
        <Label inputId={nameInputId} text='Name' />
        <TextInput
          variant='primary'
          id={nameInputId}
          value={name.value}
          handleChange={name.handleChange}
          required
          errorMsg='' // TODO:
        />
        <Label inputId={varietyInputId} text='Variety' />
        <TextInput
          variant='primary'
          id={varietyInputId}
          value={variety.value}
          handleChange={variety.handleChange}
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
                errorMsg='' // TODO:
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
                errorMsg='' // TODO:
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
                errorMsg='' // TODO:
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
                errorMsg='' // TODO:
              />
            </div>
          </div>
        </Fieldset>
        <div className={styles.buttonContainer}>
          <SubmitButton text='Add plant' />
        </div>
      </Form>
    </>
  );
};
