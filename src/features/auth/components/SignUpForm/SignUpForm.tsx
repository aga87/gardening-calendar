import React, { useId } from 'react';
import {
  CheckmarkIcon,
  EmailIcon,
  Form,
  Label,
  PasswordInput,
  ProgressBar,
  SubmitButton,
  TextInput,
  usePasswordStrength,
  useTextInput
} from '@/components';
import { useInputFocus } from '@/hooks';
import styles from './sign-up-form.module.scss';

export const SignUpForm = () => {
  const labels = {
    email: 'Email',
    emailId: useId(),
    password: 'Password',
    passwordId: useId()
  };

  const email = useTextInput('');

  const {
    password,
    passwordStrength,
    passwordStrengthPercentage,
    passwordStrengthFeedback,
    handlePasswordChange
  } = usePasswordStrength();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('submit');
  };

  //  Focus first input when the form renders
  const firstInputRef = useInputFocus();

  return (
    <Form formLabel='Sign up' handleSubmit={handleSubmit}>
      <div className={styles.container}>
        <Label text={labels.email} inputId={labels.emailId} hidden />
        <TextInput
          ref={firstInputRef}
          type='email'
          placeholder={labels.email}
          icon={<EmailIcon className={styles.inputIcon} />}
          value={email.value}
          handleChange={email.handleChange}
          inputId={labels.emailId}
        />
        <Label text={labels.password} inputId={labels.passwordId} hidden />
        <PasswordInput
          placeholder={labels.password}
          value={password}
          handleChange={handlePasswordChange}
          inputId={labels.passwordId}
        />
        {passwordStrengthPercentage > 0 && (
          <div className={styles.progressBarContainer}>
            <ProgressBar progress={passwordStrengthPercentage} />
          </div>
        )}
        {password && (
          <div className={styles.passwordFeedback}>
            <p>Password must have</p>
            <ul className={styles.passwordFeedback__list}>
              {Object.keys(passwordStrengthFeedback).map(key => (
                <li key={key} className={styles.passwordFeedback__listItem}>
                  {passwordStrengthFeedback[key]}
                  {passwordStrength[key] && (
                    <CheckmarkIcon
                      className={styles.passwordFeedback__checkmark}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <SubmitButton text='Sign up' />
    </Form>
  );
};
