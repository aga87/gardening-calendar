import React, { useId } from 'react';
import {
  Alert,
  CheckmarkIcon,
  EmailIcon,
  Form,
  Label,
  PasswordInput,
  ProgressBar,
  SubmitButton,
  TextInput
} from '@/components';
import { useInputFocus } from '@/hooks';
import { useSignUpForm } from './useSignUpForm';
import styles from './sign-up-form.module.scss';

export const SignUpForm = () => {
  const labels = {
    email: 'Email',
    emailId: useId(),
    password: 'Password',
    passwordId: useId()
  };

  //  Focus first input when the form renders
  const firstInputRef = useInputFocus();

  const {
    email,
    handleEmailChange,
    password,
    passwordStrength,
    passwordStrengthPercentage,
    passwordStrengthFeedback,
    handlePasswordChange,
    handleSubmit,
    formErrors,
    signUpError,
    isVerificationEmailSent
  } = useSignUpForm();

  return (
    <Form formLabel='Sign up' handleSubmit={handleSubmit}>
      <div className={styles.container}>
        {signUpError && (
          <div className={styles.alertContainer}>
            <Alert type='error' variant='secondary' message={signUpError} />
          </div>
        )}
        {isVerificationEmailSent && (
          <div className={styles.alertContainer}>
            <Alert
              type='success'
              variant='secondary'
              message='Verification email has been sent. Please check your inbox (including the spam folder).'
            />
          </div>
        )}
        <Label text={labels.email} inputId={labels.emailId} hidden />
        <TextInput
          ref={firstInputRef}
          type='email'
          placeholder={labels.email}
          icon={<EmailIcon className={styles.inputIcon} />}
          value={email}
          handleChange={handleEmailChange}
          inputId={labels.emailId}
          errorMsg={formErrors.email}
        />
        <Label text={labels.password} inputId={labels.passwordId} hidden />
        <PasswordInput
          placeholder={labels.password}
          value={password}
          handleChange={handlePasswordChange}
          inputId={labels.passwordId}
          errorMsg={formErrors.password}
        />
        {password && !isVerificationEmailSent && (
          <>
            <div className={styles.progressBarContainer}>
              <ProgressBar progress={passwordStrengthPercentage} />
            </div>
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
          </>
        )}
      </div>
      <SubmitButton text='Sign up' />
    </Form>
  );
};
