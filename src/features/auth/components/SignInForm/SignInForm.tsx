import React, { useId } from 'react';
import {
  Alert,
  Button,
  EmailIcon,
  Form,
  Label,
  PasswordInput,
  SubmitButton,
  TextInput
} from '@/components';
import { useInputFocus } from '@/hooks';
import { useSignInForm } from './useSignInForm';
import styles from './sign-in-form.module.scss';

export const SignInForm = () => {
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
    handlePasswordChange,
    formErrors,
    handleSubmit,
    signInError,
    handleResendVerificationEmail,
    isVerificationEmailSent
  } = useSignInForm();

  return (
    <Form formLabel='Sign in' handleSubmit={handleSubmit}>
      <div className={styles.container}>
        {signInError && (
          <div className={styles.alertContainer}>
            <Alert type='error' variant='secondary' message={signInError} />
          </div>
        )}
        {signInError?.includes('verify your email') && (
          <div className={styles.buttonContainer}>
            <Button
              text='Resend verification email'
              handleClick={handleResendVerificationEmail}
            />
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
          variant='secondary'
          ref={firstInputRef}
          type='email'
          placeholder={labels.email}
          icon={<EmailIcon className={styles.inputIcon} />}
          value={email}
          handleChange={handleEmailChange}
          id={labels.emailId}
          errorMsg={formErrors.email}
        />
        <Label text={labels.password} inputId={labels.passwordId} hidden />
        <PasswordInput
          placeholder={labels.password}
          value={password}
          handleChange={handlePasswordChange}
          id={labels.passwordId}
          errorMsg={formErrors.password}
        />
      </div>
      <SubmitButton text='Sign in' />
    </Form>
  );
};
